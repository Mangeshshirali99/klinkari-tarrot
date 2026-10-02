const cards=[
  {name:"FREE.",image:"0 free.png"},
  {name:"KLINKARI",image:"1 klinkari.png"},
  {name:"DEAR TOMORROW",image:"2 fearoftomorrow.png"},
  {name:"बरतन",image:"3 बरतन.png"},
  {name:"मन-मुकुंद",image:"4 मन-मुकुंद.png"},
  {name:"संतृप्ति",image:"5 santrupti.png"},
  {name:"POWER OF PERMISSION",image:"6 POWEROFPERMISSION.png"},
  {name:"MONSTROSITY",image:"7 MONSTROSITY.png"},
  {name:"A LOSS",image:"8 a loss.png"},
  {name:"SUNFLOWER",image:"9 sunflower.png"}
];
const welcomes=[
 {name:"Ganesha",mantra:"|| ॐ गं गणपतये नमः ||",icon:'<svg viewBox="0 0 120 120"><path d="M36 38 22 28Q15 26 16 36l8 25q5 9 15 7m30-30 14-10q7-2 6 8l-8 25q-5 9-15 7M42 37q0-15 18-15t18 15v22q0 11-13 14v15q0 12 13 9 7-2 5-8m-23-30q-8 0-8 8t9 7m-3-43 7-12 7 12m-23 35-9 8m42-8 9 8"/><circle cx="51" cy="47" r="2"/><circle cx="69" cy="47" r="2"/></svg>'},
 {name:"Shanta Durga",mantra:"|| ॐ ऐं ह्रीं श्रीं ||",icon:'<svg viewBox="0 0 120 120"><circle cx="60" cy="54" r="36"/><path d="M60 18 53 7l7-5 7 5zm0 8v9m-8 6q8-7 16 0v18q-8 8-16 0zm-8 3-15-9m47 9 15-9M44 55 27 52m49 3 17-3M47 66 33 78m40-12 14 12M50 69q10 6 20 0m-18 8-9 12m33-12 9 12m-25 3v14m-19 0 19-14 19 14m-45-7q-9 4-13 13m13-13q-1 9 4 15m46-15q9 4 13 13m-13-13q1 9-4 15"/><path d="M60 82q-15 7-12 19 12-1 12-19zm0 0q15 7 12 19-12-1-12-19z"/></svg>'},
 {name:"Hanuman",mantra:"|| ॐ हं हनुमते नमः ||",icon:'<svg viewBox="0 0 120 120"><path d="M40 42q0-23 20-23t20 23v20q0 12-10 18l4 13q4 11 16 3 7-5 2-11m-52-43q-9-8-17-1l6 17q4 7 13 6m38-22q9-8 17-1l-6 17q-4 7-13 6M47 47h1m24 0h1m-24 12q11 10 22 0m-11 20q-3 10-13 15m24-15q3 10 13 15M58 13V6m-9 3 9-4 9 4m-4 12h8m-10 8h10"/><path d="M91 28v60m-9-47q9-14 18 0v8H82zm0 42h18l-9 15z"/></svg>'}
];
const intro=document.querySelector("#intro"),reading=document.querySelector("#reading"),experience=document.querySelector(".experience"),card=document.querySelector("#card"),image=document.querySelector("#cardImage"),name=document.querySelector("#cardName"),button=document.querySelector("#drawButton"),label=document.querySelector("#buttonLabel");
let bag=[],lastIndex=-1,busy=false,started=false;
function refill(){bag=cards.map((_,i)=>i);for(let i=bag.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[bag[i],bag[j]]=[bag[j],bag[i]]}if(bag.length>1&&bag[bag.length-1]===lastIndex)[bag[0],bag[bag.length-1]]=[bag[bag.length-1],bag[0]]}
function draw(){if(busy)return;busy=true;button.disabled=true;if(!bag.length)refill();const index=bag.pop();lastIndex=index;started=true;experience.classList.add("has-reading");intro.hidden=true;reading.hidden=false;card.classList.remove("is-revealed");image.alt="";name.textContent="";label.textContent="DRAWING";window.setTimeout(()=>{image.src=encodeURI(cards[index].image);image.alt=cards[index].name;name.textContent=cards[index].name;requestAnimationFrame(()=>requestAnimationFrame(()=>card.classList.add("is-revealed")));label.textContent="DRAW AGAIN";button.disabled=false;busy=false;},380)}
button.addEventListener("click",draw);
const welcome=document.querySelector("#welcome"),welcomeStep=document.querySelector("#welcomeStep"),welcomeIcon=document.querySelector("#welcomeIcon"),welcomeMantra=document.querySelector("#welcomeMantra"),welcomeBack=document.querySelector("#welcomeBack"),welcomeNext=document.querySelector("#welcomeNext"),welcomeDots=document.querySelector("#welcomeDots");
let welcomeIndex=0;
function renderWelcome(){const item=welcomes[welcomeIndex];welcomeStep.textContent="WELCOME · "+(welcomeIndex+1)+" OF "+welcomes.length;welcomeIcon.innerHTML=item.icon;welcomeIcon.removeAttribute("aria-hidden");welcomeIcon.setAttribute("role","img");welcomeIcon.setAttribute("aria-label",item.name+" icon");welcomeMantra.textContent=item.mantra;welcomeBack.hidden=welcomeIndex===0;welcomeNext.innerHTML=welcomeIndex===welcomes.length-1?'BEGIN READING <span aria-hidden="true">↗</span>':'CONTINUE <span aria-hidden="true">↗</span>';welcomeDots.replaceChildren(...welcomes.map((_,i)=>{const dot=document.createElement("span");dot.className="welcome-dot"+(i===welcomeIndex?" is-current":"");dot.setAttribute("aria-label","Screen "+(i+1));return dot}))}
function finishWelcome(){try{localStorage.setItem("klinkari-welcome-v1","seen")}catch{}welcome.hidden=true;experience.hidden=false;button.focus()}
welcomeNext.addEventListener("click",()=>{if(welcomeIndex<welcomes.length-1){welcomeIndex++;renderWelcome()}else finishWelcome()});
welcomeBack.addEventListener("click",()=>{if(welcomeIndex>0){welcomeIndex--;renderWelcome()}});
try{if(localStorage.getItem("klinkari-welcome-v1")!=="seen"){welcome.hidden=false;experience.hidden=true;renderWelcome()}}catch{welcome.hidden=false;experience.hidden=true;renderWelcome()}
