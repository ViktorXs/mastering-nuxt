export default (req, res, next) => {
    if(req.url === "/oldpage") {  /* wenn page url nicht "/oldpage" ist... */
        console.log(req.url)  /* Bei jedem Aufruf der Seite url in der Serverkonsole anzeigen */
        res.statusCode = 302
        res.setHeader("location", "/newpage")  /* ... dann redirect zu "/newpage". So funktioniert das weiterleiten / redirect */
        res.end()
        return  /* Falls next() nicht ausgeführt werden soll */
    }
    next()  /* next() ist notwendig, sonst hängt sich der Request in Node auf */
}
