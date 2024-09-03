import { client } from "@/lib/pocketbase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

function ListaPreguntas() {
  const a = client.authStore.isAdmin;
  const [preguntas, setPreguntas] = useState<any>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!a) {
      navigate("/");
    }
    // you can also fetch all records at once via getFullList
    const records = async () => {
      const data = await client.collection("test_preguntas").getFullList({
        sort: "-created",
        expand: "escuela",
      });
      console.log(data);
      return data;
    };

    records()
      .then((value) => setPreguntas(value))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle>Preguntas</CardTitle>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {preguntas?.map((item: any) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.tes1}</TableCell>
                    <TableCell>{JSON.stringify(item.test2)}</TableCell>
                    <TableCell>{item.expand?.escuela?.username}</TableCell>
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

export default ListaPreguntas;
