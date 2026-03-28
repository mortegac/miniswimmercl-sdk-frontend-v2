import { useState, useEffect, useMemo } from "react";
import { generateClient } from "aws-amplify/api";
import { ChartData, ChartOptions } from "chart.js/auto";
import Lucide from "@/components/Base/Lucide";
import { getColor } from "@/utils/colors";
import Chart from "@/components/Base/Chart";
import { FormSelect } from "@/components/Base/Form";
import Table from "@/components/Base/Table";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { setBreadcrumb } from "@/stores/breadcrumb";
import { selectColorScheme } from "@/stores/colorSchemeSlice";
import { selectDarkMode } from "@/stores/darkModeSlice";

// ---------------------------------------------------------------------------
// GraphQL queries (inline, minimal fields)
// ---------------------------------------------------------------------------

const LIST_PAYMENTS = `
  query ListPayments($limit: Int) {
    listV2PaymentTransactions(limit: $limit) {
      items { id status amount day month year }
    }
  }
`;

const LIST_ENROLLMENTS = `
  query ListEnrollments($limit: Int) {
    listV2Enrollments(limit: $limit) {
      items {
        id amountPaid startDate wasPaid wasDeleted
        course { id title location { id name } }
      }
    }
  }
`;

const LIST_SESSIONS = `
  query ListSessions($limit: Int) {
    listV2SessionDetails(limit: $limit) {
      items { id date month year status locationId }
    }
  }
`;

// ---------------------------------------------------------------------------
// TypeScript interfaces
// ---------------------------------------------------------------------------

interface PaymentItem {
  id: string;
  status: string | null;
  amount: number | null;
  day: string | null;
  month: string | null;
  year: string | null;
}

interface EnrollmentLocation {
  id: string;
  name: string | null;
}

interface EnrollmentCourse {
  id: string;
  title: string | null;
  location: EnrollmentLocation | null;
}

interface EnrollmentItem {
  id: string;
  amountPaid: number | null;
  startDate: string | null;
  wasPaid: boolean | null;
  wasDeleted: boolean | null;
  course: EnrollmentCourse | null;
}

interface SessionItem {
  id: string;
  date: string | null;
  month: string | null;
  year: string | null;
  status: string | null;
  locationId: string | null;
}

interface MonthlyPayment {
  month: number;
  label: string;
  amount: number;
  count: number;
}

interface LocationEnrollment {
  name: string;
  count: number;
}

interface SessionStatusCount {
  status: string;
  label: string;
  count: number;
  colorClass: string;
  bgClass: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MONTH_LABELS = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
];

const SESSION_STATUS_MAP: Record<string, { label: string; colorClass: string; bgClass: string }> = {
  COMPLETED:    { label: "Completadas",    colorClass: "text-success",  bgClass: "bg-success/10 border-success/20" },
  SCHEDULED:    { label: "Programadas",    colorClass: "text-primary",  bgClass: "bg-primary/10 border-primary/20" },
  ABSENT:       { label: "Ausente",        colorClass: "text-warning",  bgClass: "bg-warning/10 border-warning/20" },
  CANCELED:     { label: "Canceladas",     colorClass: "text-danger",   bgClass: "bg-danger/10  border-danger/20"  },
  RESCHEDULED:  { label: "Reprogramadas",  colorClass: "text-info",     bgClass: "bg-info/10    border-info/20"    },
  UNKNOWN:      { label: "Desconocido",    colorClass: "text-slate-500", bgClass: "bg-slate-100 border-slate-200"  },
};

const FETCH_LIMIT = 10000;

// ---------------------------------------------------------------------------
// safeGraphql — tolerates Amplify Gen 2 partial errors where data is present
// even when the response also contains errors (e.g. null nested relations).
// ---------------------------------------------------------------------------

