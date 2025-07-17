import { useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/useAuth";

export function useVaultActions() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [vault, setVault] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState(null);

  const showFeedback = (message, type = "success") => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback(null), 3000);
  };

  const fetchVault = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/vault", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setVault(res.data);
    } catch (err) {
      console.error("Error al obtener contraseñas:", err);
      if (err.response?.status === 401) {
        logout();
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  }, [user.token, logout, navigate]);

  const addOrEditPassword = async (form, editingId, resetForm, stopEditing) => {
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/vault/${editingId}`, form, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        showFeedback("Contraseña editada exitosamente.");
      } else {
        await axios.post("http://localhost:5000/api/vault", form, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        showFeedback("Contraseña guardada exitosamente.");
      }

      resetForm();
      stopEditing?.();
      fetchVault();
    } catch (err) {
      console.error("Error al guardar/editar contraseña:", err);
      showFeedback("Hubo un error al guardar. Intenta nuevamente.", "error");
    }
  };

  const deletePassword = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/vault/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      fetchVault();
      showFeedback("Contraseña eliminada correctamente.");
    } catch (err) {
      console.error("Error al eliminar contraseña:", err);
      showFeedback("Error al eliminar contraseña.", "error");
    }
  };

  return {
    vault,
    loading,
    feedback,
    fetchVault,
    addOrEditPassword,
    deletePassword,
  };
}
