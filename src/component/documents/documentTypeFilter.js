const translateDocumentType = (docType) => {
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

export default translateDocumentType;