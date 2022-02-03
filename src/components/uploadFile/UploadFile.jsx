import { React, useState, useEffect, useRef } from 'react';

import axios from '../../axios';
const fs = require('fs');
const UploadFile = ({ currentChat, inputFile }) => {
  //   const inputFile = useRef(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (file !== null) {
      console.log('====================================');
      console.log(file);
      console.log('====================================');
      try {
        const uploadFileToDB = async () => {
          console.log(file);
          await axios.post('/api/v1/files/?chatId=' + currentChat?._id, {
            image: 'file',
          });
        };

        uploadFileToDB();
      } catch (err) {
        console.log(err.message);
      }
    } else {
      console.log('====================================');
      console.log('empty!!!!!!!!!!');
      console.log('====================================');
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
