"use server";

import { Dishes } from "@/database/schema";
import { db } from "@/database/dbConnection";
import { v4 as uuidv4 } from "uuid";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

type DataType = {
  name: string;
  is_active: boolean;
  menu_id: string;
  description: string;
  price: number;
};

export async function NewDishe(data: DataType) {
  try {
    await db.insert(Dishes).values({ ...data, dishe_id: uuidv4() });
    revalidatePath("/plats");
    return JSON.stringify("Le plat a été créé");
  } catch (error: any) {
    return JSON.stringify(error);
  }
}

export async function DeletedDishe(dishe_id: string) {
  try {
    await db.delete(Dishes).where(eq(Dishes.dishe_id, dishe_id));
    revalidatePath("/plats");
    return JSON.stringify("Le plat a été supprimé");
  } catch (error) {
    return JSON.stringify(error);
  }
}
