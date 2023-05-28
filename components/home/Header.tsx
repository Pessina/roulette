"use client";
import { signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FiLogOut } from "react-icons/fi";

import { auth } from "../../firebase";
import Button from "../general/Button";

type HeaderProps = {
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <header
      className={`flex justify-between pr-8 items-center bg-background-900 text-text-700 shadow-lg ${className}`}
    >
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" width={200} height={200} alt="App logo" />
        </Link>
        <nav className="ml-4">
          <ul className="flex space-x-4">
            <li>
              <Link
                href="/"
                className="text-xl hover:text-primary-500 transition-colors duration-200"
              >
                Roulette
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="text-xl hover:text-primary-500 transition-colors duration-200"
              >
                Products
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <Button
        loading={isLoading}
        theme="danger"
        className="flex items-center text-xl gap-2"
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
        Logout
      </Button>
    </header>
  );
};

export default Header;
