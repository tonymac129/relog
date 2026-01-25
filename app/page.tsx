"use client";

import type { ActivityType, DayType } from "@/types/Logs";
import { FiLogIn, FiUser } from "react-icons/fi";
import { useState, useEffect, useMemo, FormEvent, useRef } from "react";
import Button from "@/components/ui/Button";
import Manage from "./Manage";
import Logs from "./Logs";
import Modal from "@/components/ui/Modal";
import SignInBtn from "@/components/ui/SignInBtn";

const inputStyles = "rounded bg-gray-300 dark:bg-gray-900 outline-none py-2 px-4 text-lg";

export default function Page() {
  const [guestMode, setGuestMode] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [logs, setLogs] = useState<DayType[]>([]);
  const [logModalOpen, setLogModalOpen] = useState<boolean>(false);
  const [filtering, setFiltering] = useState<boolean>(false);
  const [newActivity, setNewActivity] = useState<ActivityType>({
    id: "",
    title: "",
    description: "",
    date: new Date(),
  });
  const displayedLogs = useMemo<DayType[]>(() => {
    return logs
      .map((log) => ({
        ...log,
        activities: log.activities.filter((activity) => {
          if (filtering) {
            return activity.title.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase()) && activity.starred;
          } else {
            return activity.title.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase());
          }
        }),
      }))
      .filter((log) => log.activities.length > 0)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [logs, search, filtering]);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setGuestMode(() => {
      if (typeof window !== "undefined") {
        return JSON.parse(sessionStorage.getItem("relog-guest")!) || false;
      }
      return false;
    });
    setLogs(() => {
      if (typeof window !== "undefined") {
        return JSON.parse(localStorage.getItem("relog-logs")!) || [];
      }
      return [];
      //TODO: add backend logic
    });
  }, []);

  useEffect(() => {
    if (logModalOpen) {
      document.body.classList.add("modal-open");
      titleInputRef.current?.focus();
      setNewActivity({
        id: crypto.randomUUID(),
        title: "",
        description: "",
        date: new Date(),
      });
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [logModalOpen]);

  useEffect(() => {
    if (typeof window !== "undefined" && guestMode && logs.length > 0) {
      localStorage.setItem("relog-logs", JSON.stringify(logs));
    }
    //TODO: implement backend data storage
  }, [logs, guestMode]);

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

  function handleLog(e: FormEvent) {
    e.preventDefault();
    if (newActivity.title.trim().length > 0) {
      const newLogs = [...logs];
      const existingDate = newLogs.findIndex(
        (day) => new Date(day.date).toLocaleDateString() === newActivity.date.toLocaleDateString(),
      );
      if (existingDate !== -1) {
        newLogs[existingDate].activities.push(newActivity);
      } else {
        newLogs.push({
          id: crypto.randomUUID(),
          date: newActivity.date,
          activities: [newActivity],
        });
      }
      setLogs(newLogs);
      setLogModalOpen(false);
    }
  }

  return (
    <div className="w-full px-70 flex justify-center relative">
      {guestMode ? (
        <div className="w-[65%]  flex flex-col items-center">
          <Manage search={search} setSearch={setSearch} setFiltering={setFiltering} handleAddLog={handleAddLog} />
          <Logs days={displayedLogs} setLogs={setLogs} />
          {logModalOpen && (
            <Modal close={() => setLogModalOpen(false)}>
              <form className="flex flex-col gap-y-5" onSubmit={(e) => handleLog(e)}>
                <h2 className="text-center text-black dark:text-white font-bold text-2xl">Log Activity</h2>
                <input
                  type="text"
                  placeholder="Title"
                  value={newActivity.title}
                  onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                  className={inputStyles}
                  ref={titleInputRef}
                />
                <input
                  type="date"
                  value={
                    new Date(newActivity.date.getTime() - newActivity.date.getTimezoneOffset() * 60000)
                      .toISOString()
                      .split("T")[0]
                  }
                  onChange={(e) => {
                    const outputDate = new Date(e.target.value);
                    outputDate.setTime(outputDate.getTime() + outputDate.getTimezoneOffset() * 60000);
                    setNewActivity({ ...newActivity, date: outputDate });
                  }}
                  className={inputStyles}
                  tabIndex={-1}
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newActivity.description}
                  onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                  className={inputStyles}
                />
                <Button primary={true} submit={true}>
                  Add activity
                </Button>
              </form>
            </Modal>
          )}
          {/*TODO: add animation for modal*/}
        </div>
      ) : (
        <div className="flex gap-x-5 justify-center py-10">
          <SignInBtn />
          <Button onclick={handleGuest}>
            <FiUser size={25} /> Guest mode
          </Button>
        </div>
      )}
    </div>
  );
}
