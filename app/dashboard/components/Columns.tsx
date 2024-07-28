"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./Cell"

export type OrderColumn = {
  id: string
  label: string
  createdAt: string
  number : number
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "label",
    header: "إسم",
  },
  {
    accessorKey: "number",
    header: "رقم الهاتف",
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