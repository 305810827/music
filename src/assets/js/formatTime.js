
const formatTime = function(time) {
      let formatTime = null,
          secs = 0,
          mins = 0,
          hours = 0,
          displayHours,
          seperator = ':';
      secs = parseInt(time % 60);
      mins = parseInt((time / 60) % 60);
      hours = parseInt(((time / 60) / 60) % 60);
      displayHours = (parseInt(((time / 60) / 60) % 60) > 0) 
      secs = ("0" + secs).slice(-2);
      mins = ("0" + mins).slice(-2);
      return (displayHours ? hours + ':' : '') + mins + seperator + secs;
}

export default formatTime