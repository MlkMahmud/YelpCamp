'use strict'

let images = ['/images/camp2.jpg', '/images/camp3.jpg', '/images/camp4.jpg', '/images/camp1.jpg'];
let display = document.querySelector('.img');

let num = 0;

function change(){
    if(num === images.length){
        num = 0
    }
    display.style.backgroundImage = `url(${images[num]})`
    num++;
};

setInterval(change, 7000);