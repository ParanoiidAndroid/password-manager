import { CheckCircle, XCircle } from "lucide-react";

/**
 * @param {string} message - Mensaje a mostrar.
 * @param {"success" | "error"} type - Tipo de mensaje.
 */
export default function FeedbackAlert({ message, type = "success" }) {
  const baseStyle = "w-full px-4 py-3 rounded-xl shadow-md flex items-center gap-2 text-white";
  const typeStyle =
    type === "success" ? "bg-green-600" : "bg-red-600";
  const Icon = type === "success" ? CheckCircle : XCircle;

  return (
    <div className={`${baseStyle} ${typeStyle}`}>
      <Icon size={20} />
      <span>{message}</span>
    </div>
  );
}
