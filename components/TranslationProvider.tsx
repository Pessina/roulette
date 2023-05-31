"use client";
import "../i18n";

import React from "react";

type TranslationProviderProps = {
  children: React.ReactNode;
};

const TranslationProvider: React.FC<TranslationProviderProps> = ({
  children,
}) => {
  return <>{children}</>;
};

export default TranslationProvider;
