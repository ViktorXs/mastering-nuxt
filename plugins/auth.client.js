export default ({ $config }) => {  /* "destructure config" um die clientID aus nuxt.config zu verwenden */
    window.initAuth = init   /* kein initAuth, weil lokal sollte reichen */
    addScript()

    function addScript() {
        const script = document.createElement("script")
        script.src = "https://apis.google.com/js/platform.js?onload=initAuth"
        script.async = true
        document.head.appendChild(script)
    }

    function init() {
        window.gapi.load('auth2', async function() { /* Weil gapi global ist, muss window davor. */
            const auth2 = await window.gapi.auth2.init({  /* GoogleAuth initialisieren */
                client_id: $config.auth.clientId  /* mit der Id aus der nuxt config */
            })
            auth2.currentUser.listen(parseUser)  /* Gibt einen "GoogleUser" zurück, welcher den aktuellen User darstellt */
        })
        window.gapi.signin2.render("googleButton", {  /* Sign-In Button für die Id in der <div id:"googleButton"> */
            onsuccess: parseUser,  /* Enthält Informationen über den User, der sich angemeldet hat */
        })
    }

    function parseUser(user) {  /* Standardinformationen des Users abrufen */
        const profile = user.getBasicProfile()
        console.log("Name: " + profile.getName())
        console.log("Image: " + profile.getImageUrl())
    }
}