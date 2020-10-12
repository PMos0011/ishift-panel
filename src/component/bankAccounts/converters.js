export const accountNumberConverter = (num) => {
    let number = num.slice(0, 2) + " ";

    for (let i = 0; i < 6; i++) {
        const gap = i * 4 + 2;
        number = number + num.slice(gap, gap + 4) + " ";
    }

    return number

}

export const addressConverter = (acc) => {
    let address = acc.street + " " + acc.streetNumber;
    if (acc.localNumber !== "")
        address = address + "/" + acc.localNumber;

    return address
}