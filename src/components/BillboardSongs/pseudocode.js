function audioControl(audioLink, songName) {
  /*condition 1: currAudio = null, isPlaying = false
    setState(currAudio = audioLink and isPlaying = true), then
    currAudio.play()
  */

  /*condition 2 press again: currAudio = songAudio1, but audioLink===songAudio1.currentSrc ,isPlaying = true
    currAudio.pause()
    setState(isPlaying = false)
  */

  /*condition 3 press different song: currAudio = songAudio1, but audioLink===songAudio2.currentSrc, isPlaying = true 
    currAudio.pause()
    setState(currAudio: songAudio2)
  */

  if(!this.state.isPlaying && this.state.currAudio) { // if song is not playing and audioLink is not falsy
    this.setState({currAudio: new Audio(audioLink)}, () =>{
      console.log(songName + ': ' + this.state.currAudio);
      console.log(songName + ': ' + this.state.isPlaying);
      console.log('playing');
      
      this.state.currAudio.play(); // play song
      this.setState({isPlaying: true});
    });
  } else {
    console.log(songName + ': ' + this.state.currAudio);
    console.log(songName + ': ' + this.state.isPlaying);
    console.log('pause');

    this.state.currAudio.pause(); // pause song
    this.setState({isPlaying: false});
  }
}