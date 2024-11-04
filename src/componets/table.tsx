
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { TableLine } from "./table-line";
import { TarefasTypes } from "../types/tarefas-types";
import { useEffect } from "react";
import { useChoiseTarefas } from "../hooks/useChoiseTarefas";
import axios from "axios";
import { formatDateAPI } from "../utils/format-date-api";
import { useOpenModal } from "../hooks/useOpenModal";
import { useFilter } from "../hooks/useFilter";
import { FilterTypes } from "../types/filter-types";

interface TableProps{
  tarefasArray:TarefasTypes[]
  setTarefasArray:(value:TarefasTypes[])=> void
}
export function Table({tarefasArray, setTarefasArray}: TableProps){
  const {updateTable} = useChoiseTarefas();
  const {openModal} = useOpenModal();
  const {filterSearch} = useFilter();

  useEffect(()=>{
  },[updateTable])

  const updateOrderByDrag =async(index: number, item:TarefasTypes)=>{
    if(filterSearch !==FilterTypes.ORDEM) return;
    try{
      await axios.put(`http://localhost:8800/order/${item.id}`, {
          name:item.nome_tarefas, 
          cost:parseFloat(item.custo), 
          date:formatDateAPI(item.data_limite), 
          ordem:index +1
      });
    } catch (err){
      console.log(err);
    }
  }

  const reorder =(list:TarefasTypes[], startIndex: number, endIndex: number)=>{
    const result= Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0 , removed);

    return {result, removed};
  }

  const onDragEnd =(result: any)=>{
    if(!result.destination){
      return;
    }
    console.log(result)
    const items = reorder(tarefasArray, result.source.index, result.destination.index);
    setTarefasArray(items.result);
    updateOrderByDrag(result.destination.index,items.removed);
  }

  return(
    <section className={`${openModal?"blur-sm": "blur-none"} w-full flex justify-center bg-transparent `}>
      {tarefasArray.length ===0?
        <h2 className="text-4xl font-semibold mt-8">Não exite tarefas</h2>
      :
      <table className="table-auto w-full shadow-lg ">
      <thead  >
        <tr className="text-left">
          <th className="p-2">Nome da Tarefa</th>
          <th className="p-2" >Custo</th>
          <th className="p-2" >Data Limite</th>
        </tr>
      </thead>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="task" type="list" direction="vertical" >
          {(provided)=>(
            <tbody className=" bg-white"
                ref={provided.innerRef}
                {...provided.droppableProps}
            >
              {tarefasArray && tarefasArray.map((items, index)=>(
                <TableLine
                  items={items} key={items.id} index={index}/>
              ))}
              {provided.placeholder}
            </tbody>
          )}
        </Droppable>
      </DragDropContext>
    </table>
      }
      
    </section>
    
  )
}