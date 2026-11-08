import { useState, useEffect } from "react";
import clsx from "clsx";
import * as jose from "jose";

import Toastify from "toastify-js";
import Notification from "@/components/Base/Notification";

import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import { formatDateUTC, formatCurrency, formatDateSantiago } from "@/utils/helper";

const JWT_SECRET = new TextEncoder().encode(
  "tu_clave_secreta_super_segura_min_32_caracteres"
);

async function generateCartJWT(cartId: string): Promise<string> {
  return new jose.SignJWT({ sub: cartId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(JWT_SECRET);
}

function PaymentLinkButton({ cartId }: { cartId: string }) {
  const [paymentUrl, setPaymentUrl] = useState("");
  useEffect(() => {
    generateCartJWT(cartId).then(jwt => setPaymentUrl(`https://pagos.miniswimmer.cl/${jwt}`));
  }, [cartId]);

  if (!paymentUrl) return null;
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={paymentUrl}
      className="flex items-center justify-center gap-1.5 mt-2 text-xs text-primary font-medium border border-primary/40 px-3 py-1.5 rounded-full bg-primary/5 hover:bg-primary/10 transition-colors w-full"
    >
      <Lucide icon="ExternalLink" className="w-3 h-3 stroke-[1.5]" />
      Ir a pagar
    </a>
  );
}

import { useAppSelector, useAppDispatch } from "@/stores/hooks";

import { getPaymentTransactions, getPaymentTransactionsByCart, selectPaymentTransactions } from "@/stores/PaymentTransactions/slice";
import { updateEnrollmentPay } from "@/stores/Enrollment/slice";
import {
  getShoppingCart,
  selectShoppingCarts,
  updatePayment,
} from "@/stores/ShoppingCarts/slice";
import { selectAuth } from "@/stores/Users/slice";
import { PayEnrollmentSlideover } from "./PayEnrollmentSlideover";

const PAYMENT_METHOD_LABEL: Record<string, string> = {
  EFECTIVO: "Efectivo",
  TRANSFERENCIA: "Transferencia",
  DEBITO: "Débito",
  CREDITO: "Crédito",
  WEBPAY: "Webpay",
  MERCADOPAGO: "MercadoPago",
};

const PAYMENT_TYPE_LABELS: Record<string, string> = {
  VD: "Débito",
  VN: "Crédito sin cuotas",
  VC: "Crédito en cuotas",
  SI: "Sin interés 3c",
  S2: "Sin interés 2c",
  NC: "N cuotas",
  VP: "Prepago",
};

const RESPONSE_CODE_LABELS: Record<string, string> = {
  "0": "Aprobado",
  "-1": "Rechazo",
  "-2": "Rechazo",
  "-3": "Error",
  "-4": "Rechazo",
  "-5": "Rechazo",
  "-6": "Rechazo",
  "-7": "Rechazo",
  "-8": "Rechazo",
};

function TxField({
  label,
  value,
  colorClass,
  showAlways = false,
  mono = false,
}: {
  label: string;
  value: string | number | undefined | null;
  colorClass?: string;
  showAlways?: boolean;
  mono?: boolean;
}) {
  if (!showAlways && !value && value !== 0) return null;
  return (
    <div className="flex flex-col min-w-0">
      <span className="text-[9px] uppercase tracking-wide text-slate-400 leading-none mb-0.5">{label}</span>
      <span className={clsx("text-[11px] leading-tight truncate", mono && "font-mono", colorClass ?? "text-slate-700 dark:text-slate-200")}>
        {value ?? "—"}
      </span>
    </div>
  );
}

const CURRENT_YEAR = new Date().getFullYear();

export function ResumenTransactions(props: any) {
  const { data, studentId, fnUpdateState } = props;

  const { emailAuth, usersRolesId } = useAppSelector(selectAuth);
  const { shoppingCarts } = useAppSelector(selectShoppingCarts);
  const { paymentTransactions, cartTransactions: reduxCartTransactions } = useAppSelector(selectPaymentTransactions);

  const dispatch = useAppDispatch();

  const [selectedCartId, setSelectedCartId] = useState<string | null>(null);
  const [payTarget, setPayTarget] = useState<{ enrollmentId: string; cartId: string } | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(CURRENT_YEAR);

  async function handleCartDoubleClick(cartId: string) {
    const jwt = await generateCartJWT(cartId);
    await navigator.clipboard.writeText(jwt);
    const el = document.querySelectorAll("#cart-jwt-copied")[0]?.cloneNode(true) as HTMLElement;
    el?.classList.remove("hidden");
    Toastify({
      node: el,
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
    }).showToast();
  }

  const availableYears: number[] = Array.isArray(shoppingCarts)
    ? [...new Set(
        shoppingCarts.map((c: any) => new Date(c.createdAt).getFullYear())
      )].sort((a, b) => b - a)
    : [CURRENT_YEAR];

  const sortedCarts = Array.isArray(shoppingCarts)
    ? [...shoppingCarts]
        .filter((c: any) => new Date(c.createdAt).getFullYear() === selectedYear)
        .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    : [];

  useEffect(() => {
    if (sortedCarts.length > 0) {
      setSelectedCartId(sortedCarts[0].id);
    } else {
      setSelectedCartId(null);
    }
  }, [shoppingCarts, selectedYear]);

  const cartTransactions = [...(reduxCartTransactions ?? [])]
    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const isAdmin =
    usersRolesId === "adminRole" ||
    emailAuth === "hi@manuelo.dev" ||
    emailAuth === "hola@miniswimmer.cl" ||
    emailAuth === "loreto.gonzález.or@gmail.com";

  async function handleUpdatePayment(payload: any) {
    const { enrollmentId, shoppingCartId } = payload;

    await Promise.all([
      dispatch(updateEnrollmentPay({ enrollmentId, wasPaid: "true" })),
      dispatch(updatePayment({ shoppingCartId })),
      fnUpdateState(studentId),
    ]);

    const successEl = document
      .querySelectorAll("#update-payment")[0]
      .cloneNode(true) as HTMLElement;
    successEl.classList.remove("hidden");
    Toastify({
      node: successEl,
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
    }).showToast();
  }

  useEffect(() => {
    (async () => {
      if (Array.isArray(data?.items)) {
        await Promise.all(
          data.items.map((item: any) =>
            Promise.all([
              dispatch(getPaymentTransactions({ userId: item?.user?.id })),
              dispatch(getShoppingCart({ userId: item?.user?.id || "" })),
            ])
          )
        );
      }
    })();
  }, [data]);

  useEffect(() => {
    if (!selectedCartId) return;
    dispatch(getPaymentTransactionsByCart(selectedCartId));
  }, [selectedCartId]);

  return (
    <>
      <PayEnrollmentSlideover
        open={!!payTarget}
        enrollmentId={payTarget?.enrollmentId || ""}
        cartId={payTarget?.cartId}
        empleadoId={emailAuth}
        onClose={() => setPayTarget(null)}
        onPaid={() => {
          setPayTarget(null);
          fnUpdateState(studentId);
        }}
      />
      <Notification id="update-payment" className="flex hidden">
        <Lucide icon="CheckCircle" className="text-green-600" />
        <div className="ml-4 mr-4">
          <div className="font-medium">Inscripción y pago Actualizado</div>
          <div className="mt-1 text-slate-500">correctamente</div>
        </div>
      </Notification>
      <Notification id="cart-jwt-copied" className="flex hidden">
        <Lucide icon="Copy" className="text-blue-500" />
        <div className="ml-4 mr-4">
          <div className="font-medium">JWT del carro copiado</div>
          <div className="mt-1 text-slate-500">El token fue copiado al portapapeles</div>
        </div>
      </Notification>

      <div className="grid grid-cols-12 gap-x-6 gap-y-7 mt-3.5">
        {/* LEFT: Shopping Carts */}
        <div className="col-span-12 xl:col-span-5">
          <div className="flex flex-col p-5 box">
            <div className="pb-3 mb-3 border-b border-slate-200/70 dark:border-darkmode-400">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-[0.94rem]">Carros de Compras</span>
                <span
                  className={clsx(
                    "text-xs px-2 py-0.5 rounded-full font-normal",
                    isAdmin ? "bg-red-100 text-red-600" : "bg-slate-100 text-slate-500"
                  )}
                >
                  {isAdmin ? "ADMIN" : "USUARIO REGULAR"}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {availableYears.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={clsx(
                      "text-xs px-3 py-1 rounded-full border font-medium transition-colors",
                      selectedYear === year
                        ? "bg-primary text-white border-primary"
                        : "bg-slate-50 text-slate-500 border-slate-200 hover:border-primary/40 hover:text-primary dark:bg-darkmode-600 dark:border-darkmode-400"
                    )}
                  >
                    {year}
                    {year === CURRENT_YEAR && (
                      <span className="ml-1 text-[10px] opacity-70">actual</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {sortedCarts.length === 0 && (
              <p className="text-sm text-slate-400 italic">
                Sin carros de compras en {selectedYear}.
              </p>
            )}

            <div className="flex flex-col gap-2">
              {sortedCarts.map((cart: any) => {
                const isSelected = cart.id === selectedCartId;
                let total = 0;
                return (
                  <div
                    key={cart.id}
                    onClick={() => setSelectedCartId(cart.id)}
                    onDoubleClick={() => handleCartDoubleClick(cart.id)}
                    className={clsx(
                      "rounded-xl border cursor-pointer transition-all duration-150 p-3",
                      isSelected
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-slate-200 dark:border-darkmode-400 hover:border-primary/40 hover:bg-slate-50 dark:hover:bg-darkmode-600"
                    )}
                  >
                    {/* Cart header */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Lucide
                          icon="ShoppingCart"
                          className={clsx("w-3.5 h-3.5 stroke-[1.5]", isSelected ? "text-primary" : "text-slate-400")}
                        />
                        <span className="text-xs text-slate-500">{formatDateUTC(cart?.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {cart?.paymentMethod && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-sky-100 text-sky-700 flex items-center gap-1">
                            <Lucide icon="Wallet" className="w-3 h-3" />
                            {PAYMENT_METHOD_LABEL[cart.paymentMethod] ?? cart.paymentMethod}
                          </span>
                        )}
                        <span
                          className={clsx(
                            "text-xs px-2 py-0.5 rounded-full font-medium",
                            cart?.status
                              ? "bg-success/10 text-success"
                              : "bg-red-100 text-red-600"
                          )}
                        >
                          {cart?.status || "PENDIENTE"}
                        </span>
                      </div>
                    </div>

                    {/* Cart detail items */}
                    {Array.isArray(cart?.cartDetails?.items) &&
                      cart.cartDetails.items.map((detail: any, i: number) => {
                        total += detail?.amount ?? 0;
                        return (
                          <div
                            key={i}
                            className="flex items-start justify-between py-1.5 border-b border-dashed border-slate-100 dark:border-darkmode-400 last:border-0"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-slate-700 dark:text-slate-200 truncate">
                                {detail?.detail}
                              </p>
                              {(detail?.enrollment?.student?.name || detail?.enrollment?.student?.lastName) && (
                                <p className="text-[11px] text-slate-400 mt-0.5">
                                  {detail?.enrollment?.student?.name} {detail?.enrollment?.student?.lastName}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-2 ml-3 shrink-0">
                              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                                ${formatCurrency(detail?.amount)}
                              </span>
                            </div>
                          </div>
                        );
                      })}

                    {!cart?.status && <PaymentLinkButton cartId={cart.id} />}

                    {/* Botón Pagar: registra pago manual de todo el carro (admin, carro no autorizado) */}
                    {isAdmin && cart?.status !== "AUTHORIZED" && (
                      <Button
                        variant="primary"
                        rounded
                        className="w-full mt-2 py-2.5"
                        onClick={(e: any) => {
                          e.stopPropagation();
                          setPayTarget({ enrollmentId: "", cartId: cart?.id });
                        }}
                      >
                        Pagar
                      </Button>
                    )}

                    {/* Cart total + tx count */}
                    <div className="flex justify-between items-center mt-2 pt-1.5 border-t border-slate-200/70 dark:border-darkmode-400">
                      <div className="flex items-center gap-1 text-slate-400">
                        {(() => {
                          const count = Array.isArray(paymentTransactions)
                            ? paymentTransactions.filter((t: any) => t.shoppingCartId === cart.id).length
                            : 0;
                          return count > 0 ? (
                            <>
                              <Lucide icon="CreditCard" className="w-3 h-3" />
                              <span className="text-[11px]">{count} tx</span>
                            </>
                          ) : null;
                        })()}
                      </div>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                        ${formatCurrency(total)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT: Transactions for selected cart */}
        <div className="col-span-12 xl:col-span-7">
          <div className="flex flex-col p-5 box min-h-[200px]">
            <div className="pb-3 mb-3 font-medium border-b border-slate-200/70 dark:border-darkmode-400 text-[0.94rem] flex items-center gap-2">
              <Lucide icon="CreditCard" className="w-4 h-4 stroke-[1.5] text-slate-400" />
              <span>
                Transacciones
                {selectedCartId && (
                  <span className="ml-2 text-xs font-normal text-slate-400">
                    — carro {selectedCartId.slice(-8)}
                  </span>
                )}
              </span>
              {cartTransactions.length > 0 && (
                <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {cartTransactions.length} resultado{cartTransactions.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>

            {!selectedCartId && (
              <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                <Lucide icon="MousePointerClick" className="w-8 h-8 mb-2 stroke-[1]" />
                <p className="text-sm">Selecciona un carro de compras para ver sus transacciones</p>
              </div>
            )}

            {selectedCartId && cartTransactions.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                <Lucide icon="Inbox" className="w-8 h-8 mb-2 stroke-[1]" />
                <p className="text-sm">No hay transacciones para este carro</p>
              </div>
            )}

            {cartTransactions.length > 0 && (
              <div className="flex flex-col gap-2">
                {cartTransactions.map((tx: any, index: number) => {
                  const isApproved = tx?.response_code === "0" || tx?.status === "AUTHORIZED";
                  const responseLabel = RESPONSE_CODE_LABELS[tx?.response_code] ?? tx?.response_code;
                  const paymentTypeLabel = PAYMENT_TYPE_LABELS[tx?.payment_type_code] ?? tx?.payment_type_code;

                  return (
                    <div
                      key={tx.id ?? index}
                      className={clsx(
                        "rounded-lg border px-3 py-2.5",
                        isApproved
                          ? "border-success/30 bg-success/5"
                          : "border-red-200 bg-red-50/40 dark:bg-red-900/10"
                      )}
                    >
                      {/* Compact header: dot · date · amount · status */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className={clsx("w-2 h-2 rounded-full shrink-0", isApproved ? "bg-success" : "bg-red-400")} />
                        <span className="text-[11px] text-slate-400">{formatDateSantiago(tx?.createdAt)}</span>
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-100 ml-auto">
                          ${formatCurrency(tx?.amount)}
                        </span>
                        <span
                          className={clsx(
                            "text-[10px] px-1.5 py-0.5 rounded-full font-semibold",
                            isApproved ? "bg-success/15 text-success" : "bg-red-100 text-red-600"
                          )}
                        >
                          {tx?.status || "—"}
                        </span>
                        {tx?.hasRefund && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium bg-amber-100 text-amber-700">
                            REEMBOLSO
                          </span>
                        )}
                      </div>

                      {/* Glosa */}
                      {tx?.glosa && (
                        <p className="text-[11px] text-slate-500 italic mb-2 ml-4 truncate" title={tx.glosa}>
                          {tx.glosa}
                        </p>
                      )}

                      {/* Dense detail grid */}
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-x-3 gap-y-2 ml-4">
                        <TxField label="Autorización" value={tx?.authorization_code} colorClass="text-primary" mono />
                        <TxField label="Orden compra" value={tx?.buy_order} colorClass="text-slate-600 dark:text-slate-300" mono />
                        <TxField
                          label="Respuesta"
                          value={responseLabel}
                          colorClass={isApproved ? "text-success" : "text-red-500"}
                        />
                        <TxField label="Tipo pago" value={paymentTypeLabel} showAlways />
                        <TxField
                          label="Tarjeta"
                          value={tx?.card_number ? `**** ${tx.card_number}` : null}
                          colorClass="text-slate-600 dark:text-slate-300"
                          mono
                          showAlways
                        />
                        <TxField label="VCI" value={tx?.vci} showAlways />
                        {tx?.installments_number && Number(tx.installments_number) > 0 && (
                          <TxField
                            label="Cuotas"
                            value={`${tx.installments_number}x${tx?.installments_amount ? " $" + formatCurrency(Number(tx.installments_amount)) : ""}`}
                          />
                        )}
                        {tx?.usersId && (
                          <TxField label="Usuario ID" value={tx.usersId} colorClass="text-slate-500" mono />
                        )}
                        {tx?.token && (
                          <div className="col-span-3 sm:col-span-4 flex flex-col min-w-0">
                            <span className="text-[9px] uppercase tracking-wide text-slate-400 leading-none mb-0.5">Token</span>
                            <span
                              className="text-[11px] font-mono text-slate-500 truncate"
                              title={tx.token}
                            >
                              {tx.token}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
