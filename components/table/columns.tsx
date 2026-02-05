"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { userFields } from "@/lib/users-form";

export type UserColumn = User;

export function createColumns(
  onEdit: (user: User) => void,
  onDelete: (id: number) => void,
): ColumnDef<User>[] {
    const serialColumn: ColumnDef<User> = {
      id: "serial",
      header: "S.No",
      cell: ({ row }) => row.index + 1,
    };

  // Dynamically create columns from userFields
  const fieldColumns: ColumnDef<User>[] = userFields.map((field) => ({
    accessorKey: field.name,
    header: field.label,
    cell: ({ row }) => {
      const value = row.getValue(field.name);

      // Format date fields
      if (field.type === "date" && typeof value === "string") {
        const date = new Date(value);
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      }

      return value ? String(value) : "-";
    },
  }));

  // Add actions column
  const actionColumn: ColumnDef<User> = {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex gap-2">
          <Button size="icon" variant="outline" onClick={() => onEdit(user)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="destructive"
            onClick={() => onDelete(user.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  };

  return [serialColumn, ...fieldColumns, actionColumn];
}
