var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { barsGroup } from "./BarGroup.js";
import { mergeSortWrapper, mergeSort } from "./SortingMethods/MergeSort.js";
import { quickSortWrapper } from "./SortingMethods/QuickSort.js";
import { timSortWrapper } from "./SortingMethods/TimSort.js";
import { binaryinsertionSortWrapper } from "./SortingMethods/BInsertion.js";
import { bubbleSort, insertionSort, selectionSort } from "./SortingMethods/SimpleAlgorithms.js";
const DEFAULT_AMOUNT_OF_BARS = 285;
const DEFAULT_DELAY_TIME = 11;
const DEFAULT_MAX_HEIGHT = 700; //px
const FANCY_ANIMATION_DELAY = 5;
const SAFETY_PIXEL_DIFF_HEIGHT = 10; //px
const MAX_SPEED_VALUE = 380;
let ADJUST_TO_SCREEN_SIZE = 1; // multipler for number for # of bars.
let bars = new barsGroup("none", [], DEFAULT_DELAY_TIME, DEFAULT_AMOUNT_OF_BARS);
$(document).ready(function () {
    let maxheight = $(window).innerHeight();
    let windowWidth = $(window).innerWidth();
    const navHeight = $("#navigationbar").innerHeight();
    if (maxheight && navHeight)
        bars.maxHeight = maxheight - navHeight - SAFETY_PIXEL_DIFF_HEIGHT;
    else
        bars.maxHeight = DEFAULT_MAX_HEIGHT;
    if (windowWidth && windowWidth < 700)
        ADJUST_TO_SCREEN_SIZE = 0.6;
    bars.populateData(Math.floor(DEFAULT_AMOUNT_OF_BARS * ADJUST_TO_SCREEN_SIZE));
    bars.populateBars();
});
$("#slider-bar-amount").draggable({
    axis: "x",
    containment: "#sliderbars",
    stop: () => {
        let barAmount = parseInt($("#sliderbars").css("margin-left")) + $("#slider-bar-amount").position().left;
        console.log("Amount of bars" + barAmount);
        bars.populateData(Math.floor(barAmount * ADJUST_TO_SCREEN_SIZE));
        bars.populateBars();
    },
});
$("#slider-speed-amount").draggable({
    axis: "x",
    containment: "#sliderspeed",
    drag: () => {
        let delay = $("#slider-speed-amount").position().left -
            parseInt($("#sliderspeed").css("margin-left"));
        bars.Sortdelay = Math.floor((MAX_SPEED_VALUE - delay) / 6);
    },
});
$(".sortType").on("click", function () {
    let sort = $(this).data("order");
    bars.sortingtype = sort;
    $("#navbarDropdown").html(sort);
    $('#userInfoWarning').html("");
    console.log("sorting method changed to " + sort + " Sort");
});
$("#generateNewArrayClick").on("click", function () {
    bars.isSorting = false; //break out of process if currently sorting 
    bars.populateData(bars.values.length);
    bars.populateBars();
    bars.cssAnime = []; // clear the animations array
    unlockElementFinishedSorting(); // reset to default settings
    $('#sortClick').attr("data-sort", 'start');
});
/**
 * The sorting button switches between 3 states.
 * - SORT - start a new sorting animation
 * - STOP - stop the sorting animation
 * - RESTART - restart the sorting animation
 */
