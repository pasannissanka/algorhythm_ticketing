import styled from "styled-components";

const Spinner = styled.div`
  border: 16px solid pink;
  border-top: 16px deeppink solid;
  color: #9c3587;
  border-radius: 50%;
  height: 60px;
  width: 60px;
  animation: spin 2s linear infinite;
  /* 
  border: 16px solid #f3f3f3; 
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite; */

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

export default function App() {
  return (
    <div>
      <Spinner />
    </div>
  );
}
