"use client";
import { signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiLogOut } from "react-icons/fi";

import { routes } from "@/constants/routes";

import { auth } from "../firebase";
import Button from "./Button";

type HeaderProps = {
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ className }) => {
  const { t } = useTranslation("", { keyPrefix: "header" });

  const [isLoading, setIsLoading] = useState(false);

  return (
    <header
      className={`flex justify-between pr-8 items-center bg-background-900 text-text-700 shadow-lg ${className}`}
    >
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/images/logo.png"
            width={200}
            height={200}
            alt={t("logoAlt")}
            className="w-[12em] h-auto"
          />
        </Link>
        <nav className="ml-4">
          <ul className="flex space-x-4">
            <li>
              <Link
                href={routes.ROULETTE}
                className="text-xl hover:text-primary-500 transition-colors duration-200"
              >
                {t("roulette")}
              </Link>
            </li>
            <li>
              <Link
                href={routes.PRODUCTS}
                className="text-xl hover:text-primary-500 transition-colors duration-200"
              >
                {t("products")}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <Button
        loading={isLoading}
        theme="danger"
        className="flex items-center text-xl gap-2 my-4"
        onClick={async () => {
          setIsLoading(true);
          try {
            await signOut(auth);
          } catch (error) {
            console.error(error);
          } finally {
            setIsLoading(false);
          }
        }}
        rightIcon={<FiLogOut />}
      >
        {t("logout")}
      </Button>
    </header>
  );
};

export default Header;
