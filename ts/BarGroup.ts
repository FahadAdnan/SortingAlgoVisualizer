/**
 *  barGroup object
 *  - Stores the type of sorting method - sortingtype
 *  - Stores the array of values - values[]
 *  - Stores if the array is sorted - isSorted (currently unused)
 *  - Stores the delay for animations - Sortdelay
 *  - Stores the maximum height of a bar relative to initial window size - maxHeight
 * 
 *  - Has appropiate functions for generating values for bars and populating barholder with values
 */

const MIN_BAR_HEIGHT = 10; 
export class barsGroup{
    sortingtype: string;
    values: number [];
    isSorted: boolean;
    Sortdelay: number;
    maxHeight: number;

    constructor(sortingtype: string, data: number[], Sortdelay: number, maxHeight: number){
        this.sortingtype = sortingtype;
        this.values = data;
        this.isSorted = false;
        this.Sortdelay = Sortdelay;
        this.maxHeight = maxHeight;
    
    } 
     
    populateData(amount: number){
      this.clearArray();
      const max = this.maxHeight;
      for(let i = 0; i < amount; i++){
       console.log("pushed a value")
       this.values.push(Math.floor(Math.random() * (max - MIN_BAR_HEIGHT)) + MIN_BAR_HEIGHT);
      }
  }
    populateBars(){
        var barHolder = document.getElementById('barHolder');
        console.log("Got here");
        let row: string;
        let amount = this.values.length;
        if(barHolder){
          while (barHolder.firstChild) {
            barHolder.firstChild.remove();
          }
        for(let i = 0; i < amount; i++){
        row = `<div class = "flex-fill arrayBar" style="height:${this.values[i]}px"></div>`
          barHolder.innerHTML += row
        }
      }
  }
    clearArray() {
      while (this.values.length) {
        this.values.pop();
      }
  }
}