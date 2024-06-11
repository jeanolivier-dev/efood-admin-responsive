"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input, FileInput, Button } from "rizzui";
import cn from "@/utils/class-names";
import { z } from "zod";
import FormGroup from "@/components/form-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IndexProps {
  slug?: string;
  className?: string;
  product?: TAddDisheSchema;
}

const AddDisheSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().positive().min(1)
  ),
  //Status: z.string(),
  //menu: z.string(),
  //image: z.string(),
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
    console.log(data);
  };

  const [state, setState] = React.useState<any>("");

  const menu_select = [
    {
      id: 1,
      menu: "Entrée",
      value: "entrée",
    },
    {
      id: 2,
      menu: "Plats",
      value: "plats",
    },
    {
      id: 3,
      menu: "Desserts",
      value: "desserts",
    },
  ];

  const status_select = [
    { id: 1, status: "Activé", value: "Activé" },
    { id: 2, status: "Désactivé", value: "Désactivé" },
  ];

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
            />

            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="status">Status</Label>
                <Select>
                  <SelectTrigger id="status" aria-label="Select status">
                    <SelectValue placeholder="Sélectionnez un status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white ">
                    {status_select.map(({ id, status, value }) => (
                      <SelectItem
                        key={id}
                        value={value}
                        className="hover:bg-anzac-500 hover:text-white rounded-md"
                      >
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="status">Menu</Label>
                <Select>
                  <SelectTrigger id="status" aria-label="Select status">
                    <SelectValue placeholder="Sélectionnez un menu" />
                  </SelectTrigger>
                  <SelectContent className="bg-white ">
                    {menu_select.map(({ id, menu, value }) => (
                      <SelectItem
                        key={id}
                        value={value}
                        className="hover:bg-anzac-500 hover:text-white rounded-md"
                      >
                        {menu}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="col-span-2">
              <div className="grid w-200px gap-1.5">
                <Label htmlFor="message">Description</Label>
                <Textarea
                  placeholder="Type your message here."
                  id="message"
                  {...register("description")}
                />
              </div>
            </div>
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
            "z-40 flex items-center justify-end gap-3 bg-gray-0/10  @lg:gap-4 @xl:grid @xl:auto-cols-max @xl:grid-flow-col"
          )}
        >
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full @xl:w-auto"
          >
            Ajouter le plat
          </Button>
        </div>
      </form>
    </div>
  );
}
