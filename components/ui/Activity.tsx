import type { ActivityType, DayType } from "@/types/Logs";
import ActivityButtons from "./ActivityButtons";

type ActivityProps = {
  activity: ActivityType;
  days: DayType[];
  setLogs: React.Dispatch<React.SetStateAction<DayType[]>>;
};

function Activity({ activity, days, setLogs }: ActivityProps) {
  return (
    <div className="py-2 relative flex items-center group">
      <div>
        <div className="text-lg text-black dark:text-white">{activity.title}</div>
        <div className="text-sm text-gray-700 dark:text-gray-300">{activity.description}</div>
      </div>
      <ActivityButtons activity={activity} days={days} setLogs={setLogs} />
    </div>
  );
}

export default Activity;
