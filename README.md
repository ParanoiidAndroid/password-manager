# 🔐 Password Manager

Un gestor de contraseñas **full-stack** seguro, moderno y funcional, diseñado para ofrecer una experiencia de usuario fluida y un almacenamiento confiable de credenciales. El proyecto utiliza un stack de tecnologías modernas con un backend robusto en Node.js y un frontend interactivo en React.

![imagen-del-dashboard] https://prnt.sc/gD51eL5ZreXy


---

## ✨ Características Principales

* **Autenticación Segura**: Sistema de registro e inicio de sesión con tokens **JWT** y contraseñas hasheadas con **bcrypt**.
* **Gestión de Bóveda (CRUD)**: Funcionalidad completa para Crear, Leer, Actualizar y Eliminar contraseñas.
* **Búsqueda en Tiempo Real**: Filtra las contraseñas instantáneamente mientras escribís en la barra de búsqueda.
* **Generador de Contraseñas**: Herramienta integrada para crear contraseñas seguras y personalizadas (longitud, números, símbolos).
* **Diseño Moderno y Responsivo**: Interfaz con efecto *glassmorphism* construida con Tailwind CSS y componentes de `shadcn/ui`.

---

## 🛠️ Tech Stack

#### **Frontend**
* **React 18** (con Vite)
* **Tailwind CSS** para el diseño.
* **shadcn/ui** y **Radix UI** para componentes accesibles.
* **Lucide React** para la iconografía.
* **React Hot Toast** para notificaciones.
* **Axios** para las peticiones a la API.

#### **Backend**
* **Node.js** con **Express**
* **MongoDB** como base de datos, con **Mongoose** como ODM.
* **JSON Web Tokens (JWT)** para la autenticación.
* **Bcrypt.js** para el hasheo de contraseñas.
* **Dotenv** para la gestión de variables de entorno.

---

## 🚀 Cómo Empezar

Para correr este proyecto en tu máquina local, necesitarás tener instalado:
* [Node.js](https://nodejs.org/) (versión LTS recomendada)
* [npm](https://www.npmjs.com/) (viene incluido con Node.js)
* [MongoDB](https://www.mongodb.com/try/download/community) (o una instancia en la nube)

### **Instalación y Configuración**

1.  **Cloná el repositorio:**
    ```bash
    git clone [https://github.com/ParanoiidAndroid/password-manager](https://github.com/tu-usuario/password-manager.git)
    cd password-manager
    ```

2.  **Configurá el Backend:**
    ```bash
    cd backend
    npm install
    ```
    Luego, creá tu archivo de configuración. Podés copiar la plantilla:
    ```bash
    cp .env.example .env
    ```
    Ahora, abrí el archivo `.env` y rellená las variables con tus datos:
    ```
    PORT=
    DATABASE_URL=""
    JWT_SECRET=""
    ```

3.  **Configurá el Frontend:**
    ```bash
    cd ../frontend
    npm install
    ```

### **Iniciar la Aplicación**

Necesitarás **dos terminales** para correr ambos servicios.

* **Terminal 1 (Backend):**
    ```bash
    cd backend
    npm run dev
    ```
    *El servidor se iniciará en `http://localhost:5000`.*

* **Terminal 2 (Frontend):**
    ```bash
    cd frontend
    npm run dev
    ```
    *La aplicación estará disponible en `http://localhost:5173`.*

¡Y listo! Ya podés registrarte y empezar a usar tu gestor de contraseñas.
