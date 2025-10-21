import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Error boundary wrapper
const root = createRoot(document.getElementById("root")!);

try {
  root.render(<App />);
} catch (error) {
  console.error('Render error:', error);
  root.render(
    <div style={{ padding: '40px', color: 'red' }}>
      <h1>Error Loading App</h1>
      <pre>{String(error)}</pre>
    </div>
  );
}
