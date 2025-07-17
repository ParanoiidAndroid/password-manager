import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";

/**
 * @param {string} title - titulo, 
 * @param {Function} onLogout - Funcion de cerrar cesión
 */
export default function HeaderBar({ title, onLogout }) {
  return (
    <header className="flex justify-between items-center mb-6 p-4">
      <div className="flex items-center gap-4">
        <CardTitle className="text-4xl font-bold tracking-tight">
          {title}
        </CardTitle>
      </div>
      <Button
        onClick={onLogout}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold transition-all"
      >
        <LogOut size={20} />
        Cerrar sesión
      </Button>
    </header>
  );
}
