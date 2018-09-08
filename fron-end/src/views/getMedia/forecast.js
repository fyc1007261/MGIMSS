/**
 * Created by lenovo on 2018/7/23.
 */
import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts';
// import ReactEcharts from 'echarts-for-react'
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/markPoint';
var showtu1 = [];
var showtu2 = [];
var showtu3 = [];

require('../../css/all.css');

class ECharts  extends Component {
  componentWillMount() {

    var xmlhttp;
    if (window.XMLHttpRequest)
    {
      //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
      xmlhttp=new XMLHttpRequest();
    }
    xmlhttp.onreadystatechange=function()
    {
      if (xmlhttp.readyState==4 && xmlhttp.status==200)
      {
        showtu1 = JSON.parse(xmlhttp.responseText)
      }
    }

    xmlhttp.open("GET","/forecast/predict",false);
    xmlhttp.send();
    var xmlhttp;
    if (window.XMLHttpRequest)
    {
      //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
      xmlhttp=new XMLHttpRequest();
    }
    xmlhttp.onreadystatechange=function()
    {
      if (xmlhttp.readyState==4 && xmlhttp.status==200)
      {
        showtu2 = JSON.parse(xmlhttp.responseText)
      }
    }

    xmlhttp.open("GET","/forecast/true",false);
    xmlhttp.send();
    showtu3 =[];
    var myDate = new Date();
    var ltime = Math.floor(myDate.getTime()/3600000)*3600000-1000*60*60*10;
    for (var ii = 0 ; ii<20; ii++)
    {
      var myDate1 = new Date(ltime+ii*3600000);
      showtu3.push(myDate1.toLocaleString());
    }
  }
  componentDidMount() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    // 绘制图表
    myChart.setOption({
      title : {
        text: 'AI小微帮你预测发电量',
        subtext: ''
      },
      tooltip : {
        trigger: 'axis'
      },
      legend: {
        data:['预测结果','实际结果']
      },
      toolbox: {
        show : true,
        feature : {
          mark : {show: true},
          dataView : {show: true, readOnly: false},
          magicType : {show: true, type: ['line', 'bar']},
          restore : {show: true},
          saveAsImage : {show: true}
        }
      },
      calculable : true,
      xAxis : [
        {
          type : 'category',
          boundaryGap : false,
          data : showtu3
        }
      ],
      yAxis : [
        {
          type : 'value',
        }
      ],
      series : [
        {
          name:'预测结果',
          type:'line',
          data:showtu1,
          markPoint : {
            data : [
              {type : 'max', name: '最大值'},
              {type : 'min', name: '最小值'}
            ]
          },
          markLine : {
            data : [
              {type : 'average', name: '平均值'}
            ]
          }
        },
        {
          name:'实际结果',
          type:'line',
          data:showtu2,
          markPoint : {
            data : [
              {type : 'max', name: '最大值'},
              {type : 'min', name: '最小值'}
            ]
          },
          markLine : {
            data : [
              {type : 'average', name : '平均值'}
            ]
          }
        }
      ]
    });
  }
  render() {
    return (
      <div id="main" style={{ width: 1100, height: 400 ,margin:"auto"}}></div>
    );
  }
}

export default ECharts ;
