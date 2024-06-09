"use server";

import { Users, UserType } from "@/database/schema";
import { db } from "@/database/dbConnection";
import { TSignupSchema } from "@/app/auth/signup/sign-up-form";

export async function Register(data: TSignupSchema) {
  try {
    await db.insert(Users).values(data);
    return JSON.stringify("Utilisateur créé");
  } catch (error: any) {
    return JSON.stringify(error);
  }
}
