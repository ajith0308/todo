var task = [];
var completedtask = [];

function inserttofirebase() {}
function deletelist(e) {
  let parentElement = e.parentElement; ///.  get attributes
  let parentElementID = e.parentElement.id;
  let time = parentElement.querySelector(".time");
  let title = parentElement.querySelector(".task_name");
  document.querySelector(
    "#v-pills-profile"
  ).innerHTML += `<s><div id='${parentElementID}'>
  <div class="task_completed" >${title.textContent}</div>
  <div class="time">${time.textContent}</div>
</div>`;

  console.log("this" + time.textContent);
  console.log("this" + title.textContent);
  console.log("this" + parentElementID);
  completedtask.push({
    id: parentElementID,
    title: title,
    time: time,
    status: "completed",
  });
  console.log(completedtask);

  e.parentElement.remove();
}
function addTask() {
  title = document.querySelector("#taskname").value;
  time = document.querySelector("#time").value;
  ids = Date.now();
  let x = {
    id: ids,
    title: title,
    datetime: time,
    status: "Not Completed",
  };
  task.push(x);
  console.log(title);
  console.log(window.title);
  console.log(task);
  //   console.log("this is" + title);
  document.querySelector("#v-pills-home").innerHTML += `<div id='${ids}'>
  <div class="task_name" >${title}</div>
  <div class="time">${time}</div>
  <input type="checkbox" onclick="deletelist(this)">
</div>`;
  document.querySelector("#addtask").setAttribute("data-bs-dismiss", "modal");
}
