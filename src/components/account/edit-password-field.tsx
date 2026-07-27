"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckIcon, XIcon } from "lucide-react";
import useChangePassword from "@/hooks/account/use-change-password";

export function EditPasswordField() {
  const [isEditing, setIsEditing] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { change, isLoading } = useChangePassword();

  function startEdit() {
    setOldPassword("");
    setNewPassword("");
    setError(null);
    setIsEditing(true);
  }

  function cancelEdit() {
    setOldPassword("");
    setNewPassword("");
    setError(null);
    setIsEditing(false);
  }

  async function save() {
    if (!oldPassword || !newPassword) {
      setError("Both fields are required");
      return;
    }

    const { error } = await change(oldPassword, newPassword);

    if (error) {
      setError(error.message);
      return;
    }

    cancelEdit();
  }

  if (!isEditing) {
    return (
      <div className="flex items-center justify-between pb-3">
        <div>
          <p className="text-sm text-muted-foreground">Password</p>
          <p className="text-sm text-white">••••••••</p>
        </div>
        <Button variant="ghost" size="sm" onClick={startEdit}>
          Edit
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 pb-3">
      <p className="text-sm text-muted-foreground">Password</p>
      <Input
        type="password"
        placeholder="Current password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        disabled={isLoading}
        autoFocus
      />
      <Input
        type="password"
        placeholder="New password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        disabled={isLoading}
      />
      <div className="flex items-center gap-2 self-end">
        <Button size="icon" variant="ghost" onClick={save} disabled={isLoading}>
          <CheckIcon size={16} />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={cancelEdit}
          disabled={isLoading}
        >
          <XIcon size={16} />
        </Button>
      </div>
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
}
