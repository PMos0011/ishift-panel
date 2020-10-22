export const invoiceFormStyle = {
    option: (styles, state) => ({

        ...styles,
        fontSize: '12px',
        textAlign: 'left',
        width: 'auto',

    }),
    control: (styles, state) => ({
        ...styles,
        border: 'none',
        width: '90px'
    }),
    dropdownIndicator: (styles, state) => ({
        ...styles,
        padding: '0px'
    }),
    indicatorSeparator: (styles, state) => ({
        ...styles,
        width: '0px'
    }),
}

export const commoditiesSelectStyle = {
    option: (styles, state) => ({

        ...styles,
        fontSize: '10px',
        textAlign: 'left',
        width: 'auto',

    }),
    control: (styles, state) => ({
        ...styles,
        border: 'none',
    }),
    dropdownIndicator: (styles, state) => ({
        ...styles,
        padding: '0px'
    }),
    indicatorSeparator: (styles, state) => ({
        ...styles,
        width: '0px'
    }),
}