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
import Link from "next/link";
import { UserType } from "@/database/schema";

const date = new Date();
const user = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@gmail.com",
    role: "Admin",
    status: "Activé",
    created_at: date.toDateString(),
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane.doe@gmail.com",
    role: "customer",
    status: "Désactivé",
    created_at: date.toDateString(),
  },
];

export default function UsersList({ users }: { users: UserType[] }) {
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
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Créé le</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(
              ({ user_id, name, email, role, is_active, createdAt }) => (
                <TableRow key={user_id}>
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
                    {email}
                  </TableCell>
                  <TableCell className="font-medium">{role}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{is_active}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {createdAt && createdAt.getDate()}
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
                        <Link href="#">
                          <DropdownMenuItem className="hover:bg-anzac-500 hover:text-white rounded-md">
                            Supprimer
                          </DropdownMenuItem>
                        </Link>
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
