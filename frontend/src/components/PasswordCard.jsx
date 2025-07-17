// frontend/src/components/PasswordCard.jsx

import { useState } from "react";
import toast from "react-hot-toast";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Globe,
  User,
  Key,
  StickyNote,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Copy,
} from "lucide-react";
import DeletePasswordDialog from "./DeletePasswordDialog";

export default function PasswordCard({ item, onEdit, onDelete }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(item.password);
    toast.success("¡Contraseña copiada!", {
      style: {
        background: "#333",
        color: "#fff",
      },
    });
  };

  return (
    <Card className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-6 transition-transform transform hover:scale-105 hover:shadow-2xl flex flex-col justify-between">
      <div>
        <CardTitle className="text-xl font-bold flex items-center gap-3">
          <Globe size={24} /> {item.service}
        </CardTitle>
        <CardDescription className="text-gray-300 mt-2 space-y-1">
          <p className="flex items-center gap-2">
            <User size={16} /> <span>Usuario: {item.username}</span>
          </p>
          <p className="flex items-center gap-2">
            <Key size={16} />
            <span>
              Contraseña:{" "}
              {isPasswordVisible
                ? item.password
                : "•".repeat(item.password.length)}
            </span>
          </p>
          {item.notes && (
            <p className="flex items-start gap-2 italic text-gray-400 mt-2">
              <StickyNote size={16} className="mt-1" /> {item.notes}
            </p>
          )}
        </CardDescription>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => onEdit(item)}
          className="bg-white/20 hover:bg-white/30 border-white/30 text-white p-2 h-auto"
          title="Editar"
        >
          <Edit size={16} />
        </Button>

        <Button
          variant="outline"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          className="bg-white/20 hover:bg-white/30 border-white/30 text-white p-2 h-auto"
          title={
            isPasswordVisible ? "Ocultar contraseña" : "Mostrar contraseña"
          }
        >
          {isPasswordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
        </Button>

        <Button
          variant="outline"
          onClick={handleCopy}
          className="bg-white/20 hover:bg-white/30 border-white/30 text-white p-2 h-auto"
          title="Copiar contraseña"
        >
          <Copy size={16} />
        </Button>

        <DeletePasswordDialog
          service={item.service}
          onConfirm={() => onDelete(item._id)}
        >
          <Button
            variant="outline"
            className="bg-red-500/80 hover:bg-red-600 border-red-500/80 text-white p-2 h-auto"
            title="Eliminar"
          >
            <Trash2 size={16} />
          </Button>
        </DeletePasswordDialog>
      </div>
    </Card>
  );
}
