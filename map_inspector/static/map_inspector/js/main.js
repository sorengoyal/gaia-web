requirejs(["utils/plot_area", "utils/google_maps"], function(plot_area, gmaps){
    window.plot_area = plot_area
    window.gmaps = gmaps
    gmaps.event.addDomListener(window, 'load', plot_area.init);
})
