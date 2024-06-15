"use client";

import React from "react";
import { Button, Input, FileInput } from "rizzui";
import cn from "@/utils/class-names";
import FormGroup from "@/components/form-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { NewMenu } from "@/action/menu";
import { useRouter } from "next/navigation";

const AddMenuSchema = z.object({
  name: z.string(),
  description: z.string(),
});
export type TAddMenuSchema = z.infer<typeof AddMenuSchema>;

// main category form component for create and update category
export default function CreateMenu() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TAddMenuSchema>({
    resolver: zodResolver(AddMenuSchema),
  });

  const { data: session } = useSession();
  const router = useRouter();

  async function onSubmit(data: TAddMenuSchema) {
    NewMenu({
      ...data,
      user_id: session?.user.user_id,
    })
      .then(() => reset())
      .then(() => router.push("/menu"));
  }

  const [state, setState] = React.useState<any>("");

  return (
    <div className="@container">
      <div className={cn("z-[999] 2xl:top-[72px]")} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn("relative z-[19] [&_label.block>span]:font-medium")}
      >
        <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
          <FormGroup
            title={"Ajouter un nouveau menu :"}
            description={
              "Rédiger les informations de votre menu à partir d'ici"
            }
          >
            <Input
              label="Nom"
              placeholder="Nom du menu"
              {...register("name")}
            />

            <div className="col-span-2">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="message">Description</Label>
                <Textarea
                  placeholder="Description du menu."
                  id="message"
                  {...register("description")}
                />
              </div>
            </div>
          </FormGroup>
          <FormGroup
            title="Image miniature"
            description="Télécharger l'image miniature de votre menu ici"
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
            className="w-full pt-4 @xl:w-auto"
          >
            Ajouter le menu
          </Button>
        </div>
      </form>
    </div>
  );
}
