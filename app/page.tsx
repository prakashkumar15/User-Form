"use client";

import { UserForm } from "@/components/form/userForm";
import { UserList } from "@/components/list/userList";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Navbar } from "@/components/navbar/NavBar";
import { Plus } from "lucide-react";
import { useUsers } from "@/hooks/users";

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

        <UserList
          users={users}
          isLoading={isLoading}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />
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
