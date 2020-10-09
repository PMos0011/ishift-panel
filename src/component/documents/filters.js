export const dateFilter = (startDate, endDate, date) => {
    return (date >= startDate && date <= endDate)
}

export const selectorFilter = (options, id) => {
    return options !== null ? !!options.find((o) => o.value === id) : false
}

export const documentFilter = (startDate, endDate, date, options, id) => {
    return (dateFilter(startDate, endDate, date) && selectorFilter(options, id))
}