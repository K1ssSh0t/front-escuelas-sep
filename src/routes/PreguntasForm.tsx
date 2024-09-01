import { Button } from "@/components/ui/button";
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
import { Switch } from "@/components/ui/switch";
import { client } from "@/lib/pocketbase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export default function FormPreguntas(preguntas: {
  tes1: string;
  test2: boolean;
  id: string;
}) {
  console.log(preguntas);
  const navigate = useNavigate();

  const existe = preguntas.id ? true : false;

  const formSchema = z.object({
    pregunta1: z.string().min(2).max(50).default(preguntas.tes1),
    pregunta2: z.boolean().default(preguntas.test2),
    //pregunta3: z.string().min(5),
  });

  // This can come from your database or API.
  const values: z.infer<typeof formSchema> = {
    //pregunta1: "fsdfdsfdsfdsf",
    pregunta1: preguntas.tes1,
    pregunta2: preguntas.test2,
  };

  const defaultValues: Partial<z.infer<typeof formSchema>> = {
    //pregunta1: "fsdfdsfdsfdsf",
    pregunta1: preguntas.tes1,
    pregunta2: preguntas.test2,
  };
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
    values,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // example create data
    const data = {
      tes1: values.pregunta1,
      test2: values.pregunta2,
      escuela: client.authStore.model?.id,
    };
    console.log(values);

    if (existe) {
      try {
        console.log("IDDDD");
        console.log(preguntas.id);
        await client.collection("test_preguntas").update(preguntas.id, data);

        navigate(0);
      } catch (error) {
        console.log(error);
      } finally {
        return;
      }
    }
    try {
      await client.collection("test_preguntas").create(data);

      navigate(0);
    } catch (error) {
      console.log(error);
    } finally {
      return;
    }
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="pregunta1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pregunta 1</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={preguntas.tes1} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pregunta2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pregunta 2</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>Tu contraseña</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">{existe ? "Actualizar" : "Enviar"}</Button>
        </form>
      </Form>
    </div>
  );
}
