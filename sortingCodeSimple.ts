//default code for sorting algorithms for reference.-
/**
 * Bubble Sort 
 */

function bubbleSortA(arrVal: number[]): number []{
    const len = arrVal.length;
  
    let swaps: boolean = true; 
    for (let i = 0; i < len; i++) {
  
      if(!swaps) break;
      swaps = false;
  
      for (let j = 0; j < len - 1 - i; j++) {
        if (arrVal[j] > arrVal[j + 1]) {
          let tmp = arrVal[j];
          arrVal[j] = arrVal[j + 1];
          arrVal[j + 1] = tmp;
          swaps = true;
        }
      }
    }
    return arrVal;
  }
  
/**
 * Selection Sort 
 */

 
function selectionSortA(arrVal: number[]): number[] {

    const len = arrVal.length;
    let max = 0;
    
    for (let i = 0; i < len; i++) {
      max = 0;
      for (let j = 1; j < len - i; j++) {
        if (arrVal[j] >= arrVal[max]) max = j;
      }
      if (max != len - i - 1) {
        var temp = arrVal[len - 1 - i]; 
        arrVal[len - 1 - i] = arrVal[max];
        arrVal[max] = temp;
      }
    }
    return arrVal;
  }

  /**
 * Insertion Sort 
 */

function insertionSortA(arrVal: number[]): number[] {
    const len = arrVal.length;
    for (let i = 1; i < len; i++) {
      let insertVal = arrVal[i];
      let j = i - 1;
      while (j >= 0 && arrVal[j] > insertVal) {
        arrVal[j + 1] = arrVal[j];
        j = j - 1;
      }
      arrVal[j + 1] = insertVal;
    }
    return arrVal;
  }


/**
 * Merge Sort 
 */
function mergeSortA(arrVal: number[]): number[]{
    if(arrVal.length <= 1) return arrVal;    
    const middle = Math.floor(arrVal.length/2);
    const leftarr = arrVal.slice(0, middle);
    const rightarr = arrVal.slice(middle, arrVal.length);
    return mergeA(mergeSort(leftarr), mergeSort(rightarr));
  }
  
  function mergeA(leftarr: number [], rightarr: number[]): number []{
    const resultarr: number [] = [];

    while(leftarr.length && rightarr.length){
      if(leftarr[0] < rightarr[0]) resultarr.push(leftarr.shift()!); 
      else resultarr.push(rightarr.shift()!);
    }
      while(leftarr.length) resultarr.push(leftarr.shift()!);
      while(rightarr.length) resultarr.push(rightarr.shift()!); 
      
    return resultarr;
  }

  
/**
 * Quick Sort 
 */
  


function quickSortA(arrVal: number[], left:number, right:number) {
  if(arrVal.length > 1){
    let split = partition(arrVal, left, right);
    if (left < split - 1) quickSort(arrVal, left, split - 1);
    if (split < right) quickSort(arrVal, split, right);
  }
  return arrVal;
}

function swapA(arrVal: number[], ind1: number, ind2: number) {
  var temp = arrVal[ind1];
  arrVal[ind1] = arrVal[ind2];
  arrVal[ind2] = temp;
}

 function partitionA(arrVal: number[], left: number, right: number): number { 
  let pind = Math.floor(Math.random() * (right - left)) + left;

  let pivot = arrVal[pind];
  let i = left; //left pointer
  let j = right; //right pointer
  while (i <= j) {
    while (arrVal[i] < pivot) i++;
    while (arrVal[j] > pivot) j--;
    if (i <= j) {
      swap(arrVal, i, j); 
      i++;
      j--;
    }
  }
  return i;
}

  
/**
 * Binary Insertion Sort 
 */
  


function binaryinsertionSortA(arrVal: number[]): number []{
    const len = arrVal.length;
    var insertVal = 0;

    for (let i = 1; i < len; i++) {
      while(arrVal[i] >= arrVal[i-1]) i++;
      
      insertVal = arrVal[i];
      let j = i - 1;
      let insertAt = BSearchA(arrVal, 0, j, insertVal);
      while (j >= insertAt!) {
        arrVal[j + 1] = arrVal[j];
        j = j - 1;
      }
      arrVal[j+1] = insertVal;
    }
    return arrVal;
}
//An altered version of binary sort that finds the first greater value if it exists 
function BSearchA(arrVal: number[], left:number, right:number, value: number){
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
