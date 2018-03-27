说明：
--------------------------------------旧版本为：3.0.0
--------------------------------------新版本为：3.19.1
1、wms调用
var untiled = new ol.layer.Image({
	source: new ol.source.ImageWMS({
		ratio: 1,
		url: 'http://localhost:8088/geoserver/lzugis/wms',
		params: {
			'FORMAT': format,
			LAYERS: 'lzugis:province',
		},
		serverType: 'geoserver'//在新版本中是必须的参数
	})
});
var tiled = new ol.layer.Tile({
	visible: true,
	source: new ol.source.TileWMS({
		url: 'http://localhost:8088/geoserver/lzugis/wms',
		params: {
			'FORMAT': format,
			tiled: true,
			LAYERS: 'lzugis:capital',
		},
		serverType: 'geoserver'//在新版本中是必须的参数
	})
});
--------------------------------------------------------------------
2、view设置
var projection = new ol.proj.Projection({
	code: 'EPSG:4326',
	units: 'degrees'
});
var view = new ol.View({
	projection: projection,
	center: [103.847, 36.0473],
    zoom: 4
});
var bounds = [73.4510046356223, 18.1632471876417,
	134.976797646506, 53.5319431522236];
map.getView().fitExtent(bounds, map.getSize());//旧版本的写法
map.getView().fit(bounds, map.getSize());//新版本的写法