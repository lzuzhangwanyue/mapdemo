$(function() {
    /**
     * 时间格式化
     */
    Date.prototype.format = function(fmt) {
        var o = {
            "M+" : this.getMonth()+1,                 //月份
            "d+" : this.getDate(),                    //日
            "h+" : this.getHours(),                   //小时
            "m+" : this.getMinutes(),                 //分
            "s+" : this.getSeconds(),                 //秒
            "q+" : Math.floor((this.getMonth()+3)/3), //季度
            "S"  : this.getMilliseconds()             //毫秒
        };
        if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        }
        for(var k in o) {
            if(new RegExp("("+ k +")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }
        return fmt;
    };

    // Get start/end times
    var startTime = new Date("2017-07-01 00:00");
    var endTime = new Date("2017-07-01 24:00");

    // Create a DataSet with data
    var timelineData = new vis.DataSet([
        {
            start: startTime,
            end: endTime,
            content: 'Demo GPS Tracks'
        }
    ]);

    // Set timeline options
    var timelineOptions = {
        "width":  "100%",
        "height": "130px",
        "style": "box",
        "axisOnTop": true,
        "showCustomTime":true,
        "clickToUse":true,
        "end":endTime
    };

    // Setup timeline
    var timeline = new vis.Timeline(document.getElementById('timeline'), timelineData, timelineOptions);

    // Set custom time marker (blue)
    timeline.setCustomTime(startTime);

    // Set timeline time change event, so cursor is set after moving custom time (blue)
    timeline.on('timechange', onCustomTimeChange);

    //
    function onCustomTimeChange(properties) {
        // timeline.setContent("");
        console.log(properties.time.format("yyyy-MM-dd hh:mm"));
    }

    var flag = 0;
    var _hour = 0;
    $("#start").on("click",function(){
        flag = setInterval(function(){
            var _h = _hour<10?"0"+_hour:_hour;
            var time = new Date(new Date().format("yyyy-MM-dd "+_h+":00"));
            timeline.setCustomTime(time);
            _hour++;
            if(_hour===24){
                _hour = 0;
            }
        },1000);
    })
});
