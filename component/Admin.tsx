import React, { useState } from "react";
import DataTable from "./DataTable";
import styled from "styled-components";
import Modal from "./Modal";
import Button from "@mui/material/Button";

const ButtonContainer = styled.div`
  display: flex;
  padding: 5px;
  justify-content: flex-end;
`;

export default function Admin() {
  const [open, setOpen] = useState(false);
  const [operation, setOperation] = useState("add");
  const [callbackEnd, setCallBackEnd] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    type: "",
    phone_number: "",
    payment_status: "",
  });

  const handleClickOpen = () => {
    setOperation("add");
    setInitialValues({
      name: "",
      email: "",
      type: "",
      phone_number: "",
      payment_status: "",
    });
    setOpen(true);
  };

  return (
    <div>
      <ButtonContainer>
        <Button size="small" variant="outlined" onClick={handleClickOpen}>
          Add
        </Button>
      </ButtonContainer>
      <DataTable
        callbackEnd={callbackEnd}
        setInitialValues={setInitialValues}
        setOpen={setOpen}
        setOperation={setOperation}
      />
      <Modal
        open={open}
        setOpen={setOpen}
        setCallBackEnd={setCallBackEnd}
        callbackEnd={callbackEnd}
        initialValues={initialValues}
        operation={operation}
      />
    </div>
  );
}
