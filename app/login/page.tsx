"use client";
import "firebase/auth";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import Button from "@/components/general/Button";
import Input from "@/components/general/Input";
import { auth } from "@/firebase";

type LoginForm = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required."),
  password: yup.string().required("Password is required."),
});

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });

  const [inputsError, setInputsError] = useState("");

  const onSubmit = async (data: LoginForm) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setInputsError("");
    } catch (error) {
      console.error((error as { message: string }).message);
      setInputsError("Wrong credentials");
    }
  };

  const handleForgotPassword = async () => {
    const email = getValues("email");
    if (email) {
      try {
        await sendPasswordResetEmail(auth, email);
        setInputsError("");
      } catch (error) {
        setInputsError((error as { message: string }).message);
      }
    } else {
      setInputsError("Please fill in your email.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-900">
      <div className="shadow-lg p-6 rounded-lg bg-background-500 flex flex-col gap-4 w-[300px] max-w-[80%]">
        <Image
          src="/logo.png"
          alt="logo"
          width={200}
          height={200}
          className="self-center"
        />
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            type="email"
            id="email"
            label="Email"
            {...register("email")}
            className="w-full px-4 py-2 bg-background-700 text-text-100 rounded focus:ring-primary-500"
            error={errors.email?.message}
          />
          <Input
            type="password"
            id="password"
            label="Password"
            {...register("password")}
            className="w-full px-4 py-2 bg-background-700 text-text-100 rounded focus:ring-primary-500"
            error={errors.password?.message}
          />
          <Button type="submit" theme="primary">
            Login
          </Button>
        </form>
        <div className="text-center">
          <button
            onClick={handleForgotPassword}
            className="text-primary-500 hover:text-primary-700 transition-colors"
          >
            Forgot Password?
          </button>
          {inputsError && <div className="text-red-500">{inputsError}</div>}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
