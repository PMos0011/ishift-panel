export const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}

const getLastDay = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
}

export const getLastDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, getLastDay(year, month));
}

export const createName = (invoice) => {
    return invoice.name1 + invoice.name2 + invoice.name3
}

export const createDate = (date) => {
    let newDate = new Date(date);
    return newDate.getDate() + "." + (newDate.getMonth() + 1) + "." + newDate.getFullYear()
}