export const convertToDate = (date) => {
    return new Date(date.toString().slice(0, 4) + "." + date.toString().slice(4));
};

export const displayDate = (date) => {
        return date.getMonth() + 1 + "." + date.getFullYear();
};

export const convertAmount = (amount) => {

    let stringAmount = amount.toString();
    let minus = "";

    if (amount < 0) {
        stringAmount = stringAmount.slice(1);
        minus = "- ";
    }
    let length = stringAmount.length;
    let i = parseInt(length / 3);
    let counter = 0;

    while (i > 0) {
        let point = length - (i * 3) + counter;
        if (point > 0) {
            stringAmount = stringAmount.slice(0, point) + " " + stringAmount.slice(point);
            counter++;
        }
        i--;
    }
    return minus + stringAmount;
}
