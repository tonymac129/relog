"use client";

import { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import SignInModal from "./SignInModal";
import { AnimatePresence } from "framer-motion";

function SignInBtn({ nav }: { nav?: boolean }) {
  const [signInModalOpen, setSignInModalOpen] = useState<boolean>(false);

  return (
    <>
      <div
        className={`cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-800 rounded-full flex items-center px-3 py-2 gap-x-3 font-bold ${!nav ? "bg-amber-800 hover:bg-amber-700!  border-2 border-amber-800 hover:border-amber-700 text-white" : ""}`}
        onClick={() => setSignInModalOpen(true)}
      >
        <FiLogIn size={20} /> <span className={nav ? "hidden sm:inline" : ""}>Sign in</span>
      </div>
      <AnimatePresence>{signInModalOpen && <SignInModal close={() => setSignInModalOpen(false)} />}</AnimatePresence>
    </>
  );
}

export default SignInBtn;
