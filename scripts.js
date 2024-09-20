const createButton = document.querySelector('button.create');
const dialog = document.querySelector('dialog');
const form = document.querySelector('form');
const container = document.querySelector('.container');

const nameElement = document.querySelector('#bookname');
const authorElement = document.querySelector('#bookauthor');
const pagecountElement = document.querySelector('#bookpagecount');
const finishedElement = document.querySelector('#bookisfinished');
const library = [];

function deleteBook(index) {
	document.querySelector(`[data="${index}"]`).remove();
	library[index] = null;
}

function emptyForm() {
	nameElement.value = '';
	authorElement.value = '';
	pagecountElement.value = '';
	finishedElement.checked = false;
}

function appendBook(book, index) {
	container.innerHTML += `
    <div class="book" data="${index}">
    <p class="title">${book.name}</p>
    <p class="author">by ${book.author}</p>
    <p class="pagecount">${book.pagecount} pages</p>
			<div class="isread">
				<p>Finished</p>

				<input
					type="checkbox"
					class="readcheckbox"
					name="isread"
          ${book.isChecked} />
			</div>
    <button class="delete" onclick="deleteBook(${index})">Delete</button>
		</div>
  `;
	let checkbox = document
		.querySelector(`[data="${index}"]`)
		.querySelector('.readcheckbox');
	checkbox.addEventListener('click', () => {
		library[index].toggleFinished();
	});
}

function Book(name, author, pagecount, finished) {
	this.name = name;
	this.author = author;
	this.pagecount = pagecount;
	this.finished = finished;
	this.isChecked = this.finished ? 'checked' : '';
	this.toggleFinished = function () {
		this.finished = !this.finished;
	};
}

form.addEventListener('submit', (event) => {
	event.preventDefault();
	let data =
		library.push(
			new Book(
				nameElement.value,
				authorElement.value,
				pagecountElement.value,
				finishedElement.checked,
			),
		) - 1;
	appendBook(library[data], data);
	emptyForm();
	dialog.close();
});
