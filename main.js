(function(){
'use strict'

  var timer = document.getElementById('timer');
  var min = document.getElementById('min');
  var sec = document.getElementById('sec');
  var reset = document.getElementById('reset');
  var start = document.getElementById('start');

  var startTime;
  var timeLeft;
  // var timeToCountDown = 4 * 1000;
  var timeToCountDown = 0;
  var timerId;
  var isRunning = false;

  function updateTimer(t){
    var d = new Date(t);
    var m = d.getMinutes();
    var s = d.getSeconds();
    var ms = d.getMilliseconds();
    m = ('0' + m).slice(-2);
    s = ('0' + s).slice(-2);
    ms = ('00' + ms).slice(-3);
    timer.textContent = m + ':' + s + '.' + ms;
    timeLeft = timeToCountDown - (Date.now() - startTime);
    if( timeLeft < 5000 && timeLeft > 4001){
      timer.className = 'green';
    } else if ( timeLeft < 4000 && timeLeft > 3001){
      timer.className = 'yellowgreen';
    } else if ( timeLeft < 3000 && timeLeft > 2001){
      timer.className = 'yellow';
    } else if ( timeLeft < 2000 && timeLeft > 1001){
      timer.className = 'orange';
    } else if ( timeLeft < 1000 && timeLeft > 0){
      timer.className = 'red';
    } else {
      timer.className = 'black';
    }
  }


  function countDown() {
    timerId = setTimeout(function(){
      timeLeft = timeToCountDown - (Date.now() - startTime);
      if (timeLeft < 0){
        isRunning = false;
        start.textContent = 'Start';
        clearTimeout(timerId);
        timeLeft = 0;
        timeToCountDown = 0;
        updateTimer(timeLeft);
        return;
      }
      updateTimer(timeLeft);
      countDown();
    }, 10);
  }

  // function changeColor() {
  //   timeLeft = timeToCountDown - (Date.now() - startTime);
  //   if( timeLeft < 5000)
  //     this.className = 'caution';
  // }


  start.addEventListener('mousedown', function(){
    if (isRunning === false){
      isRunning = true;
      start.textContent = 'Stop'
      startTime = Date.now();
      this.className = 'pushed';
      countDown();
      // changeColor();
    } else {
      isRunning = false;
      start.textContent = 'Start';
      timeToCountDown = timeLeft;
      clearTimeout(timerId);
    }
  });

  start.addEventListener('mousedown', function(){
    this.className = '';
  });

  min.addEventListener('mousedown', function(){
    if (isRunning === true){
      return;
    }
    timeToCountDown += 60 * 1000;
    this.className = 'pushed';
    if (timeToCountDown >= 60 * 60 * 1000){
      timeToCountDown = 0;
    }
    updateTimer(timeToCountDown);
  });

  min.addEventListener('mouseup', function(){
    this.className = '';
  });

  sec.addEventListener('mousedown', function(){
    if (isRunning === true){
      return;
    }
    this.className = 'pushed';
    timeToCountDown += 1000;
    if (timeToCountDown >= 60 * 60 * 1000){
      timeToCountDown = 0;
    }
    updateTimer(timeToCountDown);
  });

  sec.addEventListener('mouseup', function(){
    this.className = '';
  });

  reset.addEventListener('mousedown', function(){
    this.className = 'pushed';
    timeToCountDown = 0;
    updateTimer(timeToCountDown);
  });

  reset.addEventListener('mouseup', function(){
    this.className = '';
  });

})();
