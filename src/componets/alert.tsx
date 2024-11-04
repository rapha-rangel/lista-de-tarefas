import { useEffect, useState } from "react";
import { useOpenModal } from "../hooks/useOpenModal"

export default function Alert(){
  const {openAlert, hiddenAlert} = useOpenModal();
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    clearTimeout(timer);

    const timeout = setTimeout(() => {
      hiddenAlert();
    }, 4000);

    setTimer(timeout);

    return () => clearTimeout(timeout);
  }, [openAlert]);


  return(
    <div className={`${openAlert.isOpen?"left-10":"-left-[450px]"} 
    ${openAlert.colorAlert ==="erro"?"border-red-500 text-red-900 bg-red-100":
      "border-teal-500 text-teal-900 bg-teal-100"}
      fixed bottom-10  w-[400px] border-t-4 rounded-b  px-4 py-3 shadow-md" role="alert" transition-all duration-500 ease-in-out`}>
      <div className="flex">
        <div className="py-1">
          <svg className={`${openAlert.colorAlert ==="erro"?"text-red-500":"text-teal-500"} fill-current h-6 w-6  mr-4`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
        <div>
          <p className="font-bold">{openAlert.title}</p>
          <p className="text-sm">{openAlert.content}</p>
        </div>
      </div>
    </div>
  )
} 