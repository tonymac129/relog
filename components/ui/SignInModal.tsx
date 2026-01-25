import { signIn } from "next-auth/react";
import { BsGoogle, BsGithub } from "react-icons/bs";
import Modal from "./Modal";
import Button from "./Button";

function SignInModal({ close }: { close: () => void }) {
  function handleGuest() {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("relog-guest", "true");
      window.location.reload();
    }
  }

  function handleOAuthSignin(provider: string) {
    signIn(provider);
  }

  return (
    <Modal close={close}>
      <div className="flex flex-col gap-y-5 py-5">
        <h2 className="text-center text-black dark:text-white font-bold text-2xl mb-5">Sign in to Relog</h2>
        <Button primary={true} onclick={() => handleOAuthSignin("google")}>
          <BsGoogle size={25} /> Sign in with Google
        </Button>
        <Button primary={true} onclick={() => handleOAuthSignin("github")}>
          <BsGithub size={25} /> Sign in with GitHub
        </Button>
        <Button onclick={handleGuest}>Continue in Guest Mode</Button>
      </div>
    </Modal>
  );
}

export default SignInModal;
