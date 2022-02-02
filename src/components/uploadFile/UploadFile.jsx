import { React, useState, useEffect, useRef } from 'react';
import FileBase64 from 'react-file-base64';
import axios from '../../axios';
const fs = require('fs');
const UploadFile = ({ currentChat, inputFile }) => {
  //   const inputFile = useRef(null);
  const [file, setFile] = useState();

  useEffect(() => {
    if (file !== null) {
      try {
        const uploadFileToDB = async () => {
          const toBase64 = (file) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => resolve(reader.result);
              reader.onerror = (error) => reject(error);
            });
          console.log(await toBase64(file));
          await axios.patch('/api/v1/files/?chatId=' + currentChat?._id, {
            image: await toBase64(file),
          });
        };

        uploadFileToDB();
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
