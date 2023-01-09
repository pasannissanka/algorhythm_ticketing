import { useState } from "react";
import DataTable from "./DataTable";
import Modal, { TicketValues } from "./Modal";

export default function Admin() {
  const [open, setOpen] = useState(false);
  const [operation, setOperation] = useState("add");
  const [callbackEnd, setCallBackEnd] = useState(false);
  const [initialValues, setInitialValues] = useState<TicketValues>({
    name: "",
    email: "",
    type: "",
    phone_number: "",
    payment_status: "NOT_PAID",
  });

  const handleClickOpen = () => {
    setOperation("add");
    setInitialValues({
      name: "",
      email: "",
      type: "",
      phone_number: "",
      payment_status: "NOT_PAID",
    });
    setOpen(true);
  };

  return (
    <div>
      <DataTable
        callbackEnd={callbackEnd}
        setInitialValues={setInitialValues}
        setOpen={setOpen}
        setOperation={setOperation}
        onClickAdd={handleClickOpen}
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
