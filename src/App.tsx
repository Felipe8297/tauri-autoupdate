import { useEffect } from "react";
import "./App.css";
import { runUpdater } from "./utils/updater";

function App() {
  useEffect(() => {
    console.log("Checking for updates...");
    runUpdater().catch((error) => {
      console.error("Error checking for updates:", error);
    });
  }, []);

  return (
    <main className="container">
      <h1>Hello World V11</h1>
      <p>Funciona Auto Update</p>
      <button
        onClick={() => {
          console.log("Manual update check...");
          runUpdater().catch((error) => {
            console.error("Error checking for updates:", error);
          });
        }}
      >
        Check for Updates
      </button>
    </main>
  );
}

export default App;
