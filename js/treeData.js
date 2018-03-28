var treeData =[
    {
        name:"OPENLAYERS",
        open:true,
        children:[
            {
                name:"OL3",
                open:true,
                children:[
                	{
                		name:"基础功能",
		                open:true,
		                children:[{
	                        name: "加载wms",
	                        src: "example/openlayers/wms.html",
		                    senior:false
	                    },{
	                        name: "加载OSM",
	                        src: "example/openlayers/osm.html",
		                    senior:false
	                    },{
	                        name: "加载必应地图",
	                        src: "example/openlayers/public_map/bingmap.html",
		                    senior:false
	                    },{
	                        name: "在线天地图",
	                        src: "example/openlayers/public_map/tdtonline.html",
		                    senior:false
	                    },{
	                        name: "加载Arcgis切片",
	                        src: "example/openlayers/agstile.html",
		                    senior:false
	                    },{
	                        name: "属性聚类",
	                        src: "example/openlayers/cluster_attr.html",
		                    senior:false
	                    },{
	                        name: "距离聚类",
	                        src: "example/openlayers/cluster_pixel.html",
		                    senior:false
	                    },{
	                        name: "卷帘工具",
	                        src: "example/openlayers/swipe.html",
		                    senior:false
	                    },{
	                        name: "地图控制",
	                        src: "example/openlayers/control.html",
		                    senior:false
	                    },{
	                        name: "图形绘制",
	                        src: "example/openlayers/draw.html",
		                    senior:false
	                    },{
	                        name: "测量",
	                        src: "example/openlayers/measure.html",
		                    senior:false
	                    },{
	                        name: "修改编辑",
	                        src: "example/openlayers/modify.html",
		                    senior:false
	                    },{
	                        name: "多地图",
	                        src: "example/openlayers/multimap.html",
		                    senior:false
	                    },{
	                        name: "信息框",
	                        src: "example/openlayers/popup.html",
		                    senior:false
	                    },{
	                        name: "选择对象",
	                        src: "example/openlayers/select.html",
		                    senior:false
	                    },{
	                        name: "wkt操作",
	                        src: "example/openlayers/wkt.html",
		                    senior:false
	                    },{
	                        name: "动画效果",
	                        src: "example/openlayers/animation.html",
		                    senior:false
	                    },{
	                        name: "地图资源设置",
	                        src: "example/openlayers/lyr-source.html",
		                    senior:false
	                    },{
	                        name: "地图target设置",
	                        src: "example/openlayers/target.html",
		                    senior:false
	                    },{
	                        name: "地图缩放",
	                        src: "example/openlayers/zoom.html",
		                    senior:false
	                    },{
	                        name: "POI展示",
	                        src: "example/openlayers/icon.html",
		                    senior:false
	                    }]
                	},
                	{
                		name:"扩展功能",
		                open:false,
		                children:[{
	                        name: "动态效果展示",
	                        src: "example/openlayers/dynamic-data.html",
		                    senior:true
	                    },{
	                        name: "动态点展示",
	                        src: "example/openlayers/feature-animation.html",
		                    senior:true
	                    },{
	                        name: "添加geojson",
	                        src: "example/openlayers/geojson.html",
		                    senior:true
	                    },{
	                        name: "断点值渲染",
	                        src: "example/openlayers/breakrender.html",
		                    senior:true
	                    },{
	                        name: "图层控制1",
	                        src: "example/openlayers/layerswitch1.html",
		                    senior:true
	                    },{
	                        name: "图层控制2",
	                        src: "example/openlayers/layerswitch2.html",
		                    senior:true
	                    },{
	                        name: "绘制带箭头的线",
	                        src: "example/openlayers/layerswitch2.html",
		                    senior:true
	                    },{
	                        name: "动态点展示",
	                        src: "example/openlayers/point-animation-overlay.html",
		                    senior:true
	                    },{
	                        name: "统计图",
	                        src: "example/openlayers/echart.html",
		                    senior:true
	                    },{
	                        name: "仪表盘",
	                        src: "example/openlayers/echart.html",
		                    senior:true
	                    },{
	                        name: "矩形选择",
	                        src: "example/openlayers/boxselect.html",
		                    senior:true
	                    },{
	                        name: "地图放大镜",
	                        src: "example/openlayers/layer-spy.html",
		                    senior:true
	                    }]
                	}
                ]
            }
        ]
    },
    {
        name:"leaflet",
        open:false,
        show:false,
        children:[{
                name:"leaflet map",
                src:"example/leaflet/map.html"
            }
        ]
    }
];