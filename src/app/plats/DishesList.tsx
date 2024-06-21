"use client";

import Image from "next/image";
import productImage from "@/app/assets/noproduct.jpg";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { DisheType } from "@/database/schema";
import { DeletedDishe } from "@/action/plats";

export default function DishesList({ dishes }: { dishes: DisheType[] }) {
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
              <TableHead className="hidden md:table-cell">Créé le</TableHead>
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
                  <TableCell className="hidden md:table-cell">
                    {created_at && created_at.getUTCDate()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <Link href="#">
                          <DropdownMenuItem className="hover:bg-anzac-500 hover:text-white rounded-md">
                            Modifier
                          </DropdownMenuItem>
                        </Link>
                        <button onClick={() => handleDelete(dishe_id)}>
                          <DropdownMenuItem className="hover:bg-anzac-500 hover:text-white rounded-md">
                            Supprimer
                          </DropdownMenuItem>
                        </button>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
