"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./Cell"

export type OrderColumn = {
  id: string
  label: string
  createdAt: string
  email : string
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "label",
    header: "العنوان",
  },
  {
    accessorKey: "email",
    header: "البريد الإلكتروني",
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