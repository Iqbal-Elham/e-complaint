import { useState } from "react";
import Navbar from "./components/Navbar";
import { useTranslation } from "react-i18next";
import Form from "./components/Form";
import Card from "./components/Card";

function App() {
  const { t } = useTranslation();

  return (
    <div>
      <Navbar />
      <div className="container mx-auto max-w-screen-xl">
        <Form />
        <Card />
      </div>
    </div>
  );
}

export default App;
