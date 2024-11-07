import { useEffect, useState } from 'react';
import { TarefasTypes } from '../types/tarefas-types';
import axios from "axios";
import { FilterTypes } from '../types/filter-types';
import { useFilter } from './useFilter';


export default function useTarefas(){
  const [data, setData] = useState<TarefasTypes[]>([]);
  const {filterSearch} = useFilter();
  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        let res = await axios.get<TarefasTypes[]>('https://lista-de-tarefas-production-eca9.up.railway.app');
        setData(res?.data)
        console.log(res.data)
      } catch(error){
        console.log(error)
      }
    }
    fetchData();
  }, [filterSearch])

    const filterArray = data.sort((a:any,b:any) => {
      if(filterSearch===FilterTypes.ORDEM) return a.ordem-b.ordem;
      if(filterSearch===FilterTypes.CUSTO) return parseFloat(a.custo)-parseFloat(b.custo)
      if(filterSearch===FilterTypes.NAME) return a.nome_tarefas.localeCompare(b.nome_tarefas)
      if(filterSearch===FilterTypes.DATA) return a.data_limite.localeCompare(b.data_limite)
      })
  return {
    data:filterArray
  }
}