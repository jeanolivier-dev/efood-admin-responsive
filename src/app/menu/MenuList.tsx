import Image from "next/image";
import productImage from "@/app/assets/noproduct.jpg";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

export default function MenuList() {
  const date = new Date()
  const menu = [
    {
      id : 1,
      name : "Entree",
      description : "Lorem Ipsum is simply dummy text",
      dishes_amount : 4,
      created_at : date.toDateString()
    },{
      id : 2,
      name : "test",
      description : "Lorem Ipsum is simply dummy text",
      dishes_amount : 4,
      created_at : date.toDateString()
    },{
      id : 3,
      name : "tes55",
      description : "Lorem Ipsum is simply dummy text",
      dishes_amount : 4,
      created_at : date.toDateString()
    },
  ]
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
              <TableHead>Description</TableHead>
              <TableHead>Nombre de plats</TableHead>
              <TableHead className="hidden md:table-cell">Créé le</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {menu.map(({id,name,description,dishes_amount,created_at}) => (
              <TableRow key={id}>
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
                <TableCell className="font-medium">
                  {description}
                </TableCell>
                <TableCell>
                  <TableCell className="font-medium">{dishes_amount}</TableCell>
                </TableCell>
                <TableCell className="hidden md:table-cell">{created_at}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className={"bg-white"}>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Modifier</DropdownMenuItem>
                      <DropdownMenuItem>Supprimer</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
