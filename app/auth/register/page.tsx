"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Input from "@/components/Input";

import { auth } from "../../../firebase";

type RegisterForm = {
  email: string;
  password: string;
};

const RegisterPage: React.FC = () => {
  const { t } = useTranslation("", { keyPrefix: "registerPage" });
  const router = useRouter();

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
  } = useForm<RegisterForm>({ resolver: yupResolver(schema) });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: RegisterForm) => {
    try {
      setIsLoading(true);
      await setPersistence(auth, browserLocalPersistence);
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      router.push("/"); // navigate to home page after successful registration
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-900">
      <Card className="bg-background-500 flex flex-col gap-4 w-[20%] p-4">
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
          <Button loading={isLoading} type="submit" theme="primary">
            {t("registerButton") ?? ""}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default RegisterPage;
