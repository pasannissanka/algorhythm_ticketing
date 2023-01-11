import { Alert, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import * as React from "react";
import { Alert as IAlert } from "../utils/types";
import Upload from "./Upload";

interface UploadProps {
  setOpenUpload: (arg: boolean) => void;
  openUpload: boolean;
  onSuccess: () => void;
}

export default function UploadCsv({ setOpenUpload, openUpload, onSuccess }: UploadProps) {
  const [alert, setAlert] = React.useState<IAlert>({
    show: false,
    message: "",
    severity: "success",
  });

  const handleClose = () => {
    setOpenUpload(false);
  };

  const handleSuccess = () => {
    onSuccess()
    setOpenUpload(false);
    setAlert({
      show: true,
      message: "Marked Attendance Successfully!",
      severity: "success",
    });

    setTimeout(() => {
      setAlert({
        show: false,
        message: "Marked Attendance Successfully!",
        severity: "success",
      });
    }, 2000);
  };

  const handleError = (error: any) => {
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
  };

  return (
    <div>
      <Dialog
        open={openUpload}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Upload onSuccess={handleSuccess} onError={handleError} />
        </DialogContent>
      </Dialog>
      {alert.show && (
        <Grid item md={12} style={{ margin: 10 }}>
          <Alert severity={alert.severity}>{alert.message}</Alert>
        </Grid>
      )}
    </div>
  );
}
