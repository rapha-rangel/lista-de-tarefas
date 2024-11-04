import { useOpenModal } from "../hooks/useOpenModal"
import { Button } from "./button";
import { ActionTypes } from "../types/action-types";
import { useChoiseTarefas } from "../hooks/useChoiseTarefas";
import { useFilter } from "../hooks/useFilter";
import { FilterTypes } from "../types/filter-types";

export  function Header(){
  const {showOrNotModal, openModal, choiseActionModal}= useOpenModal();
  const {resetTarefasInfo} = useChoiseTarefas();
  const {choiseFilterSearch, filterSearch} = useFilter();

  const handleOpenModal =()=>{
    resetTarefasInfo();
    showOrNotModal();
    choiseActionModal(ActionTypes.ADD);
  }
  return(
    <section className={`${openModal?"blur-sm": "blur-none"} py-12`} >
      <h1 className="text-3xl uppercase font-semibold text-center mb-8">Tarefas</h1>
      <div className="flex flex-col gap-6 md:flex-row justify-between items-left md:items-center p-4 bg-white rounded-md shadow-lg">
        <ul className="grid grid-cols-auto-fill-auto justify-evenly md:flex md:flex-row gap-8 ">
          <li className={`${filterSearch ===FilterTypes.ORDEM? "bg-[length:100%_2px]":"hover:bg-[length:100%_2px] cursor-pointer"}  font-semibold pb-0.5 bg-left-bottom bg-gradient-to-r from-indigo-500 to-indigo-500 bg-[length:0%_2px] bg-no-repeat  transition-all duration-200 ease-out`}
            onClick={()=>choiseFilterSearch(FilterTypes.ORDEM)}>
            Ordem</li>
          <li className={`${filterSearch ===FilterTypes.NAME?"bg-[length:100%_2px]":"hover:bg-[length:100%_2px] cursor-pointer"}  font-semibold pb-0.5 bg-left-bottom bg-gradient-to-r from-indigo-500 to-indigo-500 bg-[length:0%_2px] bg-no-repeat  transition-all duration-200 ease-out`}
            onClick={()=>choiseFilterSearch(FilterTypes.NAME)}>
            Nome da Tarefa</li>
          <li className={`${filterSearch ===FilterTypes.CUSTO?"bg-[length:100%_2px]":"hover:bg-[length:100%_2px] cursor-pointer"}  font-semibold pb-0.5 bg-left-bottom bg-gradient-to-r from-indigo-500 to-indigo-500 bg-[length:0%_2px] bg-no-repeat  transition-all duration-200 ease-out`}
            onClick={()=>choiseFilterSearch(FilterTypes.CUSTO)}>
            Custo</li>
          <li className={`${filterSearch ===FilterTypes.DATA ?"bg-[length:100%_2px]":"hover:bg-[length:100%_2px] cursor-pointer"}  font-semibold pb-0.5 bg-left-bottom bg-gradient-to-r from-indigo-500 to-indigo-500 bg-[length:0%_2px] bg-no-repeat  transition-all duration-200 ease-out`}
            onClick={()=>choiseFilterSearch(FilterTypes.DATA)}>
            Data Limite</li>
        </ul>
        <Button
          type={"button"}
          buttonName={"Adicionar"}
          action={handleOpenModal}
          disabled={openModal?true:false}/>
      </div>
    </section>
  )
}