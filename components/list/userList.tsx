"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/types";
import { Card } from "../ui/card";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";

type Props = {
  users: User[];
  isLoading: boolean;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
};

export function UserList({ users, isLoading, onEdit, onDelete }: Props) {
  async function handleDeleteUser(id: number) {
    await onDelete(id);
    toast.success("User deleted successfully");
  }

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  return (
    <div className="space-y-3">
      <div></div>
      {users.map((user: User) => (
        <Card
          key={user.id}
          className="flex flex-row justify-between  p-4 rounded-3xl"
        >
          <div>
            <p className="font-medium">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm ">{user.email}</p>
          </div>
          <div className="flex gap-2.5">
            <Button
              size="icon"
              variant="outline"
              onClick={() => onEdit?.(user)}
            >
              <Pencil className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant="destructive"
              onClick={() => handleDeleteUser(user.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
