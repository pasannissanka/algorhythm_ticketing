import { useSession } from "next-auth/react";
import Router from "next/router";
import { ReactNode, useEffect } from "react";

export default function AuthWrapper({ children }: { children: ReactNode }) {
  const { status, data } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/login");
  }, [status]);

  if (status === "authenticated") return <div>{children}</div>;

  return <div>loading</div>;
}
