"use server";

import { Dishes } from "@/database/schema";
import { db } from "@/database/dbConnection";
import { TAddDisheSchema } from "@/app/plats/create/CreateDishe";

interface Dishes extends TAddDisheSchema {
  dishe_id?: number;
}

export async function NewDishe(data: Dishes) {
  try {
    await db.insert(Dishes).values(data);
    return JSON.stringify("Plat créé");
  } catch (error: any) {
    return JSON.stringify(error);
  }
}
