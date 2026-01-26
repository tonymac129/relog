import type { DayType } from "@/types/Logs";
import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  display: {
    type: String,
  },
  email: {
    type: String,
  },
  image: {
    type: String,
  },
  logs: {
    type: [Schema.Types.Mixed],
    default: [],
  } as unknown as DayType[],
});

export const User = models.User || model("User", UserSchema);
