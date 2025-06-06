import { useEffect } from "react";
import "./App.css";
import { runUpdater } from "./utils/updater";

function App() {
  useEffect(() => {
    runUpdater();
  }, []);

  return (
    <main className="container">
      <h1>Hello World V11</h1>
      <p>Funciona Auto Update</p>
      <button onClick={runUpdater}>Update</button>
    </main>
  );
}

export default App;
