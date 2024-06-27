"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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

import Image from "next/image";
import qrImage from "@/app/assets/efood-qrtest.png";

import { Button } from "@/components/ui/button";
import { SquarePen, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TablesType } from "@/database/schema";
import { DeletedTable } from "@/action/table";
import { useState } from "react";

export type Table = {
  name: string;
};

export default function TablesList({ tables }: { tables: TablesType[] }) {
  const [formData, setFormData] = useState<Table>({
    name: "",
  });

  async function handleDelete(table_id: string) {
    await DeletedTable(table_id);
  }

  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>QR Code</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="sr-only">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tables.map(({ table_id, name, created_at }) => (
              <TableRow key={table_id} className="bg-accent">
                <TableCell>
                  <div className="font-medium">{name}</div>
                </TableCell>
                <TableCell>
                  <Badge className="text-xs" variant="outline">
                    <Image
                      alt="Product image"
                      className="aspect-square object-cover"
                      height="72"
                      src={qrImage}
                      width="64"
                    />
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {created_at && created_at.toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className={"flex gap-4"}>
                    {/*Edit*/}
                    <Drawer>
                      <DrawerTrigger
                        onClick={() =>
                          setFormData({
                            name,
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
                            onClick={() => handleDelete(table_id)}
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
    </Card>
  );
}
