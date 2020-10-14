const keys = [1, 2, 6];

const values = [
    "Faktura sprzedaży",
    "Fktura korygująca",
    "Rejestr sprzedaży VAT"]

    const map = new Map();

    for (var i = 0; i < keys.length; i++)
        map.set(keys[i], values[i]);

export default map;