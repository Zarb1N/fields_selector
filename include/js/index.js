// colors to use for the categories
var colors = ['#000000', '#80000c', '#e2363c', '#f5a614', '#d5b524', '#c8d813', '#21e953', '#0fb744', '#25813f', '#085923'];
var legtics = ["< 0.1", "0.1 - 0.2", "0.2 - 0.3", "0.3 - 0.4", "0.4 - 0.5", "0.5 - 0.6", "0.6 - 0.7", "0.7 - 0.8", "0.8 - 0.9", ">= 0.9"];
var cosmetic_geojson =  {'type': 'FeatureCollection','features': []};


function init_map(){
var shash = window.location.hash;
var map = new mapboxgl.Map({
    container: 'map',
    style: mystyle,
    hash: true,
});
var extent = [[18.83984139715855,34.827293150632215],[132.63623513331885,70.31492352121242]];
if(shash==""){
    map.fitBounds(extent);
}
map.dragRotate.disable();
map.touchZoomRotate.disableRotation();

if(document.documentElement.lang=="ru")
    map.setLanguage('ru', true);
else
    map.setLanguage('en', true);
map.on('load', function () {
    load_odbox(map);
//    load_pkk(map);
    map.addSource("cosmetic",{
        'type': 'geojson',
        'data': cosmetic_geojson
    });
    map.addLayer({
        "id": "cosmetic",
        "type": "fill",
        "source": "cosmetic",
        "paint": {
            'fill-color':'#2989D8',
            'fill-opacity':1,
            'fill-outline-color':'#ffffff'
        }
    });
});
map.addControl(new mapboxgl.NavigationControl(),'top-left');

map.on('zoom', function () {
    if (map.getZoom() > 13) {
        if(document.documentElement.lang=="ru"){
            var content = '<h3><strong>Ограниченная версия</h3>\
            <p><strong>Свяжитесь с нами для получения полного доступа</strong></p>';
        } else {
            var content = '<h3><strong>Demo version</h3>\
            <p><strong>Please contact us for full access</strong></p>';
        }
        document.getElementById('pd').innerHTML = content;
    }
});

map.on('mousemove', 'myfields', function (e) {
    if (map.getZoom()<11)
        return;
    map.getCanvas().style.cursor = 'pointer';
    if (e.features.length > 0) {
        if (hoveredStateId) {
            map.setFeatureState(
                { source: 'myfields', sourceLayer: 'valid',id: hoveredStateId },
                { hover: false }
            );
        }
        hoveredStateId = e.features[0].id;
        map.setFeatureState(
            { source: 'myfields', sourceLayer: 'valid',id: hoveredStateId },
            { hover: true }
        );
        try{
            if(document.documentElement.lang=="ru"){
                var content = '<p><strong>Вероятность пашни: <em></strong>'+ e.features[0].properties.pvalue.toFixed(2)+'</em></p><p><strong>Площадь Га: <em></strong>' +e.features[0].properties.area_ha.toFixed(2)+ '</em></p><p><strong>Максимум NDVI: <em></strong>' + e.features[0].properties.ndvi_high.toFixed(2) + ' </em></p> \
                               <p><strong>Минимум NDVI: <em></strong>'+ e.features[0].properties.ndvi_low.toFixed(2) +'</em></p>';
            } else {
                var content = '<p><strong>Probability: <em></strong>'+ e.features[0].properties.pvalue.toFixed(2)+'</em></p>\
                               <p><strong>Area: <em></strong>' +e.features[0].properties.area_ha.toFixed(2)+ ' </em></p>\
                               <p><strong>Highest NDVI value: <em></strong>' + e.features[0].properties.ndvi_high.toFixed(2) + ' </em></p>\
                               <p><strong>Lowest NDVI value: <em></strong>'+ e.features[0].properties.ndvi_low.toFixed(2) +'</em></p>';
            }
        document.getElementById('pd').innerHTML = content;
        } catch {
            return;
        }
    }
});
 
map.on('mouseleave', 'myfields', function () {
    map.getCanvas().style.cursor = '';
    if (hoveredStateId) {
        map.setFeatureState(
            { source: 'myfields', sourceLayer: 'valid', id: hoveredStateId },
            { hover: false }
        );
    }
    hoveredStateId = null;
    if(document.documentElement.lang=="ru")
        document.getElementById('pd').innerHTML = '<p>Наведите указатель мыши на контур!</p>';
    else
        document.getElementById('pd').innerHTML = '<p>Hover over a Croplands!</p>';
});

map.on('click', 'myfields', function(e) {
    //return;
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
    cosmetic_geojson.features.push(merged);
    map.getSource('cosmetic').setData(cosmetic_geojson);
    map.moveLayer('cosmetic');
});


map.on('click', 'cosmetic', function (e) {
    for(i=0;i<cosmetic_geojson.features.length;i++){
        if(cosmetic_geojson.features[i].properties.id==e.features[0].properties.id){
            cosmetic_geojson.features.splice(i,1);
        }
    }
    map.getSource('cosmetic').setData(cosmetic_geojson);
    map.moveLayer('cosmetic');
});

if (document.documentElement.lang=="ru"){
    toggleLayer(['google'], 'GoogleMaps Гибрид',0);
    toggleLayer(['cloudless'], 'OpenDataBox Спутник',0);
    toggleLayer(['ndwi'], 'OpenDataBox NDWI',0);
    toggleLayer(['ndvi'], 'OpenDataBox NDVI',0);
    toggleLayer(['myfields','myfields_ln','midasia_fl','midasia_ln'], 'OpenDataBox Поля',1);

} else {
toggleLayer(['google'], 'GoogleMaps Hybrid',0);
toggleLayer(['cloudless'], 'OpenDataBox Cloudless',0);
toggleLayer(['ndwi'], 'OpenDataBox NDWI',0);
toggleLayer(['ndvi'], 'OpenDataBox NDVI',0);
toggleLayer(['myfields','myfields_ln','midasia_fl','midasia_ln'], 'OpenDataBox Croplands',1);
//toggleLayer(cadastr, 'Кадастр',0);
}
function toggleLayer(ids, name,state) {
    var link = document.createElement('a');
    link.href = '#';
    if (state===1){
        link.className = 'active';
    } else {
        link.className = '';
    }

    link.textContent = name;

    link.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        for (layers in ids){
            // console.log(ids[layers]);
        var visibility = map.getLayoutProperty(ids[layers], 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(ids[layers], 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(ids[layers], 'visibility', 'visible');
        }
        }
    };

    var layers = document.getElementById('menu');
    layers.appendChild(link);
};

for (i = legtics.length-1; i>-1; i--) {
    var layer = legtics[i];
    var color = colors[i];
    var item = document.createElement('div');
    var key = document.createElement('span');
    key.className = 'legend-key';
    key.style.backgroundColor = color;

    var value = document.createElement('span');
    value.innerHTML = layer;
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
};
};