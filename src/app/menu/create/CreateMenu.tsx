"use client";

import React, { useState } from "react";
import { Button, Input, FileInput } from "rizzui";
import cn from "@/utils/class-names";
import FormGroup from "@/components/form-group";
import QuillEditor from "@/components/ui/quill-editor";

// main category form component for create and update category
export default function CreateMenu() {
  const [state, setState] = React.useState<any>("");
  const [value, setValue] = useState(null);

  return (
    <div className="@container">
      <div className={cn("z-[999] 2xl:top-[72px]")} />
      <form className={cn("relative z-[19] [&_label.block>span]:font-medium")}>
        <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
          <FormGroup
            title={"Ajouter un nouveau menu :"}
            description={
              "Rédiger les informations de votre menu à partir d'ici"
            }
          >
            <Input label="Nom" placeholder="Nom du menu" />

            <div className="col-span-2">
              <QuillEditor
                label="Description"
                className="[&>.ql-container_.ql-editor]:min-h-[100px]"
                labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
              />
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
          <Button type="submit" className="w-full pt-4 @xl:w-auto">
            Ajouter le menu
          </Button>
        </div>
      </form>
    </div>
  );
}
