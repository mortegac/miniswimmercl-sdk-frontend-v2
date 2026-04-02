
import { useState } from "react";
import { Link, redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import clsx from "clsx";

import {LogoColor} from "../../../assets/images/logoColor";
import {Swimmer} from "../../../assets/images/swimmer";

import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { selectAuth, getLoginUser, confirmNewPassword, resetNewPasswordFlag } from "@/stores/Users/slice";
import { PUBLIC_FORGOTTEN_PASSWORD } from "@/router/paths";




import Splash from "@/components/Splash";
import Button from "@/components/Base/Button";
import { FormInput, FormLabel } from "@/components/Base/Form";
import Lucide from "@/components/Base/Lucide";

const LoginSchema = yup.object().shape({
  email: yup.string().required("debes colocar tu email."),
  password: yup.string().required("debes colocar tu contraseña"),
});

const NewPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("debes ingresar una nueva contraseña"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Las contraseñas no coinciden")
    .required("debes confirmar tu contraseña"),
});

interface LoginFormInputs {
  email: string;
  password: string;
}

interface NewPasswordFormInputs {
  newPassword: string;
  confirmPassword: string;
}

function NewPasswordForm() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuth);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordFormInputs>({
    resolver: yupResolver(NewPasswordSchema),
  });

  const onSubmit = async (data: NewPasswordFormInputs) => {
    await dispatch(confirmNewPassword({ newPassword: data.newPassword }));
  };

  const handleCancel = () => {
    dispatch(resetNewPasswordFlag());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="mt-6 text-xl font-semibold text-slate-700 text-center">
        Debes cambiar tu contraseña
      </h2>
      <p className="mt-2 text-sm text-slate-500 text-center">
        Tu contraseña temporal requiere ser actualizada antes de continuar.
      </p>

      <div className="mt-8 input-form">
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
        <button
          type="button"
          onClick={handleCancel}
          className="text-sm text-slate-500 hover:text-primary focus:outline-none"
        >
          Volver al inicio de sesion
        </button>
      </div>
    </form>
  );
}

function Main() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuth);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    const { email, password } = data;
    await dispatch(getLoginUser({ email: email.trim().toLowerCase(), password }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (user.isAuthenticated || user.status === "loading") {
    return <Splash />;
  }

  return (
    <>
      {user.isAuthenticated && redirect("/")}
      <div className="bg-primary">
        <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
          <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
            <div className="bg-white border border-gray-300 rounded-lg p-12 pt-8 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
              <div className="flex justify-center">
                <LogoColor />
              </div>

              {user.requiresNewPassword ? (
                <NewPasswordForm />
              ) : (
                <>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-10 input-form">
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
                        name="email"
                        className={clsx({ "border-danger": errors.email }, "p-4 ")}
                        placeholder="example@gmail.com"
                      />
                      {errors.email && (
                        <div className="mt-2 text-danger">
                          {typeof errors.email.message === "string" && "* Campo obligatorio"}
                        </div>
                      )}
                    </div>

                    <div className="mt-6 input-form">
                      <FormLabel
                        htmlFor="passwordLabel"
                        className="flex flex-col w-full sm:flex-row text-slate-500"
                      >
                        Password
                      </FormLabel>
                      <div className="relative">
                        <FormInput
                          {...register("password")}
                          id="passwordLabel"
                          type={showPassword ? "text" : "password"}
                          name="password"
                          className={clsx({ "border-danger": errors.password }, "p-4 pr-12")}
                          placeholder="* * * * * * *"
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 focus:outline-none"
                          aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        >
                          <Lucide
                            icon={showPassword ? "EyeOff" : "Eye"}
                            className="w-5 h-5"
                          />
                        </button>
                      </div>
                      {errors.password && (
                        <div className="mt-2 text-danger">
                          {typeof errors.password.message === "string" && "* Campo obligatorio"}
                        </div>
                      )}
                      <div className="mt-2 text-right">
                        <Link
                          to={PUBLIC_FORGOTTEN_PASSWORD}
                          className="text-sm text-primary hover:underline"
                        >
                          ¿Olvidaste tu contraseña?
                        </Link>
                      </div>
                    </div>

                    <div className="my-6 text-danger text-md">{user.errorMessage}</div>

                    <div className="text-center intro-x xl:mt-8 xl:text-left">
                      <Button
                        rounded
                        type="submit"
                        className="mb-6 w-full bg-gradient-to-r from-[#F194EE] to-[#AE5EAB] px-12 py-4 border-[1px] border-[#F194EE] "
                      >
                        <span className="ml-2 text-white text-lg">Ingresar</span>
                      </Button>
                    </div>
                  </form>

                </>
              )}
            </div>
            <div className="lg:h-[400px] md:h-[300px] max-md:mt-8 block lg:block max-md:hidden">
              <Swimmer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
