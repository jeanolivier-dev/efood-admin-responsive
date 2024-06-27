"use client";

import Image from "next/image";
import productImage from "@/app/assets/noproduct.jpg";
import { SquarePen, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DisheType } from "@/database/schema";
import { DeletedDishe } from "@/action/plats";
import { useState } from "react";

export type Plate = {
  name: string;
  description: string;
  price: number;
  is_active: boolean | null;
};

export default function DishesList({ dishes }: { dishes: DisheType[] }) {
  const [formData, setFormData] = useState<Plate>({
    description: "",
    is_active: false,
    price: 0,
    name: "",
  });

  async function handleDelete(dishe_id: string) {
    await DeletedDishe(dishe_id);
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
              <TableHead className="hidden md:table-cell">
                Description
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Créé le</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dishes.map(
              ({
                dishe_id,
                name,
                description,
                is_active,
                price,
                created_at,
              }) => (
                <TableRow key={dishe_id}>
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
                  <TableCell className="font-medium hidden md:table-cell">
                    {description}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{is_active}</Badge>
                  </TableCell>
                  <TableCell>{price} CFA</TableCell>
                  <TableCell>{created_at && created_at.getUTCDate()}</TableCell>
                  <TableCell>
                    <div className={"flex gap-4"}>
                      {/*Edit*/}
                      <Drawer>
                        <DrawerTrigger
                          onClick={() =>
                            setFormData({
                              name,
                              description,
                              is_active,
                              price,
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
                                    description: formData.description,
                                    is_active: formData.is_active,
                                    price: formData.price,
                                    name: e.target.value,
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
                                    description: e.target.value,
                                    is_active: formData.is_active,
                                    price: formData.price,
                                    name: formData.name,
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
                              onClick={() => handleDelete(dishe_id)}
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
              )
            )}
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
