import { useState } from "react";
import Modal from "./components/Modal/Modal";

function App() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(true)}>
        {show ? "Hide" : "Show"} Modal
      </button>
      <Modal show={show} title={"Confiration"} onClose={() => setShow(false)}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae amet
        pariatur ut perferendis dignissimos fugit doloremque? Fugiat quibusdam
        voluptate quam a laudantium id incidunt non tempore! At repellendus nisi
        beatae.
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            style={{
              padding: "2px 4px",
              border: "1px solid black",
              borderRadius: "2px",
              width: "4em",
              cursor: "pointer",
            }}
            onClick={() => setShow(false)}
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
}

export default App;
