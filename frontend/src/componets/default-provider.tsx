import {ReactNode} from "react";
import { OpenModalContextProvider } from "../context/open-modal-context";
import { TarefasInfoContextProvider } from "../context/tarefas-info-context";
import { FilterContextProvider } from "../context/filter-context";

interface DefaultProviderProps {
  children: ReactNode;
}

export function DefaultProvider({children}: DefaultProviderProps) {
  return (
    <FilterContextProvider>
      <TarefasInfoContextProvider>
        <OpenModalContextProvider>
          {children}
        </OpenModalContextProvider>
    </TarefasInfoContextProvider>
    </FilterContextProvider>
    
  )
}