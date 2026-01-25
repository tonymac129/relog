"use client";

import { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import SignInModal from "./SignInModal";

function SignInBtn() {
  const [signInModalOpen, setSignInModalOpen] = useState<boolean>(false);

  return (
    <>
      <div
        className="cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-800 rounded-full flex items-center px-3 py-2 gap-x-3 font-bold"
        onClick={() => setSignInModalOpen(true)}
      >
        <FiLogIn size={20} /> Sign in
      </div>

      {signInModalOpen && <SignInModal close={() => setSignInModalOpen(false)} />}
    </>
  );
}

export default SignInBtn;
