"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./Cells"

export type AboutColumn = {
  id: string
  createdAt: string
}

export const columns: ColumnDef<AboutColumn>[] = [
  
  {
    accessorKey: "createdAt",
    header: "التاريخ",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
]