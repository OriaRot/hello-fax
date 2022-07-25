import { useNavigate } from "react-router-dom";
import "./nav.css";

export function Nav() {
const navigate = useNavigate()


const handleClick = (path)=>{navigate(path)}

  return (
    <>
      <div className="nav-wraperr">
        <div className="nav-innerbox">
          <div className="nav-content">
            <div className="text" onClick={()=>handleClick('/folders')}>
              <img src="https://img.icons8.com/color/48/000000/folder-invoices--v1.png" />
              <span>התיקיות שלי</span>
            </div>
            <div className="text"onClick={()=>handleClick('/allfiles')}>
              <img src="https://img.icons8.com/external-anggara-flat-anggara-putra/32/000000/external-file-basic-user-interface-anggara-flat-anggara-putra.png" />
              <span>הקבצים שלי</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
