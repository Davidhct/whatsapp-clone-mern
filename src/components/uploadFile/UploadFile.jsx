import { React, useState, useEffect, useRef } from 'react';

import axios from '../../axios';
const fs = require('fs');
const UploadFile = ({ currentChat, inputFile }) => {
  //   const inputFile = useRef(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (file !== null) {
      try {
        const uploadFileToDB = async () => {
          console.log(file);
          let tmpurl = URL.createObjectURL(file);
          console.log(tmpurl);
          await axios.patch(
            '/api/v1/files/?chatId=' + currentChat?._id,
            tmpurl
          );
        };

        uploadFileToDB();
        setFile(null);
      } catch (err) {
        console.log(err.message);
      }
    }
  }, [file]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <>
      <input
        type='file'
        accept='image/*'
        onChange={handleFileChange}
        ref={inputFile}
        style={{ display: 'none' }}
      />
      {/* <div ref={inputFile}>
        <FileBase64
          style={{ display: 'none' }}
          multiple={false}
          onDone={({ base64 }) => setFile(base64)}
        />
      </div> */}
    </>
  );
};

export default UploadFile;
