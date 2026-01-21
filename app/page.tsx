"use client";

import Button from "@/components/ui/Button";

export default function Page() {
  function handleSignIn() {
    console.log("Signed in");
  }

  return (
    <div>
      <Button text="Sign in" onclick={handleSignIn} />
    </div>
  );
}
