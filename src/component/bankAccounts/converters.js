export const accountNumberConverter = (num) => {

    if (num.length > 2) {
        let number = num.slice(0, 2) + " ";

        if (num.length > 6) {
            const cykles = (num.length - 2) / 4;

            for (let i = 0; i < cykles; i++) {
                const gap = i * 4 + 2;
                number = number + num.slice(gap, gap + 4) + " ";
            }
        }

        return number;
    }
    return num;
}

export const addressConverter = (acc) => {
    let address = acc.street + " " + acc.streetNumber;
    if (acc.localNumber !== "")
        address = address + "/" + acc.localNumber;

    return address
}

export const isBankAccountNumberIncorrect = (number) => {
    if (isNaN(Number(number)) || number.length != 26)
        return true;

    return false
}