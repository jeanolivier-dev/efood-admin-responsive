"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FileInput, Button } from "rizzui";
import cn from "@/utils/class-names";
import { z } from "zod";
import FormGroup from "@/components/form-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MenuType } from "@/database/schema";
import { useSession } from "next-auth/react";
import { NewDishe } from "@/action/plats";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
  status: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number()),
  menu: z.string(),
  //image: z.string(),
});
export type TAddDisheSchema = z.infer<typeof AddDisheSchema>;

export default function CreateDishe({
  className,
  menu,
}: {
  className?: IndexProps;
  menu: MenuType[];
}) {
  const {
    register,
    handleSubmit,
    reset,
    getValues,

    formState: { errors, isSubmitting },
  } = useForm<TAddDisheSchema>({
    resolver: zodResolver(AddDisheSchema),
  });

  const { data: session } = useSession();
  const router = useRouter();

  const onSubmit = (data: TAddDisheSchema) => {
    NewDishe({
      ...data,
      menu_id: session?.user.user_id ?? "",
    })
      .then(() => reset())
      .then(() => router.push("/plats"));
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
            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="email">Nom</Label>
              <Input
                id="name"
                placeholder="Nom du plat"
                {...register("name")}
              />
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

            <div className="grid w-full max-w-sm items-center gap-3">
              <Label>Menu</Label>
              <select
                className={cn(
                  "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
                  className
                )}
                {...register("menu")}
              >
                <option value="Général">Sélectionnez un menu</option>
                {menu.map(({ user_id, name }, i) => (
                  <option key={i} value={user_id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-2">
              <div className="grid w-200px gap-3">
                <Label htmlFor="message">Description</Label>
                <Textarea
                  placeholder="Description du plat"
                  id="message"
                  {...register("description")}
                />
              </div>
            </div>
          </FormGroup>

          <FormGroup
            title="Prix"
            description="Ajoutez le prix du plat ici (montant en CFA)"
            className="pt-8"
          >
            <Input
              placeholder="0"
              {...register("price")}
              prefix={"CFA"}
              type="number"
            />
            {errors.price && <p>{errors.price.message}</p>}
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
