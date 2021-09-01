export default function() {
    this.nuxt.hook("build:before", () => {
        console.log("Built before!")
    })
    this.nuxt.hook("render:route", (url, result, context) => {  /* Wird an jedem Serverside Route hit ausgeführt */
        context.res.setHeader("X-Powered-By", "The Force")  /* 2 Argumente: Key & Wert */
    })
}
