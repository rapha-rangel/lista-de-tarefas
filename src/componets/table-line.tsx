import { Draggable } from "@hello-pangea/dnd";
import { FaEdit, FaTrashAlt} from "react-icons/fa";
import { ActionTypes } from "../types/action-types";
import { useOpenModal } from "../hooks/useOpenModal";
import { TarefasTypes } from "../types/tarefas-types";
import { useChoiseTarefas } from "../hooks/useChoiseTarefas";
import { formatMoney } from "../utils/format-money";
import { formatDate } from "../utils/format-date";

interface TableLineProps{
  items:TarefasTypes
  index: number
}

export function TableLine ({items, index}: TableLineProps){
  
  const {showOrNotModal, choiseActionModal, openModal} = useOpenModal();
  const {choisedTarefasInfo} = useChoiseTarefas()
  const handleOpenModal=(value:ActionTypes,index: number)=>{
    choiseActionModal(value);
    showOrNotModal();
    choisedTarefasInfo({
      id:items.id, nome_tarefas:items.nome_tarefas, custo:items.custo, data_limite:items.data_limite, ordem:items.ordem
    })  
  }
  return(
    <Draggable draggableId={items.nome_tarefas} index={index} isDragDisabled={openModal?true:false}>
      {(provided)=>(
        <tr className={`group border-b-8 border-stone-100 last:border-b-0 relative bg-white`}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <td className={`${parseFloat(items.custo) >1000?"border-l-4 border-red-500 pl-1 pr-2":"px-2"}  py-3 truncate w-[200px] md:w-[400px] lg:w-[600px] xl:w-[650px]`}>{items.nome_tarefas}</td>
          <td className="px-2 py-3 border-l-8 border-r-8 border-stone-100 ">{formatMoney(items.custo)}</td>
          <td className="px-2 py-3">{formatDate(items.data_limite)}</td>
          <td className={`${openModal?"hidden cursor-none":"absolute"} group-active:opacity-0 top-[50%] -translate-y-[50%] -translate-x-4 pl-2 flex gap-4 opacity-0 group-hover:opacity-100 group-hover:-translate-x-0 transition-all duration-300 ease-in-out`}> 
            <FaEdit className="text-2xl text-green-600 cursor-pointer hover:text-green-400"
              onClick={()=>handleOpenModal(ActionTypes.EDIT, index)}/>
            <FaTrashAlt className="text-2xl text-red-600 cursor-pointer hover:text-red-400"
              onClick={()=>handleOpenModal(ActionTypes.DEL, index)}/>
          </td>
        </tr>
      )}
    </Draggable>
    
  )
}