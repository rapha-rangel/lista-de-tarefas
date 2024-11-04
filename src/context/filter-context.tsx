import {createContext, useState, ReactNode} from "react";
import { FilterTypes } from "../types/filter-types";


export const FilterContext = createContext({
  filterSearch:FilterTypes.ORDEM,
  choiseFilterSearch:(value:FilterTypes)=>{}
})

interface ProviderProps{
  children: ReactNode
}

export function FilterContextProvider({children}: ProviderProps){

  const [filterSearch, SetFilterSearch] = useState(FilterTypes.ORDEM);

  const choiseFilterSearch =(value:FilterTypes)=>{
    SetFilterSearch(value)
  }

  return (
    <FilterContext.Provider
      value={{
        filterSearch, 
        choiseFilterSearch
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}