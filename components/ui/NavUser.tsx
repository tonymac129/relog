"use client";

import type { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const optionStyles =
  "cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-800 rounded-full flex items-center px-3 py-1 gap-x-3 font-bold";

function NavUser({ session }: { session: Session }) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const navUserRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickHandler = (e: Event) => {
      if (!navUserRef.current?.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", clickHandler);

    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }, []);

  function handleLogout() {
    sessionStorage.clear();
    signOut();
  }

  if (!session.user) return null;

  return (
    <div className="relative" ref={navUserRef}>
      <div className={optionStyles} onClick={() => setMenuOpen(true)}>
        <Image src={session.user.image!} alt="Avatar" width={35} height={35} className="rounded-full border border-gray-700" />
        <span className="hidden sm:inline">{session.user.name}</span>
      </div>
      {menuOpen && (
        <div className="absolute top-[110%] right-0 rounded-xl bg-gray-300 dark:bg-gray-800 min-w-full p-2">
          <div
            className={optionStyles + " hover:bg-gray-200! dark:hover:bg-gray-900! py-2 px-4"}
            onClick={() => window.open("https://github.com/tonymac129/relog/issues", "_blank")}
          >
            Feedback
          </div>
          <div
            className={optionStyles + " hover:bg-gray-200! dark:hover:bg-gray-900! py-2 px-4 text-red-400"}
            onClick={handleLogout}
          >
            Log out
          </div>
        </div>
      )}
    </div>
  );
}

export default NavUser;
