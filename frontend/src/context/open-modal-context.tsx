import {createContext, useState, ReactNode} from "react";
import { ActionTypes } from "../types/action-types";


export const OpenModalContext = createContext({
  openModal:false,
  showOrNotModal:()=>{},
  actionTypes:ActionTypes.ADD,
  choiseActionModal:(value:ActionTypes)=>{},
  openAlert: {
    title:"", content:"", colorAlert:"", isOpen:false
  },
  showAlert:(value:{title:string, content:string, colorAlert:string, isOpen:boolean})=>{},
  hiddenAlert:()=>{}
})

interface ProviderProps{
  children: ReactNode
}

export function OpenModalContextProvider({children}: ProviderProps){

  const [openModal, SetOpenModal] = useState(false);
  const [openAlert, setOpenAlert] = useState({
    title:"", content:"", colorAlert:"", isOpen:false
  });
  const [actionTypes, setActionTypes] = useState(ActionTypes.ADD);

  const showOrNotModal =()=>{
    SetOpenModal(prev=>!prev);
  }

  const choiseActionModal =(value:ActionTypes)=>{
    setActionTypes(value)
  }

  const showAlert=(value:{
    title:string
    content:string,
    colorAlert:string
    isOpen:boolean
  })=>{
    setOpenAlert(value)
  }
    const hiddenAlert=()=>{
      setOpenAlert({...openAlert,isOpen:false})
  }

  return (
    <OpenModalContext.Provider
      value={{
        openModal, showAlert,hiddenAlert,openAlert,
        actionTypes,
        showOrNotModal,
        choiseActionModal
      }}
    >
      {children}
    </OpenModalContext.Provider>
  )
}