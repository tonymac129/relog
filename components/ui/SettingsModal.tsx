"use client";

import { useSession } from "next-auth/react";
import { BsDatabase } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { signOut } from "next-auth/react";
import Button from "./Button";
import Modal from "./Modal";

type SettingsModalProps = {
  close: () => void;
  deleteUserAccount: () => Promise<void>;
};

function SettingsModal({ close, deleteUserAccount }: SettingsModalProps) {
  const { data: session } = useSession();

  function handleExport() {
    console.log("export");
  }
  function handleImport() {
    console.log("import");
  }

  function handleLogout() {
    sessionStorage.clear();
    signOut();
  }

  async function handleDelete() {
    if (
      confirm("Are you sure you want to permenantly delete your Relog account and all your data? This action cannot be undone.")
    ) {
      if (session?.user) {
        await deleteUserAccount();
        handleLogout();
      } else {
        localStorage.clear();
        handleLogout();
      }
    }
  }

  return (
    <Modal close={close}>
      <div className="flex flex-col gap-y-5 py-5">
        <h2 className="text-center text-black dark:text-white font-bold text-3xl mb-5">Settings</h2>
        <div className="flex flex-col gap-y-3">
          <h3 className="flex items-center gap-x-3 font-bold text-xl">
            <BsDatabase size={25} /> Data Control
          </h3>
          <Button primary={true} onclick={handleExport}>
            Export data
          </Button>
          <Button onclick={handleImport}>Import data</Button>
        </div>
        <div className="flex flex-col gap-y-3">
          <h3 className="flex items-center gap-x-3 font-bold text-xl">
            <MdAccountCircle size={25} /> Account
          </h3>
          <Button primary={true} onclick={handleLogout}>
            Log out
          </Button>
          <Button onclick={handleDelete}>Delete account</Button>
        </div>
        <div className="text-gray-700 dark:text-gray-300 text-sm text-center mt-5">
          &copy; {new Date().getFullYear()}{" "}
          <a href="https://github.com/tonymac129" className="underline" target="_blank">
            Tony Macaroni
          </a>
        </div>
      </div>
    </Modal>
  );
}

export default SettingsModal;
