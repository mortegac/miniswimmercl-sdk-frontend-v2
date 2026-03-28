import { useState, useRef } from "react";
import { Slideover } from "@/components/Base/Headless";
import Button from "@/components/Base/Button";
import Lucide from "@/components/Base/Lucide";
import { formatDateUTC } from "@/utils/helper";
import type { GmailInbox } from "@/stores/GmailInbox/types";
import { sendGmailReply } from "@/stores/GmailInbox/services";

const MINISWIMMER_ACCOUNTS = new Set(["hola@miniswimmer.cl", "welcome@miniswimmer.cl"]);

function getReplyTo(email: GmailInbox): string {
  if (email.fromEmail && !MINISWIMMER_ACCOUNTS.has(email.fromEmail)) {
    return email.fromEmail;
  }
  // Email fue enviado por miniswimmer → responder al apoderado en toEmails
  const external = (email.toEmails ?? []).find((e) => !MINISWIMMER_ACCOUNTS.has(e));
  return external ?? email.fromEmail ?? "";
}

interface Props {
  email: GmailInbox | null;
  open: boolean;
  onClose: () => void;
  onReplySent?: () => void;
}

export function EmailDetailSlideover({ email, open, onClose, onReplySent }: Props) {
  const [replyBody, setReplyBody] = useState("");
  const [showReply, setShowReply] = useState(false);
  const [sendStatus, setSendStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [sendError, setSendError] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  if (!email) return null;

  const replyTo      = getReplyTo(email);
  const replySubject = `Re: ${email.subject ?? ""}`;

  async function handleSendReply() {
    if (!replyBody.trim()) return;
    setSendStatus("sending");
    setSendError("");
    try {
      const result = await sendGmailReply({
        fromAccount: email!.gmailAccount,
        toEmail:     replyTo,
        subject:     replySubject,
        body:        replyBody,
        threadId:    email!.threadId || undefined,
      });
      if (result.success) {
        setSendStatus("success");
        setReplyBody("");
        setTimeout(() => { setSendStatus("idle"); setShowReply(false); onReplySent?.(); }, 2000);
      } else {
        setSendStatus("error");
        setSendError(result.error ?? "Error al enviar");
      }
    } catch (err: any) {
      setSendStatus("error");
      setSendError(err?.message ?? "Error inesperado");
    }
  }

  function handleIframeLoad() {
    const iframe = iframeRef.current;
    if (!iframe?.contentDocument) return;
    // Inyectar estilos base para que el contenido HTML no se vea roto
    const style = iframe.contentDocument.createElement("style");
    style.textContent = "body { font-family: sans-serif; font-size: 13px; margin: 0; padding: 8px; color: #334155; } img { max-width: 100%; }";
    iframe.contentDocument.head?.appendChild(style);
  }

  return (
    <Slideover open={open} onClose={onClose} size="xl">
      <Slideover.Panel>
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <Slideover.Title>
          <div className="flex items-start justify-between w-full gap-3">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-700 truncate">{email.subject || "(Sin asunto)"}</p>
              <p className="text-xs text-slate-400 mt-0.5">{formatDateUTC(email.dateSent)}</p>
            </div>
            <button onClick={onClose} className="flex-shrink-0 text-slate-400 hover:text-slate-600 mt-0.5">
              <Lucide icon="X" className="w-5 h-5" />
            </button>
          </div>
        </Slideover.Title>

        {/* ── Body (scrollable) ────────────────────────────────────────────── */}
        <Slideover.Description className="flex flex-col gap-4 p-5 overflow-y-auto">

          {/* Meta info */}
          <div className="flex flex-col gap-1.5 text-sm border border-slate-100 rounded-lg p-3 bg-slate-50">
            <div className="flex gap-2">
              <span className="text-slate-400 w-8 shrink-0">De:</span>
              <span className="text-slate-700 font-medium">
                {email.fromName ? `${email.fromName} ` : ""}
                <span className="font-normal text-slate-500">&lt;{email.fromEmail}&gt;</span>
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-slate-400 w-8 shrink-0">Para:</span>
              <span className="text-slate-500">{(email.toEmails ?? []).join(", ") || "—"}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-slate-400 w-8 shrink-0">Vía:</span>
              <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full self-start">
                {email.gmailAccount}
              </span>
            </div>
            {email.hasAttachments && (
              <div className="flex gap-2 items-center">
                <Lucide icon="Paperclip" className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs text-slate-400">Contiene adjuntos</span>
              </div>
            )}
          </div>

          {/* Email body */}
          <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
            {email.bodyHtml ? (
              <iframe
                ref={iframeRef}
                srcDoc={email.bodyHtml}
                onLoad={handleIframeLoad}
                sandbox="allow-same-origin"
                className="w-full min-h-[400px] border-0"
                title="Contenido del email"
              />
            ) : email.bodyText ? (
              <pre className="text-xs text-slate-600 whitespace-pre-wrap p-4 font-sans leading-relaxed">
                {email.bodyText}
              </pre>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-slate-300">
                <Lucide icon="MailOpen" className="w-10 h-10 stroke-[0.8]" />
                <p className="mt-2 text-sm">Sin contenido</p>
              </div>
            )}
          </div>

          {/* Reply form */}
          {showReply ? (
            <div className="border border-theme-1/30 rounded-lg bg-white p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Lucide icon="CornerUpLeft" className="w-4 h-4 text-theme-1" />
                <span>Responder a <span className="font-medium text-slate-700">{replyTo}</span></span>
              </div>
              <div className="text-xs text-slate-400">
                Asunto: <span className="text-slate-500">{replySubject}</span>
              </div>
              <textarea
                value={replyBody}
                onChange={(e) => setReplyBody(e.target.value)}
                rows={6}
                placeholder="Escribe tu respuesta aquí..."
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 resize-none focus:outline-none focus:ring-1 focus:ring-theme-1 focus:border-theme-1"
              />
              {sendStatus === "error" && (
                <p className="text-xs text-danger">{sendError}</p>
              )}
              {sendStatus === "success" && (
                <p className="text-xs text-success flex items-center gap-1">
                  <Lucide icon="CheckCheck" className="w-3.5 h-3.5" /> Email enviado correctamente
                </p>
              )}
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  disabled={sendStatus === "sending"}
                  onClick={() => { setShowReply(false); setReplyBody(""); setSendStatus("idle"); }}
                >
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  disabled={!replyBody.trim() || sendStatus === "sending"}
                  onClick={handleSendReply}
                >
                  {sendStatus === "sending" ? (
                    <>
                      <Lucide icon="Loader" className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Lucide icon="Send" className="w-3.5 h-3.5 mr-1.5" />
                      Enviar
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex justify-end">
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => setShowReply(true)}
              >
                <Lucide icon="CornerUpLeft" className="w-3.5 h-3.5 mr-1.5" />
                Responder
              </Button>
            </div>
          )}
        </Slideover.Description>
      </Slideover.Panel>
    </Slideover>
  );
}
