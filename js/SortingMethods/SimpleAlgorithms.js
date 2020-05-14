import { cssAnimation } from "../Animations.js";
/*  Simple Algorithms
 *  - Includes all algorithms with an averge O(n^2) runtime that don't use recursion.
 *  - Includes Selection Sort, Insertion Sort and Bubble Sort
 */
/* Bubble Sort
 * Time Complexity: Best: O(n)  Avg: O(n^2)  Worst: O(n^2)
 * Space Complexity: O(1)
 */
export function bubbleSort(arrVal) {
    const len = arrVal.length;
    const animationsArr = [];
    let arrRefs = 0;
    let arrSwaps = 0;
    let swaps = true;
    for (let i = 0; i < len; i++) {
        if (!swaps) { //if no more swaps occur array is sorted
            const colorarr = [];
            for (let k = 0; k < len - i; k++) {
                colorarr.push(k);
            }
            animationsArr.push(new cssAnimation("orange", colorarr, false, false));
            break;
        }
        swaps = false;
        for (let j = 0; j < len - 1 - i; j++) {
            arrRefs += 2;
            animationsArr.push(new cssAnimation("green", [j, j + 1], false, false, arrRefs));
            if (arrVal[j] > arrVal[j + 1]) {
                arrSwaps++;
                let tmp = arrVal[j];
                arrVal[j] = arrVal[j + 1];
                arrVal[j + 1] = tmp;
                animationsArr.push(new cssAnimation("red", [j, j + 1], true, false, arrRefs, arrSwaps));
                swaps = true;
            }
            animationsArr.push(new cssAnimation("white", [j], false, false));
        }
        animationsArr.push(new cssAnimation("orange", [len - 1 - i], false, false));
    }
    return animationsArr;
}
/* Selection Sort
 * Time Complexity: Best: O(n^2)  Avg: O(n^2)  Worst: O(n^2)
 * Space Complexity: O(1)
 */
export function selectionSort(arrVal) {
    const animationsArr = [];
    const len = arrVal.length;
    let max = 0;
    let arrRefs = 0;
    let arrSwaps = 0;
    for (let i = 0; i < len; i++) {
        max = 0;
        animationsArr.push(new cssAnimation("yellow", [max], false, false));
        for (let j = 1; j < len - i; j++) {
            arrRefs += 2;
            animationsArr.push(new cssAnimation("green", [j], false, false, arrRefs));
            if (arrVal[j] >= arrVal[max]) {
                animationsArr.push(new cssAnimation("white", [max], false, false));
                max = j;
                animationsArr.push(new cssAnimation("yellow", [max], false, false));
            }
            else {
                animationsArr.push(new cssAnimation("white", [j], false, false));
            }
        }
        if (max != len - i - 1) {
            arrRefs += 2;
            arrSwaps++;
            var temp = arrVal[len - 1 - i];
            animationsArr.push(new cssAnimation("red", [max, len - 1 - i], true, false, arrRefs, arrSwaps));
            animationsArr.push(new cssAnimation("white", [max], false, false));
            arrVal[len - 1 - i] = arrVal[max];
            arrVal[max] = temp;
        }
        animationsArr.push(new cssAnimation("orange", [len - 1 - i], false, false));
    }
    return animationsArr;
}
/* Insertion Sort
 * Time Complexity: Best: O(n)  Avg: O(n^2)  Worst: O(n^2)
 * Space Complexity: O(1)
 */
export function insertionSort(arrVal) {
    const animationsArr = [];
    const len = arrVal.length;
    animationsArr.push(new cssAnimation("orange", [0], false, false));
    let arrRefs = 0;
    let arrSwaps = 0;
    for (let i = 1; i < len; i++) {
        arrRefs++;
        let insertVal = arrVal[i];
        animationsArr.push(new cssAnimation("green", [i], false, false, arrRefs));
        let j = i - 1;
        while (j >= 0 && arrVal[j] > insertVal) {
            arrRefs += 2;
            arrSwaps++;
            arrVal[j + 1] = arrVal[j];
            animationsArr.push(new cssAnimation("red", [j, j + 1], true, false, arrRefs, arrSwaps));
            j = j - 1;
            animationsArr.push(new cssAnimation("orange", [j], false, false));
        }
        arrVal[j + 1] = insertVal;
        animationsArr.push(new cssAnimation("orange", [j + 1, insertVal], false, true, arrRefs, arrSwaps));
        animationsArr.push(new cssAnimation("orange", [i], false, false));
    }
    return animationsArr;
}
