"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input, Text, Select, FileInput, Button } from "rizzui";
import cn from "@/utils/class-names";
import FormFooter from "@/components/form-footer";
import { z } from "zod";
import FormGroup from "@/components/form-group";
import QuillEditor from "@/components/ui/quill-editor";

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

export default function CreateDishe({ className }: IndexProps) {
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

  const options = [
    { label: "Entrées", value: "entrées" },
    { label: "Plats", value: "plats" },
    { label: "Desserts", value: "desserts" },
  ];

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
              placeholder="Nom du plat"
              {...register("name")}
              error={errors.name?.message}
            />
            <Input
              label="SKU"
              placeholder="SKU du plat"
              {...register("sku")}
              error={errors.sku?.message}
            />

            <Select
              label="Sélectionnez un menu"
              options={options}
              value={value}
              onChange={setValue}
            />

            <QuillEditor
              // value={value}
              onChange={() => register("description")}
              label="Description"
              className="col-span-full [&_.ql-editor]:min-h-[100px]"
              labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
            />
          </FormGroup>
          <FormGroup
            title="Prix"
            description="Ajoutez le prix du plat ici"
            className="pt-8"
          >
            <Input
              placeholder="0"
              {...register("price")}
              error={errors.price?.message as string}
              prefix={"CFA"}
              type="number"
            />
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
            "sticky bottom-0 z-40 flex items-center justify-end gap-3 bg-gray-0/10 backdrop-blur @lg:gap-4 @xl:grid @xl:auto-cols-max @xl:grid-flow-col"
          )}
        >
          <Button type="submit" className="w-full @xl:w-auto">
            Créer le plat
          </Button>
        </div>
      </form>
    </div>
  );
}
