/*! this file creat by FDD */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("echarts"));
	else if(typeof define === 'function' && define.amd)
		define("ol3Echarts", ["echarts"], factory);
	else if(typeof exports === 'object')
		exports["ol3Echarts"] = factory(require("echarts"));
	else
		root["ol3Echarts"] = factory(root["echarts"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(2);

var _echartsLayer = __webpack_require__(6);

var _echartsLayer2 = _interopRequireDefault(_echartsLayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _echartsLayer2.default;
module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _echarts = __webpack_require__(0);

var _echarts2 = _interopRequireDefault(_echarts);

__webpack_require__(3);

__webpack_require__(4);

var _registerMapCoordSys = __webpack_require__(5);

var _registerMapCoordSys2 = _interopRequireDefault(_registerMapCoordSys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_echarts2.default.registerCoordinateSystem('openlayers', _registerMapCoordSys2.default);
_echarts2.default.registerAction({
  type: 'MapRoam',
  event: 'MapRoam',
  update: 'updateLayout'
}, function (payload, ecModel) {
  ecModel.eachComponent('openlayers', function (mapModel) {});
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _echarts = __webpack_require__(0);

var _echarts2 = _interopRequireDefault(_echarts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _echarts2.default.extendComponentModel({
  type: 'openlayers',
  getMap: function getMap() {
    return this.coordinateSystem.Map;
  },
  defaultOption: {
    roam: false
  }
});
module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _echarts = __webpack_require__(0);

var _echarts2 = _interopRequireDefault(_echarts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

debugger
exports.default = _echarts2.default.extendComponentView({
  type: 'openlayers',
  render: function render(MapModel, echartModel, api) {
    var rendering = true;
    var Map = _echarts2.default.Map_;
    var view = Map.getView();
    var viewportRoot = api.getZr().painter.getViewportRoot();
    var coordSys = MapModel.coordinateSystem;
    var moveHandler = function moveHandler(type, target) {
      if (rendering) {
        return;
      }
      var offsetEl = viewportRoot.parentNode.parentNode.parentNode;
      var mapOffset = [-parseInt(offsetEl.style.left, 10) || 0, -parseInt(offsetEl.style.top, 10) || 0];
      viewportRoot.style.left = mapOffset[0] + 'px';
      viewportRoot.style.top = mapOffset[1] + 'px';
      coordSys.setMapOffset(mapOffset);
      MapModel.mapOffset = mapOffset;
      api.dispatchAction({
        type: 'MapRoam'
      });
    };
    var zoomEndHandler = function zoomEndHandler() {
      if (rendering) {
        return;
      }
      api.dispatchAction({
        type: 'MapRoam'
      });
    };
    view.un('change:resolution', zoomEndHandler);
    view.un('change:center', moveHandler);
    view.un('change:rotation', moveHandler);
    Map.un('moveend', moveHandler);
    view.on('change:resolution', zoomEndHandler);
    view.on('change:center', moveHandler);
    view.on('change:rotation', moveHandler);
    Map.on('moveend', moveHandler);
    var roam = MapModel.get('roam');
    if (roam && roam !== 'scale') {} else {}
    if (roam && roam !== 'move') {} else {}
    rendering = false;
  }
});
module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _echarts = __webpack_require__(0);

var _echarts2 = _interopRequireDefault(_echarts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CoordSys = function CoordSys(mapInstance, api, params) {
  this.Map = mapInstance;
  this.dimensions = ['lng', 'lat'];
  this._mapOffset = [0, 0];
  this._api = api;
  this.options_ = params;
  this.projCode_ = this._getProjectionCode();
};

CoordSys.prototype.dimensions = ['lng', 'lat'];

CoordSys.prototype.setMapOffset = function (mapOffset) {
  this._mapOffset = mapOffset;
};

CoordSys.prototype.getBMap = function () {
  return this.Map;
};

CoordSys.prototype.setMap = function (map) {
  if (map && map instanceof ol.Map) {
    this.Map = map;
  } else {
    throw new Error('传入的不是地图对象！');
  }
};

CoordSys.prototype.dataToPoint = function (coords) {
  if (coords && Array.isArray(coords) && coords.length > 0) {
    coords = coords.map(function (item) {
      if (typeof item === 'string') {
        item = Number(item);
      }
      return item;
    });
  }
  var source = this.options_['source'] || 'EPSG:4326';
  var destination = this.options_['destination'] || this.projCode_;
  return this.Map.getPixelFromCoordinate(ol.proj.transform(coords, source, destination));
};

CoordSys.prototype._getProjectionCode = function () {
  var code = '';
  if (this.Map) {
    code = this.Map.getView() && this.Map.getView().getProjection().getCode();
  } else {
    code = 'EPSG:3857';
  }
  return code;
};

CoordSys.prototype.pointToData = function (pixel) {
  return this.Map.getCoordinateFromPixel(pixel);
};

CoordSys.prototype.getViewRect = function () {
  var api = this._api;
  return new _echarts2.default.graphic.BoundingRect(0, 0, api.getWidth(), api.getHeight());
};

CoordSys.prototype.getRoamTransform = function () {
  return _echarts2.default.matrix.create();
};

CoordSys.dimensions = CoordSys.prototype.dimensions;

CoordSys.create = function (echartModel, api) {
  var _coordSys = null;
  echartModel.eachComponent('openlayers', function (MapModel) {
    var _Map = _echarts2.default.Map_;
    var _MapParams = _echarts2.default.MapParams_;
    _coordSys = new CoordSys(_Map, api, _MapParams);
    _coordSys.setMapOffset(MapModel.mapOffset || [0, 0]);
    MapModel.coordinateSystem = _coordSys;
  });

  echartModel.eachSeries(function (seriesModel) {
    if (seriesModel.get('coordinateSystem') === 'openlayers') {
      seriesModel.coordinateSystem = _coordSys;
    }
  });
};

exports.default = CoordSys;
module.exports = exports['default'];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _echarts = __webpack_require__(0);

var _echarts2 = _interopRequireDefault(_echarts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ol3Echarts = function ol3Echarts(map) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  this.map = map;
  var size = this.map.getSize();
  var div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.height = size[1] + 'px';
  div.style.width = size[0] + 'px';
  div.style.top = 0;
  div.style.left = 0;
  var _target = this.getTarget(params['target']);
  if (_target && _target[0] && _target[0] instanceof Element) {
    _target[0].appendChild(div);
  } else {
    this.map.getViewport().appendChild(div);
  }
  this._echartsContainer = div;
  this.chart = _echarts2.default.init(div);
  if (!_echarts2.default) {
    throw new Error('请先引入echarts3！');
  }
  _echarts2.default.Map_ = map;
  _echarts2.default.MapParams_ = params;
  this.resize();
};

ol3Echarts.prototype.getTarget = function (selector) {
  var dom = function () {
    var found = void 0;
    return document && /^#([\w-]+)$/.test(selector) ? (found = document.getElementById(RegExp.$1)) ? [found] : [] : Array.prototype.slice.call(/^\.([\w-]+)$/.test(selector) ? document.getElementsByClassName(RegExp.$1) : /^[\w-]+$/.test(selector) ? document.getElementsByTagName(selector) : document.querySelectorAll(selector));
  }();
  return dom;
};

ol3Echarts.prototype.remove = function () {
  this._echartsContainer.parentNode.removeChild(this._echartsContainer);
  this.map = undefined;
  _echarts2.default.Map_ = undefined;
  _echarts2.default.MapParams_ = undefined;
};

ol3Echarts.prototype.resize = function () {
  var that = this;
  var size = this.map.getSize();
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  var doc = window.document;
  this._echartsContainer.style.width = size[0] + 'px';
  this._echartsContainer.style.height = size[1] + 'px';
  window.addEventListener(resizeEvt, function () {
    setTimeout(function () {
      that.chart.resize();
    }, 50);
  }, false);
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setTimeout(function () {
        that.chart.resize();
      }, 50);
    }
  }, false);
  if (doc.readyState === 'complete') {
    setTimeout(function () {
      that.chart.resize();
    }, 50);
  } else {
    doc.addEventListener('DOMContentLoaded', function (e) {
      setTimeout(function () {
        that.chart.resize();
      }, 50);
    }, false);
  }
};

exports.default = ol3Echarts;
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=ol3Echarts.js.map