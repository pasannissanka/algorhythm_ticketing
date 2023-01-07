import { Html5QrcodeScanner } from "html5-qrcode";
import React from "react";
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

class Html5QrcodePlugin extends React.Component<any> {
  html5QrcodeScanner: any;
  render() {
    return <QrRegion id={qrcodeRegionId} />;
  }

  componentWillUnmount() {
    // TODO(mebjas): See if there is a better way to handle
    //  promise in `componentWillUnmount`.
    this.html5QrcodeScanner.clear().catch((error: any) => {
      console.error("Failed to clear html5QrcodeScanner. ", error);
    });
  }

  componentDidMount() {
    // Creates the configuration object for Html5QrcodeScanner.
    function createConfig(props: any) {
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

    var config = createConfig(this.props);
    var verbose = this.props.verbose === true;

    // Suceess callback is required.
    if (!this.props.qrCodeSuccessCallback) {
      throw "qrCodeSuccessCallback is required callback.";
    }

    this.html5QrcodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId,
      config,
      verbose
    );
    this.html5QrcodeScanner.render(
      this.props.qrCodeSuccessCallback,
      this.props.qrCodeErrorCallback
    );
  }
}

export default Html5QrcodePlugin;
