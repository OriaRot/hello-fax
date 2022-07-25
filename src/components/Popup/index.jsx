import "./popup.css";
import { Input } from "../Input";
import axios from "axios";
import { Button } from "../Button";
import { useContext, useEffect, useState } from "react";
import { symbols } from "../../validationTypes/globalValidtion";
import { FoldersCtx } from "../../context";
export function Popup(props) {
  const {state, dispatch} = useContext(FoldersCtx)
  const [created, setCreated] = useState(false);
  const [statusCode, setStatusCode] = useState(false);
  const [foldername, setFoldername] = useState();
  const [valid, setValid] = useState(true);

 

  const checkFolderName = (e) => {
    setValid(
      symbols.find((char) => e.target.value.includes(char)) ? false : true
    );
    setFoldername(e.target.value);
  };
  const createFolder = () => {
    if (!valid) return false;
    axios
      .post(`http://localhost:3500/files/createfolder`, { foldername })
      .then((response) => {
        dispatch({ type: "CREATE_FOLDER", payload: response.data })
        setCreated(true)
      setStatusCode(200)
    console.log(response.data)})
      .catch((err) => {
        setCreated(false);
        setStatusCode(err.response.status);
      });
  };

  return (
    <>
      <div className="popup-wraper">
        <div className="popup-inner-box">
          <div className="popup-content">
            <div className="exit-box">
              <button className="close-icon" onClick={props.close}>
                X
              </button>
            </div>
            <h1 className="popup-header">הזן שם תיקייה</h1>
          </div>
          <Input
            onChange={checkFolderName}
            placeholder="הזן שם תיקייה"
            type="text"
          />
          {/* tell the client that he have unvalid symbols in folder name */}
          {!valid && (
            <span style={{ color: "red", marginTop: "25px" }}>
              <b>שם התיקייה לא יכול להכיל תווים מסויימים</b>
            </span>
          )}
          {/* tell the client there is a folder in this name */}
          {statusCode >= 300 ? (
            <span style={{ color: "red", marginTop: "25px" }}>
              <b>ישנה תיקייה קיימת בשם זה</b>
            </span>
          ) : null}
          {/* tell the client folder created */}
          {!created ? (
            <Button onClick={createFolder} text="צור תיקייה" />
          ) : (
            <h1>תיקייה נוצרה בהצלחה</h1>
          )}
        </div>
      </div>
    </>
  );
}
