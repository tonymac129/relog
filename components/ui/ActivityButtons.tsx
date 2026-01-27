"use client";

import type { ActivityType, DayType } from "@/types/Logs";
import { FaEdit, FaTrash, FaStar, FaRegStar } from "react-icons/fa";
import { FormEvent, useState } from "react";
import Modal from "./Modal";
import Button from "./Button";

const activityIconStyles = "cursor-pointer hover:scale-110 hover:-translate-y-0.5 transition-transform!";
const inputStyles = "rounded bg-gray-300 dark:bg-gray-900 outline-none py-2 px-4 text-lg";

type ActivityButtonsProps = {
  activity: ActivityType;
  days: DayType[]; //TODO: remove this prop drilling
  setLogs: React.Dispatch<React.SetStateAction<DayType[]>>; //and this one
};

function ActivityButtons({ activity, days, setLogs }: ActivityButtonsProps) {
  const [editedActivity, setEditedActivity] = useState<ActivityType>(activity);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [starred, setStarred] = useState<boolean>(activity.starred || false);

  function handleStar() {
    const existingDays = [...days];
    const existingDay = existingDays.find(
      (day) => new Date(day.date).toLocaleDateString() === new Date(activity.date).toLocaleDateString(),
    )!;
    existingDay.activities[existingDay.activities.findIndex((act) => act.id === activity.id)].starred = !starred;
    setLogs(existingDays);
    setStarred(!starred);
  }

  function handleEdit(e: FormEvent) {
    e.preventDefault();
    let existingDays = [...days];
    const existingDay = existingDays.find(
      (day) => new Date(day.date).toLocaleDateString() === new Date(activity.date).toLocaleDateString(),
    )!;
    if (new Date(editedActivity.date).toLocaleDateString() !== new Date(activity.date).toLocaleDateString()) {
      const newDays = handleDelete(true)!;
      const existingDate = newDays.findIndex(
        (day) => new Date(day.date).toLocaleDateString() === editedActivity.date.toLocaleDateString(),
      );
      if (existingDate !== -1) {
        newDays[existingDate].activities.push(editedActivity);
      } else {
        newDays.push({
          id: crypto.randomUUID(),
          date: editedActivity.date,
          activities: [editedActivity],
        });
      }
      existingDays = newDays;
    } else {
      existingDay.activities[existingDay.activities.findIndex((act) => act.id === activity.id)] = editedActivity;
    }
    setLogs(existingDays);
    setEditModalOpen(false);
  }

  function handleDelete(fromEdit?: boolean) {
    const existingDays = [...days];
    const existingDay = existingDays.find(
      (day) => new Date(day.date).toLocaleDateString() === new Date(activity.date).toLocaleDateString(),
    )!;
    existingDay.activities = existingDay.activities.filter((act) => act.id !== activity.id);
    if (fromEdit) {
      return existingDays;
    } else {
      setLogs(existingDays);
    }
  }

  return (
    <div className="absolute right-0 gap-x-5 items-center flex opacity-0 group-hover:opacity-100 transition-opacity!">
      {starred ? (
        <FaStar size={20} title="Unstar activity" className={activityIconStyles} onClick={handleStar} />
      ) : (
        <FaRegStar size={20} title="Star activity" className={activityIconStyles} onClick={handleStar} />
      )}
      <FaEdit size={20} title="Edit activity" className={activityIconStyles} onClick={() => setEditModalOpen(true)} />
      <FaTrash size={20} title="Delete activity" className={activityIconStyles} onClick={() => handleDelete()} />
      {editModalOpen && (
        <Modal close={() => setEditModalOpen(false)}>
          <form className="flex flex-col gap-y-2 sm:gap-y-5" onSubmit={(e) => handleEdit(e)}>
            <h2 className="text-center text-black dark:text-white font-bold text-lg sm:text-2xl">Edit Activity</h2>
            <input
              type="text"
              placeholder="Title"
              value={editedActivity.title}
              onChange={(e) => setEditedActivity({ ...editedActivity, title: e.target.value })}
              className={inputStyles}
              //TODO: add automatic title input focus when modal opens ref
            />
            <input
              type="date"
              value={
                new Date(new Date(editedActivity.date).getTime() - new Date(editedActivity.date).getTimezoneOffset() * 60000)
                  .toISOString() //TODO timezone offset doesnt work properly cuz it gets absolute value difference
                  .split("T")[0]
              }
              onChange={(e) => {
                const outputDate = new Date(e.target.value);
                outputDate.setTime(outputDate.getTime() + outputDate.getTimezoneOffset() * 60000);
                setEditedActivity({ ...editedActivity, date: outputDate });
              }}
              className={inputStyles}
              tabIndex={-1}
            />
            <input
              type="text"
              placeholder="Description"
              value={editedActivity.description}
              onChange={(e) => setEditedActivity({ ...editedActivity, description: e.target.value })}
              className={inputStyles}
            />
            <Button primary={true} submit={true}>
              Edit activity
            </Button>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default ActivityButtons;
