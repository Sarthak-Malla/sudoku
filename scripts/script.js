const sudoku_board = document.querySelector('#main-sudoku-board');
const board_dim = sudoku_board.clientHeight;
const size = 9;

// Creating the sudoku game board with grids.
let row = 0;
let col = 0;
for (let i = 0; i < size*size; i++) {
    const box = document.createElement('div');

    box.classList.add("board-box", `box-${row}-${col}`);

    if (col > 8) {
        row++;
        col = 0;
    }
    col++;

    box.setAttribute('style', `
        height: ${(board_dim/size) - 1}px;
        width: ${(board_dim/size) - 1}px;
        border: 0.5px solid black; 
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 40px;
    `)

    sudoku_board.appendChild(box);
}

// selecting all the grids
const boxes = document.querySelectorAll(".board-box");
var selected_box;

// Checking for Click to input a Number.
boxes.forEach((box) => {
    box.addEventListener('click', () => {
        selected_box = box.getAttribute('class').split(" ");

        selected_box = document.getElementsByClassName(`${selected_box[1]}`)[0];
        
        document.addEventListener('keypress', (e) => {
            if (e.key >= 1 && e.key <= 9) {
                selected_box.textContent = `${e.key}`;
            }
        });
    });
});



