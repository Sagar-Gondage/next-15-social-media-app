import Image from "next/image";
import { Camera } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Resizer from "react-image-file-resizer";
import { zodResolver } from "@hookform/resolvers/zod";

import CropImageDialog from "@/components/CropImageDialog";
import LoadingButton from "@/components/LoadingButton";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useUpdateProfileMutation } from "./mutations";

import avatarPlaceholder from "@/assets/avatar-placeholder.png";

import { updateUserProfileSchema } from "@/lib/validation";


export default function EditProfileDialog({ user, open, onOpenChange }) {
    const form = useForm({
        resolver: zodResolver(updateUserProfileSchema),
        defaultValues: {
            displayName: user.displayName,
            bio: user.bio || ""
        }
    });

    const mutation = useUpdateProfileMutation();

    const [croppedAvatar, setCroppedAvatar] = useState(null);

    async function onSubmit(values) {
        const newAvatarFile = croppedAvatar
            ? new File([croppedAvatar], `avatar_${user.id}.webp`)
            : undefined;

        mutation.mutate(
            {
                values,
                avatar: newAvatarFile
            },
            {
                onSuccess: () => {
                    setCroppedAvatar(null);
                    onOpenChange(false);
                }
            }
        );
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                </DialogHeader>
                <div className="space-y-1.5">
                    <Label>Avatar</Label>
                    <AvatarInput
                        src={
                            croppedAvatar
                                ? URL.createObjectURL(croppedAvatar)
                                : user.avatarUrl || avatarPlaceholder
                        }
                        onImageCropped={setCroppedAvatar}
                    />
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        <FormField
                            control={form.control}
                            name="displayName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Display name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your display name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Tell us a little bit about yourself"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <LoadingButton type="submit" loading={mutation.isPending}>
                                Save
                            </LoadingButton>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

function AvatarInput({ src, onImageCropped }) {
    const [imageToCrop, setImageToCrop] = useState();

    const fileInputRef = useRef(null);

    function onImageSelected(image) {
        if (!image) return;

        Resizer.imageFileResizer(
            image,
            1024,
            1024,
            "WEBP",
            100,
            0,
            (uri) => setImageToCrop(uri),
            "file",
        );
    }

    return (
        <>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => onImageSelected(e.target.files?.[0])}
                ref={fileInputRef}
                className="sr-only hidden"
            />
            <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="group relative block"
            >
                <Image
                    src={src}
                    alt="Avatar preview"
                    width={150}
                    height={150}
                    className="size-32 flex-none rounded-full object-cover"
                />
                <span className="absolute inset-0 m-auto flex size-12 items-center justify-center rounded-full bg-black bg-opacity-30 text-white transition-colors duration-200 group-hover:bg-opacity-25">
                    <Camera size={24} />
                </span>
            </button>
            {imageToCrop && (
                <CropImageDialog
                    src={URL.createObjectURL(imageToCrop)}
                    cropAspectRatio={1}
                    onCropped={onImageCropped}
                    onClose={() => {
                        setImageToCrop(undefined);
                        if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                        }
                    }}
                />
            )}
        </>
    );
}
