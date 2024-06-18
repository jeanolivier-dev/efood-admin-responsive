"use server";

import { Tables } from "@/database/schema";
import { db } from "@/database/dbConnection";
import { v4 as uuidv4 } from "uuid";
import { TablesType } from "@/database/schema";

export async function NewTable(data: TablesType) {
  try {
    await db.insert(Tables).values({ ...data, table_id: uuidv4() });
    return JSON.stringify("Table créé");
  } catch (error: any) {
    return JSON.stringify(error);
  }
}
