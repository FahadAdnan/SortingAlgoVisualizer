import {cssAnimation} from "../Animations.js";

/*  Hybrid Sorting - Tim Sort
 * Time Complexity: Best: O(nlog(n))  Avg: O(nlog(n))  Worst: O(nlog(n))
 * Space Complexity: O(n)
 * 
 * The fastest sorting algorithm will always be O(n)*log(n), but the associated constant factor can vary 
 * 
 *  1) Quick Sort - stores a left, right, and pivot poitner, bad for the constant
 *  2) Merge Sort - Needs alot of extra space at O(N), bad for the constant
 *  3) Heap Sort - has bad Stability of Sorting as the swaps are random, poor prediction on next move, bad for the constant
 * 
 *  Insertion Sort is O(n^2), the constant is small (in-place & good stability of sorting)
 *  ci < cq(n*log(n)) for small n -- specifically for the size of 32 - 64
 * 
 *  So we can use merge sort with a block size of 32-64, saving on 2^5 = 64 -- 5 levels 
 *  So the time complexity becomes: O(n* [log(n) - 5]) + ci*(64^2) (neglible second portion)
 *   -- but if there is a continuously increasing/decreasing section we can mark this as a larger portion 64 
 *  So the time complexity becomes: O(n* [log(n) - x]) where x >= 5
 *  Any decreasing section we can reverse, which is also neglible. 
 * 
 *  But when finding continuously increasing/decreasing sections we should use binary insertion sort as 
 *  it the better version of insertion sort (less comparisions)
 *   Chunk of Size (c) = c*log(c) -- for finding where to fit.. O((c^2)/2) shifts (worst case) 
 * 
 *  For merging arrays we only need to make a copy of the smaller chunk. 
 *   e.g size 3 and size 7 chunks in the array  
 *  -- make a copy of the size 3 array and then shift the other set of 7 values up 3 spaces (if it comes first), otherwise don't do anything
 *  -- Then run insertion sort on the two parts removing the extra array generated.
 * 
 * Note: There are more parts that can be implemented such as galloping, but i'll leave that till later
 */ 
let animationsArrT: cssAnimation[] = [];
let arrRefT = 0;
let arrSwapsT = 0;

let valuesTim: number[] = [];
let indexBreaksTim: number[] = [];
let ascendingTimArr: boolean[] = [];
const colgoldenYellow = "rgb(240, 220, 96)";

export function timSortWrapper(arrVal: number[]): cssAnimation []{
  animationsArrT = [];
  arrRefT =0;
  arrSwapsT =0; 
  valuesTim = arrVal;
  console.log(arrVal);
  timPartition();
  return animationsArrT;
}

function timPartition(): void{
  let start:number = 0;
  let len: number = valuesTim.length; 
  while(start < len-1){
     let isAscendingOrder: boolean = valuesTim[start+1] >= valuesTim[start];
     ascendingTimArr.push(isAscendingOrder);
     console.log("Is Ascending: " + isAscendingOrder + " with values " + valuesTim[start] + " " + valuesTim[start+1]);
     animationsArrT.push(new cssAnimation(colgoldenYellow, [start], false, false, arrRefT));
     indexBreaksTim.push(start);
     start = binaryInsertionTim(start, len, isAscendingOrder);
     console.log("FINISHED on " + start + " with value " + valuesTim[start]);
  }
  console.log(valuesTim);
  return;
}

function valueFits(isAscending: boolean, a: number, b: number): boolean{
  if(isAscending){
    return (a >= b);
 }else{
    return (a <= b);
  }
}

function binaryInsertionTim(start: number, arrLen: number, isAscending: boolean): number{

  let insertAtValue: number = -1;
  let curr = start + 1;
  let itFits: boolean;
  let tempVal: number = 0;
  let moving: number = 0;
  
  while((curr-start < 32) && (curr < (arrLen))){

    itFits = valueFits(isAscending, valuesTim[curr], valuesTim[curr - 1]);
    arrRefT+=2;

    while((itFits) && (curr < arrLen)){
      animationsArrT.push(new cssAnimation("green", [curr, curr-1], false, false, arrRefT));
      curr+=1;
      itFits = valueFits(isAscending, valuesTim[curr], valuesTim[curr - 1]);
      arrRefT+=2;
    }
    if(curr-start > 32 || curr > (arrLen-1)){ break; }

    arrRefT+=1;
    tempVal = valuesTim[curr];
    moving = curr - 1;
    insertAtValue = BSearchTim(valuesTim, start, curr-1, tempVal, isAscending);


    let recolorTim = []; 
    for(let k =start; k <= moving; k++)recolorTim.push(k);

    while (moving >= insertAtValue) {
      arrRefT++; // not swapping values, just getting one value in array and setting it to another.
      arrSwapsT++;
      valuesTim[moving + 1] = valuesTim[moving];
      animationsArrT.push(new cssAnimation("red", [moving, moving + 1], true, false, arrRefT,arrSwapsT));
      moving = moving - 1;
    }
    arrSwapsT++;
    valuesTim[moving+1] = tempVal; 
    animationsArrT.push(new cssAnimation("orange", [moving+1, tempVal], false, true, arrRefT, arrSwapsT));

    animationsArrT.push(new cssAnimation("orange", recolorTim, false, false));
    }
    return curr+1;
}

function BSearchTim(arrVal: number[], left:number, right:number, value: number, isAscending: boolean): number{
  let mid = 0;

  if(isAscending){
      if(arrVal[right] <= value ){
          arrRefT++; 
          return right+1;
      }
      while(left < right) {
          mid = left + Math.floor((right - left) / 2);
          animationsArrT.push(new cssAnimation("red", [mid], false, false, arrRefT));
          if (arrVal[mid] > value) { right =  mid; }
          else{ left = mid+1; }
          }
      if(arrVal[left] > value){ return left; }
    return left+1;
  }else{
      if(!(arrVal[right] < value )){
        arrRefT++; 
        return right+1;
    }
    while(left < right){
        mid = left + Math.floor((right - left) / 2);
        animationsArrT.push(new cssAnimation("red", [mid], false, false, arrRefT));
        if (!(arrVal[mid] > value)) { right =  mid; }
        else{ left = mid+1; }
        }
    if(!(arrVal[left] > value)){ return left; }
    return left+1;
  }
}














