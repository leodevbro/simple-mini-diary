export type DbSchema = {
  dayArr: {
    date: string; // ISO string --> '2023-02-12T16:23:54.512Z'
    description: null | string;
    rate: null | 1 | 2 | 3 | 4 | 5;
  }[];
};
