"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./Cell"

export type ProductColumn = {
  id: string
  name: string
  price: string
  category: string
  createdAt: string
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "الإسم",
  },
  {
    accessorKey: "price",
    header: "السعر",
  },
  {
    accessorKey: "category",
    header: "الفئة",
  },
  {
    accessorKey: "createdAt",
    header: "التاريخ",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
]