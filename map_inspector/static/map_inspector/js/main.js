requirejs(["config/config_default"], function(){
    var plot_area = {};
    plot_area.config = config;
    plot_area.initMap = function() {
        var map;
        var drawingManager;
        var polygon;;
        //Constructor: Creates a new map. Only zoom and corrdinates a required
        map = new google.maps.Map(document.getElementById('map'),{
                center: config["center"],
                zoom: config["zoom"],
                styles: config["style"]
        });

        drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.POLYGON,
            drawingControl: true,
            drawingControlOptions: {
                position:google.maps.ControlPosition.TOP_LEFT,
                drawingModes: [
                    google.maps.drawing.OverlayType.POLYGON
                ]
            }
        });
        drawingManager.setMap(map)

        //drawingManager.addListener('overlaycomplete', processOverlay)
    }


    google.maps.event.addDomListener(window, 'load', plot_area.initMap);

    window.plot_area = plot_area;
})
