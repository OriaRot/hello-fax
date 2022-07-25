import { useContext, useEffect } from "react";
import { FoldersCtx } from "../../context";
import {useParams} from 'react-router-dom'
import axios from "axios";
import './onefile.css'
export function OneFile (){
    const {state, dispatch} = useContext(FoldersCtx)
    const {folder,file} = useParams()
useEffect(()=>{
    axios.get(`http://localhost:3500/files/onefile/${folder}/${file}`)
    .then((response) => {
        console.log("response", response.data);
        dispatch({ type: "ONE_FILE", payload: response.data });
      });
},[])

    return(
        <>
        {state.oneFile.length > 0? 
          <div className="file-box">
                <div className="file-content">{state.oneFile}</div>
                </div>  :
         <div className="file-box">
         <div className="file-content">{state. randomFile.data}</div>
         </div>
    }
        </>
    )
}