import { ChangeEvent } from "react";

interface InputProps{
  type: string
  label: string
  inputValue: string
  handleChange:(e:ChangeEvent<HTMLInputElement>)=> void
  name: string
}

export function Input({type, label, inputValue, handleChange, name}: InputProps){

  const  costMask=(valor:string)=> {
    const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    var valorAlterado = valor;
    valorAlterado = valorAlterado.replace(/\D/g, "");
    if(valorAlterado.length === 0) return formatter.format(parseInt("0")/100);
    valorAlterado = formatter.format(parseInt(valorAlterado)/100)
    return valorAlterado;
  }
    
  return(
    <label className={`w-full text-black text-xl flex flex-col gap-1`}>
      {label}
      <input 
        onChange={handleChange}
        required
        name={name}
        type={type} 
        value={name==="custo"?costMask(inputValue):inputValue}
        placeholder={"digite seu nome"} 
        className={`${name ==="custo" && inputValue.length===0?"text-gray-500 font-light":"text-black"}placeholder:text-gray-500 placeholder:font-light bg-gray-200 w-[252px] px-[20px] py-[9px] w-full
          rounded-md shadow-lg  outline outline-1 outline-gray-800 focus:outline-2 transition-all duration-100 ease-in-out`}/>
    </label>
  )
}