"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input, FileInput, Button } from "rizzui";
import cn from "@/utils/class-names";
import { z } from "zod";
import FormGroup from "@/components/form-group";
import { NewTable } from "@/action/table";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface IndexProps {
  slug?: string;
  className?: string;
  product?: TAddTableSchema;
}

const AddTableSchema = z.object({
  name: z.string(),
  //image: z.string(),
});
export type TAddTableSchema = z.infer<typeof AddTableSchema>;

export default function CreateTable({ className }: IndexProps) {
  const {
    register,
    handleSubmit,
    reset,
    getValues,

    formState: { errors, isSubmitting },
  } = useForm<TAddTableSchema>({
    resolver: zodResolver(AddTableSchema),
  });

  const { data: session } = useSession();
  const router = useRouter();

  const onSubmit = (data: TAddTableSchema) => {
    NewTable({
      ...data,
      user_id: session?.user.user_id ?? "",
    })
      .then(() => reset())
      .then(() => router.push("/tables"));
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
              placeholder="Nom de la table"
              {...register("name")}
            />
          </FormGroup>

          <FormGroup
            title="Image du QRCODE"
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
            Ajouter la table
          </Button>
        </div>
      </form>
    </div>
  );
}
