import { useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import styled from "styled-components";
import { signOut } from "next-auth/react";
import { Button, Typography } from "@mui/material";

const NavBar = styled.nav`
  display: flex;
  width: 100vw;
  padding: 5px;
  height: 6vh;
  background-color: #ffffff;
  border-bottom: 1px solid rgba(255, 199, 199, 0.7);
  justify-content: space-between;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);

  button {
    margin-right: 20px;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
`;

const Footer = styled.footer`
  width: 100vw;
  height: 5vh;
  background-color: #ffffff;
  border-top: 1px solid rgba(255, 199, 199, 0.7);
`;

const Main = styled.main`
  margin-top: 10px;
  margin-bottom: 10px;
  /* width: 100%; */
  height: calc(100vh - 10vh - 20px);
`;

export default function AuthWrapper({ children }: { children: ReactNode }) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/login");
  }, [status]);

  if (status === "authenticated")
    return (
      <>
        <NavBar>
          <Title>
            <Typography onClick={() => router.push("/")} variant="h6">
              Algorhythm
            </Typography>
          </Title>
          <Button
            variant="text"
            color="primary"
            onClick={() =>
              signOut({
                callbackUrl: process.env.NEXT_PUBLIC_CALLBACK_URL,
                redirect: false,
              })
            }
          >
            Logout
          </Button>
        </NavBar>
        <Main>{children}</Main>
        <Footer></Footer>
      </>
    );

  return <div>loading</div>;
}
