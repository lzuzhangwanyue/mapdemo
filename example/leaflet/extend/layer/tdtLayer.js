L.TileLayer.TdtLayer = L.TileLayer.extend({
	//用于标识是本地天地图切片库还是访问在线天地图
	isOnline:true,
    initialize: function (url, options) { // (String, Object)
        this.url = url;
        var wmtsParams = L.extend({}, this.defaultWmtsParams),
        tileSize = options.tileSize || this.options.tileSize;
        if (options.detectRetina && L.Browser.retina) {
            wmtsParams.width = wmtsParams.height = tileSize * 2;
        } else {
            wmtsParams.width = wmtsParams.height = tileSize;
        }
        for (var i in options) {
            // all keys that are not TileLayer options go to WMTS params
            if (!this.options.hasOwnProperty(i) && i!="matrixIds") {
                wmtsParams[i] = options[i];
            }
        }
        this.wmtsParams = wmtsParams;
        L.setOptions(this, options);
    },

    onAdd: function (map) {
        L.TileLayer.prototype.onAdd.call(this, map);
    },

    getTileUrl: function (tilePoint) {
        var layer = this.wmtsParams.layer;
        var _z = 1;
        var x = Math.round(tilePoint.x/_z);
        var y = Math.round(tilePoint.y/_z);
        var url = this.url+'?T='+layer+'&L='+tilePoint.z+'&X='+x+'&Y='+y;
        return url;
    },
});

L.tileLayer.tdtLayer = function (url, options) {
    return new L.TileLayer.TdtLayer(url, options);
};
