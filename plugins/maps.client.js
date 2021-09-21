export default function(context, inject) {
    window.initGoogleMaps = init

    let isLoaded = false
    let waiting = []

    addScript()
    inject("maps", {
        showMap,
        doAutoComplete,
    })

    function addScript() {
        const script = document.createElement("script")
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBPbmlpBJ0A_3nuHIEKMrt9HSqqkNHmyiM&libraries=places&callback=initGoogleMaps"
        script.async = true
        document.head.appendChild(script)
    }

    function init() {
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

    function showMap(canvas, lat, lng, markers) {
        if(!isLoaded) {
            waiting.push({
                fn: showMap,
                arguments,
            })
            return
        }
        const mapOptions = {
            zoom: 18,
            center: new window.google.maps.LatLng(lat, lng),
            disableDefaultUI: true,
            mapTypeControl: true,
            zoomControl: true,
            styles: [{
                featureType: "poi.business",
                elementType: "labels.icon",
                stylers: [{ visibility: "off" }],
            }]
        }
        const map = new window.google.maps.Map(canvas, mapOptions)
        if(!markers) {
            const position = new window.google.maps.LatLng(lat, lng)
            const marker = new window.google.maps.Marker({ position })
            marker.setMap(map)
            return
        }
        const bounds = new window.google.maps.LatLngBounds()
        markers.forEach((home) => {
            const position = new window.google.maps.LatLng(home.lat, home.lng)
            const marker = new window.google.maps.Marker({ 
                position,
                label: {
                    text: `$${home.pricePerNight}`,
                    className: `marker home-${home.id}`,
                },
                icon: "https://maps.gstatic.com/mapfiles/transparent.png"
            })
            marker.setMap(map)
            bounds.extend(position)
        })
        map.fitBounds(bounds)
    }
}
