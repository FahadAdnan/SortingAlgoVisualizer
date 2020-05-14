/**
 * cssAniamtion Object
 *  - Stores the type and indecies of bars to do animations on.
 *  - Swaps are for swapping two values
 *  - setVal is for setting bar #:values[0] with height:values[1]
 */
export class cssAnimation {
    constructor(color, data, swaps, setVal, ArrRefs = 0, ArrSwaps = 0) {
        this.color = color;
        this.values = data;
        this.swaps = swaps;
        this.setVal = setVal;
        this.arrSwaps = ArrSwaps;
        this.arrRefs = ArrRefs;
        ;
    }
}
