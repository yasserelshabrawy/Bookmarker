var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var submit = document.getElementById("submit");
var alert1 = document.getElementById("alert1");
var alert2 = document.getElementById("alert2");
var siteContainer = [];
if (localStorage.getItem("site") != null) {
  siteContainer = JSON.parse(localStorage.getItem("site"));
  display(siteContainer);
}
function addSite() {
  if (validateName() && validateUrl() == true && unique() != false) {
    var site = {
      name: siteName.value,
      url: siteUrl.value,
    };
    siteContainer.push(site);
    localStorage.setItem("site", JSON.stringify(siteContainer));
    display(siteContainer);
    clearForm();
    siteName.classList.remove("is-valid");
    siteUrl.classList.remove("is-valid");
  } else {
 alert(`Site Name or Url is not valid, Please follow the rules below :

 Site name must contain at least 3 characters
 Site URL must be a valid one`)
  }
}
function clearForm() {
  siteName.value = "";
  siteUrl.value = "";
}
function display(arr) {
  cartona = "";
  for (var i = 0; i < arr.length; i++) {
    cartona += `
        <tr>
        <td>${i + 1}</td>
        <td>${arr[i].name}</td>
        <td><a class="btn btn-success" href="http://${
          arr[i].url
        }" target="_blank"><i class="fa-solid fa-eye"></i> Visit</a></td>
        <td><button onclick="deleteSite(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
    </tr>`;
  }
  document.getElementById("tableBody").innerHTML = cartona;
}
function deleteSite(index) {
  siteContainer.splice(index, 1);
  localStorage.setItem("site", JSON.stringify(siteContainer));
  display(siteContainer);
}
function validateName() {
  var regex = /^[\w]{3,}/;
  if (regex.test(siteName.value)) {
    siteName.classList.add("is-valid");
    siteName.classList.remove("is-invalid");
    alert1.classList.add("d-none")
    return true;
  } else {
    siteName.classList.add("is-invalid");
    siteName.classList.remove("is-valid");
    alert1.classList.remove("d-none")
    alert1.innerHTML = "Site name must contain at least 3 characters"
    return false;
  }
}
function validateUrl() {
  var regex = /^(https:\/\/)?(www.)?[a-z]{2,}(.com)$/;
  if (regex.test(siteUrl.value)) {
    siteUrl.classList.add("is-valid");
    siteUrl.classList.remove("is-invalid");
    alert2.classList.add("d-none")
    return true;
  } else {
    siteUrl.classList.add("is-invalid");
    siteUrl.classList.remove("is-valid");
    alert2.classList.remove("d-none")
    alert2.innerHTML = "Site URL must be a valid one"
    return false;
  }
}

siteName.addEventListener("input", validateName);
siteUrl.addEventListener("input", validateUrl);

function unique() {
  for (var i = 0; i < siteContainer.length; i++) {
    if (siteName.value == siteContainer[i].name) {
      return false;
    }
  }
}
