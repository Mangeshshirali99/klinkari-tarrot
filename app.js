const cards=[
  {name:"FREE.",image:"0 free.png",meaning:"Mourn the losses. Celebrate what has been retained."},
  {name:"KLINKARI",image:"1 klinkari.png",meaning:"Give form to what is waiting to be expressed."},
  {name:"DEAR TOMORROW",image:"2 fearoftomorrow.png",meaning:"Trust the possibility of a future you cannot yet see."},
  {name:"बरतन",image:"3 बरतन.png",meaning:"Become the vessel that can hold, receive, and transform."},
  {name:"मन-मुकुंद",image:"4 मन-मुकुंद.png",meaning:"Stop the chase. Welcome transformation."},
  {name:"संतृप्ति",image:"5 santrupti.png",meaning:"Know when enough has become fullness."},
  {name:"POWER OF PERMISSION",image:"6 POWEROFPERMISSION.png",meaning:"What you permit yourself to become can change everything."},
  {name:"MONSTROSITY",image:"7 MONSTROSITY.png",meaning:"Good days end. And so do the bad days. Beware."},
  {name:"A LOSS",image:"8 a loss.png",meaning:"The season of mourning is over. Let presence reveal what was once concealed."},
  {name:"SUNFLOWER",image:"9 sunflower.png",meaning:"Turn toward what gives you light, even under the darkness."}
];
const welcomes=[
 {name:"Ganesha",mantra:"|| ॐ गं गणपतये नमः ||",icon:"ganapati.png"},
 {name:"Shanta Durga",mantra:"|| ॐ ऐं ह्रीं श्रीं ||",icon:"durga.png"},
 {name:"Hanuman",mantra:"|| ॐ हं हनुमते नमः ||",icon:"hanuman.png"}
];
const intro=document.querySelector("#intro"),reading=document.querySelector("#reading"),experience=document.querySelector(".experience"),card=document.querySelector("#card"),image=document.querySelector("#cardImage"),cardName=document.querySelector("#cardName"),button=document.querySelector("#drawButton"),buttonLabel=document.querySelector("#buttonLabel"),cardCaption=document.querySelector("#cardCaption"),deckNote=document.querySelector("#deckNote");
let bag=[],lastIndex=-1,busy=false,started=false;
function refill(){bag=cards.map((_,i)=>i);for(let i=bag.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[bag[i],bag[j]]=[bag[j],bag[i]]}if(bag.length>1&&bag[bag.length-1]===lastIndex)[bag[0],bag[bag.length-1]]=[bag[bag.length-1],bag[0]]}
function draw(){if(busy)return;busy=true;button.disabled=true;if(!bag.length)refill();const index=bag.pop();lastIndex=index;started=true;experience.classList.add("has-reading");intro.hidden=true;reading.hidden=false;const item=cards[index];cardName.textContent=item.name;image.src=item.image;image.alt=item.name;const meaning=item.meaning;cardCaption.innerHTML=`<span class="eyebrow">YOUR CARD</span><h2 id="cardName">${item.name}</h2><p>${meaning}</p>`;card.classList.add("flipping");setTimeout(()=>{card.classList.remove("flipping");button.disabled=false;busy=false;button.focus()},600)}
button.addEventListener("click",draw);
const welcome=document.querySelector("#welcome"),welcomeStep=document.querySelector("#welcomeStep"),welcomeIcon=document.querySelector("#welcomeIcon"),welcomeMantra=document.querySelector("#welcomeMantra"),welcomeNext=document.querySelector("#welcomeNext"),welcomeBack=document.querySelector("#welcomeBack");
let welcomeIndex=0;
function renderWelcome(){const item=welcomes[welcomeIndex];welcomeStep.textContent="WELCOME · "+(welcomeIndex+1)+" OF "+welcomes.length;const icon=document.createElement("img");icon.src=item.icon;icon.alt=item.name;welcomeIcon.innerHTML="";welcomeIcon.appendChild(icon);welcomeMantra.textContent=item.mantra;welcomeBack.hidden=welcomeIndex===0}
function finishWelcome(){try{localStorage.setItem("klinkari-welcome-v2","seen")}catch{}welcome.hidden=true;experience.hidden=false;button.focus()}
welcomeNext.addEventListener("click",()=>{if(welcomeIndex<welcomes.length-1){welcomeIndex++;renderWelcome()}else finishWelcome()});
welcomeBack.addEventListener("click",()=>{if(welcomeIndex>0){welcomeIndex--;renderWelcome()}});
try{if(localStorage.getItem("klinkari-welcome-v2")!=="seen"){welcome.hidden=false;experience.hidden=true;renderWelcome()}}catch{welcome.hidden=false;experience.hidden=true;renderWelcome()}
