// fetch loads
const fetchItems= (limit)=>{
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res=> res.json())
    .then(data=>seeMore(limit,data.data.tools));
}

// for see more
const seeMore=(limit,data)=>{
    if(limit===6){
        data=data.slice(0,6);
        displayFetchData(data);
    }
    else{
        displayFetchData(data);
    }
}

// fetch data Display

const displayFetchData=(data)=>{
     const cardsContainer= document.getElementById('cards-container');
     
     for(singleData of data){
     const cardDiv= document.createElement('div');
     cardDiv.classList.add('col');
     cardDiv.innerHTML= `
     <div class="card h-100">
     <img src="${singleData.image}" class="card-img-top img-fluid" alt="...">
     <div class="card-body">
       <h5 class="Features">Features</h5>
         <ol>
         <li style="font-size:15px">${singleData.features[0]}</li>
         <li style="font-size:15px">${singleData.features[1]}</li>
         <li style="font-size:15px">${singleData.features[2]}</li>
         
     </div>
     <div class="card-footer ">
       <h6 class="width-bold">${singleData.name}</h6>
        <div class="d-flex justify-content-between align-items-center justify-content-center ">
          <div class="d-flex gap-2">
          <i class="fa-solid fa-calendar-days"></i>
            <p style="font-size:12px">${singleData.published_in}</p>
          </div>
          <div>
          <i onclick="cardMoreInfo()" class="fa-solid fa-arrow-right"></i>
          </div>
        </div>
     </div>
     </div>
     `
      cardsContainer.appendChild(cardDiv);
     }
 
     
}
// calling for 6 cards only
fetchItems(6);

// for all cards
const allCardButton= document.getElementById('see-more').addEventListener('click',function(){
    fetchItems();
    allCardButton.classList.add('d-none');
 })

//  more info of card
 
const cardMoreInfo=()=>{
    fetch('https://openapi.programming-hero.com/api/ai/tool/01')
    .then(res=> res.json())
    .then(data=>console.log(data));

}