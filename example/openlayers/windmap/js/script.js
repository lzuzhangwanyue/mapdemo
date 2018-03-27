var img_w = getTdtLayer("img_w");
function getTdtLayer(lyr){
    var url = "http://t0.tianditu.com/DataServer?T="+lyr+"&X={x}&Y={y}&L={z}";
    var layer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url:url
        })
    });
    return layer;
}
var bounds = [12602145.594234122,4499928.8932888079,13294552.826968284,5266752.9429073939];
var image = new ol.layer.Image({
    source: new ol.source.ImageStatic({
        url: "http://10.16.57.78:8000/bjdw/STFC/ANA/20171123/BJDW_SK_1KM_ANA_201711230000_WIND.png",
        imageExtent: bounds
    }),
    opacity:0.6
});
var map = new ol.Map({
    layers: [img_w, image],
    interactions: ol.interaction.defaults({
        altShiftDragRotate: false,
        rotate: false
    }),
    target: 'olMap',
    view: new ol.View({
        center:  [12906239.351895398, 4844884.600827607],
        zoom: 7
    })
});

var windy;

var canvas = document.createElement('canvas');
canvas.id = "windCanvas";
canvas.width = map.getSize()[0];
canvas.height = map.getSize()[1];
canvas.style.position = 'absolute';
canvas.style.top = 0;
canvas.style.left = 0;
map.getViewport().appendChild(canvas);
function refreshWindy() {
    $(canvas).show();
    if(!windy) {
        return;
    }
    windy.stop();
    var mapSize = map.getSize();
    var extent = map.getView().calculateExtent(mapSize);
    extent = ol.proj.transformExtent(extent, 'EPSG:3857', 'EPSG:4326');

    canvas.width = mapSize[0];
    canvas.height = mapSize[1];

    windy.start(
        [[0,0], [canvas.width, canvas.height]],
        canvas.width,
        canvas.height,
        [[extent[0], extent[1]],[extent[2], extent[3]]]
    );
}
windy = new Windy({canvas: canvas, data: windData });
refreshWindy();

map.getView().on('propertychange',function(){
    windy.stop();
    $(canvas).hide();
});
map.on("moveend",function(){
    refreshWindy();
});