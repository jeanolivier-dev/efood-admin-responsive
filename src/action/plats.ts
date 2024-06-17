"use server";

import { Dishes } from "@/database/schema";
import { db } from "@/database/dbConnection";
import { TAddDisheSchema } from "@/app/plats/create/CreateDishe";
import { v4 as uuidv4 } from "uuid";

interface Dishes extends TAddDisheSchema {
  menu_id: string;
}

export async function NewDishe(data: Dishes) {
  try {
    await db.insert(Dishes).values({ ...data, dishe_id: uuidv4() });
    return JSON.stringify("Plat créé");
  } catch (error: any) {
    return JSON.stringify(error);
  }
}
