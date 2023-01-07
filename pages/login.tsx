import styled, { keyframes } from "styled-components";
import { signIn } from "next-auth/react";
import { FormEventHandler, useState } from "react";
import Router from "next/router";

const jump = keyframes`
  from{
    transform: translateY(0)
  }
  to{
    transform: translateY(-3px)
  }
`;

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const Form = styled.form`
  margin: 0 auto;
  width: 100%;
  max-width: 414px;
  padding: 1.3rem;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Input = styled.input`
  max-width: 100%;
  padding: 11px 13px;
  background: #f9f9fa;
  color: #023047;
  margin-bottom: 0.9rem;
  border-radius: 4px;
  outline: 0;
  border: 1px solid rgba(245, 245, 245, 0.7);
  font-size: 14px;
  transition: all 0.3s ease-out;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }
`;

const Button = styled.button`
  max-width: 100%;
  padding: 11px 13px;
  color: rgb(253, 249, 243);
  font-weight: 600;
  text-transform: uppercase;
  background: #219ebc;
  border: none;
  border-radius: 3px;
  outline: 0;
  cursor: pointer;
  margin-top: 0.6rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
  :hover {
    background: #023047;
    animation: ${jump} 0.2s ease-out forwards;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;
  font-size: 2rem;
  color: #9c3587;
`;

const Error = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;
  font-size: 0.5rem;
  color: #9c3587;
  background: red;
  color: white;
  padding: 5px;
`;

export default function LoginPage() {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [error, setError] = useState({
    errorStatus: false,
    message: "",
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    //validate user info
    e.preventDefault();

    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });

    if (res?.status === 200) {
      Router.replace("/");
    } else {
      setError({
        errorStatus: true,
        message: res?.error || "Invalid credentials",
      });

      setTimeout(() => {
        setError({
          errorStatus: false,
          message: res?.error || "Invalid credentials",
        });
      }, 2000);
    }
  };

  return (
    <Wrapper>
      {" "}
      <Form onSubmit={handleSubmit}>
        <Header>Login</Header>
        <Input
          type="email"
          name="email"
          placeholder="email"
          value={userInfo.email}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, email: target.value })
          }
        />
        <Input
          type="password"
          name="password"
          placeholder="password"
          value={userInfo.password}
          onChange={({ target }) =>
            setUserInfo({ ...userInfo, password: target.value })
          }
        />
        <Button>Login</Button>
        {error.errorStatus && <Error>{error.message}</Error>}
      </Form>
    </Wrapper>
  );
}
