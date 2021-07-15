// ==UserScript==
// @name         YandexBot
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @match        https://crushdrummers.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let yandexInput = document.getElementById("text");
let btnK = document.getElementsByClassName("button mini-suggest__button")[0];
let sites = {
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai": ["Как звучит гобой","Флейта","Кларнет","Фагот","Валторна","Саксофон"],
    "crushdrummers.ru": ["Барабанное шоу", "Шоу барабанщиков Crush", "Заказать барабанное шоу"]
}
let site = Object.keys(sites)[getIntRandom(0, Object.keys(sites).length)]; 
let words = sites[site]; 
let word = words[getIntRandom(0, words.length)]; 

if(btnK != undefined){ 
    let i=0;
    let timerId = setInterval(function(){
        yandexInput.value = yandexInput.value + word[i++];
        document.cookie = "site="+site; 
        if(i==word.length){
            clearInterval(timerId);
            btnK.click();
        }
    }, 500);
}else if(location.hostname === "https://yandex.ru/"){ 
    let links = document.links; 
    let goNext = true;
    let site = getCookie("site"); 
    for(let i=0; i<links.length; i++){ 
        let link = links[i];
        if(link.href.indexOf(site) != -1){ 
            setTimeout(function(){
                link.click(); 
            }, 3000);
            goNext = false; 
            break;
        }
    }
    if(goNext){ 
        let currentPage = document.getElementsByClassName("pager__item")[0].innerText;
        if(currentPage<10){
            let btnext = document.getElementsByClassName("link link_theme_none link_target_serp pager__item pager__item_kind_next i-bem")[0];
            setTimeout(function(){
                btnext.click();
            }, 3000);
        }else{
            location.href = "https://yandex.ru/";
        }
    }
}else{ 
    setInterval(function(){
        if(getIntRandom(0,100)<30) location.href = "https://yandex.ru/"; 
        let links = document.links; 
        let randomIndex = getIntRandom(0, links.length);
        let link = links[randomIndex];
        if(link.href.indexOf(location.hostname) != -1){ 
            links[randomIndex].click();
        }else{ 
            location.href = location.origin;
        }
    },2000);
}

function getIntRandom(min, max){
    return Math.floor(Math.random()*(max-min)+min);
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
