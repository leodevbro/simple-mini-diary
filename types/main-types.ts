export type OneDayData = {
  date: string; // ISO string --> '2023-02-12T16:23:54.512Z'
  description: null | string;
  rate: null | 1 | 2 | 3 | 4 | 5;
};

export type DbSchema = {
  dayArr: OneDayData[]; // ASC by date for default db saving
};
