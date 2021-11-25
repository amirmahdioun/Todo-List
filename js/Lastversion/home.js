const url = "https://617bf2cad842cf001711c186.mockapi.io/todo";
const BASE_URL = "https://617bf2cad842cf001711c186.mockapi.io/todo";
const homePage = "./home.html";
const page404 = "./404.html";
const inputValue = document.getElementById("input-field");
const inputDescription = document.getElementById("description");
const inputDuedate = document.getElementById("due-date");
const addBtn = document.querySelector("#addInput");
const formWrapper = document.forms[0];
const emptyError = document.getElementById("empty-error");
const emptyErrorTwo = document.getElementById("empty-error-tow");
const saveBtn = document.getElementById('editInput')
const toastContainer = document.querySelector('.toast-container');


function checkPageUrl() {
  const queryString = window.location.search;
  if (queryString) {
    let urlSearch = window.location.search;
    let idParams = urlSearch.replace("?id=", "");
    addBtn.classList.add('d-none');
    saveBtn.classList.replace('d-none','d-block');
    editFunction()
    async function editFunction() {
      let urlParameters = url + "/" + idParams;
      let listData = await fetch(urlParameters);
      if (listData.status === 404) {
        location.assign(page404);
      }
      let data = await listData.json();
      let DueDateNew = new Date(data.Duedate)
      let DuedateLast = DueDateNew.toISOString().split('T')[0];

      inputValue.value = data.Title;
      inputDescription.value = data.Description;
      inputDuedate.value = DuedateLast;
    }
  }
}


window.onload = checkPageUrl();

// Server add function
async function serverAddData() {
  toastContainer.innerHTML = `<div class="toast bg-success text-light" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="toast-header">
      <strong class="me-auto">Successful!</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
  <div class="toast-body">
      Todo added successfully...
  </div>
</div>`;
  inputValue.value = inputValue.value.trim();
  if (inputValue.value === "") {
    emptyError.innerHTML = "<p>Error! Title can't be empty!</p>";
    formWrapper.classList.add("error-shake");
    setTimeout(() => {
      formWrapper.classList.remove("error-shake");
      inputValue.focus();
    }, 2000);
    return false;
  } else {
    emptyError.innerHTML = "";
  }
  inputDuedate.value = inputDuedate.value.trim();
  if (inputDuedate.value === "") {
    emptyErrorTwo.innerHTML =
      "<p>Error! Due date To do item can't be empty!</p>";
    inputDuedate.classList.add("error-shake");
    setTimeout(() => {
      inputDuedate.classList.remove("error-shake");
    }, 1500);
    return false;
  } else {
    emptyErrorTwo.innerHTML = "";
  }
  await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      Title: inputValue.value,
      Description: inputDescription.value,
      Duedate: inputDuedate.value,
      Checkbox: false,
    }),
  });
  inputValue.value = "";
  inputDescription.value = "";
  inputDuedate.value = "";
  inputValue.focus();
  // toast COMPLETED
  let toastElList = [].slice.call(document.querySelectorAll(".toast"));
  let toastList = toastElList.map(function (toastEl) {
    return new bootstrap.Toast(toastEl);
  });
  toastList.forEach((toast) => toast.show());
  setTimeout(() => {
    toastContainer.innerHTML = '';

  }, 6000)
}

async function submitEditOne() {
  toastContainer.innerHTML = `<div class="toast bg-success text-light" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="toast-header">
      <strong class="me-auto">Successful!</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
  <div class="toast-body">
      Todo editted successfully...
  </div>
</div>`;
  let urlSearch = window.location.search;
  let idParams = urlSearch.replace("?id=", "");
  let urlParameters = url + "/" + idParams
  console.log(urlParameters)
  fetch(urlParameters, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      'Title': inputValue.value,
      'Description': inputDescription.value,
      'Duedate': inputDuedate.value,
      UpdatedAt: Date.now(),
    }),
  });
  // toast COMPLETED
  let toastElList = [].slice.call(document.querySelectorAll(".toast"));
  let toastList = toastElList.map(function (toastEl) {
    return new bootstrap.Toast(toastEl);
  });
  setTimeout(() => {
    toastContainer.innerHTML = '';

  }, 6000)
  toastList.forEach((toast) => toast.show());
  setTimeout(() => {
    location.assign(homePage);
  }, 3000)
}