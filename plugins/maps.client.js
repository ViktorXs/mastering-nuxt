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
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyB4ghJRsygutKjuNSkwyCy2eigczRKsSL8&libraries=places&callback=initGoogleMaps"
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

    function doAutoComplete(input) {
        if(!isLoaded) {
            waiting.push({ fn: doAutoComplete, arguments })
            return
        }

        const options = {
            types: ["(cities)"]
        }
        const autoComplete = new window.google.maps.places.Autocomplete(input, options)
        autoComplete.addListener("place_changed", () => {
            const place = autoComplete.getPlace()
            input.dispatchEvent(new CustomEvent("changed", { detail: place }))
        })
    }

    function showMap(canvas, lat, lng, markers) {  /* markers Parameter für die Markers auf der Karte bei den Suchergebnissen aus der Funktion getHomeMarkers() */        if(!isLoaded) {
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
        if(!markers) {  /* Wenn keine markers Parameter, dann Position und einzelnen Marker ausgeben  */
            const position = new window.google.maps.LatLng(lat, lng)
            const marker = new window.google.maps.Marker({ position })
            marker.setMap(map)
            return
        }
        const bounds = new window.google.maps.LatLngBounds()  /* Bereich Angeben, welches auf die Marker begrenzt werden soll */
        markers.forEach((home) => {  /* Marker mit einer anonymen Funktion definieren aus jedem home objekt */
            const position = new window.google.maps.LatLng(home.lat, home.lng)  /* lat & lng des home Parameters nehmen */
            const marker = new window.google.maps.Marker({ position })  /* Marker auf position platzieren */
            marker.setMap(map)
            bounds.extend(position)  /* Anhand der lat & lng Positionen den Bereich auf diese Position erweitern */
        })
        map.fitBounds(bounds)  /* Kartenansicht auf die Grenzen zoomen */
    }
}
