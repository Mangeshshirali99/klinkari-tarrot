const cards=[
  {name:"FREE.",image:"cards/0 free.png"},
  {name:"KLINKARI",image:"cards/1 klinkari.png"},
  {name:"DEAR TOMORROW",image:"cards/2 fearoftomorrow.png"},
  {name:"बरतन",image:"cards/3 बरतन.png"},
  {name:"मन-मुकुंद",image:"cards/4 मन-मुकुंद.png"},
  {name:"संतृप्ति",image:"cards/5 santrupti.png"},
  {name:"POWER OF PERMISSION",image:"cards/6 POWEROFPERMISSION.png"},
  {name:"MONSTROSITY",image:"cards/7 MONSTROSITY.png"},
  {name:"A LOSS",image:"cards/8 a loss.png"},
  {name:"SUNFLOWER",image:"cards/9 sunflower.png"}
];
const intro=document.querySelector("#intro"),reading=document.querySelector("#reading"),experience=document.querySelector(".experience"),card=document.querySelector("#card"),image=document.querySelector("#cardImage"),name=document.querySelector("#cardName"),button=document.querySelector("#drawButton"),label=document.querySelector("#buttonLabel");
let bag=[],lastIndex=-1,busy=false,started=false;
function refill(){bag=cards.map((_,i)=>i);for(let i=bag.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[bag[i],bag[j]]=[bag[j],bag[i]]}if(bag.length>1&&bag[bag.length-1]===lastIndex)[bag[0],bag[bag.length-1]]=[bag[bag.length-1],bag[0]]}
function draw(){if(busy)return;busy=true;button.disabled=true;if(!bag.length)refill();const index=bag.pop();lastIndex=index;started=true;experience.classList.add("has-reading");intro.hidden=true;reading.hidden=false;card.classList.remove("is-revealed");image.alt="";name.textContent="";label.textContent="DRAWING";window.setTimeout(()=>{image.src=encodeURI(cards[index].image);image.alt=cards[index].name;name.textContent=cards[index].name;requestAnimationFrame(()=>requestAnimationFrame(()=>card.classList.add("is-revealed")));label.textContent="DRAW AGAIN";button.disabled=false;busy=false;},380)}
button.addEventListener("click",draw);
