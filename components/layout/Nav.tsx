"use client";

import { MdDarkMode, MdLightMode, MdSettings } from "react-icons/md";
import { FiLogIn, FiGithub } from "react-icons/fi";
import { useState } from "react";
import { useTheme } from "next-themes";
import SignInModal from "../ui/SignInModal";
import Link from "next/link";
import Image from "next/image";

const navBtnStyles =
  "cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-800 rounded-full flex items-center px-3 py-2 gap-x-3 font-bold";

function Nav() {
  const [signInModalOpen, setSignInModalOpen] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  return (
    <nav className="z-10 bg-gray-200 dark:bg-gray-950 w-full px-70 flex items-center justify-between gap-x-5 border-b-2 border-b-gray-700 py-2 sticky top-0">
      <div>
        <Link href="/" className="flex items-center font-bold text-xl gap-x-3">
          <Image src="/logo.png" alt="Relog logo" width={45} height={45} /> Relog
        </Link>
      </div>
      <div className="flex gap-x-3">
        <a href="https://github.com/tonymac129/relog" target="_blank" className={navBtnStyles}>
          <FiGithub size={20} /> GitHub
        </a>
        <div className={navBtnStyles} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "light" ? <MdDarkMode size={20} /> : <MdLightMode size={20} />} Theme
        </div>
        <div className={navBtnStyles}>
          <MdSettings size={20} /> Settings
        </div>
        <div className={navBtnStyles} onClick={() => setSignInModalOpen(true)}>
          <FiLogIn size={20} /> Sign in
        </div>
      </div>
      {signInModalOpen && <SignInModal close={() => setSignInModalOpen(false)} />}
    </nav>
  );
}

export default Nav;
