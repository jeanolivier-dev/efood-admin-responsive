"use server";

import { Menu } from "@/database/schema";
import { db } from "@/database/dbConnection";
import { TAddMenuSchema } from "@/app/menu/create/CreateMenu";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

interface Menu extends TAddMenuSchema {
  user_id: string;
}

export async function NewMenu(data: Menu) {
  try {
    await db.insert(Menu).values({ ...data, menu_id: uuidv4() });
    revalidatePath("/menu");
    return JSON.stringify("Le menu a été créé");
  } catch (error: any) {
    return JSON.stringify(error);
  }
}

export async function DeletedMenu(menu_id: string) {
  try {
    await db.delete(Menu).where(eq(Menu.menu_id, menu_id));
    revalidatePath("/menu");
    return JSON.stringify("Le menu a été supprimé");
  } catch (error: any) {
    return JSON.stringify(error);
  }
}
