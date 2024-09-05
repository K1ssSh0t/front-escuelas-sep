import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./routes/App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import { Login } from "./routes/Login.tsx";
import { Preguntas } from "./routes/Preguntas.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import Usuarios from "./routes/Usuarios.tsx";
import { AdminLogin } from "./routes/AdminLogin.tsx";

import ListaPreguntas from "./routes/listaDePreguntas.tsx";
import Dashboard from "./routes/dashboard.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "preguntas",
    element: <Preguntas />,
  },
  {
    path: "admin",
    element: <AdminLogin />,
    children: [],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "lista_preguntas",
        element: <ListaPreguntas />,
      },
      {
        path: "lista_usuarios",
        element: <Usuarios />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
