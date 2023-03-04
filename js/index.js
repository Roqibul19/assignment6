// fetch loads
const fetchItems= ()=>{
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res=> res.json())
    .then(data=>displayFetchData(data.data.tools));
}
// fetch data Display

const displayFetchData=(data)=>{
     const cardsContainer= document.getElementById('cards-container');
     data=data.slice(0,6);
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
          <i class="fa-solid fa-arrow-right"></i>
          </div>
        </div>
     </div>
     </div>
     `
      cardsContainer.appendChild(cardDiv);
     }


}


fetchItems()