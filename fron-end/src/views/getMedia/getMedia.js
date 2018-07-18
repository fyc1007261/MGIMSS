// /**
//  * Created by lenovo on 2018/7/13.
//  */
// import React, { Component } from 'react';
// const cp1={
//   display:"block",
// }
// const cp2={
//   whiteSpace:"pre",
// }
//
// window.recorder.getBlob = function () {
//
// };
// class getMedia extends Component {
//   constructor(props) {
//     super(props);
//
//     this.startRecording = this.startRecording.bind(this);
//     this.obtainRecord = this.obtainRecord.bind(this);
//     this.stopRecord = this.stopRecord.bind(this);
//     this.playRecord = this.playRecord.bind(this);
//   }
//   componentDidMount(window){
//     var audio = document.querySelector('audio');
//     window.URL = window.URL || window.webkitURL;
//     navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
//
//    var HZRecorder = function (stream, config) {
//     config = config || {};
//     config.sampleBits = config.sampleBits || 8;      //采样数位 8, 16
//     config.sampleRate = config.sampleRate || (44100 / 6);   //采样率(1/6 44100)
//
//     var video = document.getElementById("video");
//     video.src = window.URL.createObjectURL(stream);
//     video.onloadedmetadata = function(e) {
//       console.log('nihao44eee4aaaaddda');
//       video.play();
//     };
//     //创建一个音频环境对象
//     var audioContext = window.AudioContext || window.webkitAudioContext;
//     var context = new audioContext();
//
//     //将声音输入这个对像
//     var audioInput = context.createMediaStreamSource(stream);
//
//     //设置音量节点
//     var volume = context.createGain();
//     audioInput.connect(volume);
//
//     //创建缓存，用来缓存声音
//     var bufferSize = 4096;
//
//     // 创建声音的缓存节点，createScriptProcessor方法的
//     // 第二个和第三个参数指的是输入和输出都是双声道。
//     var recorder = context.createScriptProcessor(bufferSize, 2, 2);
//
//     var audioData = {
//       size: 0          //录音文件长度
//       , buffer: []     //录音缓存
//       , inputSampleRate: context.sampleRate    //输入采样率
//       , inputSampleBits: 16       //输入采样数位 8, 16
//       , outputSampleRate: config.sampleRate    //输出采样率
//       , oututSampleBits: config.sampleBits       //输出采样数位 8, 16
//       , input: function (data) {
//         this.buffer.push(new Float32Array(data));
//         this.size += data.length;
//       }
//       , compress: function () { //合并压缩
//         //合并
//         var data = new Float32Array(this.size);
//         var offset = 0;
//         for (var i = 0; i < this.buffer.length; i++) {
//           data.set(this.buffer[i], offset);
//           offset += this.buffer[i].length;
//         }
//         //压缩
//         var compression = parseInt(this.inputSampleRate / this.outputSampleRate);
//         var length = data.length / compression;
//         var result = new Float32Array(length);
//         var index = 0, j = 0;
//         while (index < length) {
//           result[index] = data[j];
//           j += compression;
//           index++;
//         }
//         return result;
//       }
//       , encodeWAV: function () {
//         var sampleRate = Math.min(this.inputSampleRate, this.outputSampleRate);
//         var sampleBits = Math.min(this.inputSampleBits, this.oututSampleBits);
//         var bytes = this.compress();
//         var dataLength = bytes.length * (sampleBits / 8);
//         var buffer = new ArrayBuffer(44 + dataLength);
//         var data = new DataView(buffer);
//
//         var channelCount = 1;//单声道
//         var offset = 0;
//
//         var writeString = function (str) {
//           for (var i = 0; i < str.length; i++) {
//             data.setUint8(offset + i, str.charCodeAt(i));
//           }
//         };
//
//         // 资源交换文件标识符
//         writeString('RIFF'); offset += 4;
//         // 下个地址开始到文件尾总字节数,即文件大小-8
//         data.setUint32(offset, 36 + dataLength, true); offset += 4;
//         // WAV文件标志
//         writeString('WAVE'); offset += 4;
//         // 波形格式标志
//         writeString('fmt '); offset += 4;
//         // 过滤字节,一般为 0x10 = 16
//         data.setUint32(offset, 16, true); offset += 4;
//         // 格式类别 (PCM形式采样数据)
//         data.setUint16(offset, 1, true); offset += 2;
//         // 通道数
//         data.setUint16(offset, channelCount, true); offset += 2;
//         // 采样率,每秒样本数,表示每个通道的播放速度
//         data.setUint32(offset, sampleRate, true); offset += 4;
//         // 波形数据传输率 (每秒平均字节数) 单声道×每秒数据位数×每样本数据位/8
//         data.setUint32(offset, channelCount * sampleRate * (sampleBits / 8), true); offset += 4;
//         // 快数据调整数 采样一次占用字节数 单声道×每样本的数据位数/8
//         data.setUint16(offset, channelCount * (sampleBits / 8), true); offset += 2;
//         // 每样本数据位数
//         data.setUint16(offset, sampleBits, true); offset += 2;
//         // 数据标识符
//         writeString('data'); offset += 4;
//         // 采样数据总数,即数据总大小-44
//         data.setUint32(offset, dataLength, true); offset += 4;
//         // 写入采样数据
//         if (sampleBits === 8) {
//           for (var i = 0; i < bytes.length; i++, offset++) {
//             var s = Math.max(-1, Math.min(1, bytes[i]));
//             var val = s < 0 ? s * 0x8000 : s * 0x7FFF;
//             val = parseInt(255 / (65535 / (val + 32768)));
//             data.setInt8(offset, val, true);
//           }
//         } else {
//           for (var i = 0; i < bytes.length; i++, offset += 2) {
//             var s = Math.max(-1, Math.min(1, bytes[i]));
//             data.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
//           }
//         }
//
//         return new Blob([data], { type: 'audio/wav' });
//       }
//     };
//
//     //开始录音
//     this.start = function () {
//       audioInput.connect(recorder);
//       recorder.connect(context.destination);
//     };
//
//     //停止
//     this.stop = function () {
//       recorder.disconnect();
//     };
//
//     //获取音频文件
//     this.getBlob = function () {
//       this.stop();
//       return audioData.encodeWAV();
//     };
//
//     //回放
//     this.play = function (audio) {
//       audio.src = window.URL.createObjectURL(this.getBlob());
//     };
//
//     //上传
//     this.upload = function (url, callback) {
//       var fd = new FormData();
//       fd.append('audioData', this.getBlob());
//       var xhr = new XMLHttpRequest();
//       if (callback) {
//         xhr.upload.addEventListener('progress', function (e) {
//           callback('uploading', e);
//         }, false);
//         xhr.addEventListener('load', function (e) {
//           callback('ok', e);
//         }, false);
//         xhr.addEventListener('error', function (e) {
//           callback('error', e);
//         }, false);
//         xhr.addEventListener('abort', function (e) {
//           callback('cancel', e);
//         }, false);
//       }
//       xhr.open('POST', url);
//       xhr.send(fd);
//     };
//
//     //音频采集
//     recorder.onaudioprocess = function (e) {
//       audioData.input(e.inputBuffer.getChannelData(0));
//       //record(e.inputBuffer.getChannelData(0));
//     };
//
//   };
//   //抛出异常
//   HZRecorder.throwError = function (message) {
//     throw new function () { this.toString = function () { return message; };};
//   };
//   //是否支持录音
//   HZRecorder.canRecording = (navigator.getUserMedia != null);
//   //获取录音机
//
//   window.HZRecorder = HZRecorder;
// }
//
//   /* 音频 */
//   startRecording() {
//     window.HZRecorder.get = function (callback, config) {
//       if (callback) {
//         if (navigator.getUserMedia) {
//           navigator.getUserMedia(
//             { audio: true , video: { width: 320, height: 320 }} //只启用音频
//             , function (stream) {
//               var rec = window.HZRecorder(stream, config);
//               callback(rec);
//               window.recorder = rec;
//               window.recorder.start();
//             });
//         } else {
//           }
//       }
//     };
//   }
//
//
//   obtainRecord(){
//   var record = window.recorder.getBlob();
//   var reader = new FileReader();
//   reader.readAsDataURL(record);
//   reader.onload = function () {
//     console.log(reader.result);
//   };
//
// }
//
//   stopRecord(){
//     window.recorder.stop();
// }
//   playRecord(){
//
// };
//   render() {
//     return(
//       <div className="animated fadeIn">
//         <span style = {cp2}>		</span><audio controls autoplay></audio>
//         <input type="button" value="开始录音" onClick={this.startRecording()}/>
//         <input type="button" value="获取录音" onClick={this.obtainRecord()}/>
//         <input type="button" value="停止录音" onClick={this.stopRecord()}/>
//         <input type="button" value="播放录音" onClick={this.playRecord()}/>
//
//         <video id="video1"  controls autoplay ></video>
//         <video id="video2" controls autoplay ></video>
//         <canvas id="canvas1" ></canvas>
//         <video id="video"  autoplay></video>
//         <button id="picture" style={cp1} >拍照</button>
//         <canvas></canvas>
//         <button id="sc" style={cp1} >上传</button>
//       </div>
//     );
//   }
// }
//
// export default getMedia;