"use server";

import { Users } from "@/database/schema";
import { db } from "@/database/dbConnection";
import { TSignupSchema } from "@/app/auth/signup/sign-up-form";
import { TAddUserSchema } from "@/app/utilisateurs/create/CreateUser";
import { hash } from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function Register(data: TSignupSchema | TAddUserSchema) {
  try {
    await db.insert(Users).values({
      ...data,
      password: await hash(data.password, 12),
      user_id: uuidv4(),
    });
    revalidatePath("/utilisateurs");
    return JSON.stringify("Utilisateur créé");
  } catch (error: any) {
    return JSON.stringify(error);
  }
}

export async function DeletedUser(user_id: string) {
  try {
    await db.delete(Users).where(eq(Users.user_id, user_id));
    revalidatePath("/utilisateurs");
    return JSON.stringify("Table supprimée");
  } catch (error: any) {
    return JSON.stringify(error);
  }
}
