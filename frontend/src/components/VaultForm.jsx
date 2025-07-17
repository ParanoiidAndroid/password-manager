import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Globe, User, Key, StickyNote, Sparkles } from "lucide-react";
import PasswordGeneratorDialog from "./PasswordGeneratorDialog";

export default function VaultForm({
  form,
  onChange,
  onSubmit,
  isEditing,
  onCancel,
}) {
  // Función para manejar la contraseña que viene del generador
  const handleGeneratedPassword = (newPassword) => {
    // Se simula un evento 'onChange' para actualizar el estado en el componente padre (Dashboard)
    const event = {
      target: {
        name: "password",
        value: newPassword,
      },
    };
    onChange(event);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 pt-0"
    >
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-200 flex items-center gap-2">
          <Globe size={16} /> Servicio
        </label>
        <Input
          name="service"
          type="text"
          placeholder="ej: Gmail, Facebook"
          value={form.service}
          onChange={onChange}
          required
          className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:bg-white/20"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-200 flex items-center gap-2">
          <User size={16} /> Usuario
        </label>
        <Input
          name="username"
          type="text"
          placeholder="Usuario o email"
          value={form.username}
          onChange={onChange}
          required
          className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:bg-white/20"
        />
      </div>

      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-gray-200 flex items-center gap-2">
            <Key size={16} /> Contraseña
          </label>
          <PasswordGeneratorDialog
            onPasswordGenerated={handleGeneratedPassword}
          >
            <Button
              type="button"
              variant="link"
              size="sm"
              className="text-blue-400 p-0 h-auto"
            >
              <Sparkles size={14} className="mr-1" />
              Generar
            </Button>
          </PasswordGeneratorDialog>
        </div>
        <Input
          name="password"
          type="text"
          placeholder="Contraseña"
          value={form.password}
          onChange={onChange}
          required
          className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:bg-white/20"
        />
      </div>

      <div className="space-y-1 md:col-span-2 lg:col-span-3">
        <label className="text-sm font-medium text-gray-200 flex items-center gap-2">
          <StickyNote size={16} /> Notas (opcional)
        </label>
        <Input
          name="notes"
          type="text"
          placeholder="Notas adicionales..."
          value={form.notes}
          onChange={onChange}
          className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:bg-white/20"
        />
      </div>

      <div className="md:col-span-2 lg:col-span-3 flex gap-4 mt-2">
        <Button
          type="submit"
          className="flex-1 text-lg py-6 font-semibold bg-white/7 hover:bg-gray-950 text-white transition-all"
        >
          {isEditing ? "Guardar cambios" : "Guardar contraseña"}
        </Button>

        {isEditing && (
          <Button
            type="button"
            onClick={onCancel}
            className="flex-1 text-lg py-6 font-semibold border border-white/30 bg-transparent text-white hover:bg-white/10"
          >
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
}
