"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import EditProfileDialog from "./EditProfileDialog";


export default function EditProfileButton({ user }) {
    const [showDialog, setShowDialog] = useState(false);

    return (
        <>
            <Button variant="outline" onClick={() => setShowDialog(true)}>
                Edit profile
            </Button>
            <EditProfileDialog
                user={user}
                open={showDialog}
                onOpenChange={setShowDialog}
            />
        </>
    );
}
