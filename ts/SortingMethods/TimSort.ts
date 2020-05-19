import {cssAnimation} from "../Animations.js";

/*  Hybrid Sorting - Tim Sort
 * Time Complexity: Best: O(nlog(n))  Avg: O(nlog(n))  Worst: O(nlog(n))
 * Space Complexity: 
 */
let animationsArrT: cssAnimation[] = [];
let arrRefT = 0;
let arrSwapsT = 0;

export function binaryinsertionSortWrapper(arrVal: number[]): cssAnimation []{
  animationsArrT = [];
  arrRefT =0;
  arrSwapsT =0; 
  binaryinsertionSort(arrVal);
  return animationsArrT;
}


 function binaryinsertionSort(arrVal: number[]): cssAnimation []{
    const len = arrVal.length;
    animationsArrT.push(new cssAnimation("orange", [0], false, false));
    var insertVal = 0;
    let recolor = []; 

    for (let i = 1; i < len; i++) {
      
      arrRefT +=2; 
      while(arrVal[i] >= arrVal[i-1]){
        animationsArrT.push(new cssAnimation("green", [i, i-1], false, false, arrRefT));
        arrRefT +=2; 
        i++;
      }
      arrRefT++;
      insertVal = arrVal[i];
      console.log(insertVal);
      animationsArrT.push(new cssAnimation("green", [i], false, false, arrRefT));
      let j = i - 1;
        
      let insertAt = BSearch(arrVal, 0, j, insertVal);


      while (j >= insertAt!) {
        arrRefT++; // not swapping values, just getting one value in array and setting it to another.
        arrSwapsT++;
        arrVal[j + 1] = arrVal[j];
        animationsArrT.push(new cssAnimation("red", [j, j + 1], true, false, arrRefT,arrSwapsT));
        j = j - 1;
      }
      arrSwapsT++;
      arrVal[j+1] = insertVal;
      animationsArrT.push(new cssAnimation("orange", [j+1, insertVal], false, true, arrRefT, arrSwapsT));

      recolor = []; 
      for(let k =0; k<= i; k++)recolor.push(k);
      animationsArrT.push(new cssAnimation("orange", recolor, false, false));

    }
    return animationsArrT;
}

function BSearch(arrVal: number[], left:number, right:number, value: number){
    let mid = 0;
    if(arrVal[right] <= value ){
        arrRefT++; 
        return right+1;
    }
    while(left < right) {
        mid = left + Math.floor((right - left) / 2);
        animationsArrT.push(new cssAnimation("red", [mid], false, false, arrRefT));
         if (arrVal[mid] > value) {
            arrRefT++
            right =  mid;
        }else{
          arrRefT++
          left = mid+1;
    }
  }
  arrRefT++;
  if(arrVal[left] > value){
    return left;
  }
  else return left+1;
}



let runArr: (number[])[]=[];

function TimSort(arrVal: number[]): number []{
     let goneThrough =0;
     const len = arrVal.length;
     while(goneThrough < len){
       let currInd = BInsertionSort(arrVal, goneThrough);
       goneThrough+=currInd;
     }
     while(runArr.length >= 2){
       runArr.push(timMerge(runArr[runArr.length], runArr[1]));
       runArr.slice(2,runArr.length);
     }
     return runArr[0];
}

function timMerge(arr1: number[], arr2:number[]){
   let end = arr1.length+arr2.length-1;
   let p1 = arr1.length-1;
   let p2 = arr2.length-1;
   while(p1 >= 0 && p2 >= 0){
     if(arr1[p1] >= arr2[p2]) arr1[end--] = arr1[p1--];
     else arr1[end--] = arr2[p2--];
   }
   while(p1 >= 0) arr1[end--] = arr1[p1--];
   while(p2 >= 0) arr1[end--] = arr2[p2--];

   return arr1;
  }

function BInsertionSort(arrVal: number[], goneThrough:number ): number{
    const len = 32;
    var insertVal = 0;
    let count = goneThrough+1;
    while  (count < 32) {
      //continually add values if they're sorted
      while(arrVal[count] >= arrVal[count-1])count++;

      insertVal = arrVal[count];
      let j = count - 1;
      let insertAt = BSearch(arrVal, goneThrough, j, insertVal);
      while (j >= insertAt!) {
        arrVal[j + 1] = arrVal[j];
        j = j - 1;
      }
      arrVal[j+1] = insertVal;
    }
    console.log(arrVal);
    return arrVal.length;
  }

  function BinaryS(arrVal: number[], left:number, right:number, value: number){
    let mid = 0;
    if(arrVal[right] <= value ){
        return right+1;
    }
    while(left < right) {
        mid = left + Math.floor((right - left) / 2);
         if (arrVal[mid] > value) {
            right =  mid;
        }else{
            left = mid+1;
    }
  }
  if(arrVal[left] > value){
    return left;
  }
  else return left+1;
}


