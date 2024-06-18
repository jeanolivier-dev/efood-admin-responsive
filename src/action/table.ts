"use server";

import { Tables } from "@/database/schema";
import { db } from "@/database/dbConnection";
import { v4 as uuidv4 } from "uuid";
import {TAddTableSchema} from "@/app/tables/create/CreateTable";
import {revalidatePath} from "next/cache";

interface DataType extends TAddTableSchema {
  user_id: string
}

export async function NewTable(data: DataType) {
  try {
    await db.insert(Tables).values({ ...data, table_id: uuidv4() });
    revalidatePath("/tables")
    return JSON.stringify("Table créé");
  } catch (error: any) {
    return JSON.stringify(error);
  }
}
