"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input, Text, FileInput, Button, Password } from "rizzui";
import cn from "@/utils/class-names";
import { z } from "zod";
import FormGroup from "@/components/form-group";
import QuillEditor from "@/components/ui/quill-editor";
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
  product?: TAddUserSchema;
}

const AddUserSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  password: z.string(),
  address: z.string(),
  role: z.string(),
  status: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number()),
  //online: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number()),
  //menu: z.string(),
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

  const onSubmit = (data: TAddUserSchema) => {
    console.log(data);
    toast.success(<Text as="b">Utilisateur crée</Text>);
    reset();
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
            {/**
             <QuillEditor
              onChange={() => register("address")}
              label="Adresse"
              className="col-span-full [&_.ql-editor]:min-h-[100px]"
              labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
            />
            

            <div>
              <label className="font-medium">Rôle</label>
              <Select>
                <SelectTrigger className="w-200px">
                  <SelectValue placeholder="Sélectionnez un rôle" />
                </SelectTrigger>
                <SelectContent className="bg-white ">
                  <SelectItem
                    className="hover:bg-anzac-500 hover:text-white rounded-md"
                    key="id"
                    value="value"
                  >
                    Admin
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="font-medium">Status</label>
              <Select>
                <SelectTrigger className="w-200px">
                  <SelectValue placeholder="Sélectionnez un status" />
                </SelectTrigger>
                <SelectContent className="bg-white ">
                  {status_select.map(({ id, status, value }) => (
                    <SelectItem
                      className="hover:bg-anzac-500 hover:text-white rounded-md"
                      key={id}
                      value={value}
                    >
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
*/}
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
          <Button type="submit" className="w-full @xl:w-auto">
            Ajouter lutilisateur
          </Button>
        </div>
      </form>
    </div>
  );
}
