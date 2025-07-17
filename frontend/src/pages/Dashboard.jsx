import { useEffect, useState } from "react";
import { useAuth } from "@/context/useAuth";
import { useVaultActions } from "@/hooks/useVaultActions";

import HeaderBar from "@/components/HeaderBar";
import VaultForm from "@/components/VaultForm";
import FeedbackAlert from "@/components/FeedbackAlert";
import AnimatedBackground from "@/components/AnimatedBackground";
import SearchableVault from "@/components/SearchableVault"; 
export default function Dashboard() {
  const { logout } = useAuth();
  const {
    vault,
    loading,
    feedback,
    fetchVault,
    addOrEditPassword,
    deletePassword,
  } = useVaultActions();


  const [form, setForm] = useState({
    service: "",
    username: "",
    password: "",
    notes: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchVault();
  }, [fetchVault]);

  const handleEdit = (entry) => {
    setForm({
      service: entry.service,
      username: entry.username,
      password: entry.password,
      notes: entry.notes || "",
    });
    setEditingId(entry._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setForm({ service: "", username: "", password: "", notes: "" });
    setEditingId(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 relative text-white">
      <AnimatedBackground />
      <div
        className="absolute inset-0 backdrop-filter backdrop-blur-md z-10"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
      ></div>

      <div className="relative z-20 w-full max-w-5xl mx-auto space-y-8">
        {feedback && <FeedbackAlert feedback={feedback} />}
        <HeaderBar title="Panel de Contraseñas" onLogout={logout} />
        <VaultForm
          form={form}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
          onSubmit={(e) => {
            e.preventDefault();
            addOrEditPassword(form, editingId, resetForm);
          }}
          isEditing={!!editingId}
          onCancel={resetForm}
        />

        <div className="w-full">
          {loading ? (
            <p className="text-center text-gray-300">Cargando contraseñas...</p>
          ) : (
            <SearchableVault
              vault={vault}
              onEdit={handleEdit}
              onDelete={deletePassword}
            />
          )}
        </div>
      </div>
    </div>
  );
}
