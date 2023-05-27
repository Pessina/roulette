"use client";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/general/Button";
import Input from "@/components/general/Input";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
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
            {...register("email", { required: "Email is required." })}
            className="w-full px-4 py-2 bg-background-700 text-text-100 rounded focus:ring-primary-500"
          />
          <Input
            type="password"
            id="password"
            label="Password"
            {...register("password", { required: "Password is required." })}
            className="w-full px-4 py-2 bg-background-700 text-text-100 rounded focus:ring-primary-500"
          />
          <Button type="submit" theme="primary">
            Login
          </Button>
        </form>
        <div className="text-center">
          <a
            href="#"
            className="text-primary-500 hover:text-primary-700 transition-colors"
          >
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
