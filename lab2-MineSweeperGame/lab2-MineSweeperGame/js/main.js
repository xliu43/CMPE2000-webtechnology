// Your code here!
function CCell(row, col,  mine, count) {
    this.row = row; //represnt the row this cell holds and maps to the grid buttons
    this.col = col; //represent the column this cell holds and maps to the grid buttons
    this.display = false;//represents the “exposed” state of the button/cell – false for all at game start, and true
                           //  for cells/ buttons that have been exposed and are displayed
    this.mine = mine;// is this cell a MINE
    this.count = count; // the count of MINEs in the cell adjacent to this cell ( all 8 )
    
}
CCell.prototype.show = function () {
    var id = this.row.toString() + this.col.toString();
    var button = document.getElementById(id);
    if (this.display) {
        button.innerHTML = 1;
    }
    else button.innerHTML = 0;

}
