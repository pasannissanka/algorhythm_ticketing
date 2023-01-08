import { useSession } from "next-auth/react";
import Router from "next/router";
import { ReactNode, useEffect } from "react";
import styled from "styled-components";
import { signOut } from "next-auth/react";

const NavBar = styled.nav`
  display: flex;
  width: 100vw;
  padding: 5px;
  height: 7vh;
  background-color: #ffffff;
  border-bottom: 1px solid rgba(255, 199, 199, 0.7);
  justify-content: flex-end;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
`;

const Footer = styled.footer`
  width: 100vw;
  height: 5vh;
  background-color: #ffffff;
  border-top: 1px solid rgba(255, 199, 199, 0.7);
`;

const Main = styled.main`
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  /* width: 100%; */
  height: calc(100vh - 10vh - 20px);
`;

const Button = styled.button`
  margin: 5px 25px;
  display: flex;
  padding: 5px;
  color: rgb(253, 249, 243);
  font-weight: 300;
  text-transform: uppercase;
  background: #219ebc;
  border: none;
  border-radius: 3px;
  outline: 0;
  cursor: pointer;
`;

export default function AuthWrapper({ children }: { children: ReactNode }) {
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/login");
  }, [status]);

  if (status === "authenticated")
    return (
      <>
        <NavBar>
          <Button
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
