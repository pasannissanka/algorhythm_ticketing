import {
  Alert,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import { Types } from "mongoose";
import { NextPage } from "next";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  Html5QrcodeResult,
  Html5QrScanner,
} from "../component/Html5QrCodeScanner";
import AuthWrapper from "../layouts/AuthWrapper";
import { Ticket } from "../utils/db";
import { Alert as IAlert, ResponseBodyGeneric } from "../utils/types";
import CloseIcon from "@mui/icons-material/Close";
import {
  ButtonWrapper,
  InfoContainer,
  InfoKey,
  InfoValue,
  InfoWrapper,
} from "../component/styled/qr.page.styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  /* justify-content: center; */
`;

const QrWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Heading = styled.h3`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const QRPage: NextPage = () => {
  const [data, setData] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);
  const [ticketData, setTicketData] = useState<Ticket>();
  const [alert, setAlert] = useState<IAlert>({
    show: false,
    message: "",
    severity: "success",
  });

  const prevCountRef = useRef<string>();

  console.log(data, prevCountRef.current);

  const loadData = async (id: string) => {
    const response = await fetch(`/api/ticket/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      const { data } = (await response.json()) as ResponseBodyGeneric<Ticket>;
      if (data) {
        setTicketData(data);
        setIsOpen(true);
        prevCountRef.current = undefined;
        setData(undefined);
      }
    } else {
      setAlert({
        show: true,
        message: "Data loading failed!",
        severity: "error",
      });
    }
  };

  const markAttendance = async (id: string, attendance: string) => {
    const results = await fetch(`/api/ticket/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        attendance,
      }),
    });

    if (results.status === 200) {
      setIsOpen(false);
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
  };

  useEffect(() => {
    if (prevCountRef.current !== data) {
      console.log(data);
      prevCountRef.current = data;
      if (data && Types.ObjectId.isValid(data)) {
        loadData(data);
      }
    }
  }, [data]);

  const onScanSuccess = useCallback(
    (decodedText: any, decodedResult: Html5QrcodeResult) => {
      setData(decodedResult.decodedText);
    },
    []
  );

  return (
    <AuthWrapper>
      <Container>
        <Heading>Scan QR Code</Heading>
        <QrWrapper>
          <Html5QrScanner
            fps={10}
            qrbox={250}
            disableFlip={false}
            qrCodeSuccessCallback={onScanSuccess}
            verbose={false}
          />
        </QrWrapper>
      </Container>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          Ticket
          <IconButton
            aria-label="close"
            onClick={() => setIsOpen(false)}
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
        <DialogContent>
          {ticketData && (
            <>
              <InfoWrapper>
                <Info title="id">{ticketData._id}</Info>
                <Info title="Name">{ticketData.name}</Info>
                <Info title="Email">{ticketData.email}</Info>
                <Info title="Phone">{ticketData.phone_number}</Info>
                <Info title="TicketType">
                  {ticketData.type === "UNDERGRADUATE" ? (
                    <Chip
                      label="UNDERGRADUATE"
                      color="primary"
                      variant="outlined"
                    />
                  ) : ticketData.type === "ALUMNI" ? (
                    <Chip label="ALUMNI" color="secondary" variant="outlined" />
                  ) : ticketData.type === "VIP" ? (
                    <Chip label="VIP" color="warning" variant="outlined" />
                  ) : (
                    ""
                  )}
                </Info>
                <Info title="Payment Status">
                  {ticketData.payment_status === "FULL_PAID" ? (
                    <Chip
                      label="FULL-PAID"
                      color="success"
                      variant="outlined"
                    />
                  ) : ticketData.payment_status === "HALF_PAID" ? (
                    <Chip
                      label="HALF-PAID"
                      color="warning"
                      variant="outlined"
                    />
                  ) : (
                    ""
                  )}
                </Info>
                <Info title="Attendance">
                  {ticketData.status === "ATTENDED" ? (
                    <Chip label="ATTENDED" color="warning" variant="filled" />
                  ) : ticketData.status === "NOT_ATTENDED" ? (
                    <Chip label="NOT ATTENDED" color="info" variant="filled" />
                  ) : (
                    ""
                  )}
                </Info>
              </InfoWrapper>
              <ButtonWrapper>
                <Button
                  disabled={ticketData.status === "ATTENDED"}
                  size="large"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => markAttendance(ticketData._id, "ATTENDED")}
                >
                  Attend
                </Button>
              </ButtonWrapper>
            </>
          )}
        </DialogContent>
      </Dialog>
      {alert.show && (
        <Grid item md={12} style={{ margin: 10 }}>
          <Alert severity={alert.severity}>{alert.message}</Alert>
        </Grid>
      )}
    </AuthWrapper>
  );
};

export default QRPage;

const Info = ({ children, title }: { title: string; children: ReactNode }) => {
  return (
    <InfoContainer>
      <InfoKey variant="subtitle2">{title}</InfoKey>
      <InfoValue variant="body1">{children}</InfoValue>
    </InfoContainer>
  );
};
