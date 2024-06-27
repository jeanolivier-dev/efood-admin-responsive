"use client";

import Image from "next/image";
import productImage from "@/app/assets/noproduct.jpg";
import { SquarePen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MenuType } from "@/database/schema";
import { DeletedMenu } from "@/action/menu";
import { useState } from "react";

export type Menu = {
  name: string;
  description: string;
};

export default function MenuList({ menu }: { menu: MenuType[] }) {
  const [formData, setFormData] = useState<Menu>({
    description: "",
    name: "",
  });

  async function handleDelete(user_id: string) {
    await DeletedMenu(user_id);
  }

  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Nom</TableHead>
              <TableHead className="sr-only">Description</TableHead>
              <TableHead>Nombre de plats</TableHead>
              <TableHead className="hidden md:table-cell">Créé le</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {menu.map(({ menu_id, name, description, created_at }) => (
              <TableRow key={menu_id}>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt="Product image"
                    className="aspect-square rounded-full object-cover"
                    height="64"
                    src={productImage}
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium">{name}</TableCell>
                <TableCell className="font-medium sr-only">
                  {description}
                </TableCell>
                <TableCell className="font-medium">4</TableCell>
                <TableCell className="hidden md:table-cell">
                  {created_at && created_at.getUTCDate()}
                </TableCell>
                <TableCell>
                  <div className={"flex gap-4"}>
                    {/*Edit*/}
                    <Drawer>
                      <DrawerTrigger
                        onClick={() =>
                          setFormData({
                            name,
                            description,
                          })
                        }
                      >
                        <SquarePen className={"cursor-pointer"} />
                      </DrawerTrigger>
                      <DrawerContent>
                        <DrawerHeader>
                          <DrawerTitle>Modification de {name}</DrawerTitle>
                          <DrawerDescription>
                            Cette action ne peut pas être annulée.
                          </DrawerDescription>
                        </DrawerHeader>
                        <div className="grid w-full max-w-sm items-center gap-4 pl-4">
                          {/*name*/}
                          <div>
                            <Label>Nom</Label>
                            <Input
                              type={"text"}
                              value={formData?.name}
                              onChange={(e) =>
                                setFormData({
                                  name: e.target.value,
                                  description: formData.description,
                                })
                              }
                            />
                          </div>

                          {/*description*/}
                          <div>
                            <Label>Description</Label>
                            <Textarea
                              value={formData?.description}
                              onChange={(e) =>
                                setFormData({
                                  name: formData.name,
                                  description: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <DrawerFooter>
                          <Button onClick={() => console.log(formData)}>
                            Modifier
                          </Button>
                          <DrawerClose>
                            <Button variant="outline">Annuler</Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </DrawerContent>
                    </Drawer>
                    {/*edit end*/}

                    {/*delete*/}
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Trash2 color={"red"} className={"cursor-pointer"} />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Êtes vous sur de vouloir supprimer ?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Cette action ne peut pas être annulée. Cela
                            supprimera définitivement les informations dans
                            notre base de données.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(menu_id)}
                          >
                            Supprimer
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    {/*  delete end*/}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Affichage <strong>1-10</strong> sur <strong>32</strong> plats
        </div>
      </CardFooter>
    </Card>
  );
}
