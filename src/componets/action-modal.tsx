import { useOpenModal } from "../hooks/useOpenModal"
import { Button } from "./button";
import { Input } from "./input";
import { InputDate } from "./inputDate";
import { ActionTypes } from "../types/action-types";
import { ChangeEvent, FormEvent } from "react";
import { useChoiseTarefas } from "../hooks/useChoiseTarefas";
import { TarefasTypes } from "../types/tarefas-types";
import axios from "axios";
import { formatDateAPI } from "../utils/format-date-api";


interface ActionModalProps{
  tarefasArray:TarefasTypes[]
  setTarefasArray:(value:TarefasTypes[])=>void
}

export function ActionModal({ tarefasArray, setTarefasArray}:ActionModalProps){
  const {tarefasInfo, choisedTarefasInfo, resetTarefasInfo, updatingTable}= useChoiseTarefas();
  const {openModal, showOrNotModal, actionTypes, showAlert } = useOpenModal();

  const handleCloseModal =()=>{
    showOrNotModal();
    resetTarefasInfo();
  }

  const handleSubmit = async (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(actionTypes ===ActionTypes.ADD){
      const existTarefa = tarefasArray.filter(item=> item.nome_tarefas.toLowerCase()===tarefasInfo.nome_tarefas.toLowerCase());
      if(existTarefa.length>0) {
        showAlert({
          title:"Erro ao criar uma tarefa",
          content:"Tarefa com o mesmo nome já existe",
          colorAlert:"erro", isOpen:true
        })
      } else{
        try{
          const response = await axios.post('http://localhost:8800', 
            {
              name:tarefasInfo.nome_tarefas, 
              cost:parseFloat(tarefasInfo.custo), 
              date:formatDateAPI(tarefasInfo.data_limite), 
              ordem:tarefasArray.length+1
            }
          );
          console.log(response, tarefasArray.length)
            if(response.status ===201){
              showAlert({
                title:"Nova Tarefa",
                content:"Tarefa criada com sucesso",
                colorAlert:"sucesss", isOpen:true
              })
              tarefasArray.push(tarefasInfo);
              setTarefasArray(tarefasArray);
              updatingTable();
              showOrNotModal();
            }
        } catch (err){
          console.log(err);
        }
      }
      
    } else if(actionTypes ===ActionTypes.DEL){
      try{
        const response = await axios.delete(`http://localhost:8800/${tarefasInfo.id}`);
        console.log(response)
          if(response.status ===200){
            showAlert({
              title:"Deletada",
              content:"Tarefa deletada com sucesso",
              colorAlert:"sucesss", isOpen:true
            })
            const removeTarefa = tarefasArray.filter(item=> item.id!==tarefasInfo.id);
            const newOrderTarefa = removeTarefa.map((item,index) => ({...item,ordem:index+1}));
            setTarefasArray(newOrderTarefa);
            updatingTable();
            showOrNotModal();
          }
      } catch (err){
        console.log(err);
      }
    } else{
      try{
        console.log(tarefasInfo)
        const response = await axios.put(`http://localhost:8800/${tarefasInfo.id}`, 
          {
            name:tarefasInfo.nome_tarefas, 
            cost:parseFloat(tarefasInfo.custo), 
            date:formatDateAPI(tarefasInfo.data_limite), 
            ordem:tarefasInfo.ordem
          }
        );
        console.log(response)
          if(response.status ===200){
            showAlert({
              title:"Alterou",
              content:"Tarefa editada com sucesso",
              colorAlert:"sucesss", isOpen:true
            })
            const filterArray = tarefasArray.findIndex(item=> item.id===tarefasInfo.id);
            tarefasArray[filterArray]=tarefasInfo;
            console.log(tarefasArray)
            setTarefasArray(tarefasArray);
            updatingTable();
            console.log(tarefasArray);
            showOrNotModal();
          }
      } catch (err){
        console.log(err);
      }
    }
  }

  const handleChangeInputValue=(e:ChangeEvent<HTMLInputElement>)=>{
    const name = e.target.name;
    const value = e.target.value;
    if(name ==="custo"){
      let formatValue = value.replace('R$', '').replace('.', '').replace(',', '').replace(/(\d+)(\d{2})$/, '$1.$2');
      choisedTarefasInfo({...tarefasInfo,[name]:formatValue});
    } else{
      choisedTarefasInfo({...tarefasInfo,[name]:value});
    }
  };

  const handleChangeInputValueDate=(value:{startDate:Date})=>{
    if(value.startDate) {
      choisedTarefasInfo({...tarefasInfo,data_limite:value.startDate.toString()});
    } else{
      choisedTarefasInfo({...tarefasInfo,data_limite:""});
    }
  };

  return(
    <form onSubmit={handleSubmit} 
      className={`${openModal? "top-[50px] ":"-top-[300px]"} fixed flex-col  left-[50%] -translate-x-[50%] bg-white w-[90%] rounded-md shadow-lg p-8 transition-all duration-[1000ms] ease-in-out`}>
      <h1 className="text-2xl font-semibold text-center mb-4">
        {actionTypes ===ActionTypes.ADD?"Adicione uma Tarefa":
        actionTypes ===ActionTypes.DEL?"Você tem certeza que quer deletar essa Tarefa?":
        "Edite sua Tarefa"}
      </h1>
      <div className={`${actionTypes===ActionTypes.DEL?"hidden":"flex flex-col-reverse md:flex-row "} gap-8 mb-12`}>
        <Input 
          label={"Nome da Tarefa"}
          type={"text"}
          inputValue={tarefasInfo.nome_tarefas||""}
          handleChange={handleChangeInputValue}
          name={'nome_tarefas'}
        />
        <Input 
          label={"Custo"}
          type={"text"}
          inputValue={tarefasInfo.custo.toString()||""}
          handleChange={handleChangeInputValue}
          name={'custo'}
        />
        <InputDate 
          label={"Data Limite"}
          inputValue={tarefasInfo.data_limite}
          handleChange={handleChangeInputValueDate}
        />
      </div>
      <div className="flex justify-evenly">
        <Button
          buttonName={actionTypes ===ActionTypes.ADD?"Adicionar":
            actionTypes ===ActionTypes.DEL?"Deletar":
            "Editar"}
          type={'submit'}
          action={()=>{}}
          disabled={
            actionTypes!==ActionTypes.DEL &&
            (tarefasInfo.nome_tarefas.length===0 ||tarefasInfo.custo.length===0||tarefasInfo.data_limite.length===0)
            ?true:false}
          />
        <Button
          type={'button'}
          buttonName={"Voltar"}
          action={handleCloseModal}
          disabled={openModal?false:true}/>
      </div>
    </form>
  )
}