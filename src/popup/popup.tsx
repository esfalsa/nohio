import React from "react";
import { createRoot } from "react-dom/client";
import browser from "webextension-polyfill";

const Popup: React.FunctionComponent = () => {
  const [blocked, setBlocked] = React.useState(null);

  React.useEffect(() => {
    browser.storage.local.get("blocked").then(({ blocked }) => {
      setBlocked(blocked);
    });
  }, []);

  return (
    <div
      style={{
        minWidth: "300px",
        fontFamily:
          '-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
      }}
    >
      <div style={{ textAlign: "center" }}>
        <img
          src={new URL("../icons/icon128.png", import.meta.url).href}
          width={64}
          height={64}
          alt="nohio logo"
        />
        <h1>nohio</h1>
        <p>
          You’ve blocked <strong>{blocked}</strong> appearances of the word
          “****” so far.
        </p>
        <p>
          <button
            onClick={() => {
              browser.storage.local.set({ blocked: 0 });
              setBlocked(0);
            }}
          >
            Reset Count
          </button>
        </p>
      </div>
    </div>
  );
};

const container = document.getElementById("app")!;
const root = createRoot(container);
root.render(<Popup />);
