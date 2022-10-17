const sudoku_board = document.querySelector('#main-sudoku-board');
const board_dim = sudoku_board.clientHeight;
const size = 9;

for (let i = 0; i < size*size; i++) {
    const box = document.createElement('div');
    box.classList.add("board-box");
    box.setAttribute('style', `
        height: ${(board_dim/size) - 1}px; 
        width: ${(board_dim/size) - 1}px; 
        border: 0.5px solid black; margin: 0; 
        padding: 0;
        display: flex; 
        justify-content: center; 
        align-items: center; 
        font-size: 30px;
    `)

    sudoku_board.appendChild(box);
}