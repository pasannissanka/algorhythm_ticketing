import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { TextField } from "formik-mui";
import { Form, FormikProvider, useFormik, Field } from "formik";
import * as Yup from "yup";

type ModalProps = {
  open: boolean;
  setOpen: (arg: boolean) => void;
};

export default function Modal({ open, setOpen }: ModalProps) {
  const handleClose = (reason: string) => {
    if (reason && reason == "backdropClick") return;
    setOpen(false);
  };

  const [ticketType, setTicketType] = React.useState("");
  const [ticketStatus, setTicketStatus] = React.useState("");

  const handleChange = (event: SelectChangeEvent, status: string) => {
    if (status === "ticketType") {
      setTicketType(event.target.value as string);
      setFieldValue("ticketType", event.target.value as string);
    }
    if (status === "ticketStatus") {
      setTicketStatus(event.target.value as string);
      setFieldValue("ticketStatus", event.target.value as string);
    }
  };

  const phoneRegExp = /^(?:7|0|(?:\+94))[0-9]{9,10}$/;

  const validationSchema = Yup.object().shape({
    name: Yup.string().max(30, "Max length for the name is 30.").required(),
    email: Yup.string().max(30, "Max length for the name is 30.").required(),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required(),
    ticketType: Yup.string().required(),
    ticketStatus: Yup.string().required(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      // eslint-disable-next-line
      name: "",
      email: "",
      ticketType: "",
      phone: "",
    },
    validationSchema: validationSchema,

    // eslint-disable-next-line
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      console.log("val", values);

      resetForm();
      setTicketType("");
      setFieldValue("ticketType", "");
      setTicketStatus("");
      setFieldValue("ticketStatus", "");
    },
  });

  const { handleSubmit, getFieldProps, values, setFieldValue, isValid, dirty } =
    formik;

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
                    {...getFieldProps("phone")}
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
                      <MenuItem value={"undergraduate"}>Undergraduate</MenuItem>
                      <MenuItem value={"alumni"}>Alumni</MenuItem>
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
                      label="Ticket Type"
                    >
                      <MenuItem value={"full-paid"}>Full-Paid</MenuItem>
                      <MenuItem value={"half-paid"}>half-paid</MenuItem>
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
                    ADD
                  </Button>
                </Grid>
              </Grid>
            </DialogContent>
          </Form>
        </FormikProvider>
      </Dialog>
    </div>
  );
}
