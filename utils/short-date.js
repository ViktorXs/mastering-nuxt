export default (dateStr) => {
    const date = new Date(dateStr)
    const options = { weekday: "long", year: "numeric", month: "numeric", day: "2-digit" }

    return date.toLocaleDateString("de-De", options)
}
