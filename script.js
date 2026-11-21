const viewFormBtn = document.querySelector(".view-form-btn");
const viewBooksBtn = document.querySelector(".view-books-btn");
const formElem = document.querySelector("form");
const bookContainer = document.querySelector(".book-container");
const tbodyElem = document.querySelector("tbody");
const table = document.querySelector("table");
const myLibrary = [
  {
    bookTitle: "Lord of the Mysteries",
    bookAuthor: "Cuttlefish that Loves Diving",
    numOfPages: "10,000",
    readStatus: "rereading",
    summary: "Read it, its good",
    id: "34432632236326272",
  },
  {
    bookTitle: "The Novel's Extra",
    bookAuthor: "Author2",
    numOfPages: "400",
    readStatus: "done",
    summary: "This is a test book2",
    id: "42245326723",
  },
];
const enumValue = Object.freeze({
  done: "Done",
  unread: "Unread",
  reading: "Reading",
  rereading: "Re-reading",
  onHold: "On-hold",
});

viewFormBtn.addEventListener("click", () => {
  viewBooksBtn.classList.remove("active");
  viewFormBtn.classList.add("active");
  bookContainer.classList.remove("show");
  formElem.classList.add("show");
});
viewBooksBtn.addEventListener("click", () => {
  viewBooksBtn.classList.add("active");
  viewFormBtn.classList.remove("active");
  formElem.classList.remove("show");
  bookContainer.classList.add("show");
  renderBooks();
});

let clickEvent = new Event("click");
viewBooksBtn.dispatchEvent(clickEvent);

function toggleView() {
  if (formElem.classList.contains("show")) {
    formElem.classList.remove("show");
    bookContainer.classList.add("show");
  } else if (bookContainer.classList.contains("show")) {
    bookContainer.classList.remove("show");
    formElem.classList.add(show);
  }
}
formElem.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(formElem);
  const data = Object.fromEntries(formData);
  addBookToLibrary(data);
  renderBooks();
  formElem.reset();
});

function Book(title, author, numOfPages, readStatus, summary) {
  this.bookTitle = title;
  this.bookAuthor = author;
  this.numOfPages = numOfPages;
  this.readStatus = readStatus;
  this.summary = summary;
  this.id = crypto.randomUUID();
}
Book.prototype.setReadStatus = function (val) {
  this.readStatus = val;
};
Book.prototype.getSummary = function () {
  return `The book '${this.title}' by ${this.author} is a ${this.numOfPages} long page story. ${this.summary ?? ""}`;
};

function addBookToLibrary(data) {
  const { bookTitle, bookAuthor, numOfPages, readStatus, bookSummary, id } =
    data;
  const newBook = new Book(
    bookTitle,
    bookAuthor,
    numOfPages,
    readStatus,
    bookSummary,
    id,
  );

  myLibrary.push(newBook);
}

function createBookRows(arr) {
  const frag = document.createDocumentFragment();
  arr.forEach((item) => {
    const { bookTitle, bookAuthor, numOfPages, readStatus, bookSummary, id } =
      item;

    // creating elements
    const tr = document.createElement("tr");
    const titleTd = document.createElement("td");
    const authorTd = document.createElement("td");
    const numOfPageTd = document.createElement("td");
    const statusTd = document.createElement("td");
    const span = document.createElement("span");
    const img = document.createElement("img");

    //assigning values
    tr.dataset.id = id;
    titleTd.textContent = bookTitle;
    authorTd.textContent = bookAuthor;
    numOfPageTd.textContent = numOfPages;
    statusTd.textContent = enumValue[readStatus];
    statusTd.setAttribute("class", "status-td");
    span.appendChild(img);
    img.setAttribute("src", "./img/edit-button.svg");

    //appending elements
    tr.appendChild(titleTd);
    tr.append(authorTd);
    tr.appendChild(numOfPageTd);
    tr.appendChild(statusTd);
    tr.appendChild(span);
    frag.appendChild(tr);
  });

  return frag;
}

function renderBooks() {
  tbodyElem.innerHTML = "";
  tbodyElem.appendChild(createBookRows(myLibrary));
}

table.addEventListener("click", (e) => {
  const row = e.target.closest("tr");
  const rowId = row.dataset.id;
  const rowStatusCell = row.querySelector(".status-td");
  const bookObj = myLibrary.find((item) => item.id === rowId);
  const selectHTML = `
    <select required name="readStatus" id="readStatus">
      <option value="" disabled selected hidden>
        Select status...
      </option>
      <option value="done">Done</option>
      <option value="unread">Unread</option>
      <option value="reading">Reading</option>
      <option value="rereading">Re-reading</option>
      <option value="onHold">On-hold</option>
    </select>
  `;

  if (!e.target.closest("span")) return;

  const select = rowStatusCell.querySelector("select");

  if (!select) {
    rowStatusCell.innerHTML = selectHTML;
    e.target.closest("img").setAttribute("src", "./img/save-edit-button.svg");
    return;
  } // this condition checks if there is a select button
  //The not operator creates a select button if the select is undefined and returns immediately

  bookObj.readStatus = enumValue[select.value];
  rowStatusCell.textContent = bookObj.readStatus;
  e.target.closest("img").setAttribute("src", "./img/edit-button.svg");
});

renderBooks();
