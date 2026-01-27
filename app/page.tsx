"use client";

import type { ActivityType, DayType } from "@/types/Logs";
import { FiUser } from "react-icons/fi";
import { useState, useEffect, useMemo, FormEvent, useRef } from "react";
import { useSession } from "next-auth/react";
import { getUserLogs, updateUserLogs } from "./actions";
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
  const [loading, setLoading] = useState<boolean>(true);
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
  const { data: session } = useSession();

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
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    if (session?.user?.email) {
      async function fetchLogs() {
        const logs = await getUserLogs(session!.user!.email!);
        setLogs(logs);
      }

      fetchLogs();
    }
    setLoading(false);
  }, [session]);

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
    if (session?.user?.email) {
      updateUserLogs(session.user.email, logs);
    } else if (typeof window !== "undefined" && guestMode && logs.length > 0) {
      localStorage.setItem("relog-logs", JSON.stringify(logs));
    }
  }, [logs, guestMode, session]);

  function handleAddLog() {
    setLogModalOpen(true);
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
    <div className="flex justify-center">
      <div className="px-5 md:px-20 max-w-300 flex-1 flex justify-center relative">
        {guestMode || session?.user ? (
          <div className="w-full lg:w-[75%] flex flex-col items-center">
            <Manage search={search} setSearch={setSearch} setFiltering={setFiltering} handleAddLog={handleAddLog} />
            <Logs displayed={displayedLogs} days={logs} setLogs={setLogs} />
            {logModalOpen && (
              <Modal close={() => setLogModalOpen(false)}>
                <form className="flex flex-col gap-y-2 sm:gap-y-5" onSubmit={(e) => handleLog(e)}>
                  <h2 className="text-center text-black dark:text-white font-bold text-lg sm:text-2xl">Log Activity</h2>
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
        ) : loading ? (
          <div className="py-10 text-lg">Loading...</div>
        ) : (
          <div className="py-10 flex flex-col items-center gap-y-10 w-full">
            <h1 className="text-4xl text-black dark:text-white text-center font-bold">Welcome to Relog!</h1>
            <div className="flex gap-x-5 justify-center">
              <SignInBtn />
              <Button onclick={handleGuest}>
                <FiUser size={25} /> Guest mode
              </Button>
            </div>
            <p className="text-gray-700 dark:text-gray-300 w-full sm:w-[75%]">
              Relog is the best daily activity tracker where you can keep track of what you did each day with custom activities!
              You can browse and manage these activities effectively using features such as searching, filtering, starring,
              editing, and deleting, as well as exporting and importing user data! The app supports both online data syncing with
              OAuth providers and guest mode with local data stroage.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
