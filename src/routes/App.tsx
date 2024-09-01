import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "../components/mode-toggle";
import { client, url } from "@/lib/pocketbase";
import { Link } from "react-router-dom";

function App() {
  // you can also fetch all records at once via getFullList
  const records = async () =>
    await client.collection("test_preguntas").getFullList({
      sort: "-created",
    });

  return (
    <div className="flex justify-center align-middle text-center ">
      <Button variant="outline" onClick={() => console.log(records())}>
        Button
      </Button>
      <Link to={"login"}>Login</Link>
      <Button variant="outline" onClick={() => client.authStore.clear()}>
        Log Out
      </Button>
      <ModeToggle></ModeToggle>
    </div>
  );
}

export default App;
