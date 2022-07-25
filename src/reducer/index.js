
export const initialState = {
    folders: [],
    files: [],
    allFiles:[],
    oneFile: "",
    randomFile: {
      folder:"",
      data:""
    }
  };


export const reducerFn = (state, action) => {
    const {type, payload} = action
  
    switch(type){
      case"CREATE_FOLDER":
      let newFolder = state.folders.concat(payload)
      let allFolders = [...new Set(newFolder)]
      return{
          ...state,
          folders: allFolders
      }
      case "DELETE_FOLDER":
        return {
          ...state,
          folders:payload
        }
      case "CREATE_FILE":
        return{
          ...state,
          files: payload
      }
      case "ALL_FILES":
       
        let files = payload.flat(5)
        let  allF = [...new Set(files)]
        return{
          ...state,
          allFiles:allF
        }
        case "ONE_FILE":
          return{
            ...state,
            oneFile: payload
          }
          case "RANDOM_ONE_FILE":
            return{
              ...state,
              randomFile: {
                folder:payload.folder,
                data:payload.data
              }
            }
      default: return state
    }
  };