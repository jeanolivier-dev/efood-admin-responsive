"use client";

import { Button, Input, FileInput } from "rizzui";
import cn from "@/utils/class-names";
import FormGroup from "@/components/form-group";
import QuillEditor from "@/components/ui/quill-editor";

// main category form component for create and update category
export default function CreateMenu() {
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
            <Input label="Slug" placeholder="slug" />

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
          >
            <FileInput />
          </FormGroup>
        </div>
        <div
          className={cn(
            "sticky bottom-0 z-40 flex items-center justify-end gap-3 bg-gray-0/10 backdrop-blur @lg:gap-4 @xl:grid @xl:auto-cols-max @xl:grid-flow-col"
          )}
        >
          <Button type="submit" className="w-full @xl:w-auto">
            Créer le menu
          </Button>
        </div>
      </form>
    </div>
  );
}
