import './App.css';
import { Header } from './componets/header';
import { Table } from './componets/table';
import { DefaultLayout } from './componets/default-layout';
import { useEffect, useState } from 'react';
import { ActionModal } from './componets/action-modal';
import { TarefasTypes } from './types/tarefas-types';
import useTarefas from './hooks/useTarefas';
import Alert from './componets/alert';


export default function App() {
  const [tarefasArray, setTarefasArray] = useState<TarefasTypes[]>([]);
  const {data} = useTarefas();


  useEffect(()=>{
    setTarefasArray(data)
  },[data])


  return (
    <>
    <DefaultLayout>
      <Header/>
      <Table
        tarefasArray={tarefasArray}
        setTarefasArray={setTarefasArray}
      />
    </DefaultLayout>
    <ActionModal
      tarefasArray={tarefasArray}
      setTarefasArray={setTarefasArray}/>
    <Alert/>
    </>
  );
}


