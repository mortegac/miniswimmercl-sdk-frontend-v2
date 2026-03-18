import { useState, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import emailjs, { init } from "emailjs-com";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("es");
dayjs.tz.setDefault("America/Santiago");

const EMAILJS_SERVICE = "service_ucb8wga";
const EMAILJS_TEMPLATE_EVALUACION = "template_evaluacion";
init("Csc41asZklkk5HTWk");

import { FormCheck, FormLabel, FormInput } from "@/components/Base/Form";
import Lucide from "@/components/Base/Lucide";
import { Slideover } from "@/components/Base/Headless";
import Button from "@/components/Base/Button";
import LoadingIcon from "@/components/Base/LoadingIcon";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import {
  getStudentEvaluations,
  createStudentEvaluationThunk,
  updateStudentEvaluationThunk,
  deleteStudentEvaluationThunk,
  selectStudentEvaluations,
} from "@/stores/StudentEvaluations/slice";
import { getEvaluationLevel, selectEvaluations } from "@/stores/Evaluations/slice";
import { selectAuth } from "@/stores/Users/slice";

// ── types ────────────────────────────────────────────────────────
type ObjectiveRow = {
  evaluationObjectiveId: string;
  texto: string;
  isMandatory: boolean;
  wasAchieved: boolean;
};

type DetailRow = {
  id: string;
  wasAchieved: boolean;
  texto: string;
  isMandatory: boolean;
  evaluationObjectiveId: string;
};

// ── helpers ──────────────────────────────────────────────────────
function buildObjectivesText(details: DetailRow[]): string {
  return details
    .map((d) => `${d.wasAchieved ? "✅" : "❌"} ${d.texto}${d.isMandatory ? " (Obligatorio)" : ""}`)
    .join("\n");
}

// ── NuevaEvaluacionForm ──────────────────────────────────────────
function NuevaEvaluacionForm({
  studentId,
  studentBirthdate,
  onClose,
  onSaved,
}: {
  studentId: string;
  studentBirthdate?: string;
  onClose: () => void;
  onSaved: () => void;
}) {
  const dispatch = useAppDispatch();
  const { evaluationLevels } = useAppSelector(selectEvaluations);
  const { status } = useAppSelector(selectStudentEvaluations);
  const { id: authId, emailAuth } = useAppSelector(selectAuth);
  const userId = authId || emailAuth;

  const [selectedLevelId, setSelectedLevelId] = useState("");
  const [selectedLevelIcon, setSelectedLevelIcon] = useState("");
  const [selectedLevelDescription, setSelectedLevelDescription] = useState("");
  const [objectives, setObjectives] = useState<ObjectiveRow[]>([]);
  const [observations, setObservations] = useState("");
  const [sessionsCarriedOut, setSessionsCarriedOut] = useState(0);
  const [wasApproved, setWasApproved] = useState(false);
  const [previousLevel, setPreviousLevel] = useState("");
  const [saveError, setSaveError] = useState<string | null>(null);

  const age = studentBirthdate
    ? Math.floor(dayjs().diff(dayjs(studentBirthdate), "month") / 12)
    : 0;

  const sortedLevels = Array.isArray(evaluationLevels)
    ? [...evaluationLevels].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    : [];

  const handleSelectLevel = (levelId: string) => {
    setSelectedLevelId(levelId);
    const level = sortedLevels.find((l) => l.id === levelId);
    setSelectedLevelIcon(level?.ico || "");
    setSelectedLevelDescription(level?.description || "");
    setObjectives(
      (level?.evaluationObjectives?.items || [])
        .filter((o: any) => o.isActive !== false)
        .map((o: any) => ({
          evaluationObjectiveId: o.id,
          texto: o.texto,
          isMandatory: o.isMandatory,
          wasAchieved: false,
        }))
    );
    setWasApproved(false);
  };

  const toggleAchieved = (idx: number) => {
    setObjectives((prev) => {
      const updated = prev.map((o, i) => (i === idx ? { ...o, wasAchieved: !o.wasAchieved } : o));
      const mandatory = updated.filter((o) => o.isMandatory);
      setWasApproved(mandatory.length > 0 && mandatory.every((o) => o.wasAchieved));
      return updated;
    });
  };

  const handleSave = async () => {
    if (!selectedLevelId) return;
    setSaveError(null);
    try {
      await dispatch(
        createStudentEvaluationThunk({
          studentId,
          evaluationLevelId: selectedLevelId,
          evaluationIcon: selectedLevelIcon,
          evaluationDescription: selectedLevelDescription,
          userId,
          date: new Date().toISOString(),
          age,
          wasApproved,
          observations,
          previousLevel,
          sessionsCarriedOut: Number(sessionsCarriedOut),
          objectives: objectives.map((o) => ({
            evaluationObjectiveId: o.evaluationObjectiveId,
            wasAchieved: o.wasAchieved,
          })),
        })
      ).unwrap();
      onSaved();
    } catch (err: any) {
      setSaveError(typeof err === "string" ? err : err?.message || JSON.stringify(err));
    }
  };

  const isLoading = status === "loading";
  const achievedCount = objectives.filter((o) => o.wasAchieved).length;
  const mandatoryTotal = objectives.filter((o) => o.isMandatory).length;
  const mandatoryAchieved = objectives.filter((o) => o.isMandatory && o.wasAchieved).length;

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-5 border-b border-slate-200">
        <h2 className="text-xl font-medium">Nueva Evaluación</h2>
        <p className="text-sm text-slate-500 mt-1">Selecciona un nivel y marca los objetivos logrados</p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
        <div>
          <FormLabel>Nivel de evaluación *</FormLabel>
          <div className="flex flex-wrap gap-3 mt-2">
            {sortedLevels.map((level: any) => (
              <button
                key={level.id}
                type="button"
                onClick={() => handleSelectLevel(level.id)}
                className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all w-28 text-center
                  ${selectedLevelId === level.id ? "border-primary bg-primary/10 shadow" : "border-slate-200 hover:border-slate-300 bg-white"}`}
              >
                {level.ico && <img src={level.ico} alt={level.name} className="w-14 h-14 object-contain mb-1" />}
                <span className="text-xs font-medium uppercase leading-tight">{level.name}</span>
              </button>
            ))}
          </div>
        </div>

        {selectedLevelId && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <FormLabel className="mb-0">Objetivos del nivel</FormLabel>
              <span className="text-xs text-slate-500">
                {achievedCount}/{objectives.length} logrados
                {mandatoryTotal > 0 && (
                  <span className="ml-2 text-red-500">({mandatoryAchieved}/{mandatoryTotal} obligatorios)</span>
                )}
              </span>
            </div>
            <div className="space-y-2">
              {objectives.map((obj, idx) => (
                <button
                  key={obj.evaluationObjectiveId}
                  type="button"
                  onClick={() => toggleAchieved(idx)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border text-left transition-all
                    ${obj.wasAchieved ? "border-green-300 bg-green-50" : "border-slate-200 bg-white hover:bg-slate-50"}`}
                >
                  <div className={`flex-shrink-0 w-6 h-6 rounded flex items-center justify-center border-2 transition-all
                    ${obj.wasAchieved ? "bg-green-500 border-green-500" : "border-slate-300 bg-white"}`}>
                    {obj.wasAchieved && <Lucide icon="Check" className="w-3.5 h-3.5 text-white stroke-[2.5]" />}
                  </div>
                  <span className={`flex-1 text-sm ${obj.wasAchieved ? "text-green-800" : "text-slate-700"}`}>{obj.texto}</span>
                  {obj.isMandatory && (
                    <span className="flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200">Obligatorio</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedLevelId && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FormLabel htmlFor="nv-sessions">Sesiones realizadas</FormLabel>
                <FormInput id="nv-sessions" type="number" min={0} value={sessionsCarriedOut}
                  onChange={(e) => setSessionsCarriedOut(Number(e.target.value))} />
              </div>
              <div>
                <FormLabel htmlFor="nv-prev">Nivel anterior</FormLabel>
                <FormInput id="nv-prev" type="text" value={previousLevel}
                  onChange={(e) => setPreviousLevel(e.target.value)} placeholder="ej: Nivel 1" />
              </div>
            </div>
            <div>
              <FormLabel htmlFor="nv-obs">Observaciones</FormLabel>
              <textarea id="nv-obs" rows={4} value={observations}
                onChange={(e) => setObservations(e.target.value)}
                placeholder="Comentarios sobre el desempeño del alumno..."
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none" />
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-slate-200 bg-slate-50">
              <FormCheck.Input id="nv-approved" type="checkbox" checked={wasApproved}
                onChange={(e) => setWasApproved(e.target.checked)} className="w-5 h-5 cursor-pointer" />
              <FormLabel htmlFor="nv-approved" className="mb-0 cursor-pointer font-medium">Alumno aprobó el nivel</FormLabel>
            </div>
          </div>
        )}
      </div>

      {saveError && (
        <div className="mx-6 mb-2 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          <strong>Error:</strong> {saveError}
        </div>
      )}

      <div className="px-6 py-4 border-t border-slate-200 flex gap-3">
        <Button type="button" variant="outline-secondary" className="flex-1" onClick={onClose}>Cancelar</Button>
        <Button type="button" variant="primary" className="flex-1" disabled={!selectedLevelId || isLoading} onClick={handleSave}>
          {isLoading
            ? <span className="flex items-center gap-2"><Lucide icon="Loader" className="w-4 h-4 animate-spin" />Guardando...</span>
            : <span className="flex items-center gap-2"><Lucide icon="CheckSquare" className="w-4 h-4" />Grabar Evaluación</span>
          }
        </Button>
      </div>
    </div>
  );
}

// ── EditEvaluacionForm ───────────────────────────────────────────
function EditEvaluacionForm({
  evaluation,
  studentName,
  studentEmail,
  onClose,
  onSaved,
}: {
  evaluation: any;
  studentName: string;
  studentEmail: string;
  onClose: () => void;
  onSaved: () => void;
}) {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(selectStudentEvaluations);

  const rawDetails: DetailRow[] = (evaluation?.studentEvaluationsDetails?.items || []).map((d: any) => ({
    id: d.id,
    wasAchieved: d.wasAchieved ?? false,
    texto: d?.evaluationObjective?.texto || "",
    isMandatory: d?.evaluationObjective?.isMandatory ?? false,
    evaluationObjectiveId: d.evaluationObjectiveId,
  }));

  const [details, setDetails] = useState<DetailRow[]>(rawDetails);
  const [observations, setObservations] = useState(evaluation?.observations || "");
  const [sessionsCarriedOut, setSessionsCarriedOut] = useState(evaluation?.sessionsCarriedOut ?? 0);
  const [wasApproved, setWasApproved] = useState(evaluation?.wasApproved ?? false);
  const [previousLevel, setPreviousLevel] = useState(evaluation?.previousLevel || "");
  const [sendEmail, setSendEmail] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [emailSending, setEmailSending] = useState(false);

  const toggleDetail = (idx: number) => {
    setDetails((prev) => {
      const updated = prev.map((d, i) => (i === idx ? { ...d, wasAchieved: !d.wasAchieved } : d));
      const mandatory = updated.filter((d) => d.isMandatory);
      setWasApproved(mandatory.length > 0 && mandatory.every((d) => d.wasAchieved));
      return updated;
    });
  };

  const handleSave = async () => {
    setSaveError(null);
    try {
      await dispatch(
        updateStudentEvaluationThunk({
          id: evaluation.id,
          wasApproved,
          observations,
          previousLevel,
          sessionsCarriedOut: Number(sessionsCarriedOut),
          details: details.map((d) => ({ id: d.id, wasAchieved: d.wasAchieved })),
        })
      ).unwrap();

      if (sendEmail) {
        await handleSendEmail();
      }

      onSaved();
    } catch (err: any) {
      setSaveError(typeof err === "string" ? err : err?.message || JSON.stringify(err));
    }
  };

  const handleSendEmail = async () => {
    setEmailSending(true);
    const levelName = evaluation?.evaluationLevel?.name || "";
    const levelDescription = evaluation?.evaluationLevel?.description || "";
    const objectivesText = buildObjectivesText(details);
    const approvedText = wasApproved ? "✅ APROBADO" : "⏳ En proceso";

    const templateParams = {
      to_email: studentEmail,
      to_name: studentName,
      student_name: studentName,
      level_name: levelName,
      level_description: levelDescription,
      evaluation_date: dayjs(evaluation?.date).format("DD [de] MMMM [de] YYYY"),
      was_approved: approvedText,
      observations: observations || "Sin observaciones",
      objectives_list: objectivesText,
      sessions_carried_out: String(sessionsCarriedOut),
    };

    try {
      await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE_EVALUACION, templateParams);
      console.log(">>> Email de evaluación enviado >>>", templateParams);
    } catch (err) {
      console.error(">>> Error enviando email de evaluación >>>", err);
      throw new Error("La evaluación se guardó pero hubo un error al enviar el email.");
    } finally {
      setEmailSending(false);
    }
  };

  const isLoading = status === "loading" || emailSending;
  const achievedCount = details.filter((d) => d.wasAchieved).length;
  const mandatoryTotal = details.filter((d) => d.isMandatory).length;
  const mandatoryAchieved = details.filter((d) => d.isMandatory && d.wasAchieved).length;

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-5 border-b border-slate-200">
        <div className="flex items-center gap-3">
          {evaluation?.evaluationLevel?.ico && (
            <img src={evaluation.evaluationLevel.ico} className="w-10 h-10 object-contain" alt="" />
          )}
          <div>
            <h2 className="text-xl font-medium">Editar Evaluación</h2>
            <p className="text-sm text-slate-500">{evaluation?.evaluationLevel?.name} · {dayjs(evaluation?.date).format("DD MMM YYYY")}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
        {/* Objectives */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <FormLabel className="mb-0">Objetivos</FormLabel>
            <span className="text-xs text-slate-500">
              {achievedCount}/{details.length} logrados
              {mandatoryTotal > 0 && (
                <span className="ml-2 text-red-500">({mandatoryAchieved}/{mandatoryTotal} obligatorios)</span>
              )}
            </span>
          </div>
          <div className="space-y-2">
            {details.map((d, idx) => (
              <button
                key={d.id}
                type="button"
                onClick={() => toggleDetail(idx)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border text-left transition-all
                  ${d.wasAchieved ? "border-green-300 bg-green-50" : "border-slate-200 bg-white hover:bg-slate-50"}`}
              >
                <div className={`flex-shrink-0 w-6 h-6 rounded flex items-center justify-center border-2 transition-all
                  ${d.wasAchieved ? "bg-green-500 border-green-500" : "border-slate-300 bg-white"}`}>
                  {d.wasAchieved && <Lucide icon="Check" className="w-3.5 h-3.5 text-white stroke-[2.5]" />}
                </div>
                <span className={`flex-1 text-sm ${d.wasAchieved ? "text-green-800" : "text-slate-700"}`}>{d.texto}</span>
                {d.isMandatory && (
                  <span className="flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200">Obligatorio</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Fields */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <FormLabel htmlFor="ev-sessions">Sesiones realizadas</FormLabel>
              <FormInput id="ev-sessions" type="number" min={0} value={sessionsCarriedOut}
                onChange={(e) => setSessionsCarriedOut(Number(e.target.value))} />
            </div>
            <div>
              <FormLabel htmlFor="ev-prev">Nivel anterior</FormLabel>
              <FormInput id="ev-prev" type="text" value={previousLevel}
                onChange={(e) => setPreviousLevel(e.target.value)} />
            </div>
          </div>
          <div>
            <FormLabel htmlFor="ev-obs">Observaciones</FormLabel>
            <textarea id="ev-obs" rows={4} value={observations}
              onChange={(e) => setObservations(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none" />
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-slate-200 bg-slate-50">
            <FormCheck.Input id="ev-approved" type="checkbox" checked={wasApproved}
              onChange={(e) => setWasApproved(e.target.checked)} className="w-5 h-5 cursor-pointer" />
            <FormLabel htmlFor="ev-approved" className="mb-0 cursor-pointer font-medium">Alumno aprobó el nivel</FormLabel>
          </div>
        </div>

        {/* Send email */}
        <div className={`flex items-start gap-3 px-4 py-4 rounded-xl border-2 transition-all cursor-pointer
          ${sendEmail ? "border-blue-400 bg-blue-50" : "border-slate-200 bg-white hover:border-slate-300"}`}
          onClick={() => setSendEmail(!sendEmail)}
        >
          <div className={`flex-shrink-0 w-6 h-6 rounded flex items-center justify-center border-2 mt-0.5 transition-all
            ${sendEmail ? "bg-blue-500 border-blue-500" : "border-slate-300 bg-white"}`}>
            {sendEmail && <Lucide icon="Check" className="w-3.5 h-3.5 text-white stroke-[2.5]" />}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-800">Enviar email al apoderado</p>
            <p className="text-xs text-slate-500 mt-0.5">
              Se enviará un resumen de la evaluación a <strong>{studentEmail || "email no disponible"}</strong>
            </p>
          </div>
          <Lucide icon="Mail" className={`w-5 h-5 mt-0.5 ${sendEmail ? "text-blue-500" : "text-slate-300"}`} />
        </div>
      </div>

      {saveError && (
        <div className="mx-6 mb-2 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          <strong>Error:</strong> {saveError}
        </div>
      )}

      <div className="px-6 py-4 border-t border-slate-200 flex gap-3">
        <Button type="button" variant="outline-secondary" className="flex-1" onClick={onClose}>Cancelar</Button>
        <Button type="button" variant="primary" className="flex-1" disabled={isLoading} onClick={handleSave}>
          {isLoading
            ? <span className="flex items-center gap-2"><Lucide icon="Loader" className="w-4 h-4 animate-spin" />{emailSending ? "Enviando email..." : "Guardando..."}</span>
            : <span className="flex items-center gap-2">
                <Lucide icon={sendEmail ? "Mail" : "Save"} className="w-4 h-4" />
                {sendEmail ? "Guardar y enviar email" : "Guardar cambios"}
              </span>
          }
        </Button>
      </div>
    </div>
  );
}

// ── EvaluationCard ───────────────────────────────────────────────
function EvaluationCard({
  item,
  onEdit,
  onDelete,
}: {
  item: any;
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const details = item?.studentEvaluationsDetails?.items || [];
  const achieved = details.filter((d: any) => d.wasAchieved).length;

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden mb-4">
      {/* Header row */}
      <div className="flex items-center gap-4 px-5 py-4">
        <button type="button" onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-4 flex-1 text-left hover:bg-slate-50 transition-colors rounded-lg -mx-2 px-2 py-1">
          {item?.evaluationLevel?.ico && (
            <img src={item.evaluationLevel.ico} alt={item.evaluationLevel.name} className="w-12 h-12 object-contain flex-shrink-0" />
          )}
          <div className="flex-1 min-w-0">
            <p className="font-medium uppercase">{item?.evaluationLevel?.name}</p>
            <div className="flex items-center gap-3 mt-0.5">
              <span className="text-xs text-slate-400">{dayjs(item?.date).format("DD MMM YYYY")}</span>
              {item?.user?.name && <span className="text-xs text-slate-400">· {item.user.name}</span>}
              <span className="text-xs text-slate-400">· {achieved}/{details.length} objetivos</span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {item?.wasApproved ? (
              <span className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
                <Lucide icon="CheckCircle" className="w-3.5 h-3.5" />Aprobado
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                <Lucide icon="Clock" className="w-3.5 h-3.5" />En proceso
              </span>
            )}
            <Lucide icon={expanded ? "ChevronUp" : "ChevronDown"} className="w-4 h-4 text-slate-400" />
          </div>
        </button>

        {/* Actions */}
        <div className="flex gap-1 flex-shrink-0 ml-2">
          <button type="button" onClick={() => onEdit(item)}
            title="Editar evaluación"
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors">
            <Lucide icon="Pencil" className="w-4 h-4" />
          </button>
          <button type="button" onClick={() => onDelete(item)}
            title="Eliminar evaluación"
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
            <Lucide icon="Trash2" className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="border-t border-slate-100 px-5 py-4 bg-slate-50/60">
          <div className="space-y-2 mb-4">
            {details.map((d: any, i: number) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`flex-shrink-0 w-5 h-5 rounded flex items-center justify-center
                  ${d.wasAchieved ? "bg-green-500" : "bg-slate-200"}`}>
                  {d.wasAchieved
                    ? <Lucide icon="Check" className="w-3 h-3 text-white stroke-[2.5]" />
                    : <Lucide icon="X" className="w-3 h-3 text-slate-400 stroke-[2]" />
                  }
                </div>
                <span className="text-sm flex-1">{d?.evaluationObjective?.texto}</span>
                {d?.evaluationObjective?.isMandatory && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-red-50 text-red-600">Obligatorio</span>
                )}
              </div>
            ))}
          </div>
          {item?.observations && (
            <div className="mt-3 p-3 bg-white rounded-lg border border-slate-200">
              <p className="text-xs font-medium text-slate-500 mb-1">Observaciones</p>
              <p className="text-sm text-slate-700">{item.observations}</p>
            </div>
          )}
          {(item?.sessionsCarriedOut > 0 || item?.previousLevel) && (
            <div className="flex gap-4 mt-2 text-xs text-slate-500">
              {item?.sessionsCarriedOut > 0 && <span>Sesiones: {item.sessionsCarriedOut}</span>}
              {item?.previousLevel && <span>Nivel anterior: {item.previousLevel}</span>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main exported component ──────────────────────────────────────
export function EvaluacionesPage({
  studentId,
  studentBirthdate,
  studentName,
  studentEmail,
  onStudentUpdated,
}: {
  studentId: string;
  studentBirthdate?: string;
  studentName?: string;
  studentEmail?: string;
  onStudentUpdated?: () => void;
}) {
  const dispatch = useAppDispatch();
  const { status, studentEvaluations } = useAppSelector(selectStudentEvaluations);

  type SlideoverMode = "create" | "edit" | null;
  const [slideoverMode, setSlideoverMode] = useState<SlideoverMode>(null);
  const [selectedEvaluation, setSelectedEvaluation] = useState<any>(null);

  useEffect(() => {
    if (studentId) {
      dispatch(getStudentEvaluations({ studentId }));
      dispatch(getEvaluationLevel({}));
    }
  }, [studentId]);

  const refetch = () => dispatch(getStudentEvaluations({ studentId }));

  const handleSaved = () => {
    setSlideoverMode(null);
    refetch();
    onStudentUpdated?.();
  };

  const handleEdit = (item: any) => {
    setSelectedEvaluation(item);
    setSlideoverMode("edit");
  };

  const handleDelete = async (item: any) => {
    if (!window.confirm(`¿Eliminar la evaluación de "${item?.evaluationLevel?.name}"? Esta acción no se puede deshacer.`)) return;
    const detailIds = (item?.studentEvaluationsDetails?.items || []).map((d: any) => d.id);
    await dispatch(deleteStudentEvaluationThunk({ evaluationId: item.id, detailIds })).unwrap();
  };

  return (
    <>
      <Slideover size="xl" open={slideoverMode !== null} onClose={() => setSlideoverMode(null)}>
        <Slideover.Panel className="rounded-[0.75rem_0_0_0.75rem/1.1rem_0_0_1.1rem]">
          <a href="" className="focus:outline-none hover:bg-white/10 bg-white/5 transition-all hover:rotate-180 absolute inset-y-0 left-0 right-auto flex items-center justify-center my-auto -ml-[60px] sm:-ml-[105px] border rounded-full text-white/90 w-8 h-8 sm:w-14 sm:h-14 border-white/90 hover:scale-105"
            onClick={(e) => { e.preventDefault(); setSlideoverMode(null); }}>
            <Lucide className="w-3 h-3 sm:w-8 sm:h-8 stroke-[1]" icon="X" />
          </a>
          <Slideover.Description className="p-0 h-full flex flex-col">
            {slideoverMode === "create" && (
              <NuevaEvaluacionForm
                studentId={studentId}
                studentBirthdate={studentBirthdate}
                onClose={() => setSlideoverMode(null)}
                onSaved={handleSaved}
              />
            )}
            {slideoverMode === "edit" && selectedEvaluation && (
              <EditEvaluacionForm
                evaluation={selectedEvaluation}
                studentName={studentName || ""}
                studentEmail={studentEmail || ""}
                onClose={() => setSlideoverMode(null)}
                onSaved={handleSaved}
              />
            )}
          </Slideover.Description>
        </Slideover.Panel>
      </Slideover>

      <div className="grid grid-cols-12 gap-y-7 gap-x-6 mt-3.5">
        <div className="col-span-12">
          <div className="flex flex-col p-5 box min-h-[600px]">
            <div className="flex flex-row justify-between items-start pb-5 mb-5 border-b border-slate-300/70">
              <h2 className="text-2xl uppercase font-medium">Evaluaciones</h2>
              <Button variant="primary" className="py-2 px-5 rounded-full" onClick={() => setSlideoverMode("create")}>
                <Lucide icon="Plus" className="w-4 h-4 mr-2" />Nueva Evaluación
              </Button>
            </div>

            {status === "loading" && (
              <div className="flex justify-center items-center py-20">
                <LoadingIcon color="purple" icon="three-dots" className="w-10 h-10" />
              </div>
            )}

            {status === "idle" && studentEvaluations.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <Lucide icon="ClipboardList" className="w-12 h-12 mb-3 stroke-[1]" />
                <p className="text-base">No hay evaluaciones registradas</p>
                <p className="text-sm">Crea la primera evaluación con el botón de arriba</p>
              </div>
            )}

            {status === "idle" && studentEvaluations.length > 0 && (
              <div>
                {[...studentEvaluations]
                  .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix())
                  .map((item) => (
                    <EvaluationCard
                      key={item.id}
                      item={item}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
