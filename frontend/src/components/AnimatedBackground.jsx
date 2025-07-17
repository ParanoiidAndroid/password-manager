// src/components/AnimatedBackground.jsx
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useState } from "react";

const AnimatedBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    console.log("Iniciando motor de partículas...");
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    })
      .then(() => {
        setInit(true);
        console.log(
          "Motor de partículas inicializado. Componente listo para renderizar."
        );
      })
      .catch((error) => {
        console.error("Error al inicializar el motor de partículas:", error);
      });
  }, []);

  const particlesLoaded = () => {
 
  };

  
  const options = {
    background: {
      color: {
        value: "#0A0A0A", 
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 100,
        },
      },
    },
    particles: {
      links: {
        enable: true,
        distance: 150,
        color: "#ffffff", // Color de las líneas
        opacity: 0.5, // Aumenta la opacidad de las líneas
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
      },
      number: {
        value: 100, // Aumenta el número de partículas
      },
      opacity: {
        value: 0.8, 
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 }, // Ajusta el tamaño de las partículas
      },
    },
  };

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        style={{ position: "fixed", inset: 0, zIndex: 0 }}
      />
    );
  }

  return null;
};

export default AnimatedBackground;
