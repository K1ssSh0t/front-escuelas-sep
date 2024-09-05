import { client } from "@/lib/pocketbase";
import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

function Dashboard() {
  const a = client.authStore.isAdmin;

  const navigate = useNavigate();

  useEffect(() => {
    if (!a) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 z-50 w-full bg-background shadow-sm">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => {
                client.authStore.clear();
                navigate("/");
              }}
            >
              Cerrar Sesion
            </Button>
            <Link to={"lista_preguntas"}>Lista de Preguntas</Link>
            <pre>|</pre>
            <Link to={"lista_usuarios"}>Lista de Usuarios</Link>
            <ModeToggle></ModeToggle>
          </div>
        </div>
      </header>
      <main className="flex-1 pt-16 px-4 md:px-6">
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
