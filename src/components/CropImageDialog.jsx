import "cropperjs/dist/cropper.css";
import { useRef } from "react";
import { Cropper } from "react-cropper";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";


export default function CropImageDialog({
    src,
    cropAspectRatio,
    onCropped,
    onClose,
}) {
    const cropperRef = useRef(null);

    function crop() {
        const cropper = cropperRef.current?.cropper;
        if (!cropper) return;
        cropper.getCroppedCanvas().toBlob((blob) => onCropped(blob), "image/webp");
        onClose();
    }

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Crop image</DialogTitle>
                </DialogHeader>
                <Cropper
                    src={src}
                    aspectRatio={cropAspectRatio}
                    guides={false}
                    zoomable={false}
                    ref={cropperRef}
                    className="mx-auto size-fit"
                />
                <DialogFooter>
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={crop}>Crop</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
