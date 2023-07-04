
const cardData = () => {
  let getData=localStorage.getItem("taskyy");
let taskData=JSON.parse(getData);
Object.values(taskData).forEach((para,i) => {
  //const main = document.querySelector(".main");
  const taskContainer = document.querySelector(".task__container");
  const newcard = `
      <div class="col-sm-12 col-md-6 col-lg-4" id="${para[i].id}">
    <div class="card">
      <div class="card-header d-flex justify-content-between">
      Food4SocialChange
      <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash-alt"></i></button>
      </div>

      <div class="card-body">
      <div>
      <label for="fullname1" class="form-label">Doner Name: ${para[i].fullName}</label>
      </div>
      <div>
      <label for="mobilenumber1" class="form-label">Doner Mobile Number: ${para[i].mobileNumber}</label>
      </div>
      <div>
      <label for="pickupaddress" class="form-label">Pick Up address: ${para[i].pickUp}</label>
      </div>
      <div>
      <label for="foodquantity" class="form-label">Food Quantity: ${para[i].foodQuantity}</label>
      </div>
      </div>
    </div>
      </div>`;
      
      taskContainer.insertAdjacentHTML("beforeend",newcard);
      //main.appendChild(taskContainer);
});

};