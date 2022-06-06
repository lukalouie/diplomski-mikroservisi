import React from "react";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";
import classes from "./create-landing.module.css";

function CreateLanding() {
  const router = useRouter();

  const handleAdd = () => {
    router.push("/admin/create-card");
  };

  const handleExplore = () => {
    router.push("/explore");
  };

  return (
    <div className={classes.div}>
      <h2>Card has been added!</h2>
      <p>Thanks for adding a card. It will be available for buy.</p>
      <div>
        <Button type="submit" variant="outline-info" onClick={handleAdd}>
          Add another?
        </Button>
        <Button
          type="submit"
          variant="outline-success"
          onClick={handleExplore}
          style={{ "margin-left": "10vh" }}
        >
          Go explore
        </Button>
      </div>
    </div>
  );
}

export default CreateLanding;
