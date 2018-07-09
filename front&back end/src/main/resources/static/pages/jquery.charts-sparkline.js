$( document ).ready(function() {
    
    var DrawSparkline = function() {
        $('.sparkline1').sparkline([0, 5, 10, 15, 20, 0, 20, 6, 4, 7, 10, 10, 7, 4, 6, 20, 0, 20, 0, 5, 10, 15], {
            type: 'line',
            lineWidth:1,
            chartRangeMax: 40,
            width: $('.cb-col-20').width(),
            height: '20',
            lineColor:'rgba(255,255, 255, .45)',
            fillColor: 'rgba(0,0, 0, 0.0)',
            minSpotColor :'rgba(0,0, 0, 0.0)',
            maxSpotColor :'rgba(0,0, 0, 0.0)',
            highlightLineColor :'rgba(0,0, 0, 0.0)',
            highlightSpotColor: 'rgba(0,0, 0, 0.0)',
            enableTagOptions:false
        }); 
        
    },
        DrawMouseSpeed = function () {
            var mrefreshinterval = 500; // update display every 500ms
            var lastmousex=-1; 
            var lastmousey=-1;
            var lastmousetime;
            var mousetravel = 0;
            var mpoints = [];
            var mpoints_max = 30;
            $('html').mousemove(function(e) {
                var mousex = e.pageX;
                var mousey = e.pageY;
                if (lastmousex > -1) {
                    mousetravel += Math.max( Math.abs(mousex-lastmousex), Math.abs(mousey-lastmousey) );
                }
                lastmousex = mousex;
                lastmousey = mousey;
            });
            var mdraw = function() {
                var md = new Date();
                var timenow = md.getTime();
                if (lastmousetime && lastmousetime!=timenow) {
                    var pps = Math.round(mousetravel / (timenow - lastmousetime) * 1000);
                    mpoints.push(pps);
                    if (mpoints.length > mpoints_max)
                        mpoints.splice(0,1);
                    mousetravel = 0;
                    $('#sparkline5').sparkline(mpoints, {
                        tooltipSuffix: ' pixels per second',
                        type: 'line',
                        width: $('#sparkline1').width(),
                        height: '165',
                        chartRangeMax: 50,
                        lineColor: '#7e57c2',
                        fillColor: 'rgba(126, 87, 194, 0.3)',
                        highlightLineColor: 'rgba(24,147,126,.1)',
                        highlightSpotColor: 'rgba(24,147,126,.2)',
                    });
                }
                lastmousetime = timenow;
                setTimeout(mdraw, mrefreshinterval);
            }
            // We could use setInterval instead, but I prefer to do it this way
            setTimeout(mdraw, mrefreshinterval); 
        };
    
    DrawSparkline();
    DrawMouseSpeed();
    
    var resizeChart;

    $(window).resize(function(e) {
        clearTimeout(resizeChart);
        resizeChart = setTimeout(function() {
            DrawSparkline();
            DrawMouseSpeed();
        }, 300);
    });
});