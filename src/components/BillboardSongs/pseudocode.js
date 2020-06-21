function audioControl(audioLink, songName) {
  /*condition 1: currAudio = null, isPlaying = false
    setState(currAudio = audioLink and isPlaying = true), then
    currAudio.play()
  */

  /*condition 2 press same song: currAudio.src === audioLink, isPlaying = true
    currAudio.pause()
    setState(isPlaying = false)
  */

  /*condition 3 press different song: currAudio.src != audioLink, isPlaying = true 
    currAudio.pause()
    setState(currAudio: songAudio2), then play audio
  */
}