/**
 *  barGroup object
 *  - Stores if the array is sorted - isSorted (currently unused)
 *  - Sortdelay - Stores the delay for the sorting animations
 *  - maxHeight - Stores the maximum height of a bar relative to initial window size
 * 
 *  - Has appropiate functions for generating values for bars and populating barholder with values
 */
import {cssAnimation} from './Animations.js'

const MIN_BAR_HEIGHT = 10; 
export class barsGroup{
    sortingtype: string;
    values: number [];
    isSorting: boolean;
    Sortdelay: number;
    maxHeight: number;
    cssAnime: cssAnimation[];

    constructor(sortingtype: string, data: number[], Sortdelay: number, maxHeight: number){
        this.sortingtype = sortingtype;
        this.values = data;
        this.isSorting = false;
        this.Sortdelay = Sortdelay;
        this.maxHeight = maxHeight;
        this.cssAnime = [];
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
        let row: string;
        let amount = this.values.length;
        if(barHolder){
          while (barHolder.firstChild) {
            barHolder.firstChild.remove();
          }
        for(let i = 0; i < amount; i++){
        row = `<div class = "flex-fill arrayBar" style="height:${this.values[i]}px;"></div>`
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
