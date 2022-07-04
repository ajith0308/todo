var apiurl = "https://todoapp-730b4-default-rtdb.firebaseio.com/main.json";
var apigeturl = "https://todoapp-730b4-default-rtdb.firebaseio.com/main/";

//insert into firebase
async function inserttofirebase(tasklist) {
  var raw = JSON.stringify(tasklist);
  var requestOptions = {
    method: "POST",
    body: raw,
  };

  let response = await fetch(apiurl, requestOptions);
  let data = await response.json();
  return data;
}
function redolist(e) {
  let parentElement = e.parentElement; ///.  get attributes
  let parentElementID = e.parentElement.id;
  let time = parentElement.querySelector(".time");
  let title = parentElement.querySelector(".task_completed").textContent;
  //this will update the firebase
  firebaseupdateredo(parentElementID);
  document.querySelector(
    "#v-pills-home"
  ).innerHTML += `<div id='${parentElementID}'>
  <div class="task_name" onclick="completedlist(this)">${title}</div>
  <div class="time">${time.textContent}</div>
  <label>Delete</label>
  <input type="checkbox" onclick="deleteTask(this)">
  </div>`;
  e.parentElement.remove();
}

//insert into completed list
function completedlist(e) {
  let parentElement = e.parentElement; ///.  get attributes
  let parentElementID = e.parentElement.id;
  let time = parentElement.querySelector(".time").textContent;
  let title = parentElement.querySelector(".task_name").textContent;
  //this will update the firebase
  firebaseupdate(parentElementID);
  //this will insert into completed list and add into  html file
  document.querySelector(
    "#v-pills-profile"
  ).innerHTML += `<div id='${parentElementID}'>
  <div class="task_completed" >${title}</div>
  <div class="time">${time}</div>
  <input type="checkbox" onclick="redolist(this)">
</div>`;

  //this remove from  task to do completed list

  e.parentElement.remove();
}
//insert into Tasklist
async function addTask() {
  let title = document.querySelector("#taskname").value;
  let time = document.querySelector("#time").value;
  if (title.length !== 0) {
    let response = inserttofirebase({
      title: title,
      datetime: time,
      status: "Not Completed",
    });

    let result = await response;
    let name = result.name;
    //   console.log("this is" + title);
    document.querySelector("#v-pills-home").innerHTML += `<div id='${name}' class="task">
  <div class="task_name" onclick="completedlist(this)">${title}</div>
  <div class="time">${time}</div>  
  <label>Delete</label>
  <input type="checkbox" onclick="deleteTask(this)">
</div>`;
    document.querySelector("#addtask").setAttribute("data-bs-dismiss", "modal");
  } else {
    alert("Title is requered");
  }
  document.querySelector("#time").value = "";
  document.querySelector("#taskname").value = "";
}

//get data form firebase
function firebasefetch() {
  var requestOptions = {
    method: "GET",
  };

  fetch(apiurl, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      for (let key in result) {
        if (result[key].status === "Not Completed") {
          document.querySelector(
            "#v-pills-home"
          ).innerHTML += `<div id='${key}' class="task" >
  <div class="task_name" onclick="completedlist(this)" >${result[key].title}</div>
  <div class="time">${result[key].datetime}</div>
  <label>Delete</label>
  <input type="checkbox" onclick="deleteTask(this)">
</div>`;
        } else {
          document.querySelector(
            "#v-pills-profile"
          ).innerHTML += `<div id='${key}'>
  <div class="task_completed">${result[key].title}</div>
  <div class="time">${result[key].datetime}</div>
  <input type="checkbox" onclick="redolist(this)">
</div>`;
        }
      }
    });
}

function firebaseupdateredo(parentElementID) {
  var raw = JSON.stringify({
    status: "Not Completed",
  });

  var requestOptions = {
    method: "PATCH",
    body: raw,
  };

  fetch(`${apigeturl}${parentElementID}.json`, requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}
function firebaseupdate(parentElementID) {
  var raw = JSON.stringify({
    status: "Completed",
  });

  var requestOptions = {
    method: "PATCH",
    body: raw,
  };

  fetch(`${apigeturl}${parentElementID}.json`, requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

function deleteTask(parentElement) {
  let deleteTask = parentElement.parentElement;
  firebasdelete(deleteTask.id);
  parentElement.parentElement.remove();
}

//this function will remone the element from firebase
function firebasdelete(id) {
  var requestOptions = {
    method: "DELETE",
  };

  fetch(`${apigeturl}${id}.json`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

function timeset() {
  let date = Date.now();
  document.querySelector("#time").setAttribute("min", `${date}`);
}
