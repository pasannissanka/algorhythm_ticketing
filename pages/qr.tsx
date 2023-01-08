import { NextPage } from "next";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  Html5QrcodeResult,
  Html5QrScanner,
} from "../component/Html5QrCodeScanner";
import AuthWrapper from "../layouts/AuthWrapper";

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
  const prevCountRef = useRef<string>();

  console.log(data, prevCountRef.current);

  useEffect(() => {
    prevCountRef.current = data;
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
    </AuthWrapper>
  );
};

export default QRPage;
