import { useContext, useEffect, useState } from "react";
import { FoldersCtx } from "../../context";
import axios from "axios";
import "../folders/folders.css";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { fileTypes } from "../../validationTypes/globalValidtion";
import { useParams, useNavigate } from "react-router-dom";

export function Files() {
  const { state, dispatch } = useContext(FoldersCtx);
  const [fileInput, setFileInput] = useState(false);
  const [valid, setValid] = useState(true);
  const [fileExist, setFileExist] = useState("");
  const [fileData, setFileData] = useState();
  const [fileName, setFileName] = useState();
  const [statusCode, setStatusCode] = useState();
  const [oldName, setOldName] = useState()
  const [newName, setNewName] = useState()
  const [checkName, setCheckName] = useState(true)
  const [oldValid, setOldValid] = useState(true)
  const [newValid, setNewValid] = useState(true)
  const { folder } = useParams();
  const navigate = useNavigate();

  const fileToDelete = (e) => {
    setFileName(e.target.value);
    setStatusCode(0);
  };

  const deleteFile = () => {
    axios
      .delete(`http://localhost:3500/files/deletefile/${folder}/${fileName}`)
      .then((response) => {
        console.log(response);
        setStatusCode(response.status);
        dispatch({ type: "CREATE_FILE", payload: response.data });
      })
      .catch((err) => {
        console.log(err);
        setStatusCode(err.response.status);
      });
  };


  
  const getOldName = (e)=>{
    const filename = e.target.value;;
    const check = filename.slice(filename.lastIndexOf(".") + 1);
    console.log(check);
    setOldValid(fileTypes.find((type) => type === check) ? true : false);
    setOldName(e.target.value)
    setCheckName(true)
  }
  const getNewName = (e)=>{
    const filename = e.target.value;
    const check = filename.slice(filename.lastIndexOf(".") + 1);
    console.log(check);
    setNewValid(fileTypes.find((type) => type === check) ? true : false);
    setNewName(e.target.value)
    setCheckName(true)
  }

  const changeName = ()=>{
    if(!state.files.includes(oldName)||state.files.includes(newName)) {
      // setCheckName(false)
      // return false
    } axios.post(`http://localhost:3500/files/changename/${folder}/${newName}/${oldName}`)
    .then((response)=>dispatch({ type: "CREATE_FILE", payload: response.data }))
    }

    const noClick = ()=>{}


  //check the file name
  const checkFile = (e) => {
    setFileData(e.target.files);
    const filename = e.target.files[0].name;
    const check = filename.slice(filename.lastIndexOf(".") + 1);
    console.log(check);
    setValid(fileTypes.find((type) => type === check) ? true : false);
  };

  useEffect(() => {
    console.log(state);
    const folderNm = folder;
    console.log(1234, folderNm);
    axios
      .get(`http://localhost:3500/files/folders/${folderNm}`)
      .then((response) =>
        dispatch({ type: "CREATE_FILE", payload: response.data })
      );
  }, []);

  //create new file
  const uploadFile = () => {
    const formData = new FormData();
    formData.append("new_file", fileData[0]);
    axios
      .post(`http://localhost:3500/files/upload/${folder}`, formData)
      .then((response) => {
        dispatch({ type: "CREATE_FILE", payload: response.data });
        setFileExist("");
      })
      .catch(() => setFileExist("קובץ זה קיים בתיקייה הנוכחית"));
    setFileInput(false);
    setFileData("");
  };

  const handleUploadFile = () => {
    setFileInput(!fileInput);
    setFileData("");
    setFileExist("");
  };

  const handleClick = (file) => {
    navigate(`/folders/${folder}/${file}`);
  };

  return (
    <>
      <div className="wraperr">
        <div className="left-section">
          <Button onClick={handleUploadFile} text="העלאת קובץ חדש" />
          {fileInput && <Input onChange={checkFile} type="file" />}
          {fileExist ? <h3>{fileExist}</h3> : null}
          {!valid ? (
            <span style={{ color: "red", marginTop: "25px" }}>
              <center>
                <b>הקובץ שנבחר לא בפורמט המתאים</b>
              </center>
            </span>
          ) : fileData ? (
            <center>
              <Button text="העלה קובץ" onClick={uploadFile} />
            </center>
          ) : null}
          {statusCode > 300 ? (
            <label style={{ color: "red" }}>קובץ לא קיים</label>
          ) : null}
          <div className="delete-section">
            <h3>מחיקת קובץ</h3>
            <Input
              onChange={fileToDelete}
              //onClick={deleteFolder}
              placeholder="הזן שם הקןבץ שברצונך למחוק"
              className="input"
              type="text"
            />
            <Button text="מחק קובץ" onClick={deleteFile} />
          </div>
          <div className="rename-section">
            <h3>שינוי שם לקובץ</h3>
            <div>
              {!oldValid && (
                <span style={{ color: "red" }}>
                  שם הקובץ מכיל תווים לא רצויים
                </span>
              )}
              <Input
                onChange={getOldName}
                placeholder="הזן שם הקובץ שברצונך לשנות"
                type="text"
              />
            </div>
            <div>
              {!newValid && (
                <span style={{ color: "red" }}>
                  שם הקובץ לא בפורמט המתאים
                </span>
              )}
              <Input
                onChange={getNewName}
                placeholder="הזן את השם לשינוי"
                type="text"
              />
            </div>
            {!checkName && (
              <span style={{ color: "red" }}>
                קובץ לא קיים או קיים קובץ בשם שברצונך להחליף
              </span>
            )}
            <Button text="שנה שם" onClick={checkName ? changeName : noClick} />
          </div>
        </div>
        <div className="box-header">
          <h1 className="header">קבצים</h1>
          {state.files.length > 0 ? (
            <>
              <div className="content-box">
                {state.files.map((file) => (
                  <div className="content" onClick={() => handleClick(file)}>
                    <img src="https://img.icons8.com/external-anggara-flat-anggara-putra/32/000000/external-file-basic-user-interface-anggara-flat-anggara-putra.png" />
                    <div className="folder">{file}</div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <h1>!אין קבצים בתיקייה זו זה הזמן להעלות</h1>
          )}
        </div>
      </div>
    </>
  );
}
