export default (req, res, next) => {
    console.log(req.url)  /* Bei jedem Aufruf der Seite url in der Serverkonsole anzeigen */
    res.statusCode = 404
    res.statusMessage = "Nothing found!"
    res.end()  /* Response muss beendet werden um es zu versenden */
    next()  /* next() ist notwendig, sonst hängt sich der Request in Node auf */
}
