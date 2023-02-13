import { DbSchema } from "types/main-types";

export const lc_item_name = 'cool_diary_db';

export const getAllDataFromDb = (): DbSchema => {
  const rawData = window.localStorage.getItem(lc_item_name);

  if (!rawData) {
    return {
      dayArr: [],
    };
  } else {
    const parsed = JSON.parse(rawData) as DbSchema;
    return parsed;
  }
};

export const testDbVersion1: DbSchema = {
  dayArr: [
    {
      dateStr: '2020-01-08',
      description: 'sdfsdfsdfdsf',
      rate: 1,
    },
    {
      dateStr: '2023-01-08',
      description: 'sdfsdfsdfdsf',
      rate: 1,
    },

    {
      dateStr: '2023-01-19',
      description: 'sdfsdfs dfdsf sdfsdf sfd sd',
      rate: 2,
    },

    {
      dateStr: '2023-02-08',
      description: 'sdfsdfs uuuusf sdfsdf sfd sd',
      rate: 3,
    },

    {
      dateStr: '2023-02-11',
      description: 'sdfsdfs uuuusf sdfsdf sfd sd',
      rate: 4,
    },

    {
      dateStr: '2023-02-13',
      description: 'sdfsdfs uuuusf sdfsdf sfd sd',
      rate: 4,
    },
  ],
};

const initiateDbWithSampleData = () => {
  window.localStorage.setItem(lc_item_name, JSON.stringify(testDbVersion1));
};

export const updateDb = (newDbRaw: DbSchema) => {
  const newDb: DbSchema = {
    ...newDbRaw,
    dayArr: newDbRaw.dayArr.filter((day) => day.description || day.rate),
  };

  window.localStorage.setItem(lc_item_name, JSON.stringify(newDb));
};
