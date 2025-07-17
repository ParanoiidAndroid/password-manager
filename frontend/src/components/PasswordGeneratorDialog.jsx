// frontend/src/components/PasswordGeneratorDialog.jsx

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { generatePassword } from "@/lib/generatePassword";
import { Copy, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function PasswordGeneratorDialog({
  onPasswordGenerated,
  children,
}) {
  const [length, setLength] = useState(16);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState("");

  const handleGenerate = () => {
    const newPassword = generatePassword({
      length,
      useNumbers: includeNumbers,
      useSymbols: includeSymbols,
    });
    setGeneratedPassword(newPassword);
  };

  const handleCopy = () => {
    if (!generatedPassword) return;
    navigator.clipboard.writeText(generatedPassword);
    toast.success("¡Contraseña generada copiada!");
  };

  const usePassword = () => {
    if (!generatedPassword) {
      toast.error("Primero genera una contraseña.");
      return;
    }
    onPasswordGenerated(generatedPassword);
  };

  return (
    <Dialog onOpenChange={(open) => !open && setGeneratedPassword("")}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-zinc-900/80 backdrop-blur-lg border-white/20 text-white">
        <DialogHeader>
          <DialogTitle>Generador de Contraseñas</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="h-14 flex items-center justify-between rounded-md border border-white/20 bg-black/20 px-4 py-2 text-lg">
            <span className="font-mono tracking-wider flex-1 truncate">
              {generatedPassword || 'Presiona "Generar"'}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              disabled={!generatedPassword}
              className="hover:bg-white/20"
            >
              <Copy className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-5">
            <div className="space-y-3">
              <label htmlFor="length-slider" className="flex justify-between">
                <span>Longitud:</span>
                <span className="font-bold">{length}</span>
              </label>
              <Slider
                id="length-slider"
                value={[length]}
                onValueChange={(value) => setLength(value)}
                min={8}
                max={32}
                step={1}
                className="[&_[role='slider-track']]:bg-zinc-700 [&_[role='slider-range']]:bg-blue-500"
              />
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox
                id="includeNumbers"
                checked={includeNumbers}
                onCheckedChange={setIncludeNumbers}
              />
              <label
                htmlFor="includeNumbers"
                className="text-sm font-medium leading-none cursor-pointer"
              >
                Incluir Números (0-9)
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox
                id="includeSymbols"
                checked={includeSymbols}
                onCheckedChange={setIncludeSymbols}
              />
              <label
                htmlFor="includeSymbols"
                className="text-sm font-medium leading-none cursor-pointer"
              >
                Incluir Símbolos (!@#$...)
              </label>
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <Button
              variant="outline"
              className="flex-1 h-11 border-white/30 bg-white/10 hover:bg-white/20"
              onClick={handleGenerate}
            >
              <RefreshCw className="mr-2 h-4 w-4" /> Generar
            </Button>
            <Button
              className="flex-1 h-11 bg-blue-500 hover:bg-blue-600 text-white"
              onClick={usePassword}
            >
              Usar Contraseña
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
