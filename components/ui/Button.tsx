"use client";

type ButtonProps = {
  children: React.ReactNode;
  primary?: boolean;
  onclick: () => void;
};

function Button({ children, primary, onclick }: ButtonProps) {
  return (
    <button
      onClick={onclick}
      className={`${primary ? "bg-amber-800 hover:bg-amber-700 text-white" : "bg-transparent text-black dark:text-white"} 
      border-2 border-amber-800 hover:border-amber-700  px-5 py-2 cursor-pointer rounded-full text-lg font-bold flex
        items-center gap-x-2`}
    >
      {children}
    </button>
  );
}

export default Button;
