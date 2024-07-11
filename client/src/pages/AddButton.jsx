import { useState } from "react";
import Button from "react-bootstrap/Button";
export default function AddButton() {
  const [addShow, setAddShow] = useState(false);
  return (
    <Button
      variant="outline-secondary"
      onClick={() => setAddShow(true)}
      className="shadow border border-secondary fw-bold ms-1 rounded-pill"
      style={{ width: "99%" }}
    >
      ~~~~~~~~~~~~~ADD A GENRE~~~~~~~~~~~~~
    </Button>
  );
}
