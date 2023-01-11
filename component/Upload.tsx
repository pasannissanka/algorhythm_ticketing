import { Button, Typography } from "@mui/material";
import Papa from "papaparse";
import { useState } from "react";
import styled from "styled-components";
import { TicketReqBody } from "../utils/types";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Text = styled(Typography)``;
const UploadWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 20px;
  border: 1px solid black;
`;

const ErrorWrapper = styled.pre`
  display: flex;
  flex-direction: column;
  height: 300px;
  width: 100%;
  overflow: scroll;
  padding: 10px;
`;

type UploadProps = {
  onSuccess: () => void;
  onError: (error: any) => void;
};

function Upload({ onError, onSuccess }: UploadProps) {
  const [parsedData, setParsedData] = useState([]);
  const [data, setData] = useState([]);
  const [failedData, setFailedData] = useState<{
    reason: {
      error: any;
      item: TicketReqBody;
    };
    status: "rejected" | "fulfilled";
  }>();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("data", data);
    await uploadFile(data);
  };

  const uploadFile = async (data: any) => {
    const results = await fetch(`/api/ticket/bulk`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (results.status === 200) {
      onSuccess();
    } else if (results.status === 401) {
      const data = await results.json();
      setFailedData(data.data.filter((d: { status: string; }) => d.status === "rejected"));
    } else {
      onError(undefined);
    }
  };

  const handleOnChange = (e: any) => {
    Papa.parse(e?.target?.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results: any) {
        const rowsArray: any = [];
        const valuesArray: any = [];
        const data: any = [];

        // Iterating data to get column name and their values
        results.data.map((d: any) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
          data.push(d);
        });

        // Parsed Data Response in array format
        setParsedData(results.data);

        setData(data);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Wrapper>
        {/* <Title variant="h6">Create tickets</Title> */}
        <Text variant="subtitle1">Upload CSV file</Text>
        <Text variant="subtitle2">
          name,email,phone_number,type,payment_status
        </Text>
        {failedData && (
          <>
            <Text color="red">Following data not added: Error occurred</Text>
            <ErrorWrapper>{JSON.stringify(failedData, null, 2)}</ErrorWrapper>
          </>
        )}
        <UploadWrapper>
          <input type="file" onChange={handleOnChange} />
        </UploadWrapper>
        <Button variant="contained" fullWidth type="submit">
          Upload File
        </Button>
      </Wrapper>
    </form>
  );
}

export default Upload;

//Modify the UPLOAD_ENDPOINT with the API URL.
//The uploaded file can be retreived via $_FILES['avatar'] on the server-side(PHP).
