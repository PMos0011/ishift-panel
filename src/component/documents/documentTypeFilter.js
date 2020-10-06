export const translateDocumentType = (docType) => {
    switch (docType) {
        case 1:
            return "deklaracja VAT 7";
        case 2:
            return "zaliczka na podatek dochodowy";
        case 3:
            return "zaliczka PIT-4R";
        case 4:
            return "zaliczka na podatek PIT-28 (PPE)";
        case 12:
            return "zaliczka na podatek PIT-36L (PPL)"
        case 15:
            return "deklaracja roczna PIT-36";
        case 16:
            return "?? P36L ??";
        default:
            return "nieokreślony";
    }
}

export const converDate = (date) => {
    return date.toString().slice(4, 6) + "." + date.toString().slice(0, 4)
}

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
