import Link from "next/link";

function Nav() {
  return (
    <div>
      <Link href="/">Home</Link>
      <Link href="/account">Account</Link>
    </div>
  );
}

export default Nav;
