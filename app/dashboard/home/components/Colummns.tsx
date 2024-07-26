"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./Cell"

export type HomeColumn = {
  id: string
  label: string
  createdAt: string
}

export const columns: ColumnDef<HomeColumn>[] = [
  {
    accessorKey: "label",
    header: "العنوان",
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