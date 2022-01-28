import { React, useState, useEffect, useRef } from 'react';
import FileBase64 from 'react-file-base64';
import axios from '../../axios';
const UploadFile = ({ currentChat, inputFile }) => {
  //   const inputFile = useRef(null);
  const [newFile, setNewFile] = useState(null);

  useEffect(() => {
    if (newFile !== null) {
      try {
        const uploadFileToDB = async () => {
          // let baseURL;

          // const fd = new FormData();
          // fd.append('image', newFile, newFile.name);
          // console.log(fd);
          // let reader = new FileReader();
          // reader.onload = () => {
          //   baseURL = reader.result;
          //   // console.log(baseURL);
          //   axios.patch('/api/v1/files/?chatId=' + currentChat?._id, {
          //     image: reader.result,
          //   });
          // };
          // baseURL = reader.readAsDataURL(newFile);
          await axios.post('/api/v1/files/?chatId=' + currentChat?._id, {
            image: newFile,
          });
        };

        uploadFileToDB();
      } catch (err) {
        console.log(err.message);
      }
    }
  }, [newFile]);

  const handleFileChange = (event) => {
    setNewFile(event.target.files[0]);
    // const upFile = event.target.files[0];
    // const fd = new FormData();
    // fd.append('image', newFile, newFile.name);

    // const uploadFileToDB = async () => {
    //   console.log(newFile);
    //   //   await axios.patch('/api/v1/files/?chatId=' + currentChat?._id, {
    //   //     image: fd,
    //   //   });
    // };
    // console.log(event.target.files[0].name);
    // uploadFileToDB();
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
      {/* <FileBase64
        multiple={false}
        accept='image/*'
        ref={inputFile}
        style={{ display: 'none' }}
        onDone={({ base64 }) => setNewFile(base64)}
      /> */}
    </>
  );
};

export default UploadFile;
