/**
 * cssAniamtion Object 
 *  - Stores the type and indecies of bars to do animations on.
 *  - Swaps are for swapping two values 
 *  - setVal is for setting bar #:values[0] with height:values[1]
 */
export class cssAnimation {
    color:string;     
    values: number[]; 
    swaps: boolean;  
    setVal: boolean;
    arrSwaps : number;
    arrRefs: number; 
    constructor(color: string, data: number[], swaps:boolean, setVal: boolean, ArrRefs: number = 0, ArrSwaps: number = 0 ){
        this.color = color;
        this.values = data;
        this.swaps = swaps;
        this.setVal = setVal;
        this.arrSwaps = ArrSwaps;
        this.arrRefs = ArrRefs;;
    }
}