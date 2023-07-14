console.log('hello world')
// Intializing Variablr 
let songIndex=0
let audioElement = new Audio('resources/0.mp3')
let masterPlay=document.getElementById('masterPlay')
let myProgressBar=document.getElementById('myProgressBar')
let gif=document.getElementById('gif')
let songItems=Array.from(document.getElementsByClassName('songItem'))
let masterSongInfo=document.getElementById('masterSongInfo')
let songs =[
    {songName:"Vision", filePath:"resources/0.mp3", coverPath:"resources/Vision-bella.jpg"},
    {songName:"Sinner", filePath:"resources/1.mp3", coverPath:"resources/sinner.jpg"},
    {songName:"Everbody Hurt's", filePath:"resources/2.mp3", coverPath:"resources/Everybody.jpg"},
    {songName:"52 Bars", filePath:"resources/3.mp3", coverPath:"resources/52.jpg"},
    {songName:"Your Eye", filePath:"resources/4.mp3", coverPath:"resources/Talwiinder.mp3"}
]

// audioElement.play()



//  Handle Play/Pause Click

masterPlay.addEventListener('click',()=>{
    if (audioElement.paused || audioElement.currentTime<=0) {
        audioElement.play()
        masterPlay.classList.remove('bi-play-circle')
        masterPlay.classList.add('bi-pause-circle')
        gif.style.opacity=1
    }
    else{
        audioElement.pause()
        masterPlay.classList.remove('bi-pause-circle')
        masterPlay.classList.add('bi-play-circle')
        gif.style.opacity=0
    }
})

// Listen To Events
audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate')
    // Update SeekBar 
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    myProgressBar.value=progress
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100
})

const makeAllplays=()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove("bi-pause-circle")
        element.classList.add('bi-play-circle')
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener('click',(e)=>{
        makeAllplays()
        songIndex=parseInt(e.target.id)
        e.target.classList.remove("bi-play-circle")
        e.target.classList.add('bi-pause-circle')
        audioElement.src=`resources/${songIndex}.mp3`
        masterSongInfo.innerText = songs[songIndex].songName;
        audioElement.currentTime=0
        audioElement.play()
        gif.style.opacity=1
        masterPlay.classList.remove('bi-play-circle')
        masterPlay.classList.add('bi-pause-circle')
    })
});

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=4){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `resources/${songIndex}.mp3`;
    masterSongInfo.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity=1
    masterPlay.classList.remove('bi-play-circle')
    masterPlay.classList.add('bi-pause-circle')

})
document.getElementById('prev').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `resources/${songIndex}.mp3`;
    masterSongInfo.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity=1
    masterPlay.classList.remove('bi-play-circle')
    masterPlay.classList.add('bi-pause-circle')
})