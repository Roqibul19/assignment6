// fetch to load all card
const fetchItems= (limit)=>{
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res=> res.json())
    .then(data=>seeMore(limit,data.data.tools));
}

// for see more cards
const seeMore=(limit,data)=>{
    if(limit===6){
        data=data.slice(0,6);
        displayFetchData(data);
    }
    else{
        displayFetchData(data);
    }
}

// fetch data Display 12 cards

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
      document.getElementById('loader').classList.add("d-none");
     }
 
     
}
// calling first for 6 cards only
fetchItems(6);

// show more cards button
const allCardButton= document.getElementById('see-more').addEventListener('click',function(){
    fetchItems();
    document.getElementById('see-more').classList.add("d-none");
 })

  // for more information opening modal by each unique id
 
 const openModal=(id)=>{
    const url=`https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(url)
     .then(res=>res.json())
     .then(data=>ShowModalInfo(data.data,id));
  }
     
const ShowModalInfo=(data,id)=>{
   if(id==='12'){
    lastCardModalShow(data);
   }
   else{
    allcardModalShow(data);
   }

}
// for last card's modal show

const lastCardModalShow=(data)=>{
  const modalContainer= document.getElementById('modal-container');
  modalContainer.innerHTML='';
  const modalDiv= document.createElement('div');
  modalDiv.classList.add('modal-content');
  modalDiv.innerHTML=`
   <div class="modal-header">
  <div class="d-sm-flex">
      <div class="border border-danger bg-warning-subtle w-50 p-3">
        <h5>${data.description? data.description:"No"}</h5>
        <div class="d-sm-flex justify-content-evenly m-2">
          <p class="p-2 fw-bold text-danger">Free of<br>cost/<br>Basic</p>
          <p class="p-2 fw-bold text-success">Free of<br>cost/<br>Pro</p>
          <p class="p-2 fw-bold text-primary">Free of<br>cost/<br>Enterprise</p>
          
        </div>
        <div class="d-sm-flex justify-content-between">
           <div>
             <h6 class="m-2">Features</h6>
           <ol>
             <li>${data.features['1'].feature_name?data.features['1'].feature_name:"No data found"}</li>
             <li>${data.features['2'].feature_name?data.features['2'].feature_name:"No data found"}</li>
             <li>${data.features['3'].feature_name?data.features['3'].feature_name:"No data found"}</li>
             <li>${data.features['4'].feature_name?data.features['4'].feature_name:"No data found"}</li>
           </ol>
           </div>
           <div>
             <h6 class="m-2">Integrations</h6>
           <p>No Data Found!</p>
           </div>
        </div>
      </div>
      <div class="w-50 p-2">
        <img class="img-fluid m-2" src="${data.image_link[0]}" alt="">
        <h6>Can you give any Example?</h6>
        <p>No Not yet! Take a break</p>
      </div>
  </div>
  <div>
 <button type="button" class="btn-close bg-danger" data-bs-dismiss="modal" aria-label="Close"></button>
 </div>
</div>
</div>
</div>

  
  `
  modalContainer.appendChild(modalDiv);
}
const allcardModalShow=(data)=>{
  if(data.accuracy.score===null){
    const modalContainer= document.getElementById('modal-container');
    modalContainer.innerHTML='';
    const modalDiv= document.createElement('div');
    modalDiv.classList.add('modal-content');
    modalDiv.innerHTML=`
     <div class="modal-header">
    <div class="d-sm-flex">
        <div class="p-2 border border-danger bg-warning-subtle w-50">
          <h5>${data.description? data.description:"No"}</h5>
          <div class="d-sm-flex justify-content-evenly m-2">
            <p>Free of cost</p>
            <p class="p-2">${data.pricing[1].price?data.pricing[1].price:"Free of Cost"}
             ${data.pricing[1].plan}</p>
            <p class="p-2">${data.pricing[2].price?data.pricing[2].price:"Free of Cost"}
             ${data.pricing[2].plan}</p>
            
          </div>
          <div class="d-sm-flex justify-content-between">
             <div>
               <h6 class="m-2">Features</h6>
             <ol>
               <li>${data.features['1'].feature_name?data.features['1'].feature_name:"No data found"}</li>
               <li>${data.features['2'].feature_name?data.features['2'].feature_name:"No data found"}</li>
               <li>${data.features['3'].feature_name?data.features['3'].feature_name:"No data found"}</li>
             </ol>
             </div>
             <div>
               <h6 class="m-2">Integrations</h6>
             <ol>
               <li>${data.integrations[0]?data.integrations[0]:"No data found"}</li>
             </ol>
             </div>
          </div>
        </div>
        <div class="w-50 p-2">
          <img class="img-fluid m-2" src="${data.image_link[0]}" alt="">
          <h6>${data.input_output_examples[0].input?data.input_output_examples[0].input:"No Not yet! Take a break!"}</h6>
          <p>${data.input_output_examples[0].output?data.input_output_examples[0].output:"No Not yet! Take a break!"}</p>
        </div>
    </div>
   <button type="button" class="btn-close bg-danger" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  </div>
  </div>
  
    
    `
    modalContainer.appendChild(modalDiv);
  }
  else{
    const modalContainer= document.getElementById('modal-container');
    modalContainer.innerHTML='';
    const modalDiv= document.createElement('div');
    modalDiv.classList.add('modal-content');
    modalDiv.innerHTML=`
     <div class="modal-header">
    <div class="d-sm-flex">
        <div class="p-2 border border-danger bg-warning-subtle w-50">
          <h5>${data.description? data.description:"No"}</h5>
          <div class="d-sm-flex justify-content-evenly m-2">
            <p class="p-2">${data.pricing[0].price?data.pricing[0].price:"Free of Cost"}
             ${data.pricing[0].plan}</p>
            <p class="p-2">${data.pricing[1].price?data.pricing[1].price:"Free of Cost"}
             ${data.pricing[1].plan}</p>
            <p class="p-2">${data.pricing[2].price?data.pricing[2].price:"Free of Cost"}
             ${data.pricing[2].plan}</p>
            
          </div>
          <div class="d-sm-flex justify-content-between">
             <div>
               <h6 class="m-2">Features</h6>
             <ol>
               <li>${data.features['1'].feature_name?data.features['1'].feature_name:"No data found"}</li>
               <li>${data.features['2'].feature_name?data.features['2'].feature_name:"No data found"}</li>
               <li>${data.features['3'].feature_name?data.features['3'].feature_name:"No data found"}</li>
             </ol>
             </div>
             <div>
               <h6 class="m-2">Integrations</h6>
             <ol>
               <li>${data.integrations[0]?data.integrations[0]:"No data found"}</li>
               <li>${data.integrations[1]?data.integrations[1]:"No data found"}</li>
               <li>${data.integrations[2]?data.integrations[2]:"No data found"}</li>
             </ol>
             </div>
          </div>
        </div>
        <div class="w-50 p-2">
            <div>
            <img class="img-fluid m-2 " src="${data.image_link[0]}" alt=" ">
            <span class="badge text-bg-warning accuracy">${data.accuracy.score}%Accuracy</span>
            </div>

          <h6>${data.input_output_examples[0].input?data.input_output_examples[0].input:"No Not yet! Take a break!"}</h6>
          <p>${data.input_output_examples[0].output?data.input_output_examples[0].output:"No Not yet! Take a break!"}</p>
        </div>
    </div>
    <div>
   <button type="button" class="btn-close bg-danger" data-bs-dismiss="modal" aria-label="Close"></button>
   </div>
  </div>
  </div>
  </div>
    
  
    `
    modalContainer.appendChild(modalDiv);
  }

  }

  // loader part
const loadSpiner=document.getElementById('see-more').addEventListener('click',function(){
  document.getElementById('loader').classList.remove("d-none");
})