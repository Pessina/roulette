"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  browserLocalPersistence,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Input from "@/components/Forms/Input";
import { routes } from "@/constants/routes";
import { useAuth } from "@/hooks/use-auth";

import { auth } from "../../../firebase";

type LoginForm = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const { t } = useTranslation("", { keyPrefix: "loginPage" });
  const router = useRouter();

  useAuth();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email(t("emailErrorMessage") ?? "")
      .required(t("emailRequiredMessage") ?? ""),
    password: yup.string().required(t("passwordRequiredMessage") ?? ""),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });

  const [inputsError, setInputsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: LoginForm) => {
    try {
      setIsLoading(true);
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setInputsError("");
      router.push(routes.ROULETTE);
    } catch (error) {
      setInputsError(t("wrongCredentialsError") ?? "");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const email = getValues("email");
    if (email) {
      try {
        setIsLoading(true);
        await sendPasswordResetEmail(auth, email);
        setInputsError("");
      } catch (error) {
        setInputsError((error as { message: string }).message);
      } finally {
        setIsLoading(false);
      }
    } else {
      setInputsError(t("fillEmailError") ?? "");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-900">
      <Card className="bg-background-500 flex flex-col gap-4 w-[20%] p-4">
        <Image
          src="/assets/images/logo.png"
          alt="logo"
          width={200}
          height={200}
          className="self-center w-full h-auto"
        />
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            type="email"
            id="email"
            label={t("emailLabel") ?? ""}
            {...register("email")}
            className="w-full px-4 py-2 bg-background-700 text-text-100 rounded focus:ring-primary-500"
            error={errors.email?.message}
          />
          <Input
            type="password"
            id="password"
            label={t("passwordLabel") ?? ""}
            {...register("password")}
            className="w-full px-4 py-2 bg-background-700 text-text-100 rounded focus:ring-primary-500"
            error={errors.password?.message}
          />
          {inputsError && <div className="text-red-500">{inputsError}</div>}
          <Button loading={isLoading} type="submit" theme="primary">
            {t("loginButton") ?? ""}
          </Button>
        </form>
        <div className="text-center flex flex-col gap-1">
          <button
            onClick={handleForgotPassword}
            className="text-primary-500 hover:text-primary-700 transition-colors"
          >
            {t("forgotPasswordButton") ?? ""}
          </button>
          <Link
            href={routes.REGISTER}
            className="text-primary-500 hover:text-primary-700 transition-colors"
          >
            {t("registerLink")}
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
