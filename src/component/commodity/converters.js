export const priceConverter = (num) =>{

   return new Intl.NumberFormat('pl-PL', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(num);
}

export const percentConverter = (num) =>{
    num=num/100;
    return new Intl.NumberFormat('pl-PL', { style:'percent', minimumFractionDigits: 2, maximumFractionDigits: 2}).format(num);   
}