import { DayType } from "@/types/Logs";
import Day from "@/components/ui/Day";

type LogsProps = {
  displayed: DayType[];
  days: DayType[];
  setLogs: React.Dispatch<React.SetStateAction<DayType[]>>;
};

function Logs({ displayed, days, setLogs }: LogsProps) {
  return (
    <div className="w-full flex flex-col gap-y-5 pb-5">
      {displayed.length > 0 ? (
        displayed.map((day: DayType) => {
          return <Day key={day.id} day={day} days={days} setLogs={setLogs} />;
        })
      ) : (
        <div className="text-center text-gray-700 dark:text-gray-300">
          No logs found. Try clearing the filter or adding an activity above!
        </div>
      )}
    </div>
  );
}

export default Logs;