$("#sortClick").on("click", function () {
    if ($(this).attr('data-sort') == 'stop') {
        bars.isSorting = false; // stop sorting
        //switch button to restart mode. 
        $('#sortClick').html('Restart');
        $('#sortClick').removeClass('btn-danger');
        $('#sortClick').addClass('btn-info');
        $('#sortClick').attr("data-sort", 'restart');
    }
    else if ($(this).attr('data-sort') == 'restart') {
        bars.isSorting = true; // continue sorting 
        console.log('Pressed Restart Button');
        Sorting();
    }
    else {
        bars.isSorting = true; // start sorting 
        console.log('Pressed Sort Button');
        console.log(bars.sortingtype);
        switch (bars.sortingtype) {
            case "Bubble":
                bars.cssAnime = bubbleSort(bars.values);
                Sorting();
                break;
            case "Insertion":
                bars.cssAnime = insertionSort(bars.values);
                Sorting();
                break;
            case "Selection":
                bars.cssAnime = selectionSort(bars.values);
                Sorting();
                break;
            case "Quick":
                bars.cssAnime = quickSortWrapper(bars.values, 0, bars.values.length - 1);
                Sorting();
                break;
            case "Merge":
                bars.cssAnime = mergeSortWrapper(bars.values, 0);
                bars.values = mergeSort(bars.values, 0);
                Sorting();
                break;
            case "BInsertion":
                bars.cssAnime = binaryinsertionSortWrapper(bars.values);
                Sorting();
                break;
            case "Tim":
                bars.cssAnime = timSortWrapper(bars.values);
                Sorting(true);
                break;
            default:
                console.log("no valid sorting method selected");
                $('#userInfoWarning').html("Please select a valid sorting method from the drop down menu");
                break;
        }
    }
});
function lockElementsShowTextForSorting() {
    $('#ArrayReferences').html("0");
    $('#ArraySwaps').html("0");
    $("#slider-bar-amount").draggable({ disabled: true });
    $('#sortClick').html('STOP');
    $('#sortClick').removeClass('btn-primary');
    $('#sortClick').removeClass('btn-info');
    $('#sortClick').addClass('btn-danger');
    $('#sortClick').attr("data-sort", 'stop');
}
function unlockElementFinishedSorting() {
    $("#slider-bar-amount").draggable({ disabled: false });
    $('#sortClick').prop('disabled', false);
    $('#userInfoWarning').html("");
    $('#sortClick').html('SORT');
    $('#sortClick').addClass('btn-primary');
    $('#sortClick').removeClass('btn-danger');
    $('#sortClick').removeClass('btn-info');
    $('#sortClick').attr("data-sort", 'start');
}
function Sorting(isNotFinished = false) {
    return __awaiter(this, void 0, void 0, function* () {
        let len = bars.cssAnime.length;
        let barHtmlArr = document.getElementsByClassName("arrayBar");
        lockElementsShowTextForSorting();
        let speed = bars.Sortdelay;
        for (let i = 0; i < len; i++) {
            speed = bars.Sortdelay;
            if (!bars.isSorting)
                break;
            else {
                yield sleep(speed);
                showOneAnimation(bars.cssAnime.shift());
            }
        }
        //If sorting finishes - Show fancy Ending Animation
        if (bars.isSorting) {
            for (let i = 0; i < bars.values.length; i++) {
                yield sleep(FANCY_ANIMATION_DELAY);
                barHtmlArr[i].style.backgroundColor = "white";
            }
            if (isNotFinished) {
                alert("I have been busy with school so merging runs on tim sort is not yet finished, thanks for understanding :D");
            }
            unlockElementFinishedSorting(); //unlock all locked features(sliderbar, change info txt)
        }
    });
}
function showOneAnimation(animate) {
    return __awaiter(this, void 0, void 0, function* () {
        let barHtmlArr = document.getElementsByClassName("arrayBar");
        if (!animate)
            return;
        if (animate.setVal) { // setting height to value(index)
            if (animate.values.length < 2)
                return;
            barHtmlArr[animate.values[0]].style.height = `${animate.values[1]}px`;
        }
        else if (animate.swaps) { //swapping two values(index)
            if (animate.values.length < 2)
                return;
            let temp = barHtmlArr[animate.values[0]].style.height;
            let temp2 = barHtmlArr[animate.values[1]].style.height;
            barHtmlArr[animate.values[0]].style.height = temp2;
            barHtmlArr[animate.values[1]].style.height = temp;
        }
        else { //setting color to values
            for (let position of animate.values) {
                if (barHtmlArr[position])
                    (barHtmlArr[position]).style.backgroundColor = animate.color;
            }
        }
        if (animate.arrRefs != 0)
            $('#ArrayReferences').html(animate.arrRefs.toString());
        if (animate.arrSwaps != 0)
            $('#ArraySwaps').html(animate.arrSwaps.toString());
    });
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
