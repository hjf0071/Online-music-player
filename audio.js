// 音乐列表
var listButton = document.getElementsByClassName('list')[0];
var music_list = document.getElementsByClassName('music-list')[0];
var close_list = document.getElementsByClassName('close-list')[0];
var all_list = document.getElementsByClassName('all-list')[0];
var total_music = 4;

// 播放器相关元素
var audio = document.getElementById('audio');
var s_left = document.getElementsByClassName('s-left')[0];
var s_right = document.getElementsByClassName('s-right')[0];
var musicId = 0;
var music_play = document.getElementById('music-play');
var album_container = document.getElementsByClassName('album-container')[0];
var album_img = document.getElementsByClassName('album-img')[0];
// 播放时长
var played_time = document.getElementsByClassName('played-time')[0];
var audio_time = document.getElementsByClassName('audio-time')[0];

//音乐名，作者元素
introduction_title = document.getElementsByClassName('introduction-title')[0];
author_name = document.getElementById('author-name');
var muscics = [['1000x','BROODS & Jarryd James'],
        ['Payphone','Maroon 5 & Wiz Khalifa'],
        ['心做し','majiko'],
        ['I Do This For You','Group 1 Crew'],
      ]
// 修改播放模式元素
var play_mode = document.getElementsByClassName('mode')[0];
var index_mode = 1;

// mv播放相关元素
var mv = document.getElementsByClassName('MV')[0];
var video = document.getElementById('video');

// 点击修改播放模式
play_mode.addEventListener('click',changeMode);
function changeMode(){
    index_mode ++;
    if(index_mode > 3) index_mode = 1;
    play_mode.style.backgroundImage = "url('img/mode"+index_mode.toString()+".png')";
}

// 展开列表
listButton.addEventListener('click',function(){
    listButton.classList.add('music-list-show');
    music_list.classList.remove('music-list-hide');
    music_list.style.display = 'block';
    close_list.style.display = 'block';
})
close_list.addEventListener('click',function(){
    if(music_list.style.display == 'block'){
        listButton.classList.remove('music-list-show');
        music_list.classList.add('music-list-hide');
        close_list.style.display = 'none';
    }
})
// 点击列表内的元素，实现播放音乐
all_list.addEventListener('click',function(event){
    var target = event.target;
    // 获取 all_list 的所有子元素
    var children = all_list.children;
    
    // 将 children 转换为数组
    var childrenArray = Array.from(children);
    
    // 找到 target 在 childrenArray 中的索引
    var index = childrenArray.indexOf(target);

    musicId = index;
    // 切换歌曲时，直接播放和旋转
    console.log(''+index);
    musicId = index;
    changeBg(musicId);
    initAndPlay();
})

// 初始化音乐功能
function initMusic(){
    var currentPlaybackRate = audio.playbackRate;
    audio.src = './mp3/music'+musicId.toString()+'.mp3';
    audio.load(); // 加载音频文件
    
    // 当歌曲信息被加载完成时，更新时长
    audio.ondurationchange = function(){
        audio_time.innerText = transTime(audio.duration);
        // 恢复播放倍速
        audio.playbackRate = currentPlaybackRate;
        console.log('Playback rate restored to', currentPlaybackRate);
        //音乐名，作者
        introduction_title.innerText = muscics[musicId][0];
        author_name.innerText = muscics[musicId][1];
    };

    // audio.ondurationchange = function(){
    //     recordImg.style.backgroundImage = "url('img/record"+musicId.toString()+".jpg')";
    // }
}
// 播放音乐
function initAndPlay(){
    initMusic();
    audio.play();
}
initMusic();
// 点击播放音乐
music_play.addEventListener('click',function(){
    if(music_play.classList.contains('icon-play')){
        music_play.classList.remove('icon-play');
        music_play.classList.add('icon-pause');
        album_container.classList.add('rotate');
        audio.play();
        rotateRecord();
    }else{  
        music_play.classList.remove('icon-pause');
        music_play.classList.add('icon-play');
        album_container.classList.remove('rotate');
        audio.pause();
        stopRecord();
    }
})
//点击播放mv
mv.addEventListener('click',function(){
    if(video.style.display === 'none'){
        video.style.display = 'block';
        video.play();
    }
})


