"use client";

import type { ActivityType, DayType } from "@/types/Logs";
import { FiLogIn, FiPlus, FiUser } from "react-icons/fi";
import { useState, useEffect, useMemo } from "react";
import Button from "@/components/ui/Button";
import Manage from "./Manage";
import Logs from "./Logs";
import Modal from "@/components/ui/Modal";

const inputStyles = "rounded bg-gray-300 dark:bg-gray-900 outline-none py-2 px-4 text-lg";

export default function Page() {
  const [guestMode, setGuestMode] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [logs, setLogs] = useState<DayType[]>([
    {
      id: "saldkfj",
      date: new Date(),
      activities: [{ id: "asdf", title: "test activity 1", description: "description 1", date: new Date() }],
    },
    {
      id: "asdf",
      date: new Date("1/25/26"),
      activities: [{ id: "sadf", title: "test activity 2", description: "description 2", date: new Date() }],
    },
  ]);
  const [logModalOpen, setLogModalOpen] = useState<boolean>(false);
  const [newActivity, setNewActivity] = useState<ActivityType>({
    id: crypto.randomUUID(),
    title: "",
    description: "",
    date: new Date(),
  });
  const displayedLogs = useMemo<DayType[]>(() => {
    return logs
      .map((log) => ({
        ...log,
        activities: log.activities.filter((activity) =>
          activity.title.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase()),
        ),
      }))
      .filter((log) => log.activities.length > 0);
  }, [logs, search]);

  useEffect(() => {
    setGuestMode(() => {
      if (typeof window !== "undefined") {
        return JSON.parse(sessionStorage.getItem("relog-guest")!) || false;
      }
      return false;
    });
  }, []);

  useEffect(() => {
    if (logModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    setNewActivity({
      id: crypto.randomUUID(),
      title: "",
      description: "",
      date: new Date(),
    });
  }, [logModalOpen]);

  function handleAddLog() {
    setLogModalOpen(true);
  }

  function handleSignIn() {
    console.log("Signed in");
  }

  function handleGuest() {
    setGuestMode(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("relog-guest", "true");
    }
  }

  function handleLog() {
    const newLogs = [...logs];
    newLogs[1].activities.push(newActivity);
    setLogs(newLogs);
    setLogModalOpen(false);
  }

  return (
    <div className="w-full px-70 flex justify-center relative">
      {guestMode ? (
        <div className="w-[65%]  flex flex-col items-center">
          <div className="absolute right-70 top-10">
            <Button primary={true} onclick={handleAddLog}>
              <FiPlus size={25} /> Add log
            </Button>
          </div>
          <Manage search={search} setSearch={setSearch} />
          <Logs days={displayedLogs} />
          {logModalOpen && (
            <Modal close={() => setLogModalOpen(false)}>
              <div className="flex flex-col gap-y-5">
                <h2 className="text-center text-black dark:text-white font-bold text-2xl">Log Activity</h2>
                <input
                  type="text"
                  placeholder="Title"
                  value={newActivity.title}
                  onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                  className={inputStyles}
                />
                <input
                  type="date"
                  value={`${newActivity.date.getFullYear()}-${newActivity.date.getMonth()}-${newActivity.date.getDate()}`}
                  onChange={(e) => setNewActivity({ ...newActivity, date: new Date(e.target.value) })}
                  className={inputStyles}
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newActivity.description}
                  onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                  className={inputStyles}
                />
                <Button primary={true} onclick={handleLog}>
                  Add activity
                </Button>
              </div>
            </Modal>
          )}
          {/*TODO: add animation for modal*/}
        </div>
      ) : (
        <div className="flex gap-x-5 justify-center">
          <Button primary={true} onclick={handleSignIn}>
            <FiLogIn size={25} /> Sign in
          </Button>
          <Button onclick={handleGuest}>
            <FiUser size={25} /> Guest mode
          </Button>
        </div>
      )}
    </div>
  );
}
