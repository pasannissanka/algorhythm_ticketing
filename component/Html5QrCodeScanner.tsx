import { Html5QrcodeScanner } from "html5-qrcode";
import type {
  QrcodeSuccessCallback,
  QrcodeErrorCallback,
} from "html5-qrcode/core";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const qrcodeRegionId = "html5qr-code-full-region";

const QrRegion = styled.div`
  @media (min-width: 320px) {
    width: 100%;
  }
  @media (min-width: 961px) {
    width: 40%;
  }
`;

export interface QrcodeResult {
  /** Decoded text. */
  text: string;
  /** Format that was successfully scanned. */
  format?: any;
}

export interface Html5QrcodeResult {
  decodedText: string;
  result: QrcodeResult;
}

type Html5QrScannerProps = {
  qrCodeSuccessCallback: QrcodeSuccessCallback;
  qrCodeErrorCallback?: QrcodeErrorCallback;
  verbose?: boolean;
  fps?: number;
  qrbox?: number;
  aspectRatio?: number;
  disableFlip?: boolean;
};

export const Html5QrScanner = (props: Html5QrScannerProps) => {
  const html5QrcodeScanner = useRef<Html5QrcodeScanner>();
  const divRef = useRef<HTMLDivElement>(null);

  function createConfig(props: Html5QrScannerProps) {
    let config: any = {};
    if (props.fps) {
      config.fps = props.fps;
    }
    if (props.qrbox) {
      config.qrbox = props.qrbox;
    }
    if (props.aspectRatio) {
      config.aspectRatio = props.aspectRatio;
    }
    if (props.disableFlip !== undefined) {
      config.disableFlip = props.disableFlip;
    }
    return config;
  }

  useEffect(() => {
    const div = divRef.current;
    let config = createConfig(props);
    let verbose = props.verbose === true;

    if (html5QrcodeScanner.current === undefined) {
      html5QrcodeScanner.current = new Html5QrcodeScanner(
        qrcodeRegionId,
        config,
        verbose
      );
      html5QrcodeScanner.current.render(
        props.qrCodeSuccessCallback,
        props.qrCodeErrorCallback
      );
    }

    return () => {
      console.log(divRef, html5QrcodeScanner)
      div?.removeChild(div?.children[0]);
      html5QrcodeScanner.current?.clear();
      html5QrcodeScanner.current = undefined;
    };
  }, [props]);

  return (
    <>
      {/* {html5QrcodeScanner.current && 
    
    } */}
      <QrRegion ref={divRef} id={qrcodeRegionId} />
    </>
  );
};
