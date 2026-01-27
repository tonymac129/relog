"use client";

import type { DayType } from "@/types/Logs";
import { useSession } from "next-auth/react";
import { BsDatabase } from "react-icons/bs";
import { MdAccountCircle, MdDownload, MdDelete } from "react-icons/md";
import { TbDatabaseImport } from "react-icons/tb";
import { FiLogIn } from "react-icons/fi";
import { signOut } from "next-auth/react";
import { useState, useEffect, ChangeEvent } from "react";
import { getUserLogs, updateUserLogs } from "@/app/actions";
import Button from "./Button";
import Modal from "./Modal";

type SettingsModalProps = {
  close: () => void;
  deleteUserAccount: () => Promise<void>;
};

function SettingsModal({ close, deleteUserAccount }: SettingsModalProps) {
  const [logs, setLogs] = useState<DayType[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.email) {
      async function fetchLogs() {
        const logs = await getUserLogs(session!.user!.email!);
        setLogs(logs);
      }

      fetchLogs();
    } else {
      setLogs(() => {
        if (typeof window !== "undefined") {
          return JSON.parse(localStorage.getItem("relog-logs")!) || [];
        }
        return [];
      });
    }
  }, [session]);

  useEffect(() => {
    if (session?.user?.email && logs.length > 0) {
      updateUserLogs(session.user.email, logs);
    } else if (typeof window !== "undefined" && sessionStorage.getItem("relog-guest") && logs.length > 0) {
      localStorage.setItem("relog-logs", JSON.stringify(logs));
    }
  }, [logs, session]);

  function handleExport() {
    const data = JSON.stringify(logs, null, 1);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "relog-data.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  function handleImport(e: ChangeEvent) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e: Event) => {
      try {
        const importedData = JSON.parse(e.target?.result);
        if (Array.isArray(importedData)) {
          setLogs(importedData);
          if (typeof window !== "undefined" && !session && !sessionStorage.getItem("relog-guest")) {
            sessionStorage.setItem("relog-guest", "true");
          }
          window.location.reload();
        } else {
          alert("invalid file format");
        }
      } catch (err) {
        alert("Error: " + err);
      }
    };
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
      <div className="flex flex-col gap-y-2 sm:gap-y-5 py-2 sm:py-5">
        <h2 className="text-center text-black dark:text-white font-bold text-lg sm:text-2xl mb-0 sm:mb-3">Settings</h2>
        <div className="flex flex-col gap-y-1 sm:gap-y-3">
          <h3 className="flex items-center gap-x-3 font-bold text-xl">
            <BsDatabase size={25} /> Data Control
          </h3>
          {((typeof window !== "undefined" && sessionStorage.getItem("relog-guest")) || session) && (
            <Button primary={true} onclick={handleExport}>
              <MdDownload size={25} />
              Export data
            </Button>
          )}
          <Button onclick={() => null}>
            <label className="flex gap-x-4 w-full justify-center cursor-pointer">
              <TbDatabaseImport size={25} /> Import data{" "}
              <input type="file" className="hidden" accept="application/json" onChange={handleImport} />
            </label>
          </Button>
        </div>
        {((typeof window !== "undefined" && sessionStorage.getItem("relog-guest")) || session) && (
          <div className="flex flex-col gap-y-1 sm:gap-y-3">
            <h3 className="flex items-center gap-x-3 font-bold text-xl">
              <MdAccountCircle size={25} /> Account
            </h3>
            <Button primary={true} onclick={handleLogout}>
              <FiLogIn size={25} />
              Log out
            </Button>
            <Button onclick={handleDelete}>
              <MdDelete size={25} />
              Delete account
            </Button>
          </div>
        )}
        <div className="text-gray-700 dark:text-gray-300 text-sm text-center mt-2 sm:mt-5">
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
