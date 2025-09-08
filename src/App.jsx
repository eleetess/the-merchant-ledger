import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <header>
        <h1>The Merchant Ledger</h1>
      </header>
      <main></main>
      <footer></footer>
    </>
  );
}

export default App;
