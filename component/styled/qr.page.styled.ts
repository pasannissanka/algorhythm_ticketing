import { Typography } from "@mui/material";
import styled from "styled-components";

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 5px;
`;

export const InfoKey = styled(Typography)`
  display: flex;
  justify-content: end;
  width: 30%;
`;

export const InfoValue = styled(Typography)`
  display: flex;
  width: 70%;
  justify-content: start;
`;

export const ButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;
