let submit = document.querySelector(".submit-btn");
document.querySelector(".clear-btn").style.display = "none";

submit.addEventListener("click", addData);
function addData(e) {
  e.preventDefault();
  let data = document.querySelector(".grocery").value.trim();
  if (data === "") {
    // alert-danger
    document.querySelector(".alert").innerHTML = "Please enter a valid item";
    document.querySelector(".alert").style.color = "red";
    let alertBox = document.querySelector(".alert");
    alertBox.classList.add("alert-danger");

    setTimeout(() => {
      document.querySelector(".alert").innerHTML = "";
      alertBox.classList.remove("alert-danger");
    }, 3000);
  } else {
    // Add-grocery-item
    document.querySelector(".clear-btn").style.display = "block";
    let list = document.querySelector(".grocery-list");
    let li = document.createElement("li");
    li.classList.add("grocery-item");
    li.innerHTML = `<p>${data}</p><span><button class="edit-btn"><i><img src="edit (1).svg" alt="edit"></i></button>
        <button class="delete-btn"><i><img src="trash-2.svg" alt="delete"></i></button></span>`;
    list.appendChild(li);

    // delete-btn
    let delete_btn = li.querySelector(".delete-btn");
    delete_btn.addEventListener("click", deleteData);
    function deleteData() {
      li.remove();
      if (list.children.length == 0) {
        document.querySelector(".clear-btn").style.display = "none";
      }
    }

    submit.innerText = "submit";

    // edit-btn
    let edit_btn = li.querySelector(".edit-btn");
    edit_btn.addEventListener("click", editData);
    function editData() {
      document.querySelector(".grocery").value = li.innerText;
      console.log(li.innerText);
      submit.innerText = "Edit";
      li.remove();
    }
    submit.innerText = "submit";

    // alert-success
    document.querySelector(".alert").innerHTML = "Added Item Successfully!!!";
    let alertBox = document.querySelector(".alert");
    alertBox.classList.add("alert-success");
    setTimeout(() => {
      document.querySelector(".alert").innerHTML = "";
      alertBox.classList.remove("alert-success");
    }, 1000);

    // clear-btn
    document.querySelector(".grocery").value = "";
    let clear_btn = document.querySelector(".clear-btn");
    clear_btn.addEventListener("click", clearForm);
    function clearForm() {
      list.removeChild(li);
    }
  }
}
