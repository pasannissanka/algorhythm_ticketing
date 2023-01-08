import React from "react";
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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <ButtonContainer>
        <Button size="small" variant="outlined" onClick={handleClickOpen}>
          Add
        </Button>
      </ButtonContainer>
      <DataTable />
      <Modal open={open} setOpen={setOpen} />
    </div>
  );
}
