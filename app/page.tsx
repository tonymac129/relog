"use client";

import { FiLogIn, FiUser } from "react-icons/fi";
import Button from "@/components/ui/Button";

export default function Page() {
  function handleSignIn() {
    console.log("Signed in");
  }

  return (
    <div className="w-full px-70 py-10">
      <div className="flex gap-x-5 justify-center">
        <Button primary={true} onclick={handleSignIn}>
          <FiLogIn size={25} /> Sign in
        </Button>
        <Button onclick={handleSignIn}>
          <FiUser size={25} /> Guest mode
        </Button>
      </div>
    </div>
  );
}
