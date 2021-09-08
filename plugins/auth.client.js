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
        window.gapi.load('auth2', async function() { /* aus der google sign-in Dokumentation genommen */
        	const auth2 = await window.gapi.auth2.init({
                client_id: $config.auth.clientId
            })
            auth2.currentUser.listen(parseUser)
        })
        window.gapi.signin2.render("googleButton", {
            onsuccess: parseUser,
        })
    }

    function parseUser(user) {
        const profile = user.getBasicProfile()
        console.log("Name: " + profile.getName())
        console.log("Image: " + profile.getImageUrl())
    }
}