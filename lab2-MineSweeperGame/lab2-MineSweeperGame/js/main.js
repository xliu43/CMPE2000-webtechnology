// Your code here!



class Helper {
    static Create2DArray(rows, cols, defaultValue) {
        var arr = [];
        //create all lines 
        for (var i = 0; i < rows; i++) {
            //creates an emppty line
            arr.push([]);
            //adds cols to the empty lines 
            arr[i].push(new Array(cols));
            for (var j = 0; j < cols; j++) {
                //initalizes 
                arr[i][j] = defaultValue;
            }
        }
        return arr;
    }
    static CalculateCellCount(cell) {
        var counter = 0;
        //up cell 
        /*
        var upCell = cell2DArray[cell.row - 1][cell.col];
        var downCell = cell2DArray[cell.row + 1][cell.col];
        var leftCell = cell2DArray[cell.row][cell.col - 1];
        var rightCell = cell2DArray[cell.row][cell.col + 1];
        var upLeftCell = cell2DArray[cell.row - 1][cell.col - 1];
        var upRightCell = cell2DArray[cell.row - 1][cell.col + 1];
        var downLeftCell = cell2DArray[cell.row + 1][cell.col - 1];
        var downRightCell = cell2DArray[cell.row + 1][cell.col + 1];*/
        var columnCount = cell2DArray[cell.row].length;
        if (cell.row-1>=0 && cell2DArray[cell.row - 1][cell.col].mine === true) {
            counter++;
        }
        if (cell.row + 1 < cell2DArray.length && cell2DArray[cell.row + 1][cell.col].mine === true) {
            counter++;
        }
        if (cell.col - 1 >= 0 && cell2DArray[cell.row][cell.col - 1].mine === true) {
            counter++;
        }
        if (cell.col + 1 < cell2DArray[cell.row].length && cell2DArray[cell.row][cell.col + 1].mine === true) {
            counter++;
        }
        if (cell.row - 1 >= 0 && cell.col - 1 >= 0 && cell2DArray[cell.row - 1][cell.col - 1].mine === true) {
            counter++;
        }
        if (cell.row - 1 >= 0 && cell.col + 1 < cell2DArray[cell.row].length && cell2DArray[cell.row - 1][cell.col + 1].mine === true) {
            counter++;
        }
        if (cell.row + 1 < cell2DArray.length && cell.col - 1 >= 0 && cell2DArray[cell.row + 1][cell.col - 1].mine === true) {
            counter++;
        }
        if (cell.row + 1 < cell2DArray.length && cell.col + 1 < cell2DArray[cell.row].length && cell2DArray[cell.row + 1][cell.col + 1].mine === true) {
            counter++;
        }
        cell.count = counter;
        console.log("cell count is : "+cell.count)
    }

    static CheckCellDisplay(cell2DArray) {

        for (var i = 0; i < cell2DArray.length; i++) {
            if (cell2DArray[i].display == false) {
                return false;
            }
    
        }
        return true;



    }
}
function CCell(row, col) {
    this.row = row; //represnt the row this cell holds and maps to the grid buttons
    this.col = col; //represent the column this cell holds and maps to the grid buttons
    this.display = false;//represents the “exposed” state of the button/cell – false for all at game start, and true
    //  for cells/ buttons that have been exposed and are displayed
    this.mine = false;// is this cell a MINE
    this.count = 0; // the count of MINEs in the cell adjacent to this cell ( all 8 )

}
CCell.prototype.show = function () {
    var id = this.row.toString() + this.col.toString();
    var button = document.getElementById(id);
    if (this.display === true) {
        button.style.setProperty('background-color', 'white');
        if (this.mine === true) {
            button.innerHTML = "B";
        }
        else if (this.count > 0) {
            button.innerHTML = this.count;
        }
        return 1;
    } else {
        button.style.setProperty('background-color', 'black');
        return 0;
      }
      
}
CCell.prototype.bind = function () {
    var cell = this;
    var id = this.row.toString() + this.col.toString();
    var button = document.getElementById(id);
    button.onmousedown = function (ev) {
        if (ev.shiftKey) {
            console.log('shiftKey is pressed');
            if (cell.mine) {
                cell.display = true;
                document.getElementsByClassName('game-status')[0].innerHTML = "Good Call!";
                ShowGrid();
                if (!gameOverFlag && Helper.CheckCellDisplay(cell2DArray) == true) {
                    document.getElementsByClassName('game-status')[0].innerHTML = "Congrats You win!!!";
                    ShowGrid();
                    gameOverFlag = true;
                    console.log("you win");
                }

            }
            else {
                
                document.getElementsByClassName('game-status')[0].innerHTML = "You picked up wrong mine";
                gameOverFlag = true;
                cell.display = true;
                ShowGrid();
               
            }
        } else {
            console.log('shiftKey not pressed');
            if (cell.mine) {
                cell.display =true;
                ShowGrid();
                document.getElementsByClassName('game-status')[0].innerHTML = "you stepped on a mine! Good luck";
                gameOverFlag = true;
            }
            else {
                Check(cell.row, cell.col);
                cell.display = true;
                ShowGrid();
                document.getElementsByClassName('game-status')[0].innerHTML = "Good!You are still alive!";
            } 
            
        }
        if (gameOverFlag) {
            for (var i = 0; i < cell2DArray.length; i++) {
                for (var j = 0; j < cell2DArray[i].length; j++) {
                    cell2DArray[i][j].display = true;
                }
            }
            ShowGrid();
        }
       

            
           
    };
  
}

