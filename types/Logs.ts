export type ActivityType = {
  id: string;
  title: string;
  description: string;
  date: Date;
  starred?: boolean;
};

export type DayType = {
  id: string;
  activities: ActivityType[];
  date: Date;
};
