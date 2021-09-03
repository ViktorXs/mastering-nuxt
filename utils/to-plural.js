export default (number, singular) => {
    const text = `${number} ${singular}`
    if(number === 1)
        return text
    if(number <= 1)
        return "no " + singular + "s"
    return text + "s"
}
