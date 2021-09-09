import Cookie from "js-cookie"

export default ({ $config }, inject) => {
    window.initAuth = init
    addScript()

    inject("auth", {
        signOut,
    })

    function addScript() {
        const script = document.createElement("script")
        script.src = "https://apis.google.com/js/platform.js?onload=initAuth"
        script.async = true
        document.head.appendChild(script)
    }

    function init() {
        window.gapi.load('auth2', async function() {
            const auth2 = await window.gapi.auth2.init({
                client_id: $config.auth.clientId
            })
            auth2.currentUser.listen(parseUser)  /* Gibt einen "GoogleUser" zurück, welcher den aktuellen User darstellt */
        })
        window.gapi.signin2.render("googleButton", {
            onsuccess: parseUser,  /* bei erfolgreicher Anmeldung, Funktion ausführen */
        })
    }

    function parseUser(user) {
        const profile = user.getBasicProfile()
        console.log("Name: " + profile.getName())
        console.log("Image: " + profile.getImageUrl())

        if(!user.isSignedIn()) {  /* Cookie entfernen, wenn nicht eingeloggt */
            Cookie.remove($config.auth.cookieName)
            return
        }

        const idToken = user.getAuthResponse().id_token  /* Token speichern */
        Cookie.set($config.auth.cookieName, idToken, { expires: 1/24, sameSite: "Lax" })  /* Token in Cookie ablegen für 1 stunde */
    }

    function signOut() {  /* googles signOut Funktion loggt den user aus, wenn dieser die Seite verlässt */
        const auth2 = window.gapi.auth2.getAuthInstance()
        auth2.signOut()
    }
}
