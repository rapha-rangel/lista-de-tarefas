export function formatDateAPI(value:string){
  const date = new Date(value);
    
  const dia = String(date.getDate()).padStart(2, '0'); 
  const mes = String(date.getMonth() + 1).padStart(2, '0'); 
  const ano = date.getFullYear(); 

  return `${ano}-${mes}-${dia}`;
}