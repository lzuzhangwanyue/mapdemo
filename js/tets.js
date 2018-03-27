(function ($){
    /**
     * 时间轴与播放组件
     * @author lzugis
     * @createtime 2017-05-08
     * @param {Object} options, 包括domid（容器id），data（数据），URL（地址）
     * data和url任选其一即可
     */
    $.fn.timeline = function (options){
        var scope = this;
        scope.dom = $("#" + options.domid).addClass("timeline").show();
        var defaults = {
            data : [],
            url : "",
            baseurl:ctxStatic+"/css/plugins/img/",
            autoplay:false,
            showbtn:false,
            dateselect:false,
            callback:function(time){

            },
            timechange:function(date){

            }
        };


        //将default和options合并
        scope.options = $.extend({}, defaults, options);
        scope.times = [];
        scope.selectDate = new Date();
        var liWidth;
        var _timeline = null;
        scope.wrapDiv = null;
        scope.selectDate = "";
        scope.dateSelect = null;

        /**
         * 播放控制
         * _times：每一个时间的li
         * _flag：interval标记；_index：当前选择时间；_interval：间隔时长
         * _isplay：自动播放状态
         */
        var _times = [];
        var _flag = 0,
            _index =0,
            _isplay = false,
            _interval = options.interval ? options.interval : 1000;

        var _showPro = $("<span/>");
        var _showDate = $("<span/>").addClass("time");
        var _showTime = $('<div/>').addClass('maxMin').append(_showDate);
        var _divshowNowDate =$('<div/>').addClass('fashowNowDate').appendTo(".timeline");
        var _showNowDate = $("<div/>").addClass('showNowDate').appendTo(_divshowNowDate).hide();
        var _isClose = false;
        var _isShowDate = options.dateselect;
        //初始化方法
        scope.init = function (){
            //控制按钮：开始/暂停，上一个，下一个
            var _switch = $("<div/>").addClass("switch").attr("title", "暂停"),
                _prevDay = $("<div/>").addClass("day-left").attr("title", "前一天"),
                _nextDay = $("<div/>").addClass("day-right").attr("title", "后一天"),
                _prevtime = $("<div/>").addClass("arrow-left").attr("title", "前一小时"),
                _nexttime = $("<div/>").addClass("arrow-right").attr("title", "后一小时");
            _closeTimeline = $("<div/>").addClass("timeline-close").attr("title", "关闭时间轴");
            _opentimeline =  $("<div/>").addClass("timeline-open").attr("title", "开启时间轴");

            if (!scope.options.showbtn){
                _switch.hide();
                _prevDay.hide();
                _nextDay.hide();
                _prevtime.hide();
                _nexttime.hide();
                _showTime.hide();
            }
            if(scope.options.showbtn){
                _switch.show();
                _prevtime.hide();
                _nexttime.hide();
                _showTime.show();
            }
            var _w = scope.dom.width();
            if(!scope.options.dateselect){//日历隐藏
                _w = _w+50;
                _prevDay.hide();
                _nextDay.hide();
            }

            if(scope.options.dateselect){//显示日历时时间轴宽度调整
                _w = _w-102;
            }
            if(scope.options.showbtn){
                _w = _w-135;
            }
            if(!scope.options.showbtn){
                _switch.css('display','none')
            }
            $(window).on("resize",function(){//宽度可适应
                var _w = scope.dom.width();
                if(scope.options.dateselect){
                    _w = _w-102;
                }
                if(scope.options.showbtn){
                    _w = _w-135;
                }
            })
            scope.wrapDiv = $("<div/>").addClass("wrap").css("width",_w+"px"); //div 外层包裹
            seletedTime = $('<div/>').addClass('datepicker');
            if (!scope.options.autoplay){
                _switch.attr("title", "开始").css("background", "url("+scope.options.baseurl+"/media_play.png) no-repeat");
            }
            _switch.on("click", function (){ //开始/暂停
                if (_isplay){
                    _pausePlay();
                    $(this).attr("title", "开始").css("background", "url("+scope.options.baseurl+"/media_play.png) no-repeat");
                }
                else{
                    _startPlay();
                    $(this).attr("title", "暂停").css("background", "url("+scope.options.baseurl+"/media_pause.png) no-repeat");
                }
            });
            _prevtime.on("click", function (){ //上一小时
                _index = _index < 0 ? 0 : _index - 1;
                if (_index < 0){
                    _index = scope.times.length - 1;
                }
                _play();
            });
            _nexttime.on("click", function (){ //下一小时
                _index = _index > scope.times.length - 1 ? scope.times.length - 1 : _index + 1;
                if (_index > scope.times.length - 1){
                    _index = 0;
                }
                _play();
            });
            _opentimeline.html('展开');
            _opentimeline.hide();
            _closeTimeline.on('click',function(){//折叠时间轴
                _isClose = true;
                _opentimeline.show();
                _closeTimeline.hide();
                scope.wrapDiv.hide("slow");
                $(_showNowDate).show('slow');
                $('.maxMin').hide();
                scope.dom.css('width','122px');
                scope.dom.css('height','75px');
                $('.datepicker').css('margin-top','4px');
                $('.datepicker').css('padding','10px 0px 5px 0' );
                $('.day-left').css('margin','2px 5px 0  7px');
                $('.timeline .switch').css('margin-top','-2px');
                $('.day-right').css('margin','2px 5px 0 7px');
                _timeline.css('left','16px');
                if(!_isShowDate){//隐藏日历
                    $('.timeline .switch').css('margin-top','28px');
                    _opentimeline.css('top','35px').css('right','20px');
                }
                else{
                    $('.timeline .switch').css('margin-top','-2px');
                    _opentimeline.css('top','50px').css('right','7px');
                }

            });

            _opentimeline.on('click',function(){//打开时间轴
                _isClose = false;
                $(_showNowDate).hide();
                _opentimeline.hide();
                _closeTimeline.show();
                scope.wrapDiv.show("slow");
                $('.maxMin').show();
                scope.dom.css('height','75px');
                scope.dom.css('width', $(window).width()-310+'px');
                _timeline.css('left','16px');
                $('.datepicker').css('margin-top','17px');
                $('.datepicker').css('padding','10px');
                $('.day-left').css('margin-top','30px');
                $('.timeline .switch').css('margin-top','27px');
                $('.day-right').css('margin-top','30px');
            });

            //动态生成最大 最小日期
            if(scope.options.dateselect){
                var maxdata =_getFormatDate( new Date(),"yyyy-MM-dd");
                if(sysflag==='live'||sysflag==='monitor'){
                    var mindate = new Date(new Date(maxdata).getTime() - 30*24*60*60*1000);
                    var maxdate = new Date(maxdata);
                }else if(sysflag==='forecast'||sysflag==='warm'){
                    var maxdate = new Date(new Date(maxdata).getTime() + 6*24*60*60*1000);
                    var mindate= new Date(maxdata);
                }
            }

            //上/下一天
            _prevDay.on("click", function (){ //上一个
                var curDate = new Date(scope.selectDate);
                var preDate = new Date(curDate.getTime() - 24*60*60*1000);
                scope.selectDate = preDate.getTime()<mindate.getTime()? mindate : preDate;
                _nextDay.removeClass('maxdate');

                scope.selectDate = scope.selectDate.format("yyyy-MM-dd");
                $('#dateinfo').val(scope.selectDate);
                scope.options.timechange(scope.selectDate);
            });
            _nextDay.on("click", function (){ //下一个
                var curDate = new Date(scope.selectDate);
                var nextDate = new Date(curDate.getTime() + 24*60*60*1000);
                scope.selectDate =nextDate.getTime()>maxdate.getTime()? maxdate : nextDate;
                _prevDay.removeClass('mindate');
                scope.selectDate = scope.selectDate.format("yyyy-MM-dd");
                $('#dateinfo').val(scope.selectDate);
                scope.options.timechange(scope.selectDate);
            });

            _timeline = $("<ul/>");
            scope.dom.append(seletedTime).append(_prevDay).append(_prevtime).append(_switch).append(_nextDay).append(_showTime)
                .append(scope.wrapDiv).append(_nexttime).append(_closeTimeline).append(_opentimeline);
            if(scope.options.dateselect) {
                //生成时间选择
                var forms = $('<form />').addClass('form-inline').appendTo(seletedTime);
                var span = $('<span/>').addClass('selectedText').html('开始时间:');
                //inputTime.css('{display:none}');
                var inputTow = '<input class="datainp" id="dateinfo" type="text" placeholder="请选择时间"  >'
                forms/*.append(span)*/.append(inputTow);
                //初始化日历
                scope.dateSelect = $("#dateinfo").datetimepicker({
                    format: "yyyy-mm-dd",
                    todayBtn: false,
                    startDate:mindate,
                    endDate:maxdate,
                    weekStart: 1,
                    autoclose: true,
                    startView: 2,
                    minView: 2,
                    forceParse: true,
                    language: 'zh-CN'
                }).on('changeDate',function(_date){
                    scope.selectDate = new Date(_date.date).format("yyyy-MM-dd");
                    scope.options.timechange(scope.selectDate);
                    var maxdata = new Date().format("yyyy-MM-dd");
                    var _mindate = new Date(new Date(maxdata).getTime() - 30*24*60*60*1000).format("yyyy-MM-dd");
                    var _maxdate = new Date(new Date(maxdata).getTime() + 6*24*60*60*1000).format("yyyy-MM-dd");
                    if(sysflag==='live'&&scope.selectDate===maxdata||sysflag==='monitor'&&scope.selectDate===maxdata||sysflag==='forecast'&&scope.selectDate===_maxdate||sysflag==='warm'&&scope.selectDate===_maxdate){
                        $('.day-right').addClass('maxdate');
                    } else{
                        $('.day-right').removeClass('maxdate');
                    }
                    if(sysflag==='forecast'&&scope.selectDate===maxdata||sysflag==='warm'&&scope.selectDate===maxdata||sysflag==='live'&&scope.selectDate===_mindate||sysflag==='monitor'&&scope.selectDate===_mindate){
                        $('.day-left').addClass('mindate');
                    }else{
                        $('.day-left').removeClass('mindate')
                    }

                });
                scope.selectDate = new Date().format("yyyy-MM-dd");
                $("#dateinfo").val(scope.selectDate);
            }

            var timedata = [];
            if (scope.options.data.length > 0){
                timedata = scope.options.data;
            }
            _addTimes(timedata);

            asEmitter.on("stopTimeline",function(){
                scope.hide();
            });
        };
        /**
         * 格式化时间
         */
        function _getFormatDate(date, format){
            return new Date(date).format(format);
        }
        /**
         * 生成时间轴
         * @param {Object} times
         */
        function _addTimes(times){
            //重置初始化状态
            window.clearInterval(_flag);
            scope.dom.data("times",times).show();
            _timeline.html("");
            _flag = 0;
            _isplay = true;
            scope.times = times;
            _index = 0;

            if(_isClose){
                if(!_isShowDate){
                    // scope.dom.css('height','45px');

                    $('.timeline .switch').css('margin-top','28px');
                    _opentimeline.css('top','35px').css('right','20px');
                }
                else{
                    $('.timeline .switch').css('margin-top','-2px');
                    _opentimeline.css('top','50px').css('right','7px');
                }
            }

            //日期默认定位当前时间
            var maxdata = new Date().format("yyyy-MM-dd");
            var _mindate = new Date(new Date(maxdata).getTime() - 30*24*60*60*1000).format("yyyy-MM-dd");
            var _maxdate = new Date(new Date(maxdata).getTime() + 6*24*60*60*1000).format("yyyy-MM-dd");
            if(sysflag==='live'&&scope.selectDate===maxdata||sysflag==='monitor'&&scope.selectDate===maxdata||sysflag==='forecast'&&scope.selectDate===_maxdate||sysflag==='warm'&&scope.selectDate===_maxdate){
                $('.day-right').addClass('maxdate');
            }
            else{
                $('.day-right').removeClass('maxdate');
            }
            if(sysflag==='forecast'&&scope.selectDate===maxdata||sysflag==='warm'&&scope.selectDate===maxdata||sysflag==='live'&&scope.selectDate===_mindate||sysflag==='monitor'&&scope.selectDate===_mindate){
                $('.day-left').addClass('mindate');
            }
            else{
                $('.day-left').removeClass('mindate');
            }
            if(scope.times.length==0){
                $('.maxMin').html('');
            }
            if(scope.times.length>0){
                scope.wrapDiv.html("");
                //添加时间轴
                _times = [];
                _timesArr = [];
                isFirst = true;
                isZomming = true;
                indexNum = 0;
                var minlabel ="", maxlabel="";
                for (var i = 0, len = times.length; i < len; i++){
                    var _time = times[i];
                    var _label = "";
                    var _timelbl = "";
                    _label = _time.time.length==4?"0"+_time.time:_time.time;
                    if(_label.length === 12){
                        _label = _label.substr(0,4)+"年"+_label.substr(4,2)+"月"+
                            _label.substr(6,2)+"日"+_label.substr(8,2)+":"+_label.substr(10,2);

                        $('#datainp').attr("disabled", true);
                    }
                    else{
                        _label = _getFormatDate(scope.selectDate,"yyyy年MM月dd日")+_label;
                    }
                    if(_time.label){
                        _timelbl = _time.label;

                    }else{
                        _timelbl = _label;
                    }
                    _time.label = _timelbl;
                    var Timeaa = _label.split();
                    _timesArr.push(Timeaa[0]);
                    var _li = $("<li/>").append("<div class='dot'></div>")
                        .append("<div class='time'>" + _timelbl + "</div>")
                        .append("<div class='minite'>" + _time.time.slice(8,10)+":" + _time.time.slice(10)+"</div>");

                    _li.data("attr", _time).attr("timelabel",_label);
                    _timeline.append(_li);
                    _li.on("click", function (){
                        _index = $(this).index();
                        _play();
                    });
                    //鼠标悬浮时文字位置调整
                    _li.on('mouseover',function(){
                        var timeLbl = $(this).children('.time');
                        timeLbl.css('display', 'block');
                        var _timeLeft = timeLbl.offset().left,
                            _timeRight = timeLbl.offset().left + timeLbl.width(),
                            _tmleft = timeLbl.position().left,
                            _warpLeft = scope.wrapDiv.offset().left,
                            _warpright = scope.wrapDiv.offset().left+scope.wrapDiv.width();
                        var _num = 15;
                        //超出左边
                        if(_timeLeft<_warpLeft){
                            var _abs = _warpLeft - _timeLeft;
                            timeLbl.css("left",(_tmleft+_abs)+"px");
                        }
                        else if(_timeRight>_warpright){//超出右边
                            var _abs = _timeRight-_warpright;
                            timeLbl.css("left",(_tmleft-_abs+_num)+"px");
                        }else{
                            timeLbl.css("left",-timeLbl.width()/2+"px");

                        }
                    });

                    _li.on('mouseout', function() {
                        $(this).children('.time').css('display', 'none')
                        $(this).children('.borderBottom').css('display', 'none')
                    });
                    _times.push(_li);
                    if (i === len - 1){
                        _li.css("background", "none");
                    }

                }
                scope.wrapDiv.append(_timeline);
                scope.wrapDiv.addClass("wrap");
                if(_isClose){
                    $('.maxMin').hide();
                }
                //获取时间
                var countArr = [];
                var liWidthArr = [];

                //得到所有的时间
                for (var i = 0; i < _timesArr.length; i++){
                    countArr.push(getminte(_timesArr[i]));
                }
                var lastIndex = countArr.length - 1;
                var countHours = countArr[lastIndex] - countArr[0];
                //时间轴拖动
                var elementPointLeft = 0;
                var startPointLeft = 0;
                var L;
                timelineMove();

                var lis = _timeline.children();
                for (var i = 0; i < countArr.length; i++){
                    if (i + 1 > countArr.length - 1){
                        continue;
                    }
                    //ul的长度
                    if (_timesArr[0].length == 16){
                        _timeline.css('width', $('.wrap').width()-30+ 'px');
                    }
                    else if (_timesArr[0].length == 13){
                        _timeline.css('width', lis.length * 60 + 'px');
                    }
                    else if (_timesArr[0].length == 11){
                        _timeline.css('width', lis.length * 100 + 'px');
                    }
                    else if (_timesArr[0].length == 8){
                        _timeline.css('width', lis.length * 80 + 'px');
                    }

                    //缩放事件
                    var zooming = function (e){
                        e = window.event || e;
                        var o = this,
                            data = e.wheelDelta || -e.detail*5,
                            zoom,
                            size;
                        if(!+'\v1'){ //火狐
                            zoom = parseInt(o.style.zoom) || 100;
                            zoom += data / 12;
                            if(zoom > zooming.min){
                                o.style.zoom = zoom + '%';}
                        }else{//其他浏览器
                            size = o.getAttribute("_zoomsize").split(",");
                            zoom = parseInt(o.getAttribute("_zoom")) || 100;
                            zoom += data / 12;
                            if (zoom >zooming.min){
                                o.setAttribute("_zoom", zoom);
                                o.style.width = size[0] * zoom / 100 + "px";
                            }
                            else{
                                zoom = zooming.min;
                                o.setAttribute("_zoom", zoom);
                                o.style.width = size[0] * zoom / 100 + "px";
                            }
                        }
                        //缩放时每个间隔的长度
                        var _w = $(_timeline).width();
                        var every = _w / countHours;
                        liWidth = (countArr[1] - countArr[0]) * every-1;
                        var www = (_timeline.children().length) * liWidth;
                        _timeline.css('width', www+ 'px');
                        for (var i = 0; i < lis.length; i++){
                            lis[i].style.width = liWidth + 'px'
                        }

                    };

                    zooming.add = function (obj, min){
                        zooming.min = min;
                        obj = obj[0];
                        obj.onmousewheel = zooming;
                        if (window.navigator.userAgent.indexOf('Firefox') != -1){} //if Firefox
                        obj.addEventListener("DOMMouseScroll", zooming, false);
                        if ( - [1, ]){ //if not IE
                            obj.setAttribute("_zoomsize", obj.offsetWidth);
                        }
                    };


                    zooming.add(_timeline, 60);

                    //初始化每个间隔的长度
                    if(_timeline.width()<scope.wrapDiv.width()){
                        _timeline.css('width',scope.wrapDiv.width()-20+'px');
                    }
                    var every = _timeline.width() / countHours;
                    var liWidth = (countArr[i + 1] - countArr[i]) * every-1;
                    liWidthArr.push(liWidth);
                }
                //li 长度
                for (var i = 0; i < lis.length; i++){
                    lis[i].style.width = liWidthArr[i] + 'px';
                }



                //默认播放第一个
                _play();
                //开始播放
                if (scope.options.autoplay){
                    _isplay = true;
                    _startPlay();
                }

            }else{
                scope.wrapDiv.html("————————————暂无数据————————————");
                _showNowDate.html('暂无数据');
                $('.timeline .switch').click();
                //scope.hide();
            }
            //如果只有一个时间，默认收起
            if(times.length<2&&!_isClose){
                $(".timeline-close").click();
            }
            if(times.length>1&&_isClose){
                $(".timeline-open").click();
            }
        }


        /**
         * 转换分钟格式
         */
        function getminte(data){
            var reg = /[\u4E00-\u9FA5\uf900-\ufa2d]|\:/ig;
            var str = data.replace(reg, '/');
            var arr = str.split('/');
            if (arr[arr.length - 1] == ''){
                arr.pop()
            }
            if(data.length===16){
                var min = parseInt(arr[4]);
                var minteT = parseInt((arr[0] - 1) * 12 * 30 * 24 * 60) + parseInt((arr[1] - 1) * 30 * 24 * 60) +
                    parseInt(arr[2]) * 24 * 60 + parseInt(arr[3] * 60 + min);
                return minteT
            }else if (data.length == 13){ //获取小时
                var hoursT = parseInt((arr[0] - 1) * 12 * 30 * 24) + parseInt((arr[1] - 1) * 30 * 24) +
                    parseInt(arr[2]) * 24 + parseInt(arr[3]);
                return hoursT
            }

        }

        /**
         * 控制日历显示隐藏
         */
        scope.setDate = function(date){
            if(scope.selectDate){
                scope.selectDate = new Date(date).format("yyyy-MM-dd");
                $("#dateinfo").val(scope.selectDate);
                $('#dateinfo').datetimepicker('update');
            }
        }

        /**
         * 时间轴拖动
         */
        function timelineMove(){
            scope.wrapDiv.on('mousedown', function (evDown){
                elementPointLeft = _timeline.position().left;
                startPointLeft = evDown.clientX;
                if (_timeline.setCapture){
                    _timeline.setCapture();
                }
                document.onmousemove = function (evmove){
                    var nowPointLeft = evmove.clientX;
                    var L = elementPointLeft + (nowPointLeft - startPointLeft);
                    if (L > 0){
                        L = 0;
                    }
                    else if (L < $('.wrap').width() - _timeline.width()){
                        L = ($('.wrap').width() - _timeline.width());
                    }
                    if(scope.wrapDiv.width()>=_timeline.width()){
                        L = elementPointLeft;

                    }
                    _timeline.css("left", L+ 'px');
                    evmove.stopPropagation();
                };

                document.onmouseup = function (evup){
                    document.onmousemove = document.onmouseup = null;
                    if (document.releaseCapture){
                        document.releaseCapture();
                    }
                    evup.stopPropagation();
                };
                evDown.stopPropagation();
            });
            _timeline.css('margin-left',16+'px');
        }

        /**
         * 播放
         */
        function _play(){
            _timeline.find(".dot").removeClass("active");
            _times[_index].find(".dot").addClass("active");
            var _dotLeft = _times[_index].find(".dot").offset().left-10,
                _warpLeft = scope.wrapDiv.offset().left,
                _warpright = scope.wrapDiv.offset().left+scope.wrapDiv.width();
            var _num = 10;
            //缩放时间轴时显示播放时间
            _showNowDate.html('');
            var showname=$("input[name='layer']:checked");
            showname = $(showname).parent().text();
            _showNowDate.html(showname+' : '+scope.times[_index].label);
            _showTime.html(showname +' : '+scope.times[_index].label);
            //超出左边
//			if(_dotLeft<_warpLeft){
//				var _left = _timeline.position().left;
//				var _abs = _warpLeft - _dotLeft;
//				_timeline.css("left",(_left+_abs+_num)+"px");
//				
//			}
            //超出右边
//			if(_dotLeft>_warpright){
//				var _left = _timeline.position().left;
//				var _abs = _dotLeft-_warpright;
//				_timeline.css("left",(_left-_abs-_num)+"px");
//			}
//			
            if(scope.options.callback){
                var _time = scope.times[_index];
                _showPro.html(_time.type);
                scope.options.callback(_time);
            }
            else{
                $("#layer").show().attr("src","images/"+scope.times[_index].url);
            }
        }
        /**
         * 开始播放
         */
        function _startPlay(){
            clearInterval(_flag)
            $(".timeline .switch").attr("title", "暂停").css("background", "url("+scope.options.baseurl+"/media_pause.png) no-repeat");
            _timeline.css('left','16px');
            _flag = window.setInterval(function (){
                _isplay = true;
                _index++;
                if (_index === scope.times.length){
                    _index = 0;
                }
                _play();
            }, _interval);
        }
        /**
         * 暂停播放
         */
        function _pausePlay(){
            $(".timeline .switch").attr("title", "开始").css("background", "url("+scope.options.baseurl+"/media_play.png) no-repeat");
            _isplay = false;
            window.clearInterval(_flag);
        }

        /**
         * 更新时间轴
         * @param {Object} times
         */
        scope.updateTimes = function (times){
            _addTimes(times);
        };
        scope.showDateSeleted = function(isshow){
            if(isshow){
                _isShowDate = true;
                $(".day-left, .day-right, #dateinfo").show();
                $('.wrap').css('width',$(window).width()-557+'px');
            }
            else{
                _isShowDate = false;
                $(".day-left, .day-right, #dateinfo").hide();
                $('.wrap').css('width',$(window).width()-413+'px');
            }
        }

        /**
         * 时间轴隐藏
         */
        scope.hide = function(){
            _pausePlay();
            scope.dom.hide();
            $("#maplegend").html("").hide();
        }
        scope.updateProinfo = function(proname){
            _showPro.html(proname);
        }
        //自动执行初始化函数
        scope.init();
        //返回函数对象
        return this;
    };
})(jQuery);