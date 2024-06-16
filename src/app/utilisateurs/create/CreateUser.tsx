"use client";

import React from "react";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input, FileInput, Button, Password } from "rizzui";
import cn from "@/utils/class-names";
import { z } from "zod";
import FormGroup from "@/components/form-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Register } from "@/action/user";
import { useRouter } from "next/navigation";

interface IndexProps {
  slug?: string;
  className?: string;
  product?: TAddUserSchema;
}

const AddUserSchema = z.object({
  name: z.string({ message: "Champ requis" }),
  email: z.string({ message: "Adresse email invalide" }),
  phone: z.string({ message: "Champ requis" }),
  password: z
    .string()
    .min(8, { message: "Veuillez insérez 8 caractères minimun" }),
  address: z.string({ message: "Champ requis" }),
  role: z.enum(["client", "admin"]),
  status: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number()),
  //image: z.string(),
});
export type TAddUserSchema = z.infer<typeof AddUserSchema>;

export default function CreateUser({ className }: IndexProps) {
  const {
    register,
    handleSubmit,
    reset,
    getValues,

    formState: { errors, isSubmitting },
  } = useForm<TAddUserSchema>({
    resolver: zodResolver(AddUserSchema),
  });

  const router = useRouter();

  const onSubmit = (data: TAddUserSchema) => {
    Register(data)
      .then(() => reset())
      .then(() => router.push("/utilisateurs"));
  };

  const [state, setState] = React.useState<any>("");

  return (
    <div className="@container">
      <div className={cn("z-[999] 2xl:top-[72px]")} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          "relative z-[19] [&_label.block>span]:font-medium",
          className
        )}
      >
        <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
          <FormGroup
            title="Résumé"
            description="Rédigez la description de votre produit et les informations nécessaires à partir d'ici"
            className={cn(className)}
          >
            <Input
              label="Nom"
              placeholder="Entrez le nom"
              {...register("name")}
            />
            <Input
              type="email"
              label="Email"
              placeholder="Entrez l'adresse email"
              {...register("email")}
            />
            <Input
              type="tel"
              label="Téléphone"
              placeholder="Entrez le numéro de téléphone"
              {...register("phone")}
            />
            <Password
              label="Mot de passe"
              placeholder="Entrez le mot de passe"
              {...register("password")}
            />
            <div className="col-span-2">
              <div className="grid w-200px gap-3">
                <Label htmlFor="message">Adresse</Label>
                <Textarea
                  placeholder="Description du plat"
                  id="message"
                  {...register("address")}
                />
              </div>
            </div>
            <div className="grid w-full max-w-sm items-center gap-3">
              <Label>Rôle</Label>
              <select
                id="role"
                className={cn(
                  "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
                  className
                )}
                {...register("role")}
              >
                <option value="Général">Sélectionnez un rôle</option>
                <option value="admin">Admin</option>
                <option value="client">Client</option>
              </select>
            </div>

            <div className="grid w-full max-w-sm items-center gap-3">
              <Label>Status</Label>
              <select
                id="isActive"
                className={cn(
                  "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
                  className
                )}
                {...register("status")}
              >
                <option value="Général">Sélectionnez un status</option>
                <option value={1}>Activé</option>
                <option value={0}>Désactivé</option>
              </select>
            </div>
          </FormGroup>

          <FormGroup
            title="Image miniature"
            description="Télécharger l'image miniature de votre plat ici"
            className="pt-8"
          >
            <FileInput
              value={state}
              onChange={(e) => setState(e.target.value)}
              clearable={!!state}
              onClear={() => {
                setState("");
              }}
            />
          </FormGroup>
        </div>
        <div
          className={cn(
            "z-40 flex items-center justify-end gap-3 bg-gray-0/10  @lg:gap-4 @xl:grid @xl:auto-cols-max @xl:grid-flow-col"
          )}
        >
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full @xl:w-auto"
          >
            Ajouter lutilisateur
          </Button>
        </div>
      </form>
    </div>
  );
}
