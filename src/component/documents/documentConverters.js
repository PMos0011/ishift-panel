export const convertToDate = (date) => {

    return new Date(date.toString().slice(0, 4) + "/" + date.toString().slice(4) + "/01");
};

export const displayDate = (date) => {
        return date.getMonth() + 1 + "." + date.getFullYear();
};

export const convertAmount = (amount) => {

    return new Intl.NumberFormat('pl-PL',{style:'currency', currency:'PLN'}).format(amount)
}
