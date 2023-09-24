import React, { useState } from 'react';
import firebase from 'firebase/app';
import { storage } from '../../firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes } from 'firebase/storage';


export const JsonTest = () => {
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number | string>('');
  const [file, setFile] = useState<File | null>(null);
 

  const [jsonData, setJsonData] = useState<object | null>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(e.target.value);
  };

  const generateJson = () => {
    const data = {
      name: name,
      age: age,
    };
    setJsonData(data);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (file) {
      const storageRef = ref(storage, file.name);

      uploadBytes(storageRef, file).then(() => {
        console.log("파일이 성공적으로 업로드되었습니다.");
      }).catch((error) => {
        console.error("파일 업로드 중 오류가 발생했습니다.", error);
      });
    } else {
      console.log("파일을 선택하세요.");
    }
  };
  
  const downloadJsonFile = () => {
    if (jsonData) {
      const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.json';
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  };
  
  return (
    <div className="App">
      <h1>JSON Generator</h1>
      <div>
        <label htmlFor="name">이름:</label>
        <input type="text" id="name" value={name} onChange={handleNameChange} />
      </div>
      <div>
        <label htmlFor="age">나이:</label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={handleAgeChange}
        />
      </div>
      <button onClick={generateJson}>JSON 생성</button>
      {jsonData && (
          <div>
              <h2>생성된 JSON:</h2>
              <pre>{JSON.stringify(jsonData, null, 2)}</pre>
              <button onClick={downloadJsonFile}>JSON 파일 다운로드</button>
          </div>
      )}


      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>

      
    </div>
  );
}