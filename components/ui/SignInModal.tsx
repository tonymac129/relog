import { useState } from "react";
import { signIn } from "next-auth/react";
import { BsGoogle, BsGithub } from "react-icons/bs";
import Modal from "./Modal";
import Button from "./Button";

function SignInModal({ close }: { close: () => void }) {
  const [loading, setLoading] = useState<string>("");

  function handleGuest() {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("relog-guest", "true");
      window.location.reload();
    }
  }

  function handleOAuthSignin(provider: string) {
    setLoading(provider);
    signIn(provider);
  }

  return (
    <Modal close={close}>
      <div className="flex flex-col gap-y-2 sm:gap-y-5 py-2 sm:py-5">
        <h2 className="text-center text-black dark:text-white font-bold text-lg sm:text-2xl mb-3 sm:mb-5">Sign in to Relog</h2>
        <Button primary={true} onclick={() => handleOAuthSignin("google")}>
          {loading === "google" ? (
            "Loading..."
          ) : (
            <>
              <BsGoogle size={25} /> Sign in with Google
            </>
          )}
        </Button>
        <Button primary={true} onclick={() => handleOAuthSignin("github")}>
          {loading === "github" ? (
            "Loading..."
          ) : (
            <>
              <BsGithub size={25} /> Sign in with GitHub
            </>
          )}
        </Button>
        <Button onclick={handleGuest}>Continue in Guest Mode</Button>
      </div>
    </Modal>
  );
}

export default SignInModal;
