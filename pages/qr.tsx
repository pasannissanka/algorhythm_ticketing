import { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Html5QrcodePlugin from "../component/Html5QrCodeScanner";
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
`;

const Heading = styled.h3`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const QRPage: NextPage = () => {
  const [data, setData] = useState<string>()

  console.log(data)

  const onScanSuccess = useCallback((decodedText: any, decodedResult: any) => {
    setData(decodedText)
  }, []);

  return (
    <AuthWrapper>
      <Container>
        <Heading>Scan QR Code</Heading>
        <QrWrapper>
          <Html5QrcodePlugin
            fps={10}
            qrbox={250}
            disableFlip={false}
            qrCodeSuccessCallback={onScanSuccess}
          />
        </QrWrapper>
      </Container>
    </AuthWrapper>
  );
};

export default QRPage;
