"use client";

import Link from "next/link";
import { Input, Text, Password, Switch, Button } from "rizzui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Register } from "@/action/user";

const signupSchema = z
  .object({
    name: z.string({ message: "Champ requis" }),
    email: z.string().email({ message: "Adresse email invalide" }),
    password: z
      .string()
      .min(8, { message: "Veuillez insérez 8 caractères minimun" }),
    confirmPassword: z.string(),
    has_accepted: z.boolean(),
    phone: z.string({ message: "Champ requis" }),
    address: z.string({ message: "Champ requis" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passes doivent être identiques",
    path: ["confirmPassword"],
  })
  .refine((data) => data.has_accepted === true, {
    message: "Ce champ est requis",
    path: ["has_accepted"],
  });

export type TSignupSchema = z.infer<typeof signupSchema>;

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const router = useRouter();

  async function onSubmit(data: TSignupSchema) {
    Register(data)
      .then((res) => reset())
      .then(() => router.push("/auth/login"));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-5 lg:space-y-6">
        <div>
          <Input
            type="text"
            label="Nom"
            placeholder="Entrez votre nom"
            className="[&>label>span]:font-medium"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>
        <div>
          <Input
            type="email"
            label="Email"
            placeholder="Entrez votre email"
            className="[&>label>span]:font-medium"
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
            {...register("password")}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>
        <div>
          <Password
            placeholder="Confirmez votre mot de passe"
            className="[&>label>span]:font-medium"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span className="text-red-500 pt-3">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        <div>
          <Input
            type="tel"
            label="Téléphone"
            placeholder="Entrez votre numéro de téléphone"
            className="[&>label>span]:font-medium"
            {...register("phone")}
          />
          {errors.phone && (
            <span className="text-red-500">{errors.phone.message}</span>
          )}
        </div>
        <div>
          <Input
            type="text"
            label="Adresse"
            placeholder="Entrez votre adresse"
            className="[&>label>span]:font-medium"
            {...register("address")}
          />
          {errors.address && (
            <span className="text-red-500">{errors.address.message}</span>
          )}
        </div>

        <div className="flex-col col-span-2 flex items-start pb-1 text-gray-700">
          <Switch
            className="[&>label>span.transition]:shrink-0 [&>label>span]:font-medium"
            {...register("has_accepted")}
            label={
              <Text className="ps-1 text-gray-500">
                En vous inscrivant, vous acceptez nos{" "}
                <Link
                  href="/"
                  className="font-semibold text-gray-700 transition-colors hover:text-primary"
                >
                  Conditions
                </Link>{" "}
                &{" "}
                <Link
                  href="/"
                  className="font-semibold text-gray-700 transition-colors hover:text-primary"
                >
                  Politique de confidentialité
                </Link>
              </Text>
            }
          />
          {errors.has_accepted && (
            <span className="text-red-500">{errors.has_accepted.message}</span>
          )}
        </div>
        <Button
          disabled={isSubmitting}
          type="submit"
          className="w-full"
          color="primary"
        >
          S&apos;inscrire
        </Button>
      </div>
    </form>
  );
}
