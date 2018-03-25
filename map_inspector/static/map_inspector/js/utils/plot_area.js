define(["config/plot_area_config_default", "utils/google_maps"], function(config, gmaps){
    var plot_area = {};
    plot_area.config = config;
    plot_area.initMap = function() {
        var map;
        var drawingManager;
        var polygon;;
        //Constructor: Creates a new map. Only zoom and corrdinates a required
        map = new gmaps.Map(document.getElementById('map'),{
                center: config["center"],
                zoom: config["zoom"],
                styles: config["style"]
        });

        drawingManager = new gmaps.drawing.DrawingManager({
            drawingMode: gmaps.drawing.OverlayType.POLYGON,
            drawingControl: true,
            drawingControlOptions: {
                position:gmaps.ControlPosition.TOP_LEFT,
                drawingModes: [
                    gmaps.drawing.OverlayType.POLYGON
                ]
            }
        });
        drawingManager.setMap(map);

        //drawingManager.addListener('overlaycomplete', processOverlay)
    }
    return plot_area;
})