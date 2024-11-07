interface ButtonProps {
  action: ()=>void
  buttonName:string
  disabled: boolean
  type: "button" | "submit" 
}

export function Button ({action, buttonName, disabled, type}: ButtonProps){
  return(
    <button className={`${disabled?"bg-gray-200 cursor-not-allowed text-gray-500":"cursor-pointer bg-blue-500 hover:bg-blue-100 hover:text-black"} font-semibold px-4 py-3 text-white  border-none rounded-lg   transition-all duration-200 ease-out`}
      onClick={action}
      type={type}
      disabled={disabled}>{buttonName}</button>
  )
}