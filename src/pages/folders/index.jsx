import { useContext, useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { FoldersCtx } from "../../context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { Popup } from "../../components/Popup";
import "./folders.css";
import { symbols } from "../../validationTypes/globalValidtion";

export function Folders() {
  const { state, dispatch } = useContext(FoldersCtx);
  const [folderName, setFolderName] = useState();
  const [handlePopup, setHandlePopup] = useState(false);
  const [statusCode, setStatusCode] = useState();
  const [oldName, setOldName] = useState()
  const [newName, setNewName] = useState()
  const [checkName, setCheckName] = useState(true)
  const [oldValid, setOldValid] = useState(true)
  const [newValid, setNewValid] = useState(true)
  const navigate = useNavigate();
  // const {folder} = useParams()

  const folderToDel = (e) => {
    setFolderName(e.target.value);
    setStatusCode(0);
  };

  const createFolder = () => {
    //open popup window
    setHandlePopup(!handlePopup);
  };

  const deleteFolder = () => {
    console.log({ folderName });
    axios
      .delete(`http://localhost:3500/files/deletefolder/${folderName}`)
      .then((response) => {
        console.log(response);
        setStatusCode(response.status);
        dispatch({ type: "DELETE_FOLDER", payload: response.data });
      })
      .catch((err) => {
        console.log(err);
        setStatusCode(err.response.status);
      });
  };

  const handleClick = (folder) => {
    navigate(`/folders/${folder}`);
  };

  const getOldName = (e)=>{
    setOldValid(
      symbols.find((char) => e.target.value.includes(char)) ? false : true
    );
    setOldName(e.target.value)
    setCheckName(true)
  }
  const getNewName = (e)=>{
    setNewValid(
      symbols.find((char) => e.target.value.includes(char)) ? false : true
    );
    setNewName(e.target.value)
    setCheckName(true)
  }

  const changeName = ()=>{
    if(!state.folders.includes(oldName)||state.folders.includes(newName)) {
      setCheckName(false)
      return false
    } axios.post(`http://localhost:3500/files/changename/${oldName}/${newName}`)
    .then((response)=>dispatch({ type: "DELETE_FOLDER", payload: response.data }))
    }

    const noClick = ()=>{}

  useEffect(() => {
    axios
      .get(`http://localhost:3500/files/folders`)
      .then((response) =>
        dispatch({ type: "DELETE_FOLDER", payload: response.data })
      );
    console.log(state);
  }, []);
  return (
    <>
      <div className="wraperr">
        <div className="left-section">
          <Button onClick={createFolder} text="תיקייה חדשה" />
          {handlePopup && <Popup close={createFolder} />}

          {statusCode > 300 ? (
            <label style={{ color: "red" }}>
              התיקייה לא קיימת/חייבת להיות ריקה מתוכן
            </label>
          ) : null}
          <div className="delete-section">
            <h3>מחיקת תיקייה</h3>
            <Input
              onChange={folderToDel}
              placeholder="הזן שם התיקייה שברצונך למחוק"
              className="input"
              type="text"
            />
            <Button text="מחק תיקייה" onClick={deleteFolder} />
          </div>
          <div className="rename-section">
            <h3>שינוי שם לתיקייה</h3>
            <div>
              {!oldValid&&<span style={{color:'red'}}>שם התיקייה מכיל תווים לא רצויים</span>}
            <Input
            onChange={getOldName}
            placeholder="הזן שם התיקייה שברצונך לשנות"
            type="text"
            />
            </div>
            <div>
            {!newValid&&<span style={{color:'red'}}>שם הקובץ מכיל תווים לא רצויים</span>}
            <Input
            onChange={getNewName}
            placeholder="הזן את השם לשינוי"
            type="text"
            />
            </div>
            {!checkName&&<span style={{color:"red"}}>קובץ לא קיים או קיים קובץ בשם שברצונך להחליף</span>}
            <Button text="שנה שם" onClick={checkName? changeName : noClick}/>
          
        </div>
        </div>
        <div className="box-header">
          <h1 className="header">תיקיות</h1>
          {state.folders.length > 0 ? (
            <>
              <div className="content-box">
                {state.folders.map((folder) => (
                  <div className="content" onClick={() => handleClick(folder)}>
                    <img src="https://img.icons8.com/color/48/000000/folder-invoices--v1.png" />
                    <div className="folder">{folder}</div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <h1>!אין לך תיקיות זה הזמן להעלות</h1>
          )}
        </div>
      </div>
     
    </>
  );
}
