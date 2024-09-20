const createButton = document.querySelector('button.create');
const dialog = document.querySelector('dialog');
const form = document.querySelector('form');
const container = document.querySelector('.container');

const nameElement = document.querySelector('#bookname');
const authorElement = document.querySelector('#bookauthor');
const pagecountElement = document.querySelector('#bookpagecount');
const finishedElement = document.querySelector('#bookisfinished');
const library = [];

function emptyForm() {
	nameElement.value = '';
	authorElement.value = '';
	pagecountElement.value = '';
	finishedElement.checked = false;
}

function appendBook(book, data) {
	container.innerHTML += `
    <div class="book" data="${data}">
    <p class="title">${book.name}</p>
    <p class="author">${book.author}</p>
    <p class="pagecount">${book.pagecount}</p>
			<div class="isread">
				<p>Finished</p>

				<input
					type="checkbox"
					class="readcheckbox"
					name="isread"
          ${book.isChecked} />
			</div>
		</div>
  `;
	let checkboxlist = document.querySelectorAll('.readcheckbox');
	let checkbox = checkboxlist[checkboxlist.length - 1];
	checkbox.addEventListener('click', () => {
		let index = checkbox.parentElement.parentElement.getAttribute('data');
		library[index].finished = checkbox.checked;
	});
}

function Book(name, author, pagecount, finished) {
	this.name = name;
	this.author = author;
	this.pagecount = pagecount;
	this.finished = finished;
	this.isChecked = this.finished ? 'checked' : '';
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
