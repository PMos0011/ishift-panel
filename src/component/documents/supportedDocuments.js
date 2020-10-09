const keys = [1, 2, 3, 4, 12, 15, 16];

const values = ["deklaracja VAT 7",
    "zaliczka na podatek dochodowy",
    "zaliczka PIT-4R",
    "zaliczka na podatek PIT-28 (PPE)",
    "zaliczka na podatek PIT-36L (PPL)",
    "deklaracja roczna PIT-36",
    "?? P36L ??"]


//const createDocumentsMap = () => {
    const map = new Map();

    for (var i = 0; i < keys.length; i++)
        map.set(keys[i], values[i]);

   // return map;
//}

export default map;

// const supported = {
//     test:"test",
//     1:'vat',
//     2:'doch',
//     3:"pit",
//     4:"ppe",
//     12:"ppl",
//     15:"pit36",
//     16:"??"
// }

// export default supported;