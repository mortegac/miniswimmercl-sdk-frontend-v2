import { useState, useCallback, useRef } from "react";
import Table from "@/components/Base/Table";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import LoadingIcon from "@/components/Base/LoadingIcon";
import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import {
  selectGmailInbox,
  getGmailInboxPage,
  triggerSync,
} from "@/stores/GmailInbox/slice";
import { formatDateUTC } from "@/utils/helper";
import type { GmailInbox } from "@/stores/GmailInbox/types";
import { EmailDetailSlideover } from "../StudentProfile/components/EmailDetailSlideover";

function toDatetimeLocal(isoString: string): string {
  return isoString.slice(0, 16);
}

function toISOFromLocal(localDatetime: string): string {
  return new Date(localDatetime).toISOString();
}

function defaultDateFrom(): string {
  const d = new Date();
  d.setDate(d.getDate() - 30);
  return toDatetimeLocal(d.toISOString());
}

function defaultDateTo(): string {
  return toDatetimeLocal(new Date().toISOString());
}

export default function GmailInboxAdmin() {
  const dispatch = useAppDispatch();
  const { adminStatus, adminEmails, adminNextToken, adminErrorMessage, syncStatus } =
    useAppSelector(selectGmailInbox);

  const [dateFrom, setDateFrom] = useState(defaultDateFrom);
  const [dateTo, setDateTo] = useState(defaultDateTo);
  const [searchText, setSearchText] = useState("");
  const [selectedEmail, setSelectedEmail] = useState<GmailInbox | null>(null);
  const [slideoverOpen, setSlideoverOpen] = useState(false);

  // Historial de nextTokens: tokenPages[0] = null (primera página),
  // tokenPages[N] = token para cargar la página N
  const [tokenPages, setTokenPages] = useState<(string | null)[]>([null]);
  const [pageIdx, setPageIdx] = useState(0);

  // Filtros activos en la última búsqueda (para navegación entre páginas)
  const activeFilters = useRef({ dateFrom: defaultDateFrom(), dateTo: defaultDateTo(), searchText: "" });

  const pendingRef = useRef(false);

  const isLoading = adminStatus === "loading";
  const isSyncing = syncStatus === "syncing";

  const fetchPage = useCallback(
    (token: string | null, filters?: { dateFrom: string; dateTo: string; searchText: string }) => {
      if (pendingRef.current || isLoading) return;
      pendingRef.current = true;
      const f = filters ?? activeFilters.current;
      dispatch(
        getGmailInboxPage({
          dateFrom: toISOFromLocal(f.dateFrom),
          dateTo: toISOFromLocal(f.dateTo),
          searchText: f.searchText.trim() || undefined,
          nextToken: token,
        })
      ).finally(() => {
        pendingRef.current = false;
      });
    },
    [dispatch, isLoading]
  );

  const handleSearch = useCallback(() => {
    const filters = { dateFrom, dateTo, searchText };
    activeFilters.current = filters;
    // reset historial al buscar
    setTokenPages([null]);
    setPageIdx(0);
    fetchPage(null, filters);
  }, [dateFrom, dateTo, searchText, fetchPage]);

  const handleNextPage = useCallback(() => {
    if (!adminNextToken || isLoading) return;
    const nextIdx = pageIdx + 1;
    // guardar token si aún no está en el historial
    setTokenPages((prev) => {
      const updated = [...prev];
      updated[nextIdx] = adminNextToken;
      return updated;
    });
    setPageIdx(nextIdx);
    fetchPage(adminNextToken);
  }, [adminNextToken, isLoading, pageIdx, fetchPage]);

  const handlePrevPage = useCallback(() => {
    if (pageIdx === 0 || isLoading) return;
    const prevIdx = pageIdx - 1;
    setPageIdx(prevIdx);
    fetchPage(tokenPages[prevIdx] ?? null);
  }, [pageIdx, isLoading, tokenPages, fetchPage]);

  const handleGoToPage = useCallback(
    (idx: number) => {
      if (isLoading || idx === pageIdx || !tokenPages[idx] && idx !== 0) return;
      setPageIdx(idx);
      fetchPage(tokenPages[idx] ?? null);
    },
    [isLoading, pageIdx, tokenPages, fetchPage]
  );

  const handleSync = useCallback(() => {
    if (pendingRef.current || isSyncing || isLoading) return;
    pendingRef.current = true;
    dispatch(triggerSync()).finally(() => {
      pendingRef.current = false;
      handleSearch();
    });
  }, [dispatch, isSyncing, isLoading, handleSearch]);

  const handleOpenEmail = useCallback((email: GmailInbox) => {
    setSelectedEmail(email);
    setSlideoverOpen(true);
  }, []);

  const handleCloseEmail = useCallback(() => {
    setSlideoverOpen(false);
  }, []);

  const handleReplySent = useCallback(() => {
    setSlideoverOpen(false);
    handleSearch();
  }, [handleSearch]);

  // Páginas conocidas = índices del historial con token guardado
  const knownPages = tokenPages.length; // páginas 1..knownPages visitadas o previstas
  const hasNext = !!adminNextToken && !isLoading;
  const hasPrev = pageIdx > 0 && !isLoading;

  return (
    <div className="mt-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-semibold text-slate-700">Emails Apoderados</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Bandeja de entrada completa de todas las cuentas Gmail
          </p>
        </div>
        <Button
          variant="outline-secondary"
          size="sm"
          disabled={isSyncing || isLoading}
          onClick={handleSync}
        >
          <Lucide
            icon="RefreshCw"
            className={`w-3.5 h-3.5 mr-1.5 ${isSyncing ? "animate-spin" : ""}`}
          />
          {isSyncing ? "Sincronizando..." : "Sincronizar Gmail"}
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col p-5 box mb-5">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-500 font-medium">Desde</label>
            <input
              type="datetime-local"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="border border-slate-200 rounded-md px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-theme-1 focus:border-theme-1"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-500 font-medium">Hasta</label>
            <input
              type="datetime-local"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="border border-slate-200 rounded-md px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-theme-1 focus:border-theme-1"
            />
          </div>
          <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
            <label className="text-xs text-slate-500 font-medium">
              Buscar (De / Para / Nombre)
            </label>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Ej: saraskarina@gmail.com"
              className="border border-slate-200 rounded-md px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-theme-1 focus:border-theme-1"
            />
          </div>
          <Button
            variant="primary"
            size="sm"
            disabled={isLoading || isSyncing}
            onClick={handleSearch}
          >
            <Lucide icon="Search" className="w-3.5 h-3.5 mr-1.5" />
            Buscar
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="p-5 box">
        {isLoading && (
          <div className="flex justify-center items-center h-40">
            <LoadingIcon color="purple" icon="three-dots" className="w-10 h-10" />
          </div>
        )}

        {adminStatus === "failed" && (
          <p className="text-danger text-sm">{adminErrorMessage}</p>
        )}

        {!isLoading && adminStatus === "idle" && adminEmails.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <Lucide icon="Inbox" className="w-14 h-14 text-slate-200 stroke-[0.5]" />
            <p className="mt-3 text-slate-400">Usa los filtros para buscar emails.</p>
          </div>
        )}

        {!isLoading && adminStatus === "idle" && adminEmails.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-400">
                {adminEmails.length} email{adminEmails.length !== 1 ? "s" : ""} — página {pageIdx + 1}
                {!hasNext && " (última)"}
              </span>
              <ServerPagination
                pageIdx={pageIdx}
                knownPages={knownPages}
                hasNext={hasNext}
                hasPrev={hasPrev}
                onPrev={handlePrevPage}
                onNext={handleNextPage}
                onGoTo={handleGoToPage}
              />
            </div>

            <div className="w-full overflow-x-auto">
              <Table className="border-b border-slate-200/60 w-full">
                <Table.Thead>
                  <Table.Tr>
                    <Table.Td className="py-4 font-medium text-left border-t bg-slate-50 border-slate-200/60 text-slate-500 whitespace-nowrap">Fecha</Table.Td>
                    <Table.Td className="py-4 font-medium text-left border-t bg-slate-50 border-slate-200/60 text-slate-500">Asunto</Table.Td>
                    <Table.Td className="py-4 font-medium text-left border-t bg-slate-50 border-slate-200/60 text-slate-500 whitespace-nowrap">De</Table.Td>
                    <Table.Td className="py-4 font-medium text-left border-t bg-slate-50 border-slate-200/60 text-slate-500">Para</Table.Td>
                    <Table.Td className="py-4 font-medium text-left border-t bg-slate-50 border-slate-200/60 text-slate-500 whitespace-nowrap">Cuenta</Table.Td>
                    <Table.Td className="py-4 font-medium text-left border-t bg-slate-50 border-slate-200/60 text-slate-500">Leído</Table.Td>
                    <Table.Td className="py-4 font-medium text-left border-t bg-slate-50 border-slate-200/60 text-slate-500">Extracto</Table.Td>
                    <Table.Td className="py-4 border-t bg-slate-50 border-slate-200/60" />
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {adminEmails.map((item, index) => (
                    <Table.Tr key={item.id || index} className="[&_td]:last:border-b-0">
                      <Table.Td className="py-4 border-dashed whitespace-nowrap">
                        <span className="text-sm">{formatDateUTC(item.dateSent)}</span>
                      </Table.Td>
                      <Table.Td className="py-4 border-dashed" style={{ minWidth: 180, maxWidth: 220 }}>
                        <span className="text-sm font-medium line-clamp-2">{item.subject || "—"}</span>
                      </Table.Td>
                      <Table.Td className="py-4 border-dashed whitespace-nowrap">
                        <span className="text-sm text-slate-500">{item.fromName || item.fromEmail || "—"}</span>
                      </Table.Td>
                      <Table.Td className="py-4 border-dashed" style={{ minWidth: 160, maxWidth: 200 }}>
                        <span className="text-xs text-slate-400 line-clamp-1">
                          {(item.toEmails ?? []).join(", ") || "—"}
                        </span>
                      </Table.Td>
                      <Table.Td className="py-4 border-dashed whitespace-nowrap">
                        <span className="text-xs text-slate-400">{item.gmailAccount}</span>
                      </Table.Td>
                      <Table.Td className="py-4 border-dashed">
                        {item.isRead ? (
                          <Lucide icon="CheckCheck" className="w-4 h-4 text-green-500" />
                        ) : (
                          <Lucide icon="Circle" className="w-4 h-4 text-slate-300" />
                        )}
                      </Table.Td>
                      <Table.Td className="py-4 border-dashed" style={{ minWidth: 200, maxWidth: 280 }}>
                        <span className="text-xs text-slate-400 line-clamp-2">{item.snippet || "—"}</span>
                      </Table.Td>
                      <Table.Td className="py-4 border-dashed text-right whitespace-nowrap">
                        <Button variant="outline-secondary" size="sm" onClick={() => handleOpenEmail(item)}>
                          <Lucide icon="Eye" className="w-3.5 h-3.5 mr-1" />
                          Ver
                        </Button>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </div>

            <div className="flex justify-center mt-5">
              <ServerPagination
                pageIdx={pageIdx}
                knownPages={knownPages}
                hasNext={hasNext}
                hasPrev={hasPrev}
                onPrev={handlePrevPage}
                onNext={handleNextPage}
                onGoTo={handleGoToPage}
              />
            </div>
          </>
        )}
      </div>

      <EmailDetailSlideover
        email={selectedEmail}
        open={slideoverOpen}
        onClose={handleCloseEmail}
        onReplySent={handleReplySent}
      />
    </div>
  );
}

/* ── ServerPagination ──────────────────────────────────────────────────────── */
interface ServerPaginationProps {
  pageIdx: number;       // índice actual (0-based)
  knownPages: number;    // cantidad de páginas en el historial
  hasNext: boolean;
  hasPrev: boolean;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (idx: number) => void;
}

function ServerPagination({ pageIdx, knownPages, hasNext, hasPrev, onPrev, onNext, onGoTo }: ServerPaginationProps) {
  const btnBase =
    "flex items-center justify-center w-8 h-8 rounded border text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed";

  // Mostrar botones numerados para las páginas ya visitadas
  const visitedPages = Array.from({ length: knownPages }, (_, i) => i);

  return (
    <div className="flex items-center gap-1">
      <button
        disabled={!hasPrev}
        onClick={onPrev}
        className={`${btnBase} border-slate-200 text-slate-500 hover:bg-slate-50`}
      >
        <Lucide icon="ChevronLeft" className="w-4 h-4" />
      </button>

      {visitedPages.map((idx) => (
        <button
          key={idx}
          onClick={() => onGoTo(idx)}
          className={`${btnBase} ${
            idx === pageIdx
              ? "bg-theme-1 border-theme-1 text-white"
              : "border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          {idx + 1}
        </button>
      ))}

      {hasNext && (
        <button
          onClick={onNext}
          className={`${btnBase} border-slate-200 text-slate-600 hover:bg-slate-50`}
        >
          {knownPages + 1}
        </button>
      )}

      <button
        disabled={!hasNext}
        onClick={onNext}
        className={`${btnBase} border-slate-200 text-slate-500 hover:bg-slate-50`}
      >
        <Lucide icon="ChevronRight" className="w-4 h-4" />
      </button>
    </div>
  );
}
