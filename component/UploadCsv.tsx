import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Upload from "./Upload";

interface UploadProps {
  setOpenUpload: (arg: boolean) => void;
  openUpload: boolean;
}

export default function UploadCsv({ setOpenUpload, openUpload }: UploadProps) {
  const handleClose = () => {
    setOpenUpload(false);
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
          <Upload />
        </DialogContent>
      </Dialog>
    </div>
  );
}
