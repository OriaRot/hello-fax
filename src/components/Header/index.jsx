import './header.css'
import {useNavigate} from 'react-router-dom'
export function Header(){
    const navigate = useNavigate()
    return(
        <>
        <div className="header-wraper">
            <div className="header-box">
                <div className="header-inside">
                    HELLO FAX
                    <div className="mailBox-icon" onClick={()=>navigate('/')}>
                        📬
                    </div>
                </div>
                <div className="upload-text">
                upload files faster then ever!
                </div>
            </div>
        </div>
        </>
    )
}