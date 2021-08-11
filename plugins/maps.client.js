export default function(context, inject){

    let isLoaded = false
    let waiting = []

    addScript()
    inject("maps", {
        showMap
    })

    function addScript(){
        const script = document.createElement("script")
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBibKxcDcRFoM2bibMwQCDjMYiuqYxnjt4&callback=initGoogleMaps"
        script.async = true
        window.initGoogleMaps = initGoogleMaps
        document.head.appendChild(script)
    }

    function initGoogleMaps(){
        isLoaded = true

        waiting.forEach((item) => {  /* gehe durch jede Funktion in variable waiting */
            if(typeof item.fn === "function") {  /* wenn item als Typ eine Funktion ist... */
                item.fn(...item.arguments)      /* ... = spread. alle Parameter der Funktion item geben */
            }
        })
        waiting = []  /* Wenn alles geladen ist, kann waiting geleert werden */     
    }

    function showMap(canvas, lat, lng){
        if(!isLoaded) {
            waiting.push({      /* Folgende zwei Eigenschaften in das Array waiting einfügen */
                fn: showMap,    /* fn = Funktion = Nicht in Anführungsstrichen. Referenz zur aktuellen Funktion */
                arguments       /* arguments ist eine Variable von JS. Alle Variablen einer Funktion */
            })
            return              /* nichts tun, solange die map nicht geladen ist.  */
            }  /* alles was hiernach steht, ist Code, der ausgeführt werden kann, wenn google geladen ist  */

        const mapOptions = {  /* ehemals renderMap Funktion */
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
