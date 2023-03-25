import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Layout } from "./components/Layout/Layout";
import { Game } from "./components/Game/Game";

function App() {
  return (
    <Layout>
      <Game />
    </Layout>
  );
}

export default App;