// 上一首
s_left.addEventListener('click',function(){
    changeModeByMusicId();
    initAndPlay();
    // 切换歌曲时，直接播放和旋转
    music_play.classList.add('icon-pause');
    music_play.classList.remove('icon-play');
    rotateRecord();
    changeBg(musicId);
})
// 下一首
s_right.addEventListener('click',function(){
    changeModeByMusicId();
    initAndPlay();
    // 切换歌曲时，直接播放和旋转
    music_play.classList.add('icon-pause');
    music_play.classList.remove('icon-play');
    rotateRecord();
    changeBg(musicId);
})
// 通过更改musicId来实现模式切换
function changeModeByMusicId(){
    var current_music = musicId;
    if(index_mode == 2){
        musicId  = (current_music + 1) % total_music;
    }else if(index_mode == 3){
        while(musicId == current_music){//为什么大于等于不行
            musicId = Math.floor(Math.random() * total_music);
            console.log('随机播放'+musicId);
        }
    }
}
//切换背景函数
function changeBg(index){
    album_img.style.backgroundImage = "url('img/record"+index.toString()+".jpg')";
    var bodyElement = document.getElementsByTagName('body')[0];
    bodyElement.style.backgroundImage = "url('img/bg"+index.toString()+".png')";
}
// 更改音乐后更改背景图标等总函数
function changeMusic(){    
    changeModeByMusicId();
    // 切换歌曲时，直接播放和旋转
    music_play.classList.add('icon-pause');
    music_play.classList.remove('icon-play');
    rotateRecord();
    changeBg(musicId);
    //音乐名，作者
    introduction_title.innerText = muscics[musicId][0];
    author_name.innerText = muscics[musicId][1];
    initAndPlay();
}
// 控制唱片旋转
function rotateRecord(){
    album_container.style.animationPlayState = 'running';
}
function stopRecord(){
    album_container.style.animationPlayState = 'paused';
}

// 进度条
var pgs_total = document.getElementsByClassName('pgs-total')[0];
var pgs_play = document.getElementsByClassName('pgs-play')[0];

// 倍速
var speed = document.getElementsByClassName('speed')[0];
speed.addEventListener('click',changeSpeed);
function changeSpeed(){
    var current_speed = speed.innerText;
    if(current_speed == '1.0X'){
        speed.innerText = '1.5X';
        audio.playbackRate = 1.5;
        console.log('Playback rate set to 1.5X');
    }else if(current_speed == '1.5X'){        
        speed.innerText = '2.0X';
        audio.playbackRate = 2.0;        
        console.log('Playback rate set to 2.0X');
    }else if(current_speed == '2.0X'){
        speed.innerText = '0.5X';
        audio.playbackRate = 0.5;
        console.log('Playback rate set to 0.5X');
    }else{
        speed.innerText = '1.0X';
        audio.playbackRate = 1.0;
        console.log('Playback rate set to 1.0X');
    }
}
// 更新播放时长
//更新进度条
// 为音频元素添加 'timeupdate' 事件监听器，当音频播放时间更新时调用 updateProgress 函数
audio.addEventListener('timeupdate', updateProgress);
function updateProgress(){
    // audio.currentTime播放时长，audio.duration总时长
    var value = audio.currentTime/audio.duration;
    pgs_play.style.width = value * 100 + '%';
    played_time.innerText = transTime(audio.currentTime);
    // 当播放完毕时根据播放模式继续播放
    if(audio.currentTime == audio.duration){
        audio.currentTime = 0;
        pgs_play.style.width = 0;
        changeMusic();
    }
}

// 点击进度条
pgs_total.addEventListener('mousedown',function(event){
    if(!audio.paused || audio.currentTime!=0){
        var pgs_total_width = pgs_total.getBoundingClientRect().width;
        var rate = event.offsetX/pgs_total_width;
        audio.currentTime = audio.duration * rate;
        updateProgress();
    }
})


//音频播放时间换算
function transTime(value) {
  var time = '';
  var h = parseInt(value / 3600);
  value %= 3600;
  var m = parseInt(value / 60);
  var s = parseInt(value % 60);
  if (h > 0) {
    time = formatTime(h + ':' + m + ':' + s);
  } else {
    time = formatTime(m + ':' + s);
  }

  return time;
}

// 格式化时间显示，补零对齐
function formatTime(value) {
  var time = '';
  var s = value.split(':');
  var i = 0;
  for (; i < s.length - 1; i++) {
    time += s[i].length == 1 ? '0' + s[i] : s[i];
    time += ':';
  }
  time += s[i].length == 1 ? '0' + s[i] : s[i];

  return time;
}

// 音量控制
var volumnButton = document.getElementsByClassName('volumn')[0];
var volumnTogger = document.getElementById('volumn-togger');

var lastVolumn = 70;
audio.volume = lastVolumn/100;

audio.addEventListener('timeupdate',updateVolumn);
function updateVolumn(){
    audio.volume = volumnTogger.value/100;
}

//点击静音
volumnButton.addEventListener('click',function(){
    audio.muted = !audio.muted;
    if(audio.muted){
        lastVolumn = volumnTogger.value;
        volumnTogger.value = 0;
        volumnButton.style.backgroundImage = "url('./img/静音.png')";
    }else{
        volumnTogger.value = lastVolumn;
        volumnButton.style.backgroundImage = "url('./img/音量.png')";
    }
})

