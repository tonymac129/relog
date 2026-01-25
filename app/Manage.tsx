import { CgClose } from "react-icons/cg";
import { useRef } from "react";

const componentStyles = "bg-gray-300 dark:bg-gray-900 text-lg text-black dark:text-white rounded outline-none";

type ManageProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setFiltering: React.Dispatch<React.SetStateAction<boolean>>;
};

function Manage({ search, setSearch, setFiltering }: ManageProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const filterDropdownRef = useRef<HTMLSelectElement>(null);

  function handleClearSearch() {
    setSearch("");
    setFiltering(false);
    inputRef.current?.focus();
    filterDropdownRef.current!.value = "all";
  }

  return (
    <div className="py-5 w-full flex flex-col items-center gap-y-2">
      <div className={`${componentStyles} w-full relative flex items-center`}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search activities"
          className="w-full  py-2 px-4 outline-none"
          ref={inputRef}
        />
        {search.length > 0 && (
          <CgClose size={25} className="absolute cursor-pointer right-4" title="Clear search" onClick={handleClearSearch} />
        )}
      </div>
      <div className="w-full flex gap-x-5">
        <label className="w-30 flex flex-col gap-y-1">
          Filter by
          <select
            className={`${componentStyles} cursor-pointer appearance-none text-center py-2 font-bold`}
            ref={filterDropdownRef}
            onChange={() => setFiltering(filterDropdownRef.current?.value === "starred")}
          >
            <option value="all">All</option>
            <option value="starred">Starred</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default Manage;
