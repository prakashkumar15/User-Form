"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { UserFormValues, userSchema } from "@/lib/user.schema";
import { userFields } from "@/lib/users-form";

type Props = {
  defaultValues?: Partial<UserFormValues>;
  isEditing?: boolean;
  onSubmitUser: (data: UserFormValues) => Promise<void>;
  onCancel?: () => void;
};

export function UserForm({
  defaultValues,
  isEditing = false,
  onSubmitUser,
  onCancel,
}: Props) {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      ...defaultValues,
    },
  });

  async function onSubmit(data: UserFormValues) {
    await onSubmitUser(data);
    toast.success(
      isEditing ? "User updated successfully" : "User saved successfully",
    );
    form.reset();
  }

  return (
    <div className="space-y-4">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          {userFields.map((fieldConfig) => (
            <Controller
              key={fieldConfig.name}
              name={fieldConfig.name}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>{fieldConfig.label}</FieldLabel>
                  <Input
                    {...field}
                    type={fieldConfig.type}
                    placeholder={fieldConfig.placeholder}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          ))}
        </FieldGroup>

        <div className="flex gap-2 justify-end mt-4">
          {isEditing && onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          {!isEditing && (
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
          )}

          <Button type="submit">{isEditing ? "Update" : "Save"}</Button>
        </div>
      </form>
    </div>
  );
}
