define(["config/plot_area_config_default", "utils/google_maps", "utils/ajax_utils"],
function(config, gmaps, ajax_utils){
    var plot_area = {}
    plot_area.config = config
    plot_area.map = undefined
    plot_area.drawingManager = undefined
    plot_area.polygon = undefined


    plot_area.initMap = function() {
        //Constructor: Creates a new map. Only zoom and coordinates a required
        plot_area.map = new gmaps.Map(document.getElementById('map'),{
                center: config["center"],
                zoom: config["zoom"],
                styles: config["style"]
        });
    }


    plot_area.processOverlay = function(event){
        var path
        // First, check if there is an existing polygon.
        // If there is, get rid of it and remove the markers
        if (plot_area.polygon) {
          plot_area.polygon.setMap(null);
          path = null;
        }
        if(plot_area.drawingManager == undefined){
            throw new Error("drawingManager is not yet defined")
        }
        // Switching the drawing mode to the HAND (i.e., no longer drawing).
        plot_area.drawingManager.setDrawingMode(null);
        // Creating a new editable polygon from the overlay.
        plot_area.polygon = event.overlay;
        plot_area.polygon.setEditable(false);
        path = plot_area.polygon.getPath().b;
        console.log("plot_area: Path")
        console.log(path);
        var sLat = path[0].lat(), nLat = path[0].lat(); //lat goes from -90 to +90 (south to north)
        var wLng = path[0].lng(), eLng = path[0].lng(); //lng goes from -180 to +180 (west to east)
        //The coordinates are set to maximum extent possible
        for(var i = 1; i < path.length; i++){
            if(path[i].lat() < sLat){
                sLat = path[i].lat();
            }
            if(path[i].lat() > nLat){
                nLat = path[i].lat();
            }
            if(path[i].lng() < wLng){
                wLng = path[i].lng();
            }
            if(path[i].lng() > eLng){
                eLng = path[i].lng();
            }
        }
        var swLatLng = new gmaps.LatLng({lat: sLat, lng: wLng});
        var neLatLng = new gmaps.LatLng({lat: nLat, lng: eLng});
        var bounds = new gmaps.LatLngBounds(swLatLng, neLatLng);
        plot_area.map.fitBounds(bounds);
        ajax_utils.sendPostRequest("/polygon/",JSON.stringify(path), function(response){
          console.log("Received Response:" + response.responseText)
        });
    }


    plot_area.initDrawingManager = function(){
          plot_area.drawingManager = new gmaps.drawing.DrawingManager({
            drawingMode: gmaps.drawing.OverlayType.POLYGON,
            drawingControl: true,
            drawingControlOptions: {
                position:gmaps.ControlPosition.TOP_LEFT,
                drawingModes: [
                    gmaps.drawing.OverlayType.POLYGON
                ]
            }
        });
        plot_area.drawingManager.setMap(plot_area.map);
        plot_area.drawingManager.addListener('overlaycomplete', plot_area.processOverlay)
    }

    plot_area.init = function(){
        plot_area.initMap()
        plot_area.initDrawingManager()
    }
    return plot_area;
})