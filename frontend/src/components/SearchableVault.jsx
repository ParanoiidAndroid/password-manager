// frontend/src/components/SearchableVault.jsx

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import PasswordCard from "./PasswordCard";

export default function SearchableVault({ vault, onEdit, onDelete }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVault = useMemo(() => {
    if (!searchQuery) {
      return vault;
    }
    return vault.filter((item) =>
      item.service.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [vault, searchQuery]);

  return (
    <div className="space-y-8">
      <div className="relative w-full">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={22}
        />
        <Input
          type="text"
          placeholder="Buscar por servicio..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 text-lg bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:bg-white/20 rounded-lg h-14"
        />
      </div>

      <div className="w-full">
        {filteredVault.length === 0 ? (
          <p className="text-center text-gray-400 pt-4">
            {searchQuery
              ? "No se encontraron resultados."
              : "No tienes contraseñas guardadas."}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVault.map((item) => (
              <PasswordCard
                key={item._id}
                item={item}
                onEdit={() => onEdit(item)}
                onDelete={() => onDelete(item._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
