import { signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { auth } from "../../firebase";
import Button from "../general/Button";
import { LogOutIcon } from "../general/icons";

type HeaderProps = {
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ className }) => {
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
        theme="danger"
        className="flex items-center text-xl gap-2"
        onClick={() => signOut(auth)}
        rightIcon={<LogOutIcon className="h-4 w-4" />}
      >
        Logout
      </Button>
    </header>
  );
};

export default Header;
