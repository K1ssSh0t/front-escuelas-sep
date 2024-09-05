import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "../components/mode-toggle";
import { client, url } from "@/lib/pocketbase";
import { Link, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  // you can also fetch all records at once via getFullList
  const records = async () =>
    await client.collection("test_preguntas").getFullList({
      sort: "-created",
    });

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full bg-background shadow-sm antialiased">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <img
                src="/placeholder.svg"
                width="32"
                height="32"
                className="rounded-full"
                alt="Avatar"
                style={{ aspectRatio: "32/32", objectFit: "cover" }}
              />
              <span className="sr-only">Toggle user menu</span>
            </Button>
            <Button variant="outline" onClick={() => console.log(records())}>
              Button
            </Button>
            {client.authStore.isValid ? (
              <>
                <Button
                  onClick={() => {
                    client.authStore.clear();
                    navigate(0);
                  }}
                >
                  Cerrar Sesion
                </Button>
                <Button variant="outline" asChild>
                  <Link to={"preguntas"}>Formulario</Link>
                </Button>
              </>
            ) : (
              <Button variant="outline" asChild>
                <Link to={"login"}>Iniciar Sesion</Link>
              </Button>
            )}
            <ModeToggle></ModeToggle>
          </div>
        </div>
      </header>
    </>
  );
}

export default App;

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
