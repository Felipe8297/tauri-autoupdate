import { useEffect } from "react";
import "./App.css";
import { runUpdater } from "./utils/updater";

function App() {

  useEffect(() => {
    runUpdater();
  }, []);

  return (
    <main className="container">
      <h1>Hello World V3</h1>
    </main>
  );
}

export default App;
