function getThumb(container,f){
    var map = new mapboxgl.Map({
        container: container,
        //style: 'mapbox://styles/mapbox/light-v10',
        style: mystyle,
        center: [-74.50, 40],
        zoom: 9,
        preserveDrawingBuffer: false,
        interactive: false,
        attribution: ""
    });
    //var img = map.getCanvas().toDataURL('image/jpeg');
    //return img;
    var coordinates = f.geometry.coordinates[0];
    var bounds = coordinates.reduce(function (bounds, coord) {
        return bounds.extend(coord);
    }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

    //var bbox = turf.bbox(feature);
    map.on('load', function(){
        map.addSource('cloudless',{
            'type': 'raster',
            //'tiles': ['https://opendatabox.info/dra/{z}/{x}/{y}?table=/cloudless&bands=4,3,2&date=tiles&gamma=1.1&ml=1.5&mh=0.6&fmt=mix'],
            'tiles': [sat_url],
            'tileSize': 256,
            'attribution': attr,
            'maxzoom': 13
        });
        var cloudless = {
            'id':'cloudless',
            'source':'cloudless',
            'type':'raster',
            'layout':{
                'visibility': 'visible'
            }
        };
        map.addLayer(cloudless);
        map.addSource('my-geojson', {
            "type": "geojson",
            "data": f
        });

        map.addLayer({
            "id": "geojsonLayer",
            "type": "fill",
            "source": "my-geojson",
            "paint": {
                'fill-color':'#f2a94f',
                'fill-opacity':0.2,
                'fill-outline-color':'#000000'
            }
        });
    });
    map.fitBounds(bounds, {padding: 20, duration:0});
};