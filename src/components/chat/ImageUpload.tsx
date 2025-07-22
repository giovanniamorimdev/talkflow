import { Button } from "@/components/ui/button";
import { ImageIcon, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRef, useState, useEffect } from "react";

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  disabled?: boolean;
}

export const ImageUpload = ({ onImageSelect, disabled }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validação de tipo
    if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
      toast({
        description: "Apenas imagens ou PDFs são permitidos",
        variant: "destructive",
      });
      return;
    }

    // Validação de tamanho
    if (file.size > 20 * 1024 * 1024) {
      toast({
        description: "Arquivo deve ter no máximo 20MB",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    onImageSelect(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedFile]);

  return (
    <div className="flex flex-col gap-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageSelect}
        accept="image/*,.pdf"
        className="hidden"
        disabled={disabled}
      />

      <div className="flex items-center gap-2">
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted/50"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>

        {selectedFile && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted px-3 py-1 rounded-md">
            {selectedFile.type.startsWith("image/") && previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="h-6 w-6 object-cover rounded-sm"
              />
            )}
            <span className="max-w-[150px] truncate">{selectedFile.name}</span>
            <button onClick={handleRemoveFile}>
              <X className="h-4 w-4 text-red-500 hover:text-red-700" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
