import "./home.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { FoldersCtx } from "../../context";
import axios from "axios";
export function Home() {
  const { state, dispatch } = useContext(FoldersCtx);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3500/files/allfiles").then((response) => {
      console.log("response", response.data);
      dispatch({ type: "ALL_FILES", payload: response.data });
    });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3500/files/folders`)
      .then((response) =>
        dispatch({ type: "DELETE_FOLDER", payload: response.data })
      );
    console.log(state);
  }, []);

  const handleClickFolder = (folder) => {
    navigate(`/folders/${folder}`);
  };

  const handleClickFile = (file) => {
    axios.get(`http://localhost:3500/files/one/${file}`).then((response) => {
      dispatch({ type: "RANDOM_ONE_FILE", payload:{folder: response.data.folder,data: response.data }});
    navigate(`/folders/${response.data.folder}/${file}`)
    });
  };

  return (
    <>
      <div className="home-wraper">
        <div className="home-width">
          <div className="home-header">ברוכים הבאים</div>
          <div className="home-content-box">
            <div className="box-header">
              <h1 className="header">תיקיות</h1>
              {state.folders.length > 0 ? (
                <>
                  <div className="content-box">
                    {state.folders.map((folder) => (
                      <div
                        className="content"
                        onClick={() => handleClickFolder(folder)}
                      >
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
            <div className="box-header">
              <h1 className="header">קבצים</h1>
              {state.allFiles.length > 0 ? (
                <>
                  <div className="content-box">
                    {state.allFiles.map((file) => (
                      <div
                        className="content"
                        onClick={() => handleClickFile(file)}
                      >
                        <img src="https://img.icons8.com/external-anggara-flat-anggara-putra/32/000000/external-file-basic-user-interface-anggara-flat-anggara-putra.png" />
                        <div className="folder">{file}</div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <h1>!אין בתיקייה זו זה הזמן להעלות</h1>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* <div className='root-wrapper'>
    <div className="root-box" onClick={()=>navigate('/folders')}>
    <img src="https://img.icons8.com/color/48/000000/folder-invoices--v1.png" />
     <p className="root">root</p>
     </div>
      <div className='root-text'> :למעבר לתיקייה ראשית לחץ כאן</div>
      </div> */}
    </>
  );
}
