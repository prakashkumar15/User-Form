"use client";

import { UserForm } from "@/components/form/userForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Navbar } from "@/components/navbar/NavBar";
import { Plus, Users } from "lucide-react";
import { useUsers } from "@/hooks/users";
import { DataTable } from "@/components/table/data-table";
import { createColumns } from "@/components/table/columns";

export default function Home() {
  const {
    isDialogOpen,
    setIsDialogOpen,
    editingUser,
    users,
    isLoading,
    handleSubmitUser,
    handleEditUser,
    handleCreateUser,
    handleCloseDialog,
    handleDeleteUser,
  } = useUsers();

  return (
    <div className="">
      <Navbar />

      <div className="space-y-6 p-6">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingUser ? "Edit User" : "Create User"}
              </DialogTitle>
            </DialogHeader>

            <UserForm
              defaultValues={editingUser || undefined}
              isEditing={!!editingUser}
              onSubmitUser={handleSubmitUser}
              onCancel={handleCloseDialog}
            />
          </DialogContent>
        </Dialog>
        {/* DataTable with users data */}
        {users.length === 0 ? (
          <div className="flex min-h-[60vh] flex-col items-center justify-center text-center gap-2 text-muted-foreground">
            <Users className="h-10 w-10 mb-2" />
            <p className="text-lg font-medium text-foreground">
              No users added yet
            </p>
            <p className="text-sm">
              Click the <span className="font-semibold">+</span> button to add
              your first user
            </p>
          </div>
        ) : (
          <DataTable
            columns={createColumns(handleEditUser, handleDeleteUser)}
            data={users}
          />
        )}
      </div>

      <Button
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
        onClick={handleCreateUser}
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
}
