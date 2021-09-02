export default (number, singular) => {
        const text = `${number} ${singular}`
        if(number === 1)
            return text
        return text + "s"
}
