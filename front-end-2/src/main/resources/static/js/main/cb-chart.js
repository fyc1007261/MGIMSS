/**
* Theme: Ubold Admin Template
* Author: Coderthemes
* Component: Dashboard 4
* 
*/

!function($) {
    "use strict";

    var MorrisCharts = function() {};


    //creates area chart
    MorrisCharts.prototype.createAreaChart = function(element, pointSize, lineWidth, data, xkey, ykeys, labels, lineColors) {
        Morris.Area({
            element: element,
            pointSize: 0,
            lineWidth:0,
            data: data,
            xkey: xkey,
            ykeys: ykeys,
            labels: labels,
            hideHover: 'auto',
            resize: true,
            gridLineColor: '#ebebeb',
            lineColors:lineColors,
             grid:true,
            gridTextFamily:'Lato',
            gridTextSize:14,
            gridTextWeight:400,
            gridTextColor:'#555',
            fillOpacity:1,
            parseTime: false,
            ymax:60,
            numLines: 7,
            
            xmin:0,
             xmax:250,
          
            
          
        });
    },

 //creates Donut chart
    MorrisCharts.prototype.createDonutChart = function(element, data, colors) {
        Morris.Donut({
            element: element,
            data: data,
            resize: true, //defaulted to true
            colors: colors
        });
    },
        
    MorrisCharts.prototype.init = function() {

        //creating area chart
       var $areaData = [
                        { week: undefined, a: 0,b: 0},
                        { week: 25, a: 1, b:1},
                        { week: 50, a: 5, b:3},
                        { week: 75, a: 5, b:3},
                        { week: 100, a: 15, b:8},
                        { week: 125, a: 52, b:12},
                        { week: 150, a: 25, b:8},
                        { week: 175, a: 10, b:3},
                        { week: 200, a: 15, b:1},
                        { week: 225, a: 5, b:0},
                        { week: 250, a: 0, b:0}            
                        
            ];
            
        this.createAreaChart('morris-area-example', 0, 0, $areaData, 'week', ['a', 'b'],  ['Series A', 'Series B'],['#86d3ce','#3993bb']);
        
       //creating donut chart
        var $donutData = [
                {value: 60.254,label: "visits"},
                {label: "Visits", value: 30.164},
                {label: "Visits", value: 30.104},
                { value: 84.254, label: "Visits"},
                {label: "Visits", value: 60.154}
            ];
        this.createDonutChart('morris-donut-example', $donutData, ['#3993bb', '#65b5c2', "#2e7bad", "#23649e", "#63daed"]);
        

    },
    //init
    $.MorrisCharts = new MorrisCharts, $.MorrisCharts.Constructor = MorrisCharts
}(window.jQuery),

//initializing
function($) {
    "use strict";
    $.MorrisCharts.init();
}(window.jQuery);