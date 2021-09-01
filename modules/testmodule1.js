export default function(moduleOptions) {     /* Mit Options können die Optionen aus der nuxt.config in den Parameter übergeben werden */
    console.log("Hallo aus dem Modul!")
    console.log(moduleOptions.message1)      /* Die in der nuxt.config hinterlassene Nachricht ausgeben */
    /* console.log(this) */                        /* Enthält und console log zeigt alles aus der App */

    this.addPlugin("plugins/testplugin.js")  /* Ohne sie extra in nuxt.config einzutragen, wurde sie importiert (siehe console.log in Konsole) */
    this.options.message2 = "Second hello from testmodule1 through testmodule2"  /* diese message2 kann z.B. von einem anderen modul aus ausgegeben werden. */
}