function Check(row, col) {
    if (row < 0 || row > cell2DArray.length-1) {
        return;
    }
    if (col < 0 || col > cell2DArray[row].length-1) {
        return;
    }
    if (cell2DArray[row][col].display === true) {
        return;
    }
    if (cell2DArray[row][col].count === 0) {
        cell2DArray[row][col].display = true;
		if(row-1>=0&&cell2DArray[row-1][col].count!=0)
		{cell2DArray[row-1][col].display=true;}
	    if(row+1<=cell2DArray.length-1&& cell2DArray[row+1][col].count!=0){
		  cell2DArray[row+1][col].display=true;	
		}
		if(col-1>=0&& cell2DArray[row][col-1].count!=0){
			 cell2DArray[row][col-1].display=true;
		}
		if(col+1<=cell2DArray[row].length-1&& cell2DArray[row][col+1].count!=0){
			 cell2DArray[row][col+1].display=true;
		}
        
		
        ShowGrid();
        Check(row - 1, col);
        Check(row + 1, col);
        Check(row, col - 1);
        Check(row, col + 1);

    }
    
}

//Main Code 


function NewGame() {
    gameOverFlag = false;
    //populate cellArray with new Cells
    for (var i = 0; i < max_row; i++) {
        for (var j = 0; j < max_col; j++) {
            cell2DArray[i][j] = new CCell(i, j);
        }
    }
    //assign random mines to cells 
    var mineArray = [];
    while (mineArray.length < num_mines) {
        var randomNumber = Math.floor((Math.random() * max_col * max_row) + 1);
        if (mineArray.indexOf(randomNumber) < 0) {
            mineArray.push(randomNumber);
        }
    }
    mineArray.forEach(function (nb) { console.log(nb); });
    console.log("Mine Array Length" + mineArray.length);
    var counter = 0;
    for (var i = 0; i < cell2DArray.length; i++) {
        for (var j = 0; j < cell2DArray[i].length; j++) {
            counter++;
            if (mineArray.indexOf(counter) > -1) {
                cell2DArray[i][j].mine = true;
               // console.log("one mine generated");
            }
           
        }
    }
    //calculate mine count for each cell 
    for (var i = 0; i < cell2DArray.length; i++) {
        for (var j = 0; j < cell2DArray[i].length; j++) {
            Helper.CalculateCellCount(cell2DArray[i][j])
        }
    }

    return cell2DArray;

}

function NewGrid() {
    var str = "";
    str = "<table id=game-table>";
    for (var i = 0; i < max_row; i++) {
     
        str += "<tr>"     
        for (var j = 0; j < max_col; j++) {
            var id = i.toString() + j.toString();
            str += "<th><button id=\"" + id+"\" type=\"button\"></button></th>"                                                        //remeber how to use\ to include quote in string and $ to include variables
        }
        str+="</tr>"
    }
    document.getElementsByClassName('game-grid')[0].innerHTML = str;
}

function ShowGrid() {
    var counter = 0;
    for (var i = 0; i < cell2DArray.length; i++) {
        for (var j = 0; j < cell2DArray[i].length; j++) {
            counter+=cell2DArray[i][j].show();
        }
    }
}

function BindGrid() {
    for (var i = 0; i < cell2DArray.length; i++) {
        for (var j = 0; j < cell2DArray[i].length; j++) {
            cell2DArray[i][j].bind();
        }
    }
}


var max_row = 10;
var max_col = 10;
var num_mines = 1;/*Math.floor(0.1 * max_row * max_col)*/;
var cell2DArray = Helper.Create2DArray(max_row, max_col, 0);
var gameOverFlag = false;

window.onload = function () {
    NewGrid();
    document.getElementById('restart').disabled = true;
    //document.getElementById('playagain').disabled = true;
    
    document.getElementsByName("difficultyControl").forEach(rtn => rtn.onclick = function () {
        num_mines = Number(this.value);
        console.log("Mines: " + num_mines);
 
    });
    document.getElementById('start').onclick = function () {
        NewGrid();
        NewGame();
          
        ShowGrid();
        BindGrid();
        document.getElementById('restart').disabled = false;
        //document.getElementById('playagain').disabled = false;
    };
    document.getElementById('restart').onclick = function () {
        gameOverFlag = false;
        document.getElementsByClassName('game-status')[0].innerHTML = "";
        for (var i = 0; i < cell2DArray.length; i++) {
            for (var j = 0; j < cell2DArray[i].length; j++) {
                cell2DArray[i][j].display = false;
            }
        }
        ShowGrid();
    };
    //document.getElementById('playagain').onclick = function () {
       
    //};
    
}
