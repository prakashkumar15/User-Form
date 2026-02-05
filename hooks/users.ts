"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserFormValues } from "@/lib/user.schema";
import { User } from "@/lib/types";
import { userApi } from "@/app/user.api";

export function useUsers() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Fetch users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => userApi.getAll(),
  });

  // Create user
  const createUserMutation = useMutation({
    mutationFn: async (data: UserFormValues) => {
      return userApi.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      handleCloseDialog();
    },
  });

  // Update user
  const updateUserMutation = useMutation({
    mutationFn: async (data: UserFormValues) => {
      if (!editingUser) throw new Error("No user selected");
      return userApi.update(editingUser.id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      handleCloseDialog();
    },
  });

  // Delete user
  const deleteUserMutation = useMutation({
    mutationFn: async (id: number) => {
      return userApi.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Delete error:", error);
    },
  });

  async function handleSubmitUser(data: UserFormValues) {
    if (editingUser) {
      await updateUserMutation.mutateAsync(data);
    } else {
      await createUserMutation.mutateAsync(data);
    }
  }

  async function handleDeleteUser(id: number) {
    await deleteUserMutation.mutateAsync(id);
  }

  function handleEditUser(user: User) {
    setEditingUser(user);
    setIsDialogOpen(true);
  }

  function handleCreateUser() {
    setEditingUser(null);
    setIsDialogOpen(true);
  }

  function handleCloseDialog() {
    setIsDialogOpen(false);
    setEditingUser(null);
  }

  return {
    // State
    isDialogOpen,
    setIsDialogOpen,
    editingUser,
    users,
    isLoading,
    // Mutations
    createUserMutation,
    updateUserMutation,
    deleteUserMutation,
    // Handlers
    handleSubmitUser,
    handleEditUser,
    handleCreateUser,
    handleCloseDialog,
    handleDeleteUser,
  };
}
