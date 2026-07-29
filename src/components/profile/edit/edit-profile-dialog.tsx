"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/form/form-input";
import FormTextarea from "@/components/form/form-textarea";
import FormInputAvatar from "@/components/profile/edit/form-input-avatar";
import { EditPasswordField } from "@/components/profile/edit/edit-password-field";
import useUpdateProfile from "@/hooks/account/use-update-profile";
import {
  profileSchema,
  type ProfileFormValues,
} from "@/lib/validations/account";
import useUser from "@/hooks/account/use-user";

export function EditProfileDialog() {
  const [open, setOpen] = useState(false);
  const user = useUser((state) => state.user);
  const { update, isLoading } = useUpdateProfile();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nickname: user?.nickname ?? "",
      bio: user?.bio ?? "",
      avatar: undefined,
    },
    mode: "onBlur",
  });

  async function onSubmit(values: ProfileFormValues) {
    const { error } = await update({
      nickname: values.nickname,
      bio: values.bio ?? "",
      avatarFile: values.avatar,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Profile updated");
      setOpen(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (next && user) {
          form.reset({
            nickname: user.nickname ?? "",
            bio: user.bio ?? "",
            avatar: undefined,
          });
        }
        setOpen(next);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Edit profile
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="profile">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormInputAvatar
                name="avatar"
                control={form.control}
                currentAvatarPath={user?.avatar_url ?? null}
              />
              <FormInput
                name="nickname"
                control={form.control}
                label="Nickname"
                placeholder="Nickname"
              />
              <FormTextarea
                name="bio"
                control={form.control}
                label="Bio"
                placeholder="Tell people about yourself"
                maxLength={800}
                rows={4}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save changes"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="password">
            <EditPasswordField />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
