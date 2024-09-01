import { client } from "@/lib/pocketbase";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import FormPreguntas from "./PreguntasForm";

export function Preguntas() {
  const navigate = useNavigate();
  const [preguntas, setPreguntas] = useState<any>({});
  //let preguntas: any = {};

  useEffect(() => {
    console.log(client.authStore.isValid);
    if (client.authStore.isValid == false) {
      navigate("/login");
      // console.log("No logeado");
    }
    const userId = client.authStore.model?.id;

    const fetchPregunta = async () => {
      const pregunta = await client
        .collection("test_preguntas")
        .getFirstListItem(`escuela="${userId}"`);
      //.getFirstListItem(`escuela="ldzdf8envrfyizz"`);
      // console.log("tesgsd");
      // console.log(pregunta);
      // setPreguntas(pregunta);
      //preguntas = pregunta;
      //console.log(preguntas);
      return pregunta;
      // navigate("/mipregunta", { state: { pregunta } });
    };

    fetchPregunta()
      .then((value) => {
        // preguntas = value;
        // console.log(preguntas);

        setPreguntas({
          ...preguntas,
          tes1: value.tes1,
          test2: value.test2,
          id: value.id,
        });
        //console.log(preguntas);
      })
      .catch((error) => {
        console.log("errrror");
        console.log(error);
        //setPreguntas({});
      });
  }, []);

  //
  return (
    <div className=" flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <FormPreguntas
        tes1={preguntas?.tes1}
        test2={preguntas?.test2}
        id={preguntas?.id}
      />
    </div>
  );
}
