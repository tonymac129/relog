import { DayType } from "@/types/Logs";
import Day from "@/components/ui/Day";

function Logs({ days }: { days: DayType[] }) {
  return (
    <div className="w-full flex flex-col gap-y-5 pb-5">
      {days.length > 0 ? (
        days.map((day: DayType) => {
          return <Day key={day.id} day={day} />;
        })
      ) : (
        <div className="text-center text-gray-700 dark:text-gray-300">
          No logs added so far. Start logging by adding an activity above!
        </div>
      )}
    </div>
  );
}

export default Logs;
