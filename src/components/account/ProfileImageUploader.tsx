"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { Camera, X } from "lucide-react";
import {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";

interface ProfileImageUploaderProps {
  currentImage?: string;
  userName: string;
  getInitials: (name: string) => string;
}

export interface ProfileImageUploaderRef {
  getImage: () => File | null;
  getShouldRemove: () => boolean;
}

const ProfileImageUploader = forwardRef<
  ProfileImageUploaderRef,
  ProfileImageUploaderProps
>(({ currentImage, userName, getInitials }, ref) => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    currentImage || null
  );
  const [shouldRemoveImage, setShouldRemoveImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setImagePreview(currentImage || null);
  }, [currentImage]);

  useImperativeHandle(ref, () => ({
    getImage: () => image,
    getShouldRemove: () => shouldRemoveImage && !image,
  }));

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setShouldRemoveImage(false);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    setShouldRemoveImage(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative" data-image-uploader>
      <Avatar className="h-24 w-24">
        <AvatarImage src={imagePreview || undefined} />
        <AvatarFallback className="text-lg">
          {getInitials(userName || "U")}
        </AvatarFallback>
      </Avatar>
      <div className="absolute -bottom-2 -right-2 flex gap-1">
        <Button
          size="sm"
          variant="secondary"
          className="h-8 w-8 rounded-full p-0"
          onClick={openFileDialog}
          type="button"
        >
          <Camera className="h-4 w-4" />
        </Button>
        {imagePreview && (
          <Button
            size="sm"
            variant="destructive"
            className="h-8 w-8 rounded-full p-0"
            onClick={removeImage}
            type="button"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
});

ProfileImageUploader.displayName = "ProfileImageUploader";

export { ProfileImageUploader };
