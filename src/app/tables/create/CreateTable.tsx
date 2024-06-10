"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input, Text, FileInput, Button } from "rizzui";
import cn from "@/utils/class-names";
import { z } from "zod";
import FormGroup from "@/components/form-group";

interface IndexProps {
  slug?: string;
  className?: string;
  product?: TAddDisheSchema;
}

const AddDisheSchema = z.object({
  name: z.string(),
  description: z.string(),
  sku: z.string(),
  price: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().positive().min(1)
  ),
  online: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number()),
  menu: z.string(),
  image: z.string(),
});
export type TAddDisheSchema = z.infer<typeof AddDisheSchema>;

export default function CreateTable({ className }: IndexProps) {
  const {
    register,
    handleSubmit,
    reset,
    getValues,

    formState: { errors, isSubmitting },
  } = useForm<TAddDisheSchema>({
    resolver: zodResolver(AddDisheSchema),
  });

  const onSubmit = (data: TAddDisheSchema) => {
    console.log("product_data", data);
    toast.success(<Text as="b">Plat crée</Text>);
    reset();
  };

  const [state, setState] = React.useState<any>("");
  const [value, setValue] = useState(null);

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
          <Button type="submit" className="w-full @xl:w-auto">
            Ajouter la table
          </Button>
        </div>
      </form>
    </div>
  );
}
