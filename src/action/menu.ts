"use server";

import { Menu } from "@/database/schema";
import { db } from "@/database/dbConnection";
import { TAddMenuSchema } from "@/app/menu/create/CreateMenu";

interface Menu extends TAddMenuSchema {
  user_id?: number;
}

export async function NewMenu(data: Menu) {
  try {
    await db.insert(Menu).values(data);
    return JSON.stringify("Menu créé");
  } catch (error: any) {
    return JSON.stringify(error);
  }
}
