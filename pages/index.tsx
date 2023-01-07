import { useSession } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/login");
    if (status === "authenticated") Router.replace("/home");
  }, [status]);

  return <div>Loading</div>;
}
