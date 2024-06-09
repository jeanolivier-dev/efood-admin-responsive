"use server";

import {Users} from "@/database/schema";
import {db} from "@/database/dbConnection";
import {TSignupSchema} from "@/app/auth/signup/sign-up-form";
import {hash} from "bcrypt";

export async function Register(data: TSignupSchema) {
  try {
    await db.insert(Users).values({...data, password: await hash(data.password, 12)});
    return JSON.stringify("Utilisateur créé");
  } catch (error: any) {
    return JSON.stringify(error);
  }
}
