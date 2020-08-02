document.addEventListener('DOMContentLoaded', function () {

    let addBtn = document.querySelector('#addNote');
    let board = document.querySelector('#board');
    let notesArr = JSON.parse(localStorage.getItem('notes')) || [];
    console.log(notesArr);
    updateMarkup(notesArr);


    function updateMarkup(tempArr) {
        board.innerHTML = '';
        tempArr.forEach(function (item, index) {
            board.append(createOneNote(item, index));
        });
        localStorage.setItem('notes', JSON.stringify(notesArr));
    }

    function createOneNote(object, index) {
        let newNote = document.createElement('div');
        newNote.classList.add('note');
        newNote.style.top = object.y + 'px';
        newNote.style.left = object.x + 'px';

        let newTextArea = document.createElement('textarea');
        newTextArea.setAttribute('disabled', 'disabled');
        newTextArea.value = notesArr[index].text;

        newNote.append(newTextArea);

        let deleteButton = document.createElement('span');
        newNote.append(deleteButton);

        deleteButton.onclick = function () {
            notesArr.splice(index, 1);
            updateMarkup(notesArr);
        }

        let icon = document.createElement('div');
        icon.classList.add('comments');
        newNote.append(icon);

        let deltaX;
        let deltaY;

        function mouseDown(e) {
            if (e.target.classList.contains('active')) return; 
            deltaX = e.clientX - newNote.offsetLeft;
            deltaY = e.clientY - newNote.offsetTop;
            window.addEventListener('mousemove', setNotePosition);
        }
        newNote.onmousedown = mouseDown;

        newNote.onmouseup = function (e) {
            window.removeEventListener('mousemove', setNotePosition);
            object.x = newNote.offsetLeft;
            object.y = newNote.offsetTop;
            localStorage.setItem('notes', JSON.stringify(notesArr));
        }

        newNote.ondblclick = function (e) {
            newTextArea.classList.add('active');
            newNote.classList.add('ontop');
            newTextArea.removeAttribute('disabled', 'disabled');
            newTextArea.style.border = "1px solid brown";
            newTextArea.focus();

        }

        newTextArea.onkeyup = function () {
            notesArr[index].text = newTextArea.value;
        }

        function setNotePosition(e) {
            newNote.style.top = (e.clientY - deltaY) + 'px';
            newNote.style.left = (e.clientX - deltaX) + 'px';
        }

        newTextArea.onblur = function () {
            updateMarkup(notesArr);
        }
        return newNote;
    }

    function Note(x = elemLeft, y = elemTop, text= '') {
        this.x = x;
        this.y = y;
        this.text = text;
    }

    addBtn.onclick = function () {
        maxElemLeft = document.documentElement.clientWidth - 300;
        maxElemTop = document.documentElement.clientHeight - 300;
        elemLeft = Math.random() * maxElemLeft;
        elemTop = Math.random() * maxElemTop;
        notesArr.push(new Note());
        updateMarkup(notesArr);
    }


});
