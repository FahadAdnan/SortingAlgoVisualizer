import {cssAnimation} from "../Animations.js";

/*  Recursive Algorithm - QuickSort
 * Time Complexity: Best: O(nlog(n))  Avg: O(nlog(n))  Worst: O(n^2)
 * Space Complexity: O(n)
 * Note: As quicksort is recursive there is a global animations array to push values to
 */

let animationsArrQ: cssAnimation[] = [];
let arrRefQ =0;
let arrSwapsQ =0;

export function quickSortWrapper(arrVal: number[], left:number, right:number) {
  animationsArrQ = [];
   arrRefQ =0;
   arrSwapsQ =0;
  quickSort(arrVal, left, right);
  return animationsArrQ;
}

function quickSort(arrVal: number[], left:number, right:number) {
  if(arrVal.length > 1){
    let split = partition(arrVal, left, right);
    if (left < split - 1) quickSort(arrVal, left, split - 1);
    if (split < right) quickSort(arrVal, split, right);
  }
}


function swap(arrVal: number[], ind1: number, ind2: number) {
  var temp = arrVal[ind1];
  arrVal[ind1] = arrVal[ind2];
  arrVal[ind2] = temp;
}

/**
 * Partitioning done with left right pointers - Hoare Partition Scheme
 * (https://en.wikipedia.org/wiki/Quicksort#Hoare_partition_scheme)
 
 */
 function partition(arrVal: number[], left: number, right: number): number { 
  let pind = Math.floor(Math.random() * (right - left)) + left;
  let leftanimecolor = []; 
  let rightanimecolor = []; 
  arrRefQ++; 
  for(let i =0; i< pind; i++){
    leftanimecolor.push(i);
  }
  for(let i = pind; i<right; i++){
    rightanimecolor.push(i);
  }
  animationsArrQ.push((new cssAnimation("orange", leftanimecolor, false, false, arrRefQ)));
  animationsArrQ.push((new cssAnimation("green", rightanimecolor, false, false)));
  animationsArrQ.push((new cssAnimation("blue", [pind], false, false)));

  let pivot = arrVal[pind];
  let i = left; //left pointer
  let j = right; //right pointer
  while (i <= j) {
    while (arrVal[i] < pivot) {
      arrRefQ++;
       animationsArrQ.push((new cssAnimation("white", [i], false, false, arrRefQ)));
       i++;
       animationsArrQ.push((new cssAnimation("red", [i], false, false)));
    }
    while (arrVal[j] > pivot) {
      arrRefQ++;
       animationsArrQ.push((new cssAnimation("white", [j], false, false,arrRefQ)));
       j--;
       animationsArrQ.push((new cssAnimation("red", [j], false, false)));
    }
    if (i <= j) {
      arrSwapsQ++;
      arrRefQ+=2;
      animationsArrQ.push((new cssAnimation("red", [i,j], true, false, arrRefQ, arrSwapsQ)));
      swap(arrVal, i, j); 
      i++;
      j--;
    }
  }
  animationsArrQ.push((new cssAnimation("white", [pind], false, false)));
  return i;
}
