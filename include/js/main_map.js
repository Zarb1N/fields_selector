var attr = '&copy; <a href="http://opendatabox.info">OpenDataBox 2021</a>';
//var sat_url = "https://mt1.google.com/vt/lyrs=s,h&hl=en&x={x}&y={y}&z={z}";
var vec_url = 'http://opendatabox.info:17344/services/merged_auto/tiles/{z}/{x}/{y}.pbf';
var sat_url = 'https://opendatabox.info/dra/{z}/{x}/{y}?table=/cloudless&bands=4,3,2&date=tiles&gamma=1.1&ml=1.5&mh=0.6&fmt=mix&apikey=TJ3hStFgj9cJWj8p4MvUT3UD';
//var vec_url = 'https://opendatabox.info/mvt/merged_last_f/{z}/{x}/{y}.pbf&apikey=TJ3hStFgj9cJWj8p4MvUT3UD';

var cosmetic_geojson =  {'type': 'FeatureCollection','features': []};

var bounds = [[40.5,50.5],[41.0,51.0]];
var ft_buffer=null;
var popup = new mapboxgl.Popup();
var editmode = false;

//var modes = MapboxDraw.modes;
/*
var modes =  Object.assign(MapboxDraw.modes, {
  splitPolygonMode: SplitPolygonMode,
  passing_mode_line_string: mapboxGlDrawPassingMode(
    MapboxDraw.modes.draw_line_string
  ),
});
*/
//modes.static = StaticMode;
var draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {polygon: true, trash: true},
    //modes: modes,
    userProperties: true,
});


