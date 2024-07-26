"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./Cells"

export type CategoriesColumn = {
  id: string
  name: string
  createdAt: string
}

export const columns: ColumnDef<CategoriesColumn>[] = [
  {
    accessorKey: "name",
    header: "الإسم",
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