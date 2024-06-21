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
import { TablesType } from "@/database/schema";
import { DeletedTable } from "@/action/table";

export default function TablesList({ tables }: { tables: TablesType[] }) {
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
                  {created_at && created_at.getUTCDate()}
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
                      <button onClick={() => handleDelete(table_id)}>
                        <DropdownMenuItem className="hover:bg-anzac-500 hover:text-white rounded-md">
                          Supprimer
                        </DropdownMenuItem>
                      </button>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
