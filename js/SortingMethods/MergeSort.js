import { cssAnimation } from "../Animations.js";
/*  Recursive Algorithm - MergeSort
 * Time Complexity: Best: O(nlog(n))  Avg: O(nlog(n))  Worst: O(nlog(n))
 * Space Complexity: O(n)
 * Note: As mergeSort is recursive there is a global animations array to push values to
 *
 * Issue/Resolution with Animations:
 * An additional variable start(indicates start of array) was added to aid with animations as
 *  when mergesort makes sub arrays to sort their indices in the larger array are unknow which
 *  makes knowing which index to change the height/color for impossible without a start variable also
 * sent as a parameter.
 */
let animationArrM = [];
let arrRefM = 0;
let arrSwapsM = 0;
const colLightOrange = "rgb(255, 239, 96)";
export function mergeSortWrapper(arrVal, start) {
    animationArrM = [];
    arrRefM = 0;
    arrSwapsM = 0;
    return animationArrM;
}
export function mergeSort(arrVal, start) {
    if (arrVal.length <= 1) {
        return arrVal;
    }
    const middle = Math.floor(arrVal.length / 2);
    const leftarr = arrVal.slice(0, middle);
    const rightarr = arrVal.slice(middle, arrVal.length);
    return merge(mergeSort(leftarr, start), mergeSort(rightarr, (start + middle)), start);
}
function merge(leftarr, rightarr, start) {
    const resultarr = [];
    let leftind = start;
    let rightind = start + leftarr.length;
    while (leftarr.length && rightarr.length) {
        console.log("Value of start is: " + start);
        animationArrM.push((new cssAnimation("green", [leftind, rightind], false, false)));
        arrRefM += 2;
        arrSwapsM++;
        if (leftarr[0] < rightarr[0]) {
            animationArrM.push((new cssAnimation("red", [leftind], false, false, arrRefM, arrSwapsM)));
            animationArrM.push((new cssAnimation(colLightOrange, [leftind], false, false)));
            animationArrM.push((new cssAnimation("red", [start, leftarr[0]], false, true)));
            resultarr.push(leftarr.shift()); // pops value off left and onto resultarr
            leftind++;
        }
        else {
            animationArrM.push((new cssAnimation("red", [rightind], false, false, arrRefM, arrSwapsM)));
            animationArrM.push((new cssAnimation(colLightOrange, [rightind], false, false)));
            animationArrM.push((new cssAnimation("red", [start, rightarr[0]], false, true)));
            resultarr.push(rightarr.shift()); // pops value off left and onto resultarr
            rightind++;
        }
        animationArrM.push((new cssAnimation(colLightOrange, [leftind, rightind], false, false)));
        start++;
    }
    while (leftarr.length) {
        arrRefM++;
        arrSwapsM++;
        animationArrM.push((new cssAnimation("red", [leftind], false, false, arrRefM, arrSwapsM)));
        animationArrM.push((new cssAnimation("rgb(246, 255, 119)", [leftind], false, false)));
        animationArrM.push((new cssAnimation("red", [start, leftarr[0]], false, true)));
        resultarr.push(leftarr.shift()); // pops value off left and onto resultarr
        leftind++;
        start++;
    }
    while (rightarr.length) {
        arrRefM++;
        arrSwapsM++;
        animationArrM.push((new cssAnimation("red", [rightind], false, false, arrRefM, arrSwapsM)));
        animationArrM.push((new cssAnimation("rgb(246, 255, 119)", [rightind], false, false)));
        animationArrM.push((new cssAnimation("red", [start, rightarr[0]], false, true)));
        resultarr.push(rightarr.shift()); // pops value off left and onto resultarr
        rightind++;
        start++;
    }
    return resultarr;
}
