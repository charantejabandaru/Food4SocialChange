/*const taskContainer = document.querySelector(".task__container");
console.log(taskContainer);*/
const globalStorage = [];
const donate = () => {
    const taskData = {
        id : `${Date.now()}`,
        fullName: document.getElementById("fullname1").value,
        mobileNumber: document.getElementById("mobilenumber1").value,
        pickUp: document.getElementById("pickupaddress").value,
        foodQuantity: document.getElementById("foodquantity").value
    };

    let getData=localStorage.getItem("taskyy");
    let globalstorage=JSON.parse(getData);
    //console.log(globalstorage);
    //if(globalstorage.length===0){
    //  globalStorage.push(taskData);
    //  localStorage.setItem("taskyy",JSON.stringify({cards : globalStorage}));
    //}
    //else{
      Object.values(globalstorage).push(taskData);
      localStorage.setItem("taskyy",JSON.stringify({cards : Object.values(globalstorage)}));
    //}
  /*  const newcard = `
    <div class="row task__container">
        <div class="col-sm-12 col-md-6 col-lg-4" id="${taskData.id}">
      <div class="card">
        <div class="card-header ">
        Food4SocialChange
        </div>
        <div class="card-body">
        <div>
        <label for="fullname1" class="form-label">Donar Name: ${taskData.fullName}</label>
        </div>
        <div>
        <label for="mobilenumber1" class="form-label">Donar Mobile Number: ${taskData.mobileNumber}</label>
        </div>
        <div>
        <label for="pickupaddress" class="form-label">Pick Up address: ${taskData.pickUp}</label>
        </div>
        <div>
        <label for="foodquantity" class="form-label">Food Quantity: ${taskData.foodQuantity}</label>
        </div>
        </div>
      </div>
        </div>
      </div>`;
        
        taskContainer.insertAdjacentHTML("beforeend",newcard); */

};