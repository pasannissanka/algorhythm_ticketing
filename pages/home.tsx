import { NextPage } from "next";
import Script from "next/script";
import Admin from "../component/Admin";
import AuthWrapper from "../layouts/AuthWrapper";

const HomePage: NextPage = (): JSX.Element => {
  return (
    <>
      <Script src="html5-qrcode.min.js" />

      <AuthWrapper>
        <div>
          <Admin />
        </div>
      </AuthWrapper>
    </>
  );
};

export default HomePage;
