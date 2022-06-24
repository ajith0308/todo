//insert into firebase
async function inserttofirebase(tasklist) {
  var raw = JSON.stringify(tasklist);
  var requestOptions = {
    method: "POST",
    body: raw,
  };

  let response = await fetch(
    "https://todoapp-730b4-default-rtdb.firebaseio.com/main.json",
    requestOptions
  );
  let data = await response.json();
  //console.log(data);
  return data;
}
//insert into completed list
function completedlist(e) {
  let parentElement = e.parentElement; ///.  get attributes
  let parentElementID = e.parentElement.id;
  let time = parentElement.querySelector(".time");
  let title = parentElement.querySelector(".task_name");
  firebaseupdate(parentElementID);
  document.querySelector(
    "#v-pills-profile"
  ).innerHTML += `<div id='${parentElementID}' class="completed">
  <div class="task_completed" >${title.textContent}</div>
  <div class="time">${time.textContent}</div>
</div>`;

  e.parentElement.remove();
}
//insert into Tasklist
function addTask() {
  let responsevalue;
  let title = document.querySelector("#taskname").value;
  let time = document.querySelector("#time").value;
  let response = inserttofirebase({
    title: title,
    datetime: time,
    status: "Not Completed",
  });

  response.then((responseResult) => {
    responsevalue = responseResult.name;
  });
  //   console.log("this is" + title);
  document.querySelector(
    "#v-pills-home"
  ).innerHTML += `<div id='${responsevalue}'>
  <div class="task_name" >${title}</div>
  <div class="time">${time}</div>
  <input type="checkbox" onclick="completedlist(this)">
</div>`;
  document.querySelector("#addtask").setAttribute("data-bs-dismiss", "modal");
}

//get data form firebase
function firebasefetch() {
  var requestOptions = {
    method: "GET",
  };

  fetch(
    "https://todoapp-730b4-default-rtdb.firebaseio.com/main.json",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      for (let key in result) {
        if (result[key].status === "Not Completed") {
          document.querySelector(
            "#v-pills-home"
          ).innerHTML += `<div id='${key}'>
  <div class="task_name" >${result[key].title}</div>
  <div class="time">${result[key].datetime}</div>
  <input type="checkbox" onclick="completedlist(this)">
</div>`;
        } else {
          document.querySelector(
            "#v-pills-profile"
          ).innerHTML += `<div id='${key}'>
  <div class="task_completed">${result[key].title}</div>
  <div class="time">${result[key].datetime}</div>
</div>`;
        }
      }
    });
}

function firebaseupdate(parentElementID) {
  var raw = JSON.stringify({
    status: "Completed",
  });

  var requestOptions = {
    method: "PATCH",
    body: raw,
  };

  fetch(
    `https://todoapp-730b4-default-rtdb.firebaseio.com/main/${parentElementID}.json`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}
