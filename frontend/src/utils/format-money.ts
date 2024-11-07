export function formatMoney (value: string){
    return Number(value).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2,
      maximumFractionDigits: 2});
}