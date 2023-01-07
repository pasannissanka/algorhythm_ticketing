import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";
import Admin from "../component/Admin";

const Protected: NextPage = (): JSX.Element => {
  const { status, data } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/login");
  }, [status]);

  if (status === "authenticated") return <Admin />;

  return <div>loading</div>;
};

export default Protected;
