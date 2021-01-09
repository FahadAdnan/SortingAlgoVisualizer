import { cssAnimation } from "../Animations.js";
let animationsArrBI = [];
let arrRefBI = 0;
let arrSwapsBI = 0;
export function binaryinsertionSortWrapper(arrVal) {
    animationsArrBI = [];
    arrRefBI = 0;
    arrSwapsBI = 0;
    binaryinsertionSort(arrVal);
    return animationsArrBI;
}
function binaryinsertionSort(arrVal) {
    const len = arrVal.length;
    animationsArrBI.push(new cssAnimation("orange", [0], false, false));
    var insertVal = 0;
    let recolor = [];
    for (let i = 1; i < len; i++) {
        arrRefBI += 2;
        while (arrVal[i] >= arrVal[i - 1]) {
            animationsArrBI.push(new cssAnimation("green", [i, i - 1], false, false, arrRefBI));
            arrRefBI += 2;
            i++;
        }
        arrRefBI++;
        insertVal = arrVal[i];
        console.log(insertVal);
        animationsArrBI.push(new cssAnimation("green", [i], false, false, arrRefBI));
        let j = i - 1;
        let insertAt = BSearch(arrVal, 0, j, insertVal);
        while (j >= insertAt) {
            arrRefBI++; // not swapping values, just getting one value in array and setting it to another.
            arrSwapsBI++;
            arrVal[j + 1] = arrVal[j];
            animationsArrBI.push(new cssAnimation("red", [j, j + 1], true, false, arrRefBI, arrSwapsBI));
            j = j - 1;
        }
        arrSwapsBI++;
        arrVal[j + 1] = insertVal;
        animationsArrBI.push(new cssAnimation("orange", [j + 1, insertVal], false, true, arrRefBI, arrSwapsBI));
        recolor = [];
        for (let k = 0; k <= i; k++)
            recolor.push(k);
        animationsArrBI.push(new cssAnimation("orange", recolor, false, false));
    }
    return animationsArrBI;
}
function BSearch(arrVal, left, right, value) {
    let mid = 0;
    if (arrVal[right] <= value) {
        arrRefBI++;
        return right + 1;
    }
    while (left < right) {
        mid = left + Math.floor((right - left) / 2);
        animationsArrBI.push(new cssAnimation("red", [mid], false, false, arrRefBI));
        if (arrVal[mid] > value) {
            right = mid;
        }
        else {
            left = mid + 1;
        }
        arrRefBI++;
    }
    arrRefBI++;
    if (arrVal[left] > value) {
        return left;
    }
    else
        return left + 1;
}
