import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn } from "lucide-react";
import AnimatedBackground from "../components/AnimatedBackground";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsAnimating(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      console.log("Error al iniciar sesión:", err);
      setError("Credenciales inválidas");
    } finally {
      setIsAnimating(false);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  const buttonVariants = {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" },
    tap: { scale: 0.95, y: 2 },
    loading: {
      scale: [1, 1.05, 1],
      transition: {
        repeat: Infinity,
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <AnimatedBackground />

      {/* Capa de superposición con color RGBA y blur suave 
      <div 
        className="absolute inset-0 backdrop-filter backdrop-blur-md z-10"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
      ></div> */}

      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 w-full"
      >
        <Card className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl text-white">
          <CardHeader className="text-center p-8 bg-black/20">
            <CardTitle className="text-3xl font-bold tracking-tight">
              Bienvenido de vuelta
            </CardTitle>
            <p className="text-sm text-gray-300 mt-1">
              Ingresa tus credenciales para continuar
            </p>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={inputVariants} custom={0}>
                <label className="text-sm font-medium flex items-center gap-2 text-gray-200">
                  <Mail size={18} /> Email
                </label>
                <Input
                  type="email"
                  placeholder="tuemail@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:bg-white/20 transition-colors"
                />
              </motion.div>

              <motion.div variants={inputVariants} custom={1}>
                <label className="text-sm font-medium flex items-center gap-2 text-gray-200">
                  <Lock size={18} /> Contraseña
                </label>
                <Input
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:bg-white/20 transition-colors"
                />
              </motion.div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm text-center font-semibold"
                >
                  {error}
                </motion.p>
              )}

              <motion.div
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                animate={isAnimating ? "loading" : "rest"}
              >
                <Button
                  type="submit"
                  className="w-full mt-4 text-lg py-6 font-semibold bg-white/7 hover:bg-gray-900 text-white transition-all"
                >
                  {isAnimating ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="inline-block"
                    >
                      &#x25D0;
                    </motion.span>
                  ) : (
                    <>
                      <LogIn size={20} className="mr-2" />
                      Iniciar sesión
                    </>
                  )}
                </Button>
              </motion.div>

              <p className="text-sm text-center text-gray-400 mt-6">
                ¿No ténes cuenta?{" "}
                <a
                  href="/register"
                  className="text-blue-400 hover:underline font-semibold"
                >
                  Registrate
                </a>
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
