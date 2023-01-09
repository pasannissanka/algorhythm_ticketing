import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { Field, Form, FormikProvider, useFormik } from "formik";
import { TextField } from "formik-mui";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Alert as AL } from "../utils/types/index";

export interface TicketValues {
  _id?: string;
  name: string;
  email: string;
  phone_number: string;
  type: "UNDERGRADUATE" | "ALUMIN" | "";
  payment_status: "FULL_PAID" | "HALF_PAID" | "NOT_PAID";
}

type ModalProps = {
  open: boolean;
  setOpen: (arg: boolean) => void;
  setCallBackEnd: (arg: boolean) => void;
  callbackEnd: boolean;
  initialValues: TicketValues;
  operation: string;
};

export default function Modal({
  open,
  setOpen,
  setCallBackEnd,
  callbackEnd,
  initialValues,
  operation,
}: ModalProps) {
  const handleClose = (reason: string) => {
    if (reason && reason == "backdropClick") return;
    setOpen(false);
  };

  const [ticketType, setTicketType] = useState("");
  const [ticketStatus, setTicketStatus] = useState("");

  const [alert, setAlert] = useState<AL>({
    show: false,
    message: "",
    severity: "success",
  });

  const handleChange = (event: SelectChangeEvent, status: string) => {
    if (status === "ticketType") {
      setTicketType(event.target.value as string);
      setFieldValue("type", event.target.value as string);
    }
    if (status === "ticketStatus") {
      setTicketStatus(event.target.value as string);
      setFieldValue("payment_status", event.target.value as string);
    }
  };

  const phone_numberRegExp = /^(?:7|0|(?:\+94))[0-9]{9,10}$/;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const validationSchema = Yup.object().shape({
    name: Yup.string().max(30, "Max length for the name is 30.").required(),
    email: Yup.string()
      .matches(emailRegex, "Email is not valid")
      .max(30, "Max length for the name is 30.")
      .required("Email is required"),
    phone_number: Yup.string()
      .matches(phone_numberRegExp, "Phone number is not valid")
      .required("Phone number is required"),
    type: Yup.string().required(),
    payment_status: Yup.string().required(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,

    // eslint-disable-next-line
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      let results;
      if (operation === "add") {
        results = await fetch("/api/ticket", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
      }

      if (operation === "edit") {
        results = await fetch(`/api/ticket/${initialValues?._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
      }

      if (results?.status === 200) {
        resetForm();
        setTicketType("");
        setFieldValue("type", "");
        setTicketStatus("");
        setFieldValue("payment_status", "");
        setAlert({
          show: true,
          message: `User ${
            operation === "add" ? "Added" : "Updated"
          } Successfully!`,
          severity: "success",
        });

        setTimeout(() => {
          setAlert({
            show: false,
            message: "",
            severity: "success",
          });
        }, 2000);

        if (operation === "edit") {
          setOpen(false);
        }

        setCallBackEnd(!callbackEnd);
      } else {
        setAlert({
          show: true,
          message: "Task Failed!",
          severity: "error",
        });

        setTimeout(() => {
          setAlert({
            show: false,
            message: "",
            severity: "error",
          });
        }, 2000);
      }
    },
  });

  const { handleSubmit, getFieldProps, values, setFieldValue, isValid, dirty } =
    formik;

  useEffect(() => {
    if (initialValues?.type) {
      setTicketType(initialValues?.type);
      setFieldValue("type", initialValues?.type);
    } else {
      setTicketType("");
      setFieldValue("type", "");
    }

    if (initialValues?.payment_status) {
      setTicketStatus(initialValues?.payment_status);
      setFieldValue("payment_status", initialValues?.payment_status);
    } else {
      setTicketStatus("");
      setFieldValue("payment_status", "");
    }
  }, [initialValues]);

  return (
    <div>
      <Dialog
        open={open}
        maxWidth="sm"
        fullWidth
        onClose={() => handleClose("backdropClick")}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Add Details
          <IconButton
            aria-label="close"
            onClick={() => handleClose("click")}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <FormikProvider value={formik}>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <DialogContent>
              <Grid
                container
                item
                xs={12}
                sm={12}
                md={12}
                spacing={2}
                style={{ color: "#707070" }}
                justifyContent="flex-start"
                alignContent="center"
              >
                <Grid item xs={12} md={12}>
                  <Field
                    id="outlined-basic"
                    label="Name"
                    {...getFieldProps("name")}
                    variant="outlined"
                    fullWidth
                    component={TextField}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Field
                    id="outlined-basic"
                    label="Email"
                    {...getFieldProps("email")}
                    variant="outlined"
                    fullWidth
                    component={TextField}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Field
                    id="outlined-basic"
                    label="Phone Number"
                    {...getFieldProps("phone_number")}
                    variant="outlined"
                    fullWidth
                    component={TextField}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  {/* <Grid> Sort By</Grid>{" "} */}
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Ticket Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={ticketType}
                      onChange={(e) => handleChange(e, "ticketType")}
                      autoWidth
                      label="Ticket Type"
                    >
                      <MenuItem value={"UNDERGRADUATE"}>Undergraduate</MenuItem>
                      <MenuItem value={"ALUMIN"}>Alumin</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                  {/* <Grid> Sort By</Grid>{" "} */}
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Ticket Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={ticketStatus}
                      onChange={(e) => handleChange(e, "ticketStatus")}
                      autoWidth
                      label="Ticket Status"
                    >
                      <MenuItem value={"FULL_PAID"}>Full-Paid</MenuItem>
                      <MenuItem value={"HALF_PAID"}>Half-Paid</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid
                  container
                  item
                  md={12}
                  sm={6}
                  xs={12}
                  justifyContent="flex-end"
                >
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={!dirty || !isValid}
                  >
                    {initialValues?.email ? "Edit" : "Add"}
                  </Button>
                </Grid>
              </Grid>
              {alert.show && (
                <Grid item md={12}>
                  <Alert severity={alert.severity}>{alert.message}</Alert>
                </Grid>
              )}
            </DialogContent>
          </Form>
        </FormikProvider>
      </Dialog>
    </div>
  );
}
