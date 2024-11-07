import { TarefasInfoContext } from "../context/tarefas-info-context";
import { useContext } from "react";

export function useChoiseTarefas(){
  return useContext(TarefasInfoContext)
}