const componentStyles = "bg-gray-300 dark:bg-gray-900 text-lg text-black dark:text-white rounded py-2 px-4 outline-none";

type ManageProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

function Manage({ search, setSearch }: ManageProps) {
  return (
    <div className="py-5 w-full flex flex-col items-center gap-y-2">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search activities"
        className={`${componentStyles} w-full`}
      />
      <div className="w-full flex gap-x-5">
        <label className="flex-1 flex flex-col gap-y-1">
          Sort by
          <select className={`${componentStyles} cursor-pointer appearance-none text-center px-0! py-1 font-bold`}>
            <option value="date">Date</option>
            <option value="name">Name</option>
          </select>
        </label>
        <label className="flex-1 flex flex-col gap-y-1">
          Filter by
          <select className={`${componentStyles} cursor-pointer appearance-none text-center px-0! py-1 font-bold`}>
            <option value="all">All</option>
            <option value="starred">Starred</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default Manage;
