const viewFormBtn = document.querySelector(".view-form-btn");
const formElem = document.querySelector("form");

console.log("You should see this");

viewFormBtn.addEventListener("click", () => {
  formElem.style.display = "block";
});
