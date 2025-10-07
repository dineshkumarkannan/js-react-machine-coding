import { useState } from "react";
import Toast from "./components/Toast";
import useToast from "./hooks/useToast";

function App() {
  const [position, setPosition] = useState("top-left");
  const { showToast, ToastContainer } = useToast(position);

  function handlePositionChange(e) {
    setPosition(e.target.value);
  }

  return (
    <div className="app-container">
      <ToastContainer />
      <div className="select-option">
        <select
          name="position"
          id="position"
          defaultValue={"top-left"}
          onChange={(e) => handlePositionChange(e)}
        >
          <option value="top-left">Top Left</option>
          <option value="top-right">Top Right</option>
          <option value="bottom-left">Bottom Left</option>
          <option value="bottom-right">Bottom Right</option>
        </select>
      </div>
      <div className="button-container">
        <button onClick={() => showToast("Successfully logged-in.", "success")}>
          Success
        </button>
        <button onClick={() => showToast("Details required.", "info")}>
          Info
        </button>
        <button onClick={() => showToast("Something went wrong!", "error")}>
          Error
        </button>
      </div>
    </div>
  );
}

export default App;
