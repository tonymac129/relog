import type { ActivityType, DayType } from "@/types/Logs";
import Activity from "./Activity";

type DayProps = {
  day: DayType;
  days: DayType[];
  setLogs: React.Dispatch<React.SetStateAction<DayType[]>>;
};

function Day({ day, days, setLogs }: DayProps) {
  return (
    <div className="rounded bg-gray-300 dark:bg-gray-900">
      <div className="text-lg font-bold text-black dark:text-white py-3 px-5 border-b-2 border-b-gray-700">
        {new Date(day.date).toLocaleDateString()}
      </div>
      <div className="py-2 px-5">
        {day.activities.map((activity: ActivityType) => {
          return <Activity key={activity.id} activity={activity} days={days} setLogs={setLogs} />;
        })}
      </div>
    </div>
  );
}

export default Day;
