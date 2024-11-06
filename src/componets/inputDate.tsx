import Datepicker from "react-tailwindcss-datepicker"

interface InputDateProps{
  label: string,
  inputValue: string
  handleChange:(value:any)=> void
}

const MIN_DATE = new Date();
MIN_DATE.setDate(MIN_DATE.getDate());


export function InputDate ({label, inputValue, handleChange}: InputDateProps){
  
  const value ={
    startDate:inputValue.length>0?new Date(inputValue):null, 
    endDate:inputValue.length>0?new Date(inputValue):null
  }
  return(
    <label className={`w-full text-black text-xl flex flex-col gap-1`}>
      {label}
      <Datepicker
        i18n={"pt-br"}
        required
        minDate={MIN_DATE}
        inputClassName="placeholder:text-gray-500 placeholder:font-light bg-gray-200 w-[252px] px-[20px] py-[9px] w-full
          rounded-md shadow-lg text-black outline outline-1 outline-gray-800 focus:outline-2 transition-all duration-100 ease-in-out"
        asSingle={true}
        popoverDirection="down"
        useRange={false}
        displayFormat="DD/MM/YYYY"
        value={value} 
        onChange={newValue => handleChange(newValue)}
    /> 
    </label>
  )
    
}