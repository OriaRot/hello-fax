import { useContext, useEffect } from "react";
import { FoldersCtx } from "../../context";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import './allfiles.css'
export function AllFiles() {
  const { state, dispatch } = useContext(FoldersCtx);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3500/files/allfiles").then((response) => {
      console.log("response", response.data);
      dispatch({ type: "ALL_FILES", payload: response.data });
    });
  }, []);

  const handleClick = (file) => {
    axios.get(`http://localhost:3500/files/one/${file}`).then((response) => {
      dispatch({ type: "RANDOM_ONE_FILE", payload:{folder: response.data.folder,data: response.data }});
    navigate(`/folders/${response.data.folder}/${file}`)
    });
  };
  console.log(state.allFiles);
  return (
    <>
      {state.allFiles.length > 0 ? (
        
        <>
        <div className="files-wrapper">
          <div className="files-box">
          {state.allFiles.map((file) => (//
            <div className="content" onClick={() => handleClick(file)}>
              <img src="https://img.icons8.com/external-anggara-flat-anggara-putra/32/000000/external-file-basic-user-interface-anggara-flat-anggara-putra.png" />
              <div className="folder">{file}</div>
            </div>
          ))}
          </div>
      </div>
        </>
      ) : (
        <h1>!אין קבצים קיימים זה הזמן להעלות</h1>
      )}
    </>
  );
}
