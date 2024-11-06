import {createContext, useState, ReactNode} from "react";
import { TarefasTypes } from "../types/tarefas-types";

export const TarefasInfoContext = createContext({
  tarefasInfo:{
    id:0,
    nome_tarefas: "",
    custo: "",
    data_limite: "",
    ordem:0
  },
  updateTable:false,
  updatingTable:()=>{},
  choisedTarefasInfo:(value:TarefasTypes)=>{},
  resetTarefasInfo:()=> {},
})

interface ProviderProps{
  children: ReactNode
}

export function TarefasInfoContextProvider({children}: ProviderProps){

  const [tarefasInfo, setTarefasInfo] = useState<TarefasTypes>({
    id:0,
    nome_tarefas: "",
    custo: "",
    data_limite: "",
    ordem:0
  });
  const [updateTable, setUpdateTable] = useState(false);

  const choisedTarefasInfo =(value:TarefasTypes)=>{
    setTarefasInfo(value);
  }

  const updatingTable =()=>{
    setUpdateTable(prev=>!prev)
  }


  const resetTarefasInfo =()=>{
    setTarefasInfo({
      id:0,
      nome_tarefas: "",
      custo: "",
      data_limite: "",
      ordem:0
    });
  }


  return (
    <TarefasInfoContext.Provider
      value={{
        tarefasInfo,updatingTable,updateTable,
        choisedTarefasInfo,resetTarefasInfo
      }}
    >
      {children}
    </TarefasInfoContext.Provider>
  )
}