import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | Relog",
  description: "Oops, that page doesn't exist...",
};

function NotFound() {
  return (
    <div className="flex flex-col items-center py-20 gap-y-5 text-center">
      <h1 className="text-8xl text-black dark:text-white text-center font-extrabold my-10">404</h1>
      <div>This page doesn&apos;t exist...</div>
      <div>
        Go back{" "}
        <Link href="/" className="underline">
          home
        </Link>{" "}
        or open a{" "}
        <a href="https://github.com/tonymac129/relog/issues" className="underline" target="_blank">
          GitHub issue
        </a>
      </div>
    </div>
  );
}

export default NotFound;
