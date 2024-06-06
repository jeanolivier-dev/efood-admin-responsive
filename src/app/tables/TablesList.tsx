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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";
import qrImage from "@/app/assets/efood-qrtest.png";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";

export default function TablesList() {
  const date = new Date();
  const order = [
    {
      id: 1,
      name: "Table 1",
      created_at: date.toDateString(),
    },
    {
      id: 2,
      name: "Table 2",
      created_at: date.toDateString(),
    },
  ];

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
            {order.map(({ id, name, created_at }) => (
              <TableRow key={id} className="bg-accent">
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
                  {created_at}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
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
            ))}

            {/* <TableRow>
                          <TableCell>
                            <div className="font-medium">Liam Johnson</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              liam@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Sale
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                              Fulfilled
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-23
                          </TableCell>
                          <TableCell className="text-right">$250.00</TableCell>
                        </TableRow> */}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
