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
     cardsContainer.innerHTML="";
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
         <li style="font-size:15px">${singleData.features[2]?singleData.features[2]:'No data'}</li>
         </ol>
     </div>
     <div class="card-footer ">
       <h6 class="width-bold">${singleData.name}</h6>
        <div class="d-flex justify-content-between align-items-center justify-content-center ">
          <div class="d-flex gap-2">
          <i class="fa-solid fa-calendar-days"></i>
            <p style="font-size:12px">${singleData.published_in}</p>
          </div>
          
          <div>
          <i  class="fa-solid fa-arrow-right" onclick="openModal('${singleData.id}')" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
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

// see more cards
const allCardButton= document.getElementById('see-more').addEventListener('click',function(){
    fetchItems();
    document.getElementById('see-more').classList.add("d-none");
 })

//  more info in modal
 
const openModal=(id)=>{
     url=`https://openapi.programming-hero.com/api/ai/tool/${id}`
     fetch(url)
     .then(res=> res.json())
     .then(data=>ShowModalInfo(data.data))
     
const ShowModalInfo=(data)=>{
         
    }}


