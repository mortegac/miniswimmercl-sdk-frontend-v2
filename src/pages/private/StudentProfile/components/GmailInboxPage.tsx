import { useEffect, useState } from "react";
import Table from "@/components/Base/Table";
import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import LoadingIcon from "@/components/Base/LoadingIcon";
import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import {
  selectGmailInbox,
  getGmailInbox,
  clearGmailInbox,
  syncAndRefreshGmailInbox,
} from "@/stores/GmailInbox/slice";
import { formatDateUTC } from "@/utils/helper";
import type { GmailInbox } from "@/stores/GmailInbox/types";
import { EmailDetailSlideover } from "./EmailDetailSlideover";

interface Props {
  guardianEmail: string;
}

export function GmailInboxPage({ guardianEmail }: Props) {
  const dispatch = useAppDispatch();
  const { status, syncStatus, emails, errorMessage } = useAppSelector(selectGmailInbox);
  const [selectedEmail, setSelectedEmail] = useState<GmailInbox | null>(null);
  const [slideoverOpen, setSlideoverOpen] = useState(false);

  function handleOpenEmail(email: GmailInbox) {
    setSelectedEmail(email);
    setSlideoverOpen(true);
  }

  function handleCloseEmail() {
    setSlideoverOpen(false);
  }

  function handleSync() {
    dispatch(syncAndRefreshGmailInbox({ userId: guardianEmail }));
  }

  // Callback que se pasa al Slideover: al enviar reply, sincroniza y recarga
  function handleReplySent() {
    setSlideoverOpen(false);
    dispatch(syncAndRefreshGmailInbox({ userId: guardianEmail }));
  }

  useEffect(() => {
    if (!guardianEmail) return;
    dispatch(getGmailInbox({ userId: guardianEmail }));
    return () => { dispatch(clearGmailInbox()); };
  }, [guardianEmail]);

  if (!guardianEmail) {
    return (
      <div className="flex flex-col items-center justify-center pt-20 pb-28">
        <Lucide icon="MailX" className="w-16 h-16 text-slate-300 stroke-[0.5]" />
        <p className="mt-4 text-slate-400">No se encontró un apoderado asociado a este alumno.</p>
      </div>
    );
  }

  const isSyncing = syncStatus === "syncing";

  return (
    <div className="grid grid-cols-12 gap-y-7 gap-x-6 mt-3.5">
      <div className="col-span-12">
        <div className="flex flex-col p-5 box">
          <div className="pb-5 mb-5 flex items-center justify-between border-b border-slate-300/70">
            <div className="font-medium text-[0.94rem]">
              Emails de <span className="text-theme-1">{guardianEmail}</span>
              <span className="ml-2 text-xs text-slate-400 font-normal">(último año)</span>
            </div>
            <Button
              variant="outline-secondary"
              size="sm"
              disabled={isSyncing || status === "loading"}
              onClick={handleSync}
            >
              <Lucide
                icon="RefreshCw"
                className={`w-3.5 h-3.5 mr-1.5 ${isSyncing ? "animate-spin" : ""}`}
              />
              {isSyncing ? "Sincronizando..." : "Actualizar"}
            </Button>
          </div>

          {(status === "loading" || isSyncing) && (
            <div className="flex justify-center items-center h-40">
              <LoadingIcon color="purple" icon="three-dots" className="w-10 h-10" />
            </div>
          )}

          {status === "failed" && (
            <p className="text-danger text-sm">{errorMessage}</p>
          )}

          {status === "idle" && !isSyncing && emails.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">
              <Lucide icon="Inbox" className="w-14 h-14 text-slate-200 stroke-[0.5]" />
              <p className="mt-3 text-slate-400">No se encontraron emails en el período.</p>
            </div>
          )}

          {status === "idle" && !isSyncing && emails.length > 0 && (
            <div className="overflow-auto xl:overflow-visible">
              <Table className="border-b border-slate-200/60">
                <Table.Thead>
                  <Table.Tr>
                    <Table.Td className="py-4 font-medium text-left border-t bg-slate-50 border-slate-200/60 text-slate-500">
                      Fecha
                    </Table.Td>
                    <Table.Td className="py-4 font-medium text-left border-t bg-slate-50 border-slate-200/60 text-slate-500">
                      Asunto
                    </Table.Td>
                    <Table.Td className="py-4 font-medium text-left border-t bg-slate-50 border-slate-200/60 text-slate-500">
                      De
                    </Table.Td>
                    <Table.Td className="py-4 font-medium text-left border-t bg-slate-50 border-slate-200/60 text-slate-500">
                      Cuenta
                    </Table.Td>
                    <Table.Td className="py-4 font-medium text-left border-t bg-slate-50 border-slate-200/60 text-slate-500">
                      Leído
                    </Table.Td>
                    <Table.Td className="py-4 font-medium text-left border-t bg-slate-50 border-slate-200/60 text-slate-500">
                      Extracto
                    </Table.Td>
                    <Table.Td className="py-4 border-t bg-slate-50 border-slate-200/60" />
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {emails.map((item, index) => (
                    <Table.Tr key={item.id || index} className="[&_td]:last:border-b-0">
                      <Table.Td className="py-4 border-dashed whitespace-nowrap">
                        <span className="text-sm">{formatDateUTC(item.dateSent)}</span>
                      </Table.Td>
                      <Table.Td className="py-4 border-dashed max-w-[220px]">
                        <span className="text-sm font-medium line-clamp-2">{item.subject || "—"}</span>
                      </Table.Td>
                      <Table.Td className="py-4 border-dashed whitespace-nowrap">
                        <span className="text-sm text-slate-500">{item.fromName || item.fromEmail || "—"}</span>
                      </Table.Td>
                      <Table.Td className="py-4 border-dashed whitespace-nowrap">
                        <span className="text-xs text-slate-400">{item.gmailAccount}</span>
                      </Table.Td>
                      <Table.Td className="py-4 border-dashed">
                        {item.isRead
                          ? <Lucide icon="CheckCheck" className="w-4 h-4 text-green-500" />
                          : <Lucide icon="Circle" className="w-4 h-4 text-slate-300" />
                        }
                      </Table.Td>
                      <Table.Td className="py-4 border-dashed max-w-[260px]">
                        <span className="text-xs text-slate-400 line-clamp-2">{item.snippet || "—"}</span>
                      </Table.Td>
                      <Table.Td className="py-4 border-dashed text-right">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="whitespace-nowrap"
                          onClick={() => handleOpenEmail(item)}
                        >
                          <Lucide icon="Eye" className="w-3.5 h-3.5 mr-1" />
                          Ver
                        </Button>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </div>
          )}
        </div>
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
