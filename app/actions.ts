"use server";

import type { DayType } from "@/types/Logs";
import { dbConnect } from "@/lib/db";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function updateUserLogs(username: string, logs: DayType[]) {
  try {
    await dbConnect();
    await User.findOneAndUpdate({ username }, { logs }, { new: true });
  } catch (err) {
    console.error(err);
  }
}

export async function getUserLogs(username: string): Promise<DayType[]> {
  try {
    await dbConnect();
    const existingUser = await User.findOne({ username });
    return existingUser.logs;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function deleteUserAccount() {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (session?.user?.email) {
      await User.findOneAndDelete({ username: session.user.email });
    }
  } catch (err) {
    console.error(err);
  }
}
