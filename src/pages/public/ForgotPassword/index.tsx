import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import clsx from "clsx";

import { LogoColor } from "../../../assets/images/logoColor";
import { Swimmer } from "../../../assets/images/swimmer";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { selectAuth, forgotPassword, confirmForgotPassword } from "@/stores/Users/slice";
import { PUBLIC } from "@/router/paths";

import Button from "@/components/Base/Button";
import { FormInput, FormLabel } from "@/components/Base/Form";
import Lucide from "@/components/Base/Lucide";

type ForgotStep = "email" | "confirm" | "success";

// ---- Schemas ----

const EmailSchema = yup.object().shape({
  email: yup
    .string()
    .email("Debes ingresar un email valido")
    .required("Debes ingresar tu email"),
});

const ConfirmSchema = yup.object().shape({
  code: yup.string().required("Debes ingresar el codigo"),
  newPassword: yup
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("Debes ingresar una nueva contraseña"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Las contraseñas no coinciden")
    .required("Debes confirmar tu contraseña"),
});

// ---- Form input interfaces ----

interface EmailFormInputs {
  email: string;
}

interface ConfirmFormInputs {
  code: string;
  newPassword: string;
  confirmPassword: string;
}

// ---- Step: email ----

interface EmailStepProps {
  onSuccess: (email: string) => void;
}

function EmailStep({ onSuccess }: EmailStepProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormInputs>({
    resolver: yupResolver(EmailSchema),
  });

  const onSubmit = async (data: EmailFormInputs) => {
    const result = await dispatch(forgotPassword({ email: data.email.trim().toLowerCase() }));
    if (forgotPassword.fulfilled.match(result)) {
      onSuccess(data.email.trim().toLowerCase());
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="mt-6 text-xl font-semibold text-slate-700 text-center">
        Recuperar contraseña
      </h2>
      <p className="mt-2 text-sm text-slate-500 text-center">
        Te enviaremos un codigo a tu email
      </p>

      <div className="mt-8 input-form">
        <FormLabel
          htmlFor="emailLabel"
          className="flex flex-col w-full sm:flex-row text-slate-500"
        >
          Email
        </FormLabel>
        <FormInput
          {...register("email")}
          id="emailLabel"
          type="email"
          className={clsx({ "border-danger": errors.email }, "p-4")}
          placeholder="example@gmail.com"
        />
        {errors.email && (
          <div className="mt-2 text-danger text-sm">{errors.email.message}</div>
        )}
      </div>

      {user.errorMessage && (
        <div className="my-4 text-danger text-md">{user.errorMessage}</div>
      )}

      <div className="text-center mt-8">
        <Button
          rounded
          type="submit"
          className="mb-4 w-full bg-gradient-to-r from-[#F194EE] to-[#AE5EAB] px-12 py-4 border-[1px] border-[#F194EE]"
        >
          <span className="ml-2 text-white text-lg">Enviar codigo</span>
        </Button>

        <Link to={PUBLIC} className="text-sm text-primary hover:underline">
          Volver al inicio de sesion
        </Link>
      </div>
    </form>
  );
}

// ---- Step: confirm ----

interface ConfirmStepProps {
  email: string;
  onSuccess: () => void;
}

function ConfirmStep({ email, onSuccess }: ConfirmStepProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuth);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConfirmFormInputs>({
    resolver: yupResolver(ConfirmSchema),
  });

  const onSubmit = async (data: ConfirmFormInputs) => {
    const result = await dispatch(
      confirmForgotPassword({
        email,
        code: data.code.trim(),
        newPassword: data.newPassword,
      })
    );
    if (confirmForgotPassword.fulfilled.match(result)) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="mt-6 text-xl font-semibold text-slate-700 text-center">
        Ingresa el codigo
      </h2>
      <p className="mt-2 text-sm text-slate-500 text-center">
        Revisa tu email y escribe el codigo de verificacion
      </p>

      <div className="mt-8 input-form">
        <FormLabel
          htmlFor="codeLabel"
          className="flex flex-col w-full sm:flex-row text-slate-500"
        >
          Codigo de verificacion
        </FormLabel>
        <FormInput
          {...register("code")}
          id="codeLabel"
          type="text"
          maxLength={6}
          className={clsx({ "border-danger": errors.code }, "p-4 tracking-widest")}
          placeholder="123456"
        />
        {errors.code && (
          <div className="mt-2 text-danger text-sm">{errors.code.message}</div>
        )}
      </div>

      <div className="mt-6 input-form">
        <FormLabel
          htmlFor="newPasswordLabel"
          className="flex flex-col w-full sm:flex-row text-slate-500"
        >
          Nueva contraseña
        </FormLabel>
        <div className="relative">
          <FormInput
            {...register("newPassword")}
            id="newPasswordLabel"
            type={showNewPassword ? "text" : "password"}
            className={clsx({ "border-danger": errors.newPassword }, "p-4 pr-12")}
            placeholder="* * * * * * * *"
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 focus:outline-none"
            aria-label={showNewPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            <Lucide icon={showNewPassword ? "EyeOff" : "Eye"} className="w-5 h-5" />
          </button>
        </div>
        {errors.newPassword && (
          <div className="mt-2 text-danger text-sm">{errors.newPassword.message}</div>
        )}
      </div>

      <div className="mt-6 input-form">
        <FormLabel
          htmlFor="confirmPasswordLabel"
          className="flex flex-col w-full sm:flex-row text-slate-500"
        >
          Confirmar contraseña
        </FormLabel>
        <div className="relative">
          <FormInput
            {...register("confirmPassword")}
            id="confirmPasswordLabel"
            type={showConfirmPassword ? "text" : "password"}
            className={clsx({ "border-danger": errors.confirmPassword }, "p-4 pr-12")}
            placeholder="* * * * * * * *"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 focus:outline-none"
            aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            <Lucide icon={showConfirmPassword ? "EyeOff" : "Eye"} className="w-5 h-5" />
          </button>
        </div>
        {errors.confirmPassword && (
          <div className="mt-2 text-danger text-sm">{errors.confirmPassword.message}</div>
        )}
      </div>

      {user.errorMessage && (
        <div className="my-4 text-danger text-md">{user.errorMessage}</div>
      )}

      <div className="text-center mt-8">
        <Button
          rounded
          type="submit"
          className="mb-4 w-full bg-gradient-to-r from-[#F194EE] to-[#AE5EAB] px-12 py-4 border-[1px] border-[#F194EE]"
        >
          <span className="ml-2 text-white text-lg">Cambiar contraseña</span>
        </Button>
      </div>
    </form>
  );
}

// ---- Step: success ----

function SuccessStep() {
  return (
    <div className="text-center mt-6">
      <div className="flex justify-center mb-4">
        <Lucide icon="CheckCircle" className="w-16 h-16 text-success" />
      </div>
      <h2 className="text-xl font-semibold text-slate-700">Contraseña cambiada</h2>
      <p className="mt-2 text-sm text-slate-500">
        Tu contraseña ha sido actualizada correctamente.
      </p>
      <div className="mt-8">
        <Link to={PUBLIC}>
          <Button
            rounded
            type="button"
            className="w-full bg-gradient-to-r from-[#F194EE] to-[#AE5EAB] px-12 py-4 border-[1px] border-[#F194EE]"
          >
            <span className="ml-2 text-white text-lg">Ir al inicio de sesion</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

// ---- Main page ----

function ForgotPassword() {
  const [step, setStep] = useState<ForgotStep>("email");
  const [email, setEmail] = useState("");

  const handleEmailSuccess = (submittedEmail: string) => {
    setEmail(submittedEmail);
    setStep("confirm");
  };

  const handleConfirmSuccess = () => {
    setStep("success");
  };

  return (
    <div className="bg-primary">
      <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
          <div className="bg-white border border-gray-300 rounded-lg p-12 pt-8 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <div className="flex justify-center">
              <LogoColor />
            </div>

            {step === "email" && (
              <EmailStep onSuccess={handleEmailSuccess} />
            )}
            {step === "confirm" && (
              <ConfirmStep email={email} onSuccess={handleConfirmSuccess} />
            )}
            {step === "success" && <SuccessStep />}
          </div>

          <div className="lg:h-[400px] md:h-[300px] max-md:mt-8 block lg:block max-md:hidden">
            <Swimmer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
