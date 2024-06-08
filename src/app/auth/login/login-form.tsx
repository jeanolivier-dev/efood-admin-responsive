"use client";

import React from "react";
import Link from "next/link";
import { Input, Text, Button, Password, Switch } from "rizzui";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Veuillez insérer votre adresse email" }),
  password: z
    .string()
    .min(8, { message: "Veuillez insérez votre mot de passe" }),
});

type TLoginSchema = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  async function submitHandler(data: TLoginSchema) {
    console.log(data.email, data.password);
  }

  console.log();

  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="space-y-5 lg:space-y-6">
          <div>
            {" "}
            <Input
              type="email"
              label="Email"
              placeholder="Entrez votre email"
              className="[&>label>span]:font-medium"
              required
              {...register("email")}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>

          <div>
            <Password
              label="Mot de passe"
              placeholder="Entrez votre mot de passe"
              className="[&>label>span]:font-medium"
              required
              {...register("password")}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>

          <div className="flex items-center justify-between lg:pb-2">
            <Switch label="Se souvenir de moi" />
            <Link
              href="#"
              className="h-auto p-0 text-sm font-semibold text-gray-600 underline transition-colors hover:text-anzac-400 hover:no-underline"
            >
              Mot de passe oublié?
            </Link>
          </div>

          <Button className="w-full" type="submit">
            Connectez-vous
          </Button>
        </div>
      </form>
      <Text className="mt-5 text-center text-[15px] leading-loose text-gray-500 md:mt-7 lg:mt-9 lg:text-base">
        Vous n&apos;avez pas de compte?{" "}
        <Link
          href="/auth/signup"
          className="font-semibold text-gray-700 transition-colors hover:text-anzac-400"
        >
          Inscrivez-vous
        </Link>
      </Text>
    </>
  );
}
