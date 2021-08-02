export default function(context, inject){ /* Inject speist ein Objekt oder ein Wert in die App */

    let mapLoaded = false
    let mapWaiting = null /* Hier werden die function calls zu showMap gespeichert, bis Google Maps bereit ist. */

    addScript()         /* Da die Funktion unten im Code existiert, sollte sie abgerufen werden */
    inject("maps", {    /* um die Werte in die App zu übertragen, wie z.B. "this.$maps" */
        showMap         /* Dies zurückgeben, wenn $maps gerufen wird  */
    })

    function addScript(){
        const script = document.createElement("script") /* Das HTML script-tag erzeugen */
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyA7yY1R5nFIJpk3xtVvMx9msaW-JbKBWX0&callback=initMap"
        script.async = true
        window.initMap = initMap            /* Globale Funktion der lokalen Funktion zugewiesen mit einem "function pointer", um die Funktion von unten zu aktivieren  */
        document.head.appendChild(script)   /* Script in das HTML Dokument einfügen */
    }

    function initMap(){                             /* Innerhalb eines plugins Dinge nicht global deklarieren. "window" so wenig, wie möglich nutzen  */
        mapLoaded = true
        if (mapWaiting){                            /* Wenn Google Maps bereit ist mit Laden */
            const { canvas, lat, lng } = mapWaiting /* "rest" Operator: Parameter in Variablen umwandeln */
            renderMap(canvas, lat, lng)             /* Ausführen mit den Parametern, die gespeichert sind */
            mapWaiting = null                       /* Sobald mapWaiting nicht weiter wartet, auf null zurücksetzen */
        }
    }

    function showMap(canvas, lat, lng){             /* Ersatz für setInterval(). Wenn Funktion abgerufen wird, wird die Map gerendert oder in Speicher zum Warten gesetzt */
        if(mapLoaded) renderMap(canvas, lat, lng)   /* renderMap aus showMap callen, wenn mapLoaded true ist */
        else mapWaiting = { canvas, lat, lng }      /* Funktionswerte auf mapWaiting übertragen, wenn die map nicht geladen ist */
    }

    function renderMap(canvas, lat, lng){  /* Weil im plugin kein Zugriff auf das home Objekt, Müssen die Parameter übergeben werden */
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
