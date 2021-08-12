export default function(context, inject){

    let isLoaded = false
    let waiting = []

    addScript()
    inject("maps", {
        showMap,
        doAutoComplete
    })

    function addScript(){
        const script = document.createElement("script")
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBwXnWHSDLw9uhAGU41_iFXGoNZQfXC1to&libraries=places&callback=initGoogleMaps"
        script.async = true
        window.initGoogleMaps = initGoogleMaps
        document.head.appendChild(script)
    }

    function initGoogleMaps() {
        isLoaded = true

        waiting.forEach((item) => {
            if(typeof item.fn === "function") {
                item.fn(...item.arguments)
            }
        })
        waiting = []
    }

    function doAutoComplete(input) {    /* Google Places Autocomplete */
        if(!isLoaded) {                 /* Wenn nicht geladen... */
            waiting.push({ fn: doAutoComplete, arguments }) /* ... in das waiting Array diese Funktion mit ihren Paramemtern einfügen */
            return  /* Wenn nichts geladen, nichts ausführen */
        }
        /* Ausführen, wenn geladen */
        /* Autocomplete über addScript() verfügbar dank &libraries=places */
        
        const options = {
            types: ["(cities)"],  /* types ist ein Array aus String-Werten von erlaubten Optionen */
        }
        const autoComplete = new window.google.maps.places.Autocomplete(input, options)
        autoComplete.addListener("place_changed", () => {  /* 1. argument: "name of the event to listen to." 2. argument: "callback function" */
            const place = autoComplete.getPlace()  /* Was per autoComplete gefunden/ausgewählt wurde, holt sich getPlace() die Informationen des Ortes. */
            input.dispatchEvent(new CustomEvent("changed", { detail: place }))  /* Emit an Event of our own directly on the input element */
        })
    }

    function showMap(canvas, lat, lng) {
        if(!isLoaded) {
            waiting.push({
                fn: showMap,
                arguments
            })
            return
        }

        const mapOptions = {
            zoom: 18,
            center: new window.google.maps.LatLng(lat, lng),
            disableDefaultUI: true,
            mapTypeControl: true,
            zoomControl: true
        }
        const map = new window.google.maps.Map(canvas, mapOptions)
        const position = new window.google.maps.LatLng(lat, lng)
        const marker = new window.google.maps.Marker({ position })
        marker.setMap(map)
    }
}
