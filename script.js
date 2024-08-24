const N = 9;
const UNASSIGNED = 0;

// Function to check if a number is safe to place in a cell
function isSafe(grid, row, col, num) {
    for (let k = 0; k < N; k++) {
        // Check the row and column
        if (grid[row][k] === num || grid[k][col] === num) {
            return false;
        }
        // Check the 3x3 subgrid
        if (grid[3 * Math.floor(row / 3) + Math.floor(k / 3)][3 * Math.floor(col / 3) + k % 3] === num) {
            return false;
        }
    }
    return true;
}

// Function to solve the Sudoku puzzle
function solveSudoku(grid) {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            // If the cell is unassigned
            if (grid[i][j] === UNASSIGNED) {
                // Try all possible numbers from 1 to 9
                for (let num = 1; num <= N; num++) {
                    if (isSafe(grid, i, j, num)) {
                        grid[i][j] = num;
                        // Recursively try to solve the grid with the current number
                        if (solveSudoku(grid)) {
                            return true;
                        }
                        // If not successful, backtrack
                        grid[i][j] = UNASSIGNED;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

// Function to extract the grid from the input fields
function getGrid() {
    let grid = [];
    for (let i = 0; i < N; i++) {
        grid[i] = [];
        for (let j = 0; j < N; j++) {
            let value = parseInt(document.getElementById(`cell${i}${j}`).value);
            grid[i][j] = isNaN(value) ? 0 : value;
        }
    }
    return grid;
}

// Function to display the solved Sudoku grid
function displayGrid(grid) {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            document.getElementById(`cell${i}${j}`).value = grid[i][j];
        }
    }
}

// Main function to solve Sudoku when the button is clicked
function solveSudokuOnClick() {
    let grid = getGrid();

    if (solveSudoku(grid)) {
        displayGrid(grid);
        document.getElementById('solution').innerText = "Sudoku Solved!";
    } else {
        document.getElementById('solution').innerText = "No solution exists!";
    }
}
