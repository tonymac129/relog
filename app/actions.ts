"use server";

import type { DayType } from "@/types/Logs";
import { dbConnect } from "@/lib/db";
import { User } from "@/models/User";

export async function updateUserLogs(username: string, logs: DayType[]) {
  try {
    await dbConnect();
    const newUser = await User.findOneAndUpdate({ username }, { logs }, { new: true });
    console.log(newUser);
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
