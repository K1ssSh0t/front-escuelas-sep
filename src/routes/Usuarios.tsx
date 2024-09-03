import { client } from "@/lib/pocketbase";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { AgregarEscuelas } from "@/components/agregarEscuela";
import { AcualizarEscuela } from "@/components/actualizarEscuela";

function Usuarios() {
  const a = client.authStore.isAdmin;
  const [escuelas, setEscuelas] = useState<any>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!a) {
      navigate("/");
    }
    // you can also fetch all records at once via getFullList
    const records = async () => {
      const data = await client.collection("escuelas").getFullList({
        sort: "-created",
      });

      return data;
    };

    records()
      .then((value) => setEscuelas(value))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <Link to={"/lista_preguntas"}>Login</Link>
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle>Escuelas</CardTitle>
            <CardDescription>
              Gestiona los datos de las escuelas registradas.
            </CardDescription>
          </div>
          <AgregarEscuelas />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Nombre Completo</TableHead>
                <TableHead>Código de Centro</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {escuelas?.map((item: any) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      {item.username}
                    </TableCell>
                    <TableCell>Escuela Primaria Acme</TableCell>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <AcualizarEscuela Escuela={item} />
                        <Button variant="outline" size="sm" color="red">
                          Eliminar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default Usuarios;
