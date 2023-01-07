import { NextPage } from "next";
import Admin from "../component/Admin";
import AuthWrapper from "../layouts/AuthWrapper";

const HomePage: NextPage = (): JSX.Element => {
  return (
    <AuthWrapper>
      <div>
        <Admin />
      </div>
    </AuthWrapper>
  );
};

export default HomePage;
