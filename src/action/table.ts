"use server";

import { Tables } from "@/database/schema";
import { db } from "@/database/dbConnection";
import { TAddTableSchema } from "@/app/tables/create/CreateTable";
import { v4 as uuidv4 } from "uuid";

interface Tables extends TAddTableSchema {
  user_id: string;
}

export async function NewTable(data: Tables) {
  try {
    await db.insert(Tables).values({ ...data, table_id: uuidv4() });
    return JSON.stringify("Table créé");
  } catch (error: any) {
    return JSON.stringify(error);
  }
}
