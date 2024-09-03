import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { client } from "@/lib/pocketbase";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export function AcualizarEscuela({ Escuela }: any) {
  const navigate = useNavigate();

  const formSchema = z
    .object({
      username: z.string().min(5),
      password: z
        .union([z.string().length(0), z.string().min(5)])
        .optional()
        .transform((e) => (e === "" ? undefined : e)),
      passwordConfirm: z
        .union([z.string().length(0), z.string().min(5)])
        .optional()
        .transform((e) => (e === "" ? undefined : e)),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: "Las contrseñas no coinciden",
      path: ["passwordConfirm"],
    });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: Escuela.username,
      password: "",
      passwordConfirm: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // example create data
    const data = {
      username: values.username,
      password: values.password,
      passwordConfirm: values.passwordConfirm,
    };
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    async function fetchData() {
      const record = await client
        .collection("escuelas")
        .update(Escuela.id, data);
      console.log(record);
      return record;
    }

    fetchData()
      .then(() => navigate(0))
      .catch((error) => {
        console.log("Error", error);
      });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Acutualizar ✒️
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Actualizar Datos</DialogTitle>
          <DialogDescription>Agrega un nueva escuela</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de Usuario</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>
                    Nombre de Usuario sin espacios
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} type="password" />
                  </FormControl>
                  <FormDescription>Minimo cinco caracteres</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Contraseña</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} type="password" />
                  </FormControl>
                  <FormDescription>Minimo cinco caracteres</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Enviar</Button>
          </form>
        </Form>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
