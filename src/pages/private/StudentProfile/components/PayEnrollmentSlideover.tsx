import { useState } from "react";
import { generateClient } from "aws-amplify/api";

import Button from "@/components/Base/Button";
import Lucide from "@/components/Base/Lucide";
import { Slideover } from "@/components/Base/Headless";
import LoadingIcon from "@/components/Base/LoadingIcon";

const client = generateClient();

// Formas de pago manuales (enum v2PaymentMethod del backend)
const PAYMENT_METHODS = [
  { value: "EFECTIVO", label: "Efectivo", icon: "Banknote" as const },
  { value: "TRANSFERENCIA", label: "Transferencia", icon: "Landmark" as const },
  { value: "DEBITO", label: "Débito", icon: "CreditCard" as const },
  { value: "CREDITO", label: "Crédito", icon: "Wallet" as const },
];

const findCartByEnrollment = /* GraphQL */ `
  query ListV2ShoppingCartDetails($filter: ModelV2ShoppingCartDetailFilterInput, $limit: Int) {
    listV2ShoppingCartDetails(filter: $filter, limit: $limit) {
      items {
        id
        cartId
      }
    }
  }
`;

const updateCartPayment = /* GraphQL */ `
  mutation UpdateV2ShoppingCart($input: UpdateV2ShoppingCartInput!) {
    updateV2ShoppingCart(input: $input) {
      id
      paymentMethod
      empleadoId
      status
    }
  }
`;

const updateEnrollmentPaid = /* GraphQL */ `
  mutation UpdateV2Enrollment($input: UpdateV2EnrollmentInput!) {
    updateV2Enrollment(input: $input) {
      id
      wasPaid
    }
  }
`;

interface Props {
  open: boolean;
  enrollmentId: string;
  cartId?: string; // si se conoce el carro, se usa directo (evita el lookup)
  empleadoId: string; // email del usuario autenticado
  onClose: () => void;
  onPaid: () => void; // refrescar datos del estudiante
}

export function PayEnrollmentSlideover({ open, enrollmentId, cartId: cartIdProp, empleadoId, onClose, onPaid }: Props) {
  const [method, setMethod] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const reset = () => {
    setMethod("");
    setError("");
    setSaving(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handlePay = async () => {
    if (!method || !enrollmentId) return;
    setSaving(true);
    setError("");
    try {
      // 1. Carro asociado: usar el provisto o buscarlo vía ShoppingCartDetail
      let cartId = cartIdProp;
      if (!cartId) {
        const detailRes: any = await client.graphql({
          query: findCartByEnrollment,
          variables: { filter: { enrollmentId: { eq: enrollmentId } }, limit: 1000 },
        });
        cartId = detailRes?.data?.listV2ShoppingCartDetails?.items?.[0]?.cartId;
      }

      // 2. Forma de pago + empleado en el carro (si existe)
      if (cartId) {
        await client.graphql({
          query: updateCartPayment,
          variables: {
            input: {
              id: cartId,
              paymentMethod: method,
              empleadoId,
              status: "AUTHORIZED",
            },
          },
        });
      }

      // 3. Enrollment pagado
      await client.graphql({
        query: updateEnrollmentPaid,
        variables: { input: { id: enrollmentId, wasPaid: true } },
      });

      reset();
      onPaid();
    } catch (err: any) {
      console.error("PayEnrollment error", err);
      setError(err?.errors?.[0]?.message || "No se pudo registrar el pago. Intenta nuevamente.");
      setSaving(false);
    }
  };

  return (
    <Slideover open={open} onClose={handleClose}>
      <Slideover.Panel className="w-96 rounded-[0.75rem_0_0_0.75rem/1.1rem_0_0_1.1rem]">
        <Slideover.Title className="p-5">
          <h2 className="mr-auto text-base font-medium">Registrar pago</h2>
        </Slideover.Title>
        <Slideover.Description className="p-5 flex flex-col h-[calc(100%-65px)]">
          <p className="text-slate-500 text-sm mb-4">
            Seleccione la forma de pago recibida
          </p>

          {/* Selección única: la opción elegida queda destacada */}
          <div className="grid grid-cols-2 gap-3">
            {PAYMENT_METHODS.map((pm) => {
              const active = method === pm.value;
              return (
                <button
                  key={pm.value}
                  type="button"
                  data-method={pm.value}
                  onClick={() => setMethod(pm.value)}
                  className={`flex flex-col items-center justify-center gap-2 rounded-xl border px-4 py-5 transition-all ${
                    active
                      ? "border-primary bg-primary text-white shadow-md"
                      : "border-slate-200 bg-white text-slate-600 hover:border-primary/50 hover:bg-slate-50"
                  }`}
                >
                  <Lucide icon={pm.icon} className={`w-6 h-6 ${active ? "text-white" : "text-primary"}`} />
                  <span className="text-sm font-medium">{pm.label}</span>
                </button>
              );
            })}
          </div>

          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

          <div className="mt-auto pt-5 space-y-2">
            <Button
              variant="primary"
              rounded
              disabled={!method || saving}
              onClick={handlePay}
              className="w-full py-3"
            >
              {saving ? (
                <LoadingIcon color="#FFFFFF" icon="three-dots" className="w-8 h-8" />
              ) : (
                "Pagar"
              )}
            </Button>
            <Button variant="outline-secondary" rounded disabled={saving} onClick={handleClose} className="w-full py-2.5">
              Cancelar
            </Button>
          </div>
        </Slideover.Description>
      </Slideover.Panel>
    </Slideover>
  );
}
