"use client";

import Link from "next/link";
import { Input, Text, Password, Switch, Button } from "rizzui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const signupSchema = z
  .object({
    email: z.string().email({ message: "Adresse email invalide" }),
    password: z
      .string()
      .min(8, { message: "Veuillez insérez 8 caractères minimun" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passes doivent être identiques",
    path: ["confirmPassword"],
  });

type TSignupSchema = z.infer<typeof signupSchema>;

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const router = useRouter();

  async function onSubmit(data: TSignupSchema) {
    console.log(data.email, data.password, data.confirmPassword);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-5 lg:space-y-6">
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

        <div className="col-span-2 flex items-start pb-1 text-gray-700">
          <Switch
            className="[&>label>span.transition]:shrink-0 [&>label>span]:font-medium"
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
        </div>
        <Button type="submit" className="w-full" color="primary">
          S&apos;inscrire
        </Button>
      </div>
    </form>
  );
}
