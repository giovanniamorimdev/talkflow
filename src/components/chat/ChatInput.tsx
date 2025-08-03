import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Loader2, Send, Mic, X } from "lucide-react";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { ImageUpload } from "./ImageUpload";
import { useToast } from "@/hooks/use-toast";

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSend: (e: React.FormEvent, file?: File) => Promise<boolean>;
  onImageSelect?: (file: File) => void;
}

// Tipo para preview: imagem ou PDF
type PreviewType = {
  file: File;
  url: string;
  type: "image" | "pdf";
};

export const ChatInput = ({
  input,
  isLoading,
  onInputChange,
  onSend,
  onImageSelect,
}: ChatInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();
  const [preview, setPreview] = useState<PreviewType | null>(null);
  const { isListening, startListening } = useSpeechRecognition({
    onTranscript: (transcript) => onInputChange(input + transcript),
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    try {
      const result = await onSend(e, preview?.file);

      if (result !== false) {
        // Limpa o preview após envio bem-sucedido
        if (preview) {
          URL.revokeObjectURL(preview.url);
          setPreview(null);
        }
        onInputChange(""); // Limpa o input de texto
      }
    } catch (err) {
      console.error("Falha ao enviar mensagem:", err);
      toast({
        description: "Falha ao enviar mensagem",
        variant: "destructive",
      });
    }
  };

  const handlePaste = async (e: React.ClipboardEvent) => {
    if (!onImageSelect) return;

    const items = e.clipboardData?.items;
    const imageItem = Array.from(items).find((item) => item.type.indexOf("image") !== -1);

    if (imageItem) {
      e.preventDefault();
      const file = imageItem.getAsFile();

      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        toast({
          description: "A imagem deve ter menos de 5MB",
          variant: "destructive",
        });
        return;
      }

      handleFileSelect(file, "image");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.name.endsWith(".pdf")) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          description: "O PDF deve ter menos de 10MB.",
          variant: "destructive",
        });
        return;
      }
      handleFileSelect(file, "pdf");
    } else if (file.type.startsWith("image/")) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          description: "A imagem deve ter menos de 5MB",
          variant: "destructive",
        });
        return;
      }
      handleFileSelect(file, "image");
    } else {
      toast({
        description: "Tipo de arquivo não suportado. Envie PDF ou imagem.",
        variant: "destructive",
      });
    }

    // Reseta o input para permitir reseleção do mesmo arquivo
    e.target.value = "";
  };

  const handleFileSelect = (file: File, type: "image" | "pdf") => {
    // Revoke previous preview URL
    if (preview) {
      URL.revokeObjectURL(preview.url);
    }

    const url = URL.createObjectURL(file);
    setPreview({ file, url, type });

    if (onImageSelect && type === "image") {
      onImageSelect(file);
    }
  };

  const clearPreview = () => {
    if (preview) {
      URL.revokeObjectURL(preview.url);
      setPreview(null);
    }
  };

  const isInputEmpty = !input.trim() && !preview?.file;

  return (
    <form onSubmit={handleSubmit} className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full px-4 py-2">
      <div className="max-w-[900px] mx-auto">
        {preview && (
          <div className="flex gap-2 mb-2">
            {preview.type === "image" ? (
              <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                <img src={preview.url} alt="Preview" className="object-cover w-full h-full" />
              </div>
            ) : (
              <div className="relative w-16 h-16 rounded-lg bg-red-100 flex items-center justify-center border">
                <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                </svg>
                <button
                  type="button"
                  onClick={clearPreview}
                  className="absolute -top-1 -right-1 p-1 bg-black/50 rounded-full hover:bg-black/70"
                >
                  <X className="h-3 w-3 text-white" />
                </button>
              </div>
            )}
            <button
              type="button"
              onClick={clearPreview}
              className="ml-1 p-1 text-muted-foreground hover:text-foreground"
              aria-label="Remover arquivo"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
        <div className="relative">
          <Textarea
            placeholder="Digite uma mensagem ou cole/insira um arquivo..."
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            ref={textareaRef}
            rows={2}
            className="min-h-[24px] w-full resize-none bg-muted/50 dark:bg-muted/20 text-foreground rounded-xl pr-28 pl-12 py-4 focus-visible:ring-1 border-none overflow-y-hidden"
            disabled={isLoading}
            style={{
              height: input ? "auto" : "80px",
              minHeight: "80px",
              maxHeight: "200px",
              overflowY: input ? "auto" : "hidden",
            }}
          />
          <div className="absolute left-3 bottom-4 flex items-center gap-2">
            {/* Upload de imagem */}
            {onImageSelect && (
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="sr-only"
                  disabled={isLoading}
                />
                <svg
                  className="h-5 w-5 text-muted-foreground hover:text-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </label>
            )}

            {/* Upload de PDF */}
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="sr-only"
                disabled={isLoading}
              />
              <svg
                className="h-5 w-5 text-muted-foreground hover:text-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 10h-4m-5 0v-2m5 2v-2"
                />
              </svg>
            </label>
          </div>

          <div className="absolute right-3 bottom-4 flex items-center gap-2">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted/50"
              onClick={startListening}
              disabled={isLoading}
            >
              <Mic className="h-4 w-4" />
            </Button>
            <Button
              type="submit"
              size="icon"
              className="h-8 w-8"
              disabled={isLoading || isInputEmpty}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};