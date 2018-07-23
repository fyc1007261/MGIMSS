/**
 * Created by lenovo on 2018/7/13.
 */
import React, { Component } from 'react';
import '../../css/getMedia.css';
import '../../css/bootstrap/css/bootstrap.css';
import '../../css/willesPlay.css'
import { Badge, Card, CardBody, CardFooter, CardHeader, Col, Row, Collapse, Fade } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import $ from 'jquery'


(function (window) {
  //兼容
  window.URL = window.URL || window.webkitURL;
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

  var HZRecorder = function (stream, config) {
    config = config || {};

    config.sampleBits = config.sampleBits || 8;      //采样数位 8, 16
    config.sampleRate = config.sampleRate || (44100 / 6);   //采样率(1/6 44100)
    console.log(config.sampleBits);
    console.log("config.sampleBits");
    console.log(config.sampleRate);
    console.log("config.sampleRate");
    var video = document.getElementById("video");
    video.src = window.URL.createObjectURL(stream);
    video.onloadedmetadata = function(e) {
      console.log('nihao44eee4aaaaddda');
      video.play();
    };
    //创建一个音频环境对象
    var audioContext = window.AudioContext || window.webkitAudioContext;
    var context = new audioContext();

    //将声音输入这个对像
    var audioInput = context.createMediaStreamSource(stream);

    //设置音量节点
    var volume = context.createGain();
    audioInput.connect(volume);

    //创建缓存，用来缓存声音
    var bufferSize = 4096;

    // 创建声音的缓存节点，createScriptProcessor方法的
    // 第二个和第三个参数指的是输入和输出都是双声道。
    var recorder = context.createScriptProcessor(bufferSize, 2, 2);

    var audioData = {
      size: 0          //录音文件长度
      , buffer: []     //录音缓存
      , inputSampleRate: 44100   //输入采样率
      , inputSampleBits: 16       //输入采样数位 8, 16
      , outputSampleRate: 13800   //输出采样率
      ,oututSampleBits: 16     //输出采样数位 8, 16
      , input: function (data) {
        this.buffer.push(new Float32Array(data));
        this.size += data.length;
      }
      , compress: function () { //合并压缩
        //合并
        var data = new Float32Array(this.size);
        var offset = 0;
        for (var i = 0; i < this.buffer.length; i++) {
          data.set(this.buffer[i], offset);
          offset += this.buffer[i].length;
        }
        console.log(data);
        //压缩
        var compression = parseInt(this.inputSampleRate / this.outputSampleRate);

        var length = data.length / compression;
        var result = new Float32Array(length);
        var index = 0, j = 0;
        while (index < length) {
          result[index] = data[j];
          j += compression;
          index++;
        }
        return result;
      }
      , encodeWAV: function () {
        var sampleRate = Math.min(this.inputSampleRate, this.outputSampleRate);
        var sampleBits = Math.min(this.inputSampleBits, this.oututSampleBits);
        var bytes = this.compress();
        var dataLength = bytes.length * (sampleBits / 8);
        var buffer = new ArrayBuffer(44 + dataLength);
        var data = new DataView(buffer);

        var channelCount = 1;//单声道
        var offset = 0;

        var writeString = function (str) {
          for (var i = 0; i < str.length; i++) {
            data.setUint8(offset + i, str.charCodeAt(i));
          }
        };

        // 资源交换文件标识符
        writeString('RIFF'); offset += 4;
        // 下个地址开始到文件尾总字节数,即文件大小-8
        data.setUint32(offset, 36 + dataLength, true); offset += 4;
        // WAV文件标志
        writeString('WAVE'); offset += 4;
        // 波形格式标志
        writeString('fmt '); offset += 4;
        // 过滤字节,一般为 0x10 = 16
        data.setUint32(offset, 16, true); offset += 4;
        // 格式类别 (PCM形式采样数据)
        data.setUint16(offset, 1, true); offset += 2;
        // 通道数
        data.setUint16(offset, channelCount, true); offset += 2;
        // 采样率,每秒样本数,表示每个通道的播放速度
        data.setUint32(offset, sampleRate, true); offset += 4;
        // 波形数据传输率 (每秒平均字节数) 单声道×每秒数据位数×每样本数据位/8
        data.setUint32(offset, channelCount * sampleRate * (sampleBits / 8), true); offset += 4;
        // 快数据调整数 采样一次占用字节数 单声道×每样本的数据位数/8
        data.setUint16(offset, channelCount * (sampleBits / 8), true); offset += 2;
        // 每样本数据位数
        data.setUint16(offset, sampleBits, true); offset += 2;
        // 数据标识符
        writeString('data'); offset += 4;
        // 采样数据总数,即数据总大小-44
        data.setUint32(offset, dataLength, true); offset += 4;
        // 写入采样数据
        if (sampleBits === 8) {
          for (var i = 0; i < bytes.length; i++, offset++) {
            var s = Math.max(-1, Math.min(1, bytes[i]));
            var val = s < 0 ? s * 0x8000 : s * 0x7FFF;
            val = parseInt(255 / (65535 / (val + 32768)));
            data.setInt8(offset, val, true);
          }
        } else {
          for (var i = 0; i < bytes.length; i++, offset += 2) {
            var s = Math.max(-1, Math.min(1, bytes[i]));
            data.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
          }
        }

        return new Blob([data], { type: 'audio/wav' });
      }
    };
    console.log("采样率");
    console.log(audioData);

    //开始录音
    this.start = function () {
      audioInput.connect(recorder);
      recorder.connect(context.destination);
    };
    this.close = function () {
      context.close();
    };
    //停止
    this.stop = function () {
      recorder.disconnect();
    };

    //获取音频文件
    this.getBlob = function () {
      this.stop();
      return audioData.encodeWAV();
    };

    //回放
    this.play = function (audio) {
      audio.src = window.URL.createObjectURL(this.getBlob());
    };

    //上传
    this.upload = function (url, callback) {
      var fd = new FormData();
      fd.append('audioData', this.getBlob());
      var xhr = new XMLHttpRequest();
      if (callback) {
        xhr.upload.addEventListener('progress', function (e) {
          callback('uploading', e);
        }, false);
        xhr.addEventListener('load', function (e) {
          callback('ok', e);
        }, false);
        xhr.addEventListener('error', function (e) {
          callback('error', e);
        }, false);
        xhr.addEventListener('abort', function (e) {
          callback('cancel', e);
        }, false);
      }
      xhr.open('POST', url);
      xhr.send(fd);
    };

    //音频采集
    recorder.onaudioprocess = function (e) {
      audioData.input(e.inputBuffer.getChannelData(0));
      //record(e.inputBuffer.getChannelData(0));
    };

  };
  //抛出异常
  HZRecorder.throwError = function (message) {
    throw new function () { this.toString = function () { return message; };};
  };
  //是否支持录音
  HZRecorder.canRecording = (navigator.getUserMedia != null);
  //获取录音机
  HZRecorder.get = function (callback, config) {
    if (callback) {
      if (navigator.getUserMedia) {
        navigator.getUserMedia(
          { audio: true } //只启用音频
          , function (stream) {
            var rec = new HZRecorder(stream, config);
            callback(rec);
          }
          , function (error) {
            switch (error.code || error.name) {
              case 'PERMISSION_DENIED':
              case 'PermissionDeniedError':
                HZRecorder.throwError('用户拒绝提供信息。');
                break;
              case 'NOT_SUPPORTED_ERROR':
              case 'NotSupportedError':
                HZRecorder.throwError('<a href="http://www.it165.net/edu/ewl/" target="_blank" class="keylink">浏览器</a>不支持硬件设备。');
                break;
              case 'MANDATORY_UNSATISFIED_ERROR':
              case 'MandatoryUnsatisfiedError':
                HZRecorder.throwError('无法发现指定的硬件设备。');
                break;
              default:
                HZRecorder.throwError('无法打开麦克风。异常信息:' + (error.code || error.name));
                break;
            }
          });
      } else {
        HZRecorder.throwErr('当前<a href="http://www.it165.net/edu/ewl/" target="_blank" class="keylink">浏览器</a>不支持录音功能。'); return;
      }
    }
  };
  HZRecorder.get2 = function (callback, config) {
    if (callback) {
      if (navigator.getUserMedia) {
        navigator.getUserMedia(
          { audio: true , video: { width: 320, height: 320 }} //只启用音频
          , function (stream) {
            var rec = new HZRecorder(stream, config);
            callback(rec);
          }
          , function (error) {
            switch (error.code || error.name) {
              case 'PERMISSION_DENIED':
              case 'PermissionDeniedError':
                HZRecorder.throwError('用户拒绝提供信息。');
                break;
              case 'NOT_SUPPORTED_ERROR':
              case 'NotSupportedError':
                HZRecorder.throwError('<a href="http://www.it165.net/edu/ewl/" target="_blank" class="keylink">浏览器</a>不支持硬件设备。');
                break;
              case 'MANDATORY_UNSATISFIED_ERROR':
              case 'MandatoryUnsatisfiedError':
                HZRecorder.throwError('无法发现指定的硬件设备。');
                break;
              default:
                HZRecorder.throwError('无法打开麦克风。异常信息:' + (error.code || error.name));
                break;
            }
          });
      } else {
        HZRecorder.throwErr('当前<a href="http://www.it165.net/edu/ewl/" target="_blank" class="keylink">浏览器</a>不支持录音功能。'); return;
      }
    }
  };
  window.HZRecorder = HZRecorder;
})(window);

var recorder;
var audio = document.querySelector('audio');
var video = document.querySelector('video');


const cp1={
  display:"block",
}
const cp2={
  whiteSpace:"pre",
}
const cp3={
  width:"320",
  height:"320"
}
class getMedia extends Component {
  constructor(props) {
    super(props);

    // this.startRecording = this.startRecording.bind(this);
    // this.obtainRecord = this.obtainRecord.bind(this);
    // this.stopRecord = this.stopRecord.bind(this);
    // this.playRecord = this.playRecord.bind(this);
  }
  componentDidMount(window){
    $(function() {
      var playVideo = $('video');
      var playPause = $('.playPause'); //播放和暂停
      var currentTime = $('.timebar .currentTime'); //当前时间
      var duration = $('.timebar .duration'); //总时间
      var progress = $('.timebar .progress-bar'); //进度条
      var volumebar = $('.volumeBar .volumewrap').find('.progress-bar');
      playVideo[0].volume = 0.4; //初始化音量
      playPause.on('click', function() {
        playControl();
      });
      $('.playContent').on('click', function() {
        playControl();
      }).hover(function() {
        $('.turnoff').stop().animate({
          'right': 0
        }, 500);
      }, function() {
        $('.turnoff').stop().animate({
          'right': -40
        }, 500);
      });
      $(document).click(function() {
        $('.volumeBar').hide();
      });
      playVideo.on('loadedmetadata', function() {
        duration.text(formatSeconds(playVideo[0].duration));
      });

      playVideo.on('timeupdate', function() {
        currentTime.text(formatSeconds(playVideo[0].currentTime));
        progress.css('width', 100 * playVideo[0].currentTime / playVideo[0].duration + '%');
      });
      playVideo.on('ended', function() {
        $('.playTip').removeClass('glyphicon-pause').addClass('glyphicon-play').fadeIn();
        playPause.toggleClass('playIcon');
      });

      $(window).keyup(function(event){
        event = event || window.event;
        if(event.keyCode == 32)playControl();
        if(event.keyCode == 27){
          $('.fullScreen').removeClass('cancleScreen');
          $('#willesPlay .playControll').css({
            'bottom': -48
          }).removeClass('fullControll');
        };
        event.preventDefault();
      });


      //全屏
      $('.icon-size-fullscreen').on('click', function() {
        if ($(this).hasClass('icon-size-actual')) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozExitFullScreen) {
            document.mozExitFullScreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          }
          $(this).removeClass('icon-size-actual');
          $('#willesPlay .playControll').css({
            'bottom': -48
          }).removeClass('fullControll');
        } else {
          if (playVideo[0].requestFullscreen) {
            playVideo[0].requestFullscreen();
          } else if (playVideo[0].mozRequestFullScreen) {
            playVideo[0].mozRequestFullScreen();
          } else if (playVideo[0].webkitRequestFullscreen) {
            playVideo[0].webkitRequestFullscreen();
          } else if (playVideo[0].msRequestFullscreen) {
            playVideo[0].msRequestFullscreen();
          }
          $(this).addClass('icon-size-actual');
          $('#willesPlay .playControll').css({
            'left': 0,
            'bottom': 0
          }).addClass('fullControll');
        }
        return false;
      });
      //音量
      $('.icon-volume-1').on('click', function(e) {
        e = e || window.event;
        $('.volumeBar').toggle();
        e.stopPropagation();
      });
      $('.volumeBar').on('click mousewheel DOMMouseScroll', function(e) {
        e = e || window.event;
        console.log("here")
        volumeControl(e);
        e.stopPropagation();
        return false;
      });
      $('.timebar .progress').mousedown(function(e) {
        e = e || window.event;
        updatebar(e.pageX);
      });
      //$('.playContent').on('mousewheel DOMMouseScroll',function(e){
      //	volumeControl(e);
      //});
      var updatebar = function(x) {
        var maxduration = playVideo[0].duration; //Video
        var positions = x - progress.offset().left; //Click pos
        var percentage = 100 * positions / $('.timebar .progress').width();
        //Check within range
        if (percentage > 100) {
          percentage = 100;
        }
        if (percentage < 0) {
          percentage = 0;
        }

        //Update progress bar and video currenttime
        progress.css('width', percentage + '%');
        playVideo[0].currentTime = maxduration * percentage / 100;
      };
      //音量控制
      function volumeControl(e) {
        console.log("here2")
        e = e || window.event;
        var eventype = e.type;
        var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) || (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));
        var positions = 0;
        var percentage = 0;
        if (eventype == "click") {
          positions = volumebar.offset().top - e.pageY;
          percentage = 100 * (positions + volumebar.height()) / $('.volumeBar .volumewrap').height();
        } else if (eventype == "mousewheel" || eventype == "DOMMouseScroll") {
          percentage = 100 * (volumebar.height() + delta) / $('.volumeBar .volumewrap').height();
        }
        if (percentage < 0) {
          percentage = 0;
          $('.otherControl .volume').attr('class', 'volume icon-volume-off');
        }
        if (percentage > 50) {
          $('.otherControl .volume').attr('class', 'volume icon-volume-2');
        }
        if (percentage > 0 && percentage <= 50) {
          $('.otherControl .volume').attr('class', 'volume icon-volume-1');
        }
        if (percentage >= 100) {
          percentage = 100;
        }
        $('.volumewrap .progress-bar').css('height', percentage + '%');
        playVideo[0].volume = percentage / 100;
        e.stopPropagation();
        e.preventDefault();
      }

      function playControl() {
        playPause.toggleClass('playIcon');
        if (playVideo[0].paused) {
          playVideo[0].play();
          $('.playTip').removeClass('glyphicon-play').addClass('glyphicon-pause').fadeOut();
        } else {
          playVideo[0].pause();
          $('.playTip').removeClass('glyphicon-pause').addClass('glyphicon-play').fadeIn();
        }
      }
      //关灯
      $('.btnLight').click(function(e) {
        e = e || window.event;
        if ($(this).hasClass('on')) {
          $(this).removeClass('on');
          $('body').append('<div class="overlay"></div>');
          $('.overlay').css({
            'position': 'absolute',
            'width': 100 + '%',
            'height': $(document).height(),
            'background': '#000',
            'opacity': 1,
            'top': 0,
            'left': 0,
            'z-index': 999
          });
          $('.playContent').css({
            'z-index': 1000
          });
          $('.playControll').css({
            'bottom': -48,
            'z-index': 1000
          });

          $('.playContent').hover(function() {
            $('.playControll').stop().animate({
              'height': 48,
            },500);
          }, function() {
            setTimeout(function() {
              $('.playControll').stop().animate({
                'height': 0,
              }, 500);
            }, 2000)
          });
        } else {
          $(this).addClass('on');
          $('.overlay').remove();
          $('.playControll').css({
            'bottom': 0,
          });
        }
        e.stopPropagation();
        e.preventDefault();
      });
    });

//秒转时间
    function formatSeconds(value) {
      value = parseInt(value);
      var time;
      if (value > -1) {
        var hour = Math.floor(value / 3600);
        var min = Math.floor(value / 60) % 60;
        var sec = value % 60;
        var day = parseInt(hour / 24);
        if (day > 0) {
          hour = hour - 24 * day;
          time = day + "day " + hour + ":";
        } else time = hour + ":";
        if (min < 10) {
          time += "0";
        }
        time += min + ":";
        if (sec < 10) {
          time += "0";
        }
        time += sec;
      }
      return time;
    }
}

  /* 音频 */
  startRecording() {
    window.HZRecorder.get(function (rec) {
      recorder = rec;
      recorder.start();
    });
  }

  startRecording2() {
    window.HZRecorder.get2(function (rec) {
    recorder = rec;
    recorder.start();
  });
  var num=10;
  var interval=setInterval(function(){
    if(num==0){
      document.getElementById("picture").click();
      console.log("click");
      clearInterval(interval);
    }
    document.getElementById("numDiv").innerHTML=num--;
  },1000);

}

  obtainRecord(){
    var record = recorder.getBlob();
    var reader = new FileReader();
    reader.readAsDataURL(record);
    reader.onload = function () {
      console.log(reader.result);
      var ans = reader.result;
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
        }
      }

      xmlhttp.open("POST","/webSpeech",true);
      xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
      xmlhttp.send("sudio="+ans);
    };
    recorder.close();

}

  stopRecord(){
    recorder.stop();
    var record = recorder.getBlob();
    var reader = new FileReader();
    reader.readAsDataURL(record);
    reader.onload = function () {
      console.log(reader.result);
      var ans = reader.result;
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
        }
      }

      xmlhttp.open("POST","/webSpeech",true);
      xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
      xmlhttp.send("sudio="+ans);
    };
    recorder.close();
}
  playRecord(){

};
  photo(){
    var context = document.getElementById("canvas").getContext("2d");
    var video = document.querySelector('video');
    console.log(video);
    context.drawImage(video, 0, 0, 320, 320);
    document.getElementById("pic").click();
  };
  uploading(){
    var imgData=document.getElementById("canvas").toDataURL("image/png");
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
      }
    }

    xmlhttp.open("POST","/gesture/upload",true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send("imageStr="+imgData);
    console.log(imgData);
  }
  render() {
    return(

        <div>
          <div style={{textAlign: "center"}}>
            <div className='ribbon'>
              <a href='#'  onClick={ ()=>{this.startRecording()}}><span>录音</span></a>
              <a href='#' onClick={ ()=>{this.stopRecord()}}><span>识别语音</span></a>
              <a href='#' onClick={ ()=>{this.startRecording2()}}><span>录入手势</span><span id="numDiv">10</span></a>
              <a href="javascript:;" id="picture" onClick={ ()=>{this.photo()}}><span>拍照</span></a>
              <a  href='#' id="sc" onClick={ ()=>{this.uploading()}}><span>上传</span></a>
            </div>
          </div>

          <div style={{width:"700px",margin:"10px auto 20px auto",padding:"0 0 0 380px",overflow:"hidden"}}>
          </div>

          <canvas style={{display:"none"}} id="canvas" width={320} height={320}></canvas>


          <div >
            <div>
              <div className="col-md-12" >
                <div id="willesPlay">
                  <div className="playHeader">
                    <div className="videoName">手势获取框</div>
                  </div>
                  <div className="playContent">
                    <div className="turnoff">
                      <ul>
                        <li><a href="javascript:;" title="喜欢" className="icon-heart icons font-2xl d-block mt-4"></a></li>
                        <li><a href="javascript:;" title="关灯" className="btnLight on icon-eyeglass icons font-2xl d-block mt-4"></a></li>
                        <li><a href="javascript:;" title="分享" className="icon-share-alt icons font-2xl d-block mt-4"></a></li>
                      </ul>
                    </div>
                    <video width="100%" height="100%" id="video">
                    </video>
                  </div>
                  <div className="playControll">
                    <div id="pic" className="playPause playIcon"></div>
                    <div className="timebar">

                      <div className="progress">
                        <div className="progress-bar progress-bar-danger progress-bar-striped" role="progressbar" aria-valuemin="0" aria-valuemax="100" style={{width: "0%"}}></div>
                      </div>

                    </div>
                    <div className="otherControl">
                      <span className="volume icon-volume-1"></span>
                      <span className="fullScreen icon-size-fullscreen"></span>
                      <div className="volumeBar">
                        <div className="volumewrap">
                          <div className="progress">
                            <div className="progress-bar progress-bar-danger" role="progressbar" aria-valuemin="0" aria-valuemax="100" style={{width: "8px",height: "40%"}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>



    );
  }
}


export default getMedia;
