const sudoku_board = document.querySelector('#main-sudoku-board');
const board_dim = sudoku_board.clientHeight;
const size = 9;

// Creating the sudoku game board with grids.

function create_board() {

    let row = 0;
    let col = 0;
    let grid_row = 0;
    let grid_col = 0;

    for (let i = 0; i < size*size; i++) {
        const box = document.createElement('div');

        box.classList.add("board-box", `box-${row}-${col}`, `grid-${grid_row}-${grid_col}`);
        box.textContent = "";
        col++;


        if (col > size-1) {

            row++;
            col = 0;
        }


        if (row < 3) {

            grid_row = 0;
        }

        else if (row > 2 && row < 6) {

            grid_row = 1;
        }

        else {

            grid_row = 2;
        }

        if (col < 3) {

            grid_col = 0;
        }

        else if (col > 2 && col < 6) {

            grid_col = 1;
        }

        else {

            grid_col = 2;
        }

        box.setAttribute('style', `
            height: ${(board_dim/size) - 1}px;
            width: ${(board_dim/size) - 1}px;
            border: 0.5px solid black; 
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 40px;
            `);

        sudoku_board.appendChild(box);
    }
}

function user_input() {

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
                    row_check(selected_box.getAttribute('class').split(" ")[1]);
                    col_check(selected_box.getAttribute('class').split(" ")[1]);
                    grid_check(selected_box.getAttribute('class').split(" ")[1], selected_box.getAttribute('class').split(" ")[2]);
                    game_checker();

                }
            }, {once: true});
        });
    });
}


function row_check(selected_box) {

    const which_row = selected_box.split("-")[1];
    const which_col = selected_box.split("-")[2];
    const row_set = new Set();
    const selected_box_div = document.getElementsByClassName(`${selected_box}`)[0];

    for (let i = 0; i < size; i++) {

        if (i == which_col) {continue;}

        const box = document.querySelector(`.box-${which_row}-${i}`)

        if (box.textContent != "") {

            row_set.add(box.textContent);
        }
    }

    if (row_set.has(selected_box_div.textContent)) {
        selected_box_div.style.color = "red";
    }
    
    else {

        selected_box_div.style.color = "black";
        row_set.add(selected_box_div.textContent);
    }

    console.log("set size: ", row_set.size);

    if (row_set.size == size) {

        return 1;

    }

    return 0;
}

function col_check(selected_box) {

    const which_row = selected_box.split("-")[1];
    const which_col = selected_box.split("-")[2];
    const col_set = new Set();
    const selected_box_div = document.getElementsByClassName(`${selected_box}`)[0];

    for (let i = 0; i < size; i++) {

        if (i == which_row) {continue;}

        const box = document.querySelector(`.box-${i}-${which_col}`)

        if (box.textContent != "") {

            col_set.add(box.textContent);
        }
    }

    if (col_set.has(selected_box_div.textContent)) {
        selected_box_div.style.color = "red";
    }
    
    else {
        
        selected_box_div.style.color = "black";
        col_set.add(selected_box_div.textContent);
    }

    console.log("set size: ", col_set.size);

    if (col_set.size == size) {

        return 1;

    }

    return 0;
}

function grid_check(selected_box, selected_grid) {

    const which_grid_row = selected_grid.split("-")[1];
    const which_grid_col = selected_grid.split("-")[2];
    const which_row = selected_box.split("-")[1];
    const which_col = selected_box.split("-")[2];

    const selected_box_div = document.getElementsByClassName(`${selected_box}`)[0];
    const grid_set = new Set();

    const boxes_grid = document.querySelectorAll(`.grid-${which_grid_row}-${which_grid_col}`);

    boxes_grid.forEach((box) => {

        if (box.getAttribute('class').split(" ")[1].split("-")[1] == which_row && box.getAttribute('class').split(" ")[1].split("-")[2] == which_col) {return;}

        if (box.textContent != "")  {

            grid_set.add(box.textContent);
        }
    });

    if (grid_set.has(selected_box_div.textContent)) {

            selected_box_div.style.color = "red";
        }

        else {

            selected_box_div.style.color = "black";
            grid_set.add(selected_box_div.textContent);
        }

    if (grid_set.size == size) {

        return 1;
    }

    return 0;
}   

function game_checker() {

    var rows_solved = 1;
    var cols_solved = 1;
    var grids_solved = 1;

    for (let i = 0; i < size; i++) {

        rows_solved &= row_check(`box-0-${i}`);
        cols_solved &= col_check(`box-${i}-0`);
    }

    var a = 0;
    var b = 0;

    for (let i = 0; i < size; i = i+3) {
        for (let j = 0; j < size; j = j + 3) {
            grids_solved &= grid_check(`box-${i}-${j}`, `grid-${i/3}-${j/3}`);
        }
    }

    if (rows_solved & cols_solved & grids_solved) {
        alert("beat the game yo");
    }
}

create_board();
user_input();



