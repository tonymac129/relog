import type { ActivityType } from "@/types/Logs";
import { FaEdit, FaTrash } from "react-icons/fa";

const activityIconStyles = "cursor-pointer hover:scale-110 hover:-translate-y-0.5 transition-transform!";

function Activity({ activity }: { activity: ActivityType }) {
  return (
    <div className="py-2 relative flex items-center group">
      <div>
        <div className="text-lg text-black dark:text-white">{activity.title}</div>
        <div className="text-sm text-gray-700 dark:text-gray-300">{activity.description}</div>
      </div>
      <div className="absolute right-0 gap-x-5 items-center flex opacity-0 group-hover:opacity-100 transition-opacity!">
        <FaEdit size={20} title="Edit activity" className={activityIconStyles} />
        <FaTrash size={20} title="Delete activity" className={activityIconStyles} />
      </div>
    </div>
  );
}

export default Activity;
