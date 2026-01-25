import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SignInBtn from "./SignInBtn";
import NavUser from "./NavUser";

async function User() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <SignInBtn />;
  } else {
    return <NavUser session={session} />;
  }
}

export default User;
