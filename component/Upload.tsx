import React, { useState } from "react";
import Papa from "papaparse";
import CsvReadableStream from "csv-reader";

function Upload() {
  const [file, setFile] = useState(null);

  const [parsedData, setParsedData] = useState([]);
  const [data, setData] = useState([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("data", data);
    //if await is removed, console log will be called before the uploadFile() is executed completely.
    //since the await is added, this will pause here then console log will be called
    let res = await uploadFile(file);
    //  console.log(res.data);
  };

  const uploadFile = async (file: any) => {
    const formData = new FormData();
    formData.append("avatar", file);

    // return await axios.post(UPLOAD_ENDPOINT, formData, {
    //   headers: {
    //     "content-type": "multipart/form-data"
    //   }
    // });
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
      <h1>File Upload</h1>
      <input type="file" onChange={handleOnChange} />
      <button type="submit">Upload File</button>
    </form>
  );
}

export default Upload;

//Modify the UPLOAD_ENDPOINT with the API URL.
//The uploaded file can be retreived via $_FILES['avatar'] on the server-side(PHP).