function init_map(){
    var map = new mapboxgl.Map({
        container: 'mymap',
        style: mystyle,
        hash: false,
        maxBounds: bounds,
    });

    map.on('load', function () {
        map.addSource('myfields', {
            'type': 'vector',
            'tiles':[vec_url],
            'minzoom': 0,
            'maxzoom': 10,
            'attribution': attr,
        });
        map.addSource('cloudless',{
            'type': 'raster',
            'tiles': [sat_url],
            'tileSize': 256,
            'attribution': attr,
            'maxzoom': 13,

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
        map.addLayer({
            'id': 'myfields_ln',
            'type': 'line',
            'source': 'myfields',
            'source-layer': 'valid',
            //"filter": ["all",[">=", "pvalue", 0.01], ["<", "area", 1000],["<", "ndvi_low", 0.39],[">", "ndvi_high", 0.3]],
            "filter": ["all",[">=", "pvalue", 0.01], ["<", "area_ha", 1000],["<", "ndvi_low", 0.39],[">", "ndvi_high", 0.3]],
            'layout':{
                'visibility':'visible'
            },
            'paint': {
                'line-color':'#000000'
            }
        });
        map.addLayer({
            'id': 'myfields',
            'type': 'fill',
            'source': 'myfields',
            'source-layer': 'valid',
            'layout': {
                'visibility':'visible'
            },
            //"filter": ["all",[">=", "pvalue", 0.01], ["<", "area", 1000],["<", "ndvi_low", 0.39],[">", "ndvi_high", 0.3]],
            "filter": ["all",[">=", "pvalue", 0.01], ["<", "area_ha", 1000],["<", "ndvi_low", 0.39],[">", "ndvi_high", 0.3]],
            'paint': {
                'fill-color':'#f2a94f',
                'fill-opacity':[
                    'case',
                    ['boolean', ['feature-state', 'hover'], false],
                    0.,
                    0.2
                ]
            },
        });
        //cosmetic layer
        map.addSource("cosmetic",{
            'type': 'geojson',
            'data': cosmetic_geojson
        });
        map.addLayer({
            "id": "cosmetic",
            "type": "fill",
            "source": "cosmetic",
            /*
            "paint": {
                'fill-color':'#2989D8',
                'fill-opacity':1,
                'fill-outline-color':'#ffffff'
            }
            */
            "paint": {
                'fill-color':'#FECB02',
                'fill-opacity':0.8,
                'fill-outline-color':'#000000'
            }
        });
    });
    map.addControl(new mapboxgl.NavigationControl(),'top-left');
    /*
    map.addControl(draw);
    */
    map.on('draw.create', updateArea); //add popup with meta
    map.on('draw.delete', updateArea);
    map.on('draw.update', updateArea);
    map.on('draw.add', updateArea);
    

    map.on('mousemove', 'myfields', function (e) {
        map.getCanvas().style.cursor = 'pointer';
    });
    
    map.on('mouseleave', 'myfields', function () {
        map.getCanvas().style.cursor = '';
    });

/*
    map.on('click', 'myfields', function (e) {
        var data = draw.getAll();
        if (data.features.length>0){
            for(i=0;i<data.features.length;i++){
                if(data.features[i].properties.id==e.features[0].properties.id){
                    return;
                }
            };
        };
        ft_buffer = e.features[0];
        var ft_area = (Math.round((turf.area(ft_buffer)/10000) * 100) / 100);
        popup
            .setLngLat(e.lngLat)
            .setHTML(
                "<div class='container'>"+
                      "<div class='form-group'>"+
                        "<p>Площадь контура Га: <b>"+ft_area+"</b></p>"+
                        "<label for='crop_area'>Площадь посева Га:</label>"+
                        "<input type='number' class='form-control' name='crop_area' id='crop_area'>"+
                        "<label for='crop_name'>Культура:</label>"+
                        "<select class='form-control' id='crop_name' name='crop_name' >"+
                            get_croplist()+
                          "<option value=13>Сахарная свекла</option>"+
                        "</select>"+
                      "</div>"+
                      "<button type='submit' style='float:left' onclick='update_draw()'>Сохранить</button>"+
                      "<button type='submit' style='float:right' onclick='popup.remove()'>Отмена</button>"+
                "</div>"
            ).addTo(map);
        $("#crop_area").val(ft_area);
        $("#crop_name").focus();
    });
*/
    map.on('click', 'myfields', function(e) {
        //return;
        if (editmode)
            return;
        if (map.getZoom()<11)
            return;
        for(i=0;i<cosmetic_geojson.features.length;i++){
            if(cosmetic_geojson.features[i].properties.id==e.features[0].properties.id){
                return;
            }
        }
        var all_features = map.querySourceFeatures("myfields",{sourceLayer:'valid',filter: ["==", "id", e.features[0].properties.id]});

        var merged = all_features[0];
        if(all_features.length>1){
            for (i=1;i<all_features.length;i++)
                merged = turf.union(merged,all_features[i]);
        }

        ft_buffer = merged;//e.features[0];
        var ft_area = (Math.round((turf.area(ft_buffer)/10000) * 100) / 100);
        popup
            .setLngLat(e.lngLat)
            .setHTML(
                "<div class='container'>"+
                      "<div class='form-group'>"+
                        "<p>Площадь контура Га: <b>"+ft_area+"</b></p>"+
                        "<label for='crop_area'>Площадь посева Га:</label>"+
                        "<input type='number' class='form-control' name='crop_area' id='crop_area'>"+
                        "<label for='crop_name'>Культура:</label>"+
                        "<select class='form-control' id='crop_name' name='crop_name' >"+
                            get_croplist()+
                          "<option value=13>Сахарная свекла</option>"+
                        "</select>"+
                      "</div>"+
                      "<button type='submit' style='float:left' onclick='update_draw()'>Сохранить</button>"+
                      "<button type='submit' style='float:right' onclick='popup.remove()'>Отмена</button>"+
                "</div>"
            ).addTo(map);
        $("#crop_area").val(ft_area);
        $("#crop_name").focus();
    });


    map.on('click', 'cosmetic', function (e) {
        if(editmode)
            return;
        for(i=0;i<cosmetic_geojson.features.length;i++){
            if(cosmetic_geojson.features[i].properties.id==e.features[0].properties.id){
                cosmetic_geojson.features.splice(i,1);
            }
        }
        map.getSource('cosmetic').setData(cosmetic_geojson);
        map.moveLayer('cosmetic');
        updateArea();
    });

    return map;
};
