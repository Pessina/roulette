"use client";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import { ToastContainer } from "react-toastify";

type TranslationProviderProps = {
  children: React.ReactNode;
};

const ToastifyProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  return (
    <>
      {children}
      <ToastContainer autoClose={5000} hideProgressBar />
    </>
  );
};

export default ToastifyProvider;
