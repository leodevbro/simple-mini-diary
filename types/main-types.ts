export type OneDayData = {
  dateStr: string; // string in currTimezone --> '2023-02-12' // if user travels/changes time zone, then again the same hisotical string. This approach can cause some icorrect alignment of dates, but it seems it will be tolerable
  description: null | string;
  rate: null | 1 | 2 | 3 | 4 | 5;
};

export type DbSchema = {
  dayArr: OneDayData[]; // ASC by date for default db saving
};