async function safeGraphql(client: any, query: string, variables: any): Promise<any[]> {
  try {
    const res: any = await client.graphql({ query, variables });
    const keys = Object.keys(res?.data ?? {});
    return res?.data?.[keys[0]]?.items ?? [];
  } catch (err: any) {
    // Amplify Gen 2 partial error — data may still be present alongside errors
    const data = err?.data ?? err?.errors?.[0]?.data;
    if (data) {
      const keys = Object.keys(data);
      return data?.[keys[0]]?.items ?? [];
    }
    return [];
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatCLP(amount: number): string {
  return amount.toLocaleString("es-CL", { style: "currency", currency: "CLP" });
}

function parseMonthFromStartDate(startDate: string | null): number | null {
  if (!startDate) return null;
  const parts = startDate.split("-");
  if (parts.length < 2) return null;
  const m = parseInt(parts[1], 10);
  return isNaN(m) ? null : m;
}

function parseYearFromStartDate(startDate: string | null): number | null {
  if (!startDate) return null;
  const year = parseInt(startDate.split("-")[0], 10);
  return isNaN(year) ? null : year;
}

function isPaid(wasPaid: boolean | null): boolean {
  // GraphQL may return boolean or the string "true"
  return wasPaid === true || (wasPaid as unknown) === "true";
}

function isDeleted(wasDeleted: boolean | null): boolean {
  // GraphQL may return boolean, string "true", or number 1
  return wasDeleted === true || (wasDeleted as unknown) === "true";
}

// ---------------------------------------------------------------------------
// MonthlyBarChart sub-component
// ---------------------------------------------------------------------------

interface MonthlyBarChartProps extends React.ComponentPropsWithoutRef<"canvas"> {
  height?: number | "auto";
  labels: string[];
  data: number[];
  borderColor: string;
  backgroundColor: string;
  hideYAxis?: boolean;
}

function MonthlyBarChart({
  height: height = 100,
  labels,
  data,
  borderColor,
  backgroundColor,
  hideYAxis = false,
  className = "",
}: MonthlyBarChartProps) {
  const colorScheme = useAppSelector(selectColorScheme);
  const darkMode = useAppSelector(selectDarkMode);

  const chartData: ChartData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          data,
          borderWidth: 1.5,
          borderColor,
          backgroundColor,
          borderRadius: 3,
        },
      ],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [labels, data, borderColor, backgroundColor, colorScheme, darkMode],
  );

  const options: ChartOptions = useMemo(
    () => ({
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: {
          ticks: {
            display: true,
            font: { size: 10 },
            color: darkMode ? "#64748b" : "#94a3b8",
            maxRotation: 0,
          },
          grid: { display: false },
          border: { display: false },
        },
        y: {
          ticks: {
            display: !hideYAxis,
            font: { size: 10 },
            color: darkMode ? "#64748b" : "#94a3b8",
            maxTicksLimit: 4,
          },
          grid: { color: darkMode ? "#1e2a3b" : "#f1f5f9", display: !hideYAxis },
          border: { display: false },
        },
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [colorScheme, darkMode, hideYAxis],
  );

  return (
    <Chart
      type="bar"
      width="auto"
      height={height}
      data={chartData}
      options={options}
      className={className}
    />
  );
}

// ---------------------------------------------------------------------------
// LocationPieChart sub-component
// ---------------------------------------------------------------------------

const PIE_COLORS = [
  "primary", "success", "warning", "danger", "info",
  "slate.500", "slate.400", "slate.300",
];

interface LocationPieChartProps {
  labels: string[];
  data: number[];
}

function LocationPieChart({ labels, data }: LocationPieChartProps) {
  const colorScheme = useAppSelector(selectColorScheme);
  const darkMode = useAppSelector(selectDarkMode);

  const chartData: ChartData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          data,
          backgroundColor: PIE_COLORS.slice(0, data.length).map((c) => getColor(c as any, 0.7)),
          borderColor: PIE_COLORS.slice(0, data.length).map((c) => getColor(c as any)),
          borderWidth: 1,
          hoverOffset: 6,
        },
      ],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [labels, data, colorScheme, darkMode],
  );

  const options: ChartOptions = useMemo(
    () => ({
      maintainAspectRatio: true,
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          labels: {
            font: { size: 11 },
            color: darkMode ? "#94a3b8" : "#475569",
            padding: 14,
            boxWidth: 12,
          },
        },
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [colorScheme, darkMode],
  );

  return (
    <div className="w-full h-full" style={{ minHeight: 300 }}>
      <Chart
        type="pie"
        width="auto"
        height="auto"
        data={chartData}
        options={options}
        className="w-full h-full"
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// RawData — all fetched collections in one object so state updates are atomic
// ---------------------------------------------------------------------------

interface RawData {
  payments: PaymentItem[];
  enrollments: EnrollmentItem[];
  sessions: SessionItem[];
}

// ---------------------------------------------------------------------------
// computeBestYear — selects the year with the most data across all sources
// ---------------------------------------------------------------------------

function computeBestYear(
  paymentItems: any[],
  enrollmentItems: any[],
  sessionItems: any[],
  currentYear: number,
): number {
  const tally = (items: any[], getYear: (item: any) => number | null) => {
    const map = new Map<number, number>();
    items.forEach((item) => {
      const y = getYear(item);
      if (y !== null && y >= 2020 && y <= currentYear + 1) {
        map.set(y, (map.get(y) ?? 0) + 1);
      }
    });
    return map;
  };

  const pickBest = (map: Map<number, number>): number | null =>
    map.size > 0
      ? Array.from(map.entries()).sort((a, b) => b[1] - a[1])[0][0]
      : null;

  // 1. Year with most paid enrollments (wasPaid = true boolean, date from startDate)
  const paidCounts = tally(enrollmentItems, (e) => {
    if (e.wasPaid !== true) return null;
    const y = parseInt((e.startDate ?? "").split("-")[0], 10);
    return isNaN(y) ? null : y;
  });
  const fromEnrollments = pickBest(paidCounts);
  if (fromEnrollments !== null) return fromEnrollments;

  // 2. Year with most sessions (use date field when year is absent)
  const sessionCounts = tally(sessionItems, (s) => {
    const raw = s.year ?? (s.date ?? "").split("-")[0];
    const y = parseInt(raw, 10);
    return isNaN(y) ? null : y;
  });
  const fromSessions = pickBest(sessionCounts);
  if (fromSessions !== null) return fromSessions;

  // 3. Year with most payment transactions
  const paymentCounts = tally(paymentItems, (p) => {
    const y = parseInt(String(p.year ?? ""), 10);
    return isNaN(y) ? null : y;
  });
  const fromPayments = pickBest(paymentCounts);
  if (fromPayments !== null) return fromPayments;

  // 4. Fallback: previous year (most likely to have complete data)
  return currentYear - 1;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function Main() {
  const dispatch = useAppDispatch();
  dispatch(setBreadcrumb({ first: "", firstURL: "" }));

  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  // Single atomic state: null = loading, object = data ready
  const [rawData, setRawData] = useState<RawData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // -------------------------------------------------------------------------
  // Data fetching — one Promise.all, one atomic setState
  // -------------------------------------------------------------------------

  useEffect(() => {
    let cancelled = false;

    async function fetchAll() {
      setError(null);
      try {
        const client = generateClient();

        const [paymentItems, enrollmentItems, sessionItems] = await Promise.all([
          safeGraphql(client, LIST_PAYMENTS, { limit: FETCH_LIMIT }),
          safeGraphql(client, LIST_ENROLLMENTS, { limit: FETCH_LIMIT }),
          safeGraphql(client, LIST_SESSIONS, { limit: FETCH_LIMIT }),
        ]);

        if (cancelled) return;

        // Determine the year with the most data across all sources BEFORE rendering
        const bestYear = computeBestYear(paymentItems, enrollmentItems, sessionItems, currentYear);

        // Both state updates are synchronous — React 18 batches them into one render
        setSelectedYear(bestYear);
        setRawData({ payments: paymentItems, enrollments: enrollmentItems, sessions: sessionItems });
      } catch (err: unknown) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : "Error al cargar los datos";
          setError(message);
          // Ensure we exit the loading state even on error
          setRawData({ payments: [], enrollments: [], sessions: [] });
        }
      }
    }

    fetchAll();
    return () => { cancelled = true; };
  // currentYear is stable (derived from Date at render time)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // -------------------------------------------------------------------------
  // Derived data: payments
  // -------------------------------------------------------------------------

  const payments = rawData?.payments ?? [];
  const enrollments = rawData?.enrollments ?? [];
  const sessions = rawData?.sessions ?? [];

  const paymentsForYear = useMemo(
    () => payments.filter((p) => String(p.year) === String(selectedYear)),
    [payments, selectedYear],
  );

  const monthlyPayments = useMemo<MonthlyPayment[]>(() => {
    const map = new Map<number, { amount: number; count: number }>();

    for (let i = 1; i <= 12; i++) {
      map.set(i, { amount: 0, count: 0 });
    }

    paymentsForYear.forEach((p) => {
      const m = parseInt(p.month ?? "0", 10);
      if (m >= 1 && m <= 12) {
        const existing = map.get(m)!;
        map.set(m, {
          amount: existing.amount + (p.amount ?? 0),
          count: existing.count + 1,
        });
      }
    });

    return Array.from(map.entries()).map(([month, { amount, count }]) => ({
      month,
      label: MONTH_LABELS[month - 1],
      amount,
      count,
    }));
  }, [paymentsForYear]);

  const totalPaymentAmount = useMemo(
    () => monthlyPayments.reduce((acc, m) => acc + m.amount, 0),
    [monthlyPayments],
  );

  const totalPaymentCount = useMemo(
    () => paymentsForYear.length,
    [paymentsForYear],
  );

  // -------------------------------------------------------------------------
  // Derived data: enrollments
  // -------------------------------------------------------------------------

  // Year-filtered enrollments: wasPaid = true (boolean) + año del startDate
  const enrollmentsForYear = useMemo(
    () =>
      enrollments.filter(
        (e) =>
          e.wasPaid === true &&
          parseYearFromStartDate(e.startDate) === selectedYear,
      ),
    [enrollments, selectedYear],
  );

  const totalEnrollments = useMemo(
    () => enrollmentsForYear.length,
    [enrollmentsForYear],
  );

  // All-time paid enrollments (for the location table)
  const allPaidEnrollments = useMemo(
    () => enrollments.filter((e) => e.wasPaid === true),
    [enrollments],
  );

  const totalAllPaidEnrollments = useMemo(
    () => allPaidEnrollments.length,
    [allPaidEnrollments],
  );

  const enrollmentsByLocation = useMemo<LocationEnrollment[]>(() => {
    const source = enrollmentsForYear.some((e) => e.course?.location?.name)
      ? enrollmentsForYear
      : allPaidEnrollments;

    const map = new Map<string, number>();
    source.forEach((e) => {
      const name = e.course?.location?.name;
      if (name) {
        map.set(name, (map.get(name) ?? 0) + 1);
      }
    });

    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [enrollmentsForYear, allPaidEnrollments]);

  // Sum of all location row counts — used as denominator for the % column
  const totalLocationEnrollments = useMemo(
    () => enrollmentsByLocation.reduce((acc, l) => acc + l.count, 0),
    [enrollmentsByLocation],
  );

  // Monthly enrollment counts for the bar chart (year-filtered)
  const monthlyEnrollmentCounts = useMemo(() => {
    const counts = Array(12).fill(0) as number[];
    enrollmentsForYear.forEach((e) => {
      const m = parseMonthFromStartDate(e.startDate);
      if (m !== null && m >= 1 && m <= 12) counts[m - 1]++;
    });
    return counts;
  }, [enrollmentsForYear]);

  // -------------------------------------------------------------------------
  // Derived data: sessions
  // -------------------------------------------------------------------------

  const sessionsForYear = useMemo(
    () =>
      sessions.filter((s) => {
        // Prefer the explicit year field; fall back to the date field (always required in schema)
        if (s.year != null) return String(s.year) === String(selectedYear);
        if (s.date) return s.date.startsWith(String(selectedYear));
        return false;
      }),
    [sessions, selectedYear],
  );

  const totalSessions = useMemo(() => sessionsForYear.length, [sessionsForYear]);

  const sessionsByStatus = useMemo<SessionStatusCount[]>(() => {
    const map = new Map<string, number>();

    // Bug fix: normalize status to uppercase before counting
    sessionsForYear.forEach((s) => {
      const st = (s.status ?? "UNKNOWN").toUpperCase();
      map.set(st, (map.get(st) ?? 0) + 1);
    });

    // Include all statuses found in the data, falling back to SESSION_STATUS_MAP for labels
    const result: SessionStatusCount[] = [];
    map.forEach((count, status) => {
      const meta = SESSION_STATUS_MAP[status] ?? {
        label: status,
        colorClass: "text-slate-500",
        bgClass: "bg-slate-100 border-slate-200",
      };
      result.push({ status, label: meta.label, count, colorClass: meta.colorClass, bgClass: meta.bgClass });
    });

    // Sort by known statuses first, then alphabetically
    const knownOrder = Object.keys(SESSION_STATUS_MAP);
    result.sort((a, b) => {
      const ai = knownOrder.indexOf(a.status);
      const bi = knownOrder.indexOf(b.status);
      if (ai === -1 && bi === -1) return a.status.localeCompare(b.status);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });

    return result;
  }, [sessionsForYear]);

  const monthlySessionCounts = useMemo(() => {
    const counts = Array(12).fill(0) as number[];
    sessionsForYear.forEach((s) => {
      // Prefer the explicit month field; fall back to parsing the date field
      let m = parseInt(s.month ?? "0", 10);
      if ((isNaN(m) || m < 1 || m > 12) && s.date) {
        const parts = s.date.split("-");
        if (parts.length >= 2) m = parseInt(parts[1], 10);
      }
      if (m >= 1 && m <= 12) counts[m - 1]++;
    });
    return counts;
  }, [sessionsForYear]);

  const completionRate = useMemo(() => {
    const completed = sessionsForYear.filter((s) => {
      const st = (s.status ?? "").toUpperCase();
      return st === "USED" || st === "RECOVERED";
    }).length;
    if (totalSessions === 0) return 0;
    return Math.round((completed / totalSessions) * 100);
  }, [sessionsForYear, totalSessions]);

  // Donut chart data for completion rate
  const completedCount = useMemo(
    () =>
      sessionsForYear.filter((s) => {
        const st = (s.status ?? "").toUpperCase();
        return st === "USED" || st === "RECOVERED";
      }).length,
    [sessionsForYear],
  );
  const notCompletedCount = useMemo(
    () => totalSessions - completedCount,
    [totalSessions, completedCount],
  );

  const colorScheme = useAppSelector(selectColorScheme);
  const darkMode = useAppSelector(selectDarkMode);

  const donutData: ChartData = useMemo(
    () => ({
      labels: ["Completadas", "No completadas"],
      datasets: [
        {
          data: [completedCount, notCompletedCount],
          backgroundColor: [getColor("primary", 0.8), getColor("danger", 0.5)],
          borderColor: [getColor("primary"), getColor("danger")],
          borderWidth: 1,
          hoverOffset: 4,
        },
      ],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [completedCount, notCompletedCount, colorScheme, darkMode],
  );

  const donutOptions: ChartOptions = useMemo(
    () => ({
      maintainAspectRatio: false,
      cutout: "70%",
      plugins: { legend: { display: false } },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [colorScheme, darkMode],
  );

  // -------------------------------------------------------------------------
  // Render helpers
  // -------------------------------------------------------------------------

  const yearOptions = useMemo(() => {
    const years = new Set<number>([2023, 2024, 2025, 2026]);
    enrollments.forEach((e) => {
      const y = parseInt((e.startDate ?? "").split("-")[0], 10);
      if (!isNaN(y) && y >= 2020) years.add(y);
    });
    return Array.from(years).sort((a, b) => b - a);
  }, [enrollments]);

  if (!rawData) {
    return (
      <div className="grid grid-cols-12 gap-y-10 gap-x-6">
        <div className="col-span-12">
          <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
            <p className="text-4xl font-medium">Dashboard Admin</p>
          </div>
          <div className="grid grid-cols-12 gap-5 mt-3.5">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="col-span-12 md:col-span-6 2xl:col-span-3 box box--stacked p-5 animate-pulse"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-darkmode-400" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 rounded bg-slate-200 dark:bg-darkmode-400 w-3/4" />
                    <div className="h-3 rounded bg-slate-200 dark:bg-darkmode-400 w-1/2" />
                  </div>
                </div>
                <div className="mt-5 h-24 rounded bg-slate-200 dark:bg-darkmode-400" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-span-12 p-6 box box--stacked">
        <div className="flex items-center gap-3 text-danger">
          <Lucide icon="AlertCircle" className="w-6 h-6" />
          <p className="font-medium">Error al cargar el dashboard: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-y-10 gap-x-6">

      {/* ------------------------------------------------------------------ */}
      {/* Header */}
      {/* ------------------------------------------------------------------ */}
      <div className="col-span-12">
        <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
          <p className="text-4xl font-medium group-[.mode--light]:text-white">
            Dashboard Admin
          </p>
          <div className="flex items-center gap-3 md:ml-auto">
            <Lucide
              icon="CalendarCheck2"
              className="w-4 h-4 text-slate-500 group-[.mode--light]:text-slate-200 stroke-[1.3]"
            />
            <FormSelect
              className="w-32 rounded-[0.5rem] group-[.mode--light]:bg-chevron-white group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              {yearOptions.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </FormSelect>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Row 1: KPI cards */}
        {/* ---------------------------------------------------------------- */}
        <div className="grid grid-cols-12 gap-5 mt-3.5">

          {/* Card 1: Total payments */}
          <div className="flex flex-col col-span-12 p-5 md:col-span-6 2xl:col-span-3 box box--stacked">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 border rounded-full border-primary/10 bg-primary/10">
                <Lucide icon="DollarSign" className="w-6 h-6 text-primary fill-primary/10" />
              </div>
              <div className="ml-4">
                <div className="text-base font-medium">{formatCLP(totalPaymentAmount)}</div>
                <div className="text-slate-500 mt-0.5 text-sm">
                  {totalPaymentCount} transacciones este ano
                </div>
              </div>
            </div>
            <div className="relative mt-5 mb-2">
              <MonthlyBarChart
                className="relative z-10"
                height={100}
                labels={MONTH_LABELS}
                data={monthlyPayments.map((m) => m.amount)}
                borderColor={getColor("primary")}
                backgroundColor={getColor("primary", 0.5)}
                hideYAxis={true}
              />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-5">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-primary/70" />
                <div className="ml-2.5 text-sm">Ingresos mensuales</div>
              </div>
            </div>
          </div>

          {/* Card 2: Paid enrollments */}
          <div className="flex flex-col col-span-12 p-5 md:col-span-6 2xl:col-span-3 box box--stacked">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 border rounded-full border-success/10 bg-success/10">
                <Lucide icon="ClipboardList" className="w-6 h-6 text-success fill-success/10" />
              </div>
              <div className="ml-4">
                <div className="text-base font-medium">{totalEnrollments}</div>
                <div className="text-slate-500 mt-0.5 text-sm">Inscripciones pagadas este ano</div>
              </div>
            </div>
            <div className="relative mt-5 mb-2">
              <MonthlyBarChart
                className="relative z-10"
                height={100}
                labels={MONTH_LABELS}
                data={monthlyEnrollmentCounts}
                borderColor={getColor("success")}
                backgroundColor={getColor("success", 0.5)}
              />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-5">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-success/70" />
                <div className="ml-2.5 text-sm">Inscripciones por mes</div>
              </div>
            </div>
          </div>

          {/* Card 3: Total sessions */}
          <div className="flex flex-col col-span-12 p-5 md:col-span-6 2xl:col-span-3 box box--stacked">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 border rounded-full border-warning/10 bg-warning/10">
                <Lucide icon="Activity" className="w-6 h-6 text-warning fill-warning/10" />
              </div>
              <div className="ml-4">
                <div className="text-base font-medium">{totalSessions}</div>
                <div className="text-slate-500 mt-0.5 text-sm">Sesiones registradas</div>
              </div>
            </div>
            <div className="relative mt-5 mb-2">
              <MonthlyBarChart
                className="relative z-10"
                height={100}
                labels={MONTH_LABELS}
                data={monthlySessionCounts}
                borderColor={getColor("warning")}
                backgroundColor={getColor("warning", 0.5)}
              />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-5">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-warning/70" />
                <div className="ml-2.5 text-sm">Sesiones por mes</div>
              </div>
            </div>
          </div>

          {/* Card 4: Completion rate */}
          <div className="flex flex-col col-span-12 p-5 md:col-span-6 2xl:col-span-3 box box--stacked">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 border rounded-full border-primary/10 bg-primary/10">
                <Lucide icon="Zap" className="w-6 h-6 text-primary fill-primary/10" />
              </div>
              <div className="ml-4">
                <div className="text-base font-medium">{completionRate}%</div>
                <div className="text-slate-500 mt-0.5 text-sm">Tasa de asistencia</div>
              </div>
            </div>
            <div className="relative mt-5 mb-2">
              <Chart
                type="doughnut"
                width="auto"
                height={100}
                data={donutData}
                options={donutOptions}
                className="relative z-10"
              />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-5">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-primary/70" />
                <div className="text-sm">Completadas</div>
                <div className="text-sm font-bold text-primary">{completedCount}</div>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-danger/70" />
                <div className="text-sm">No completadas</div>
                <div className="text-sm font-bold text-danger">{notCompletedCount}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Row 2: Sessions by status (full width) */}
      {/* ------------------------------------------------------------------ */}

      <div className="col-span-12">
        <div className="flex items-center mb-3">
          <Lucide icon="BarChart2" className="w-4 h-4 mr-2 text-slate-500 stroke-[1.3]" />
          <div className="text-base font-medium">Sesiones por estado</div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {sessionsByStatus.map((s) => (
            <div
              key={s.status}
              className={`flex flex-col items-center justify-center p-4 rounded-lg border ${s.bgClass}`}
            >
              <span className={`text-2xl font-bold ${s.colorClass}`}>{s.count}</span>
              <span className={`text-xs mt-1 font-medium ${s.colorClass}`}>{s.label}</span>
            </div>
          ))}
          <div
            className="flex flex-col items-center justify-center p-4 rounded-lg border border-[#ae5eab]"
            style={{ backgroundColor: "rgb(174 94 171 / 1)" }}
          >
            <span className="text-2xl font-bold text-white">
              {totalSessions}
            </span>
            <span className="text-xs mt-1 font-medium text-white/80">Total</span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Row 3: Enrollments by location — full width, pie left / table right */}
      {/* ------------------------------------------------------------------ */}

      <div className="col-span-12">
        <div className="flex items-center mb-3">
          <Lucide icon="MapPin" className="w-4 h-4 mr-2 text-slate-500 stroke-[1.3]" />
          <div className="text-base font-medium">
            Inscripciones pagadas por sede{" "}
            <span className="text-sm font-normal text-slate-400">({selectedYear})</span>
          </div>
        </div>
        <div className="box box--stacked">
          <div className="flex flex-col md:flex-row">
            {/* Pie chart — left */}
            <div className="flex items-center justify-center p-6 md:w-1/2 min-h-[350px] border-b md:border-b-0 md:border-r border-slate-100">
              {enrollmentsByLocation.length === 0 ? (
                <p className="text-slate-400 text-sm">Sin datos disponibles</p>
              ) : (
                <LocationPieChart
                  labels={enrollmentsByLocation.map((l) => l.name.toUpperCase())}
                  data={enrollmentsByLocation.map((l) => l.count)}
                />
              )}
            </div>
            {/* Table — right */}
            <div className="md:w-1/2 overflow-auto">
              <Table>
                <Table.Thead variant="light">
                  <Table.Tr>
                    <Table.Th className="whitespace-nowrap">Sede</Table.Th>
                    <Table.Th className="whitespace-nowrap text-right">Inscripciones</Table.Th>
                    <Table.Th className="whitespace-nowrap text-right">% del total</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {enrollmentsByLocation.length === 0 ? (
                    <Table.Tr>
                      <Table.Td colSpan={3} className="text-center text-slate-400 py-6">
                        Sin datos disponibles
                      </Table.Td>
                    </Table.Tr>
                  ) : (
                    enrollmentsByLocation.map((loc) => (
                      <Table.Tr key={loc.name}>
                        <Table.Td className="font-medium uppercase">{loc.name}</Table.Td>
                        <Table.Td className="text-right">{loc.count}</Table.Td>
                        <Table.Td className="text-right text-slate-500">
                          {totalLocationEnrollments > 0
                            ? `${Math.round((loc.count / totalLocationEnrollments) * 100)}%`
                            : "0%"}
                        </Table.Td>
                      </Table.Tr>
                    ))
                  )}
                </Table.Tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Row 4: Monthly payments — table left / bar chart right */}
      {/* ------------------------------------------------------------------ */}
      <div className="col-span-12">
        <div className="flex items-center mb-3">
          <Lucide icon="TrendingUp" className="w-4 h-4 mr-2 text-slate-500 stroke-[1.3]" />
          <div className="text-base font-medium">Ingresos mensuales (CLP)</div>
        </div>
        <div className="box box--stacked">
          <div className="flex flex-col md:flex-row">

            {/* Table — left */}
            <div className="md:w-1/2 overflow-auto border-b md:border-b-0 md:border-r border-slate-100">
              <Table>
                <Table.Thead variant="light">
                  <Table.Tr>
                    <Table.Th className="whitespace-nowrap">Mes</Table.Th>
                    <Table.Th className="whitespace-nowrap text-right">Transacciones</Table.Th>
                    <Table.Th className="whitespace-nowrap text-right">Monto Total</Table.Th>
                    <Table.Th className="whitespace-nowrap text-right">% del total</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {monthlyPayments.map((mp) => (
                    <Table.Tr key={mp.month}>
                      <Table.Td className="font-medium">{mp.label}</Table.Td>
                      <Table.Td className="text-right">
                        {mp.count > 0 ? (
                          <span className="font-medium text-primary">{mp.count}</span>
                        ) : (
                          <span className="text-slate-300">-</span>
                        )}
                      </Table.Td>
                      <Table.Td className="text-right">
                        {mp.amount > 0 ? (
                          <span className="font-medium">{formatCLP(mp.amount)}</span>
                        ) : (
                          <span className="text-slate-300">-</span>
                        )}
                      </Table.Td>
                      <Table.Td className="text-right text-slate-500">
                        {totalPaymentAmount > 0 && mp.amount > 0
                          ? `${Math.round((mp.amount / totalPaymentAmount) * 100)}%`
                          : "-"}
                      </Table.Td>
                    </Table.Tr>
                  ))}
                  <Table.Tr>
                    <Table.Td className="font-bold border-t-2 dark:border-darkmode-300">Total</Table.Td>
                    <Table.Td className="font-bold text-right border-t-2 dark:border-darkmode-300 text-primary">
                      {totalPaymentCount}
                    </Table.Td>
                    <Table.Td className="font-bold text-right border-t-2 dark:border-darkmode-300">
                      {formatCLP(totalPaymentAmount)}
                    </Table.Td>
                    <Table.Td className="text-right border-t-2 dark:border-darkmode-300 text-slate-500">
                      100%
                    </Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              </Table>
            </div>

            {/* Bar chart — right */}
            <div className="flex flex-col p-6 md:w-1/2 self-stretch">
              <div className="text-sm font-medium text-slate-500 mb-4">Ingresos por mes (CLP)</div>
              <div className="flex-1 relative min-h-[300px]">
                <MonthlyBarChart
                  className="absolute inset-0"
                  height="auto"
                  labels={MONTH_LABELS}
                  data={monthlyPayments.map((m) => m.amount)}
                  borderColor={getColor("primary")}
                  backgroundColor={getColor("primary", 0.5)}
                />
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

export default Main;
