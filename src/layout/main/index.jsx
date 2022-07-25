import { useReducer } from "react";
import { Header } from "../../components/Header";
import { Nav } from "../../components/Navigation";
import { FoldersCtx } from "../../context";
import { Home } from "../../pages/home";
import { initialState, reducerFn } from "../../reducer";
import {Routes,Route} from 'react-router-dom'
import {Folders} from '../../pages/folders'
import { Files } from "../../pages/files";
import { AllFiles } from "../../pages/allFiles";
import { OneFile } from "../../pages/oneFile";

export function Main() {
    const [state, dispatch] = useReducer(reducerFn, initialState);
  return (
    <>
    <FoldersCtx.Provider value={{state, dispatch}}>
      <Header />
      <Nav/>
    <Routes>
      <Route path="/" element={ <Home />} />  
      <Route path="/folders" element={<Folders/>}/>
      <Route path="/folders/:folder" element={<Files/>}/>
      <Route path="/folders/:folder/:file" element={<OneFile/>}/>
      <Route path="/allfiles" element={<AllFiles/>}/>
      </Routes>
      </FoldersCtx.Provider>
    </>
  );
}
