import { relaunch } from "@tauri-apps/plugin-process";
import { check } from "@tauri-apps/plugin-updater";

export async function runUpdater() {
  try {
    console.log("Starting update check...");
    const update = await check();
    console.log("Update check result:", update);
    console.log("Update details:", {
      available: !!update,
      version: update?.version,
      date: update?.date,
      body: update?.body,
    });

    if (update) {
      console.log(
        `Found update ${update.version} from ${update.date} with notes ${update.body}`
      );
      let downloaded = 0;
      let contentLength = 0;

      console.log("Starting download and install...");
      // alternatively we could also call update.download() and update.install() separately
      await update.downloadAndInstall((event) => {
        switch (event.event) {
          case "Started":
            contentLength = event.data.contentLength ?? 0;
            console.log(
              `Started downloading ${event.data.contentLength} bytes`
            );
            break;
          case "Progress":
            downloaded += event.data.chunkLength;
            console.log(`Downloaded ${downloaded} from ${contentLength}`);
            break;
          case "Finished":
            console.log("Download finished");
            break;
        }
      });

      console.log("Update installed, relaunching...");
      // No Windows, we need to wait a bit before relaunching
      setTimeout(() => {
        relaunch().catch((error) => {
          console.error("Error relaunching:", error);
        });
      }, 1000);
    } else {
      console.log("No updates available");
    }
  } catch (error) {
    console.error("Error in update process:", error);
    throw error;
  }
}
