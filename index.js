var five = require("johnny-five");

var board = new five.Board();

board.on("ready", function() {
  let leds = [blue = new five.Led(3), yellow = new five.Led(5), red = new five.Led(6)]
  let buttons = [
    button1 = new five.Button({
      pin: 7, 
      invert: true
    }),
    button2 = new five.Button({
      pin: 4, 
      invert: true
    }),
    button3 = new five.Button({
      pin: 2, 
      invert: true
  })]; 

  let buttonsOrder = [];
  let order = [];
  let LIGHTS_LENGTH = 5

  buttons.forEach((button, index) => {
    button.on("press", function() {
      console.log( "Button pressed:" + index );
      buttonsOrder.push(index);
      if (buttonsOrder.length === order.length){
        setTimeout(() => {
          checkWin();
        }, 750);
        
        setTimeout(() => {
          playOrder();
        }, 4000);
      }
      
      leds[index].toggle();
      setTimeout(()=>{
        leds[index].toggle();
      },200)
    });
  })

  checkWin = () =>{
    let counter = 0;
    order.forEach((index) => {
      if (order[index] === buttonsOrder[index]) {
        counter +=1
      }
    })

    if (counter === LIGHTS_LENGTH){
      blue.blink();
    }else {
      red.blink();
    }
    setTimeout(() => {
      blue.stop().off();
      red.stop().off();
    },1000)
  }

  getRandomOrder = () => {
    let ret = [];
    for(let i=0; i < LIGHTS_LENGTH; i++) {
      ret.push(Math.floor(Math.random() * 3));
    } 

    return ret;
  }

  playOrder = () => {
    buttonsOrder = [];  
    order = getRandomOrder();
    order.forEach((ledOrder, index) => { 
      setTimeout(() => {
        leds[ledOrder].toggle();
        setTimeout(()=>{
          leds[ledOrder].toggle();
        },200)
      }, 
      500 * index) 
    })
  }

  playOrder();

  this.on("exit", function() {
    red.off();
    blue.off();  
    yellow.off();  
  });
});
