import {barsGroup} from "./BarGroup.js";
import {cssAnimation} from "./Animations.js";
import {mergeSortWrapper, mergeSort} from "./SortingMethods/MergeSort.js";
import {quickSortWrapper} from "./SortingMethods/QuickSort.js";
import {binaryinsertionSortWrapper} from "./SortingMethods/TimSort.js";
import {bubbleSort,insertionSort,selectionSort} from "./SortingMethods/SimpleAlgorithms.js";

const DEFAULT_AMOUNT_OF_BARS = 285;
const DEFAULT_DELAY_TIME = 11;
const DEFAULT_MAX_HEIGHT = 700; //px
const FANCY_ANIMATION_DELAY = 5; 

let bars = new barsGroup("none", [], DEFAULT_DELAY_TIME, DEFAULT_AMOUNT_OF_BARS);

$(document).ready(function () {
  let maxheight = $(window).innerHeight();
  const navHeight = $("#navigationbar").innerHeight();
  console.log(navHeight);

  if (maxheight && navHeight) {
    maxheight -= navHeight;
    bars.maxHeight = maxheight;
  }else{
   bars.maxHeight = DEFAULT_MAX_HEIGHT;
  }
  bars.populateData(DEFAULT_AMOUNT_OF_BARS);
  bars.populateBars();
});

$("#slider-bar-amount").draggable({
  axis: "x",
  containment: "#sliderbars",
  stop: function (event) {
    let barAmount =
      parseInt($("#sliderbars").css("margin-left")) +
      $("#slider-bar-amount").position().left;
    console.log("Amount of bars" + barAmount);
    bars.populateData(barAmount);
    bars.populateBars();
  },
});

$("#slider-speed-amount").draggable({
  axis: "x",
  containment: "#sliderspeed",
  drag: function (event) {
    const MAX_SPEED_VALUE = 380; 
    let delay =
      $("#slider-speed-amount").position().left -
      parseInt($("#sliderspeed").css("margin-left"));
      if(delay == MAX_SPEED_VALUE){
        bars.Sortdelay =0;
        console.log("MAX SPEEEEED");
      }
      bars.Sortdelay = Math.floor((MAX_SPEED_VALUE - delay)/8);
    
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
  bars.isSorting = false;
  bars.cssAnime = [];
  bars.populateData(bars.values.length);
  bars.populateBars();
  $('#sortClick').html('SORT');
  $('#sortClick').removeClass('btn-danger');
  $('#sortClick').removeClass('btn-info');
  $('#sortClick').addClass('btn-primary');
  $('#sortClick').attr('data-sort','start');

});


$("#sortClick").on("click", function () {
  if($(this).attr('data-sort') == 'stop'){
    bars.isSorting = false;
    $('#sortClick').html('Restart');
    $('#sortClick').removeClass('btn-danger');
    $('#sortClick').addClass('btn-info');
    $('#sortClick').attr("data-sort", 'restart');

  }else if($(this).attr('data-sort') == 'restart'){
    bars.isSorting=true;
    console.log('Got to restart section');
    Sorting();
  }else{
  bars.isSorting = true;
  console.log('Sort Button Clicked');
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
      bars.cssAnime = quickSortWrapper(bars.values, 0, bars.values.length-1);
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
    default:
      console.log("no valid sorting method selected");
      $('#userInfoWarning').html("Please select a valid sorting method from the drop down menu");
      break;
  } 
}
});


function lockElementsShowTextForSorting(){
  $('#ArrayReferences').html("0");
  $('#ArraySwaps').html("0");
  $("#slider-bar-amount").draggable({ disabled: true });
  
  $('#sortClick').html('STOP');
  $('#sortClick').removeClass('btn-primary');
  $('#sortClick').removeClass('btn-info');
  $('#sortClick').addClass('btn-danger');
  $('#sortClick').attr("data-sort", 'stop');

  $('#userInfoWarning').html("Please wait until sorting is completed or refresh your page.");
}

async function Sorting() {
  let len = bars.cssAnime.length;
  let barHtmlArr = document.getElementsByClassName("arrayBar");
  lockElementsShowTextForSorting();

  let speed = bars.Sortdelay;

  for (let i= 0; i < len;i++) {
     speed = bars.Sortdelay;
     if(!bars.isSorting){
      $("#sortClick").attr('data-sort') == 'restart';
      break;
    }else{
      await sleep(speed);
      showOneAnimation(bars.cssAnime.shift()!);
    }
  }

    // if you finish sorting then show the fancy finishing animation.
  if (bars.isSorting){ 
    for (let i=0; i < bars.values.length; i++) {
      await sleep(FANCY_ANIMATION_DELAY);
      (<HTMLElement>barHtmlArr[i]).style.backgroundColor = "white";
    }
  }  

  if(bars.isSorting){
    $("#slider-bar-amount").draggable({ disabled: false });
    $('#sortClick').prop('disabled', false);
    $('#userInfoWarning').html(""); 

    $('#sortClick').html('SORT');
    $('#sortClick').addClass('btn-primary');
    $('#sortClick').removeClass('btn-danger');
    bars.isSorting = true;
}
}

async function showOneAnimation(animate: cssAnimation){
  let barHtmlArr = document.getElementsByClassName("arrayBar");
  if (!animate) return;
    if(animate.setVal){ // setting height to value
      if(animate.values.length < 2) return;
      (<HTMLElement>barHtmlArr[animate.values[0]]).style.height = `${animate.values[1]}px`;
    
    } else if (animate.swaps) { //swapping two values
        if(animate.values.length < 2) return;
        let temp = (<HTMLElement>barHtmlArr[animate.values[0]]).style.height;
        let temp2 =  (<HTMLElement>barHtmlArr[animate.values[1]]).style.height;
        (<HTMLElement>barHtmlArr[animate.values[0]]).style.height = temp2;
        (<HTMLElement>barHtmlArr[animate.values[1]]).style.height = temp;

      } else { //setting color to values
        for (let position of animate.values) { 
          if (barHtmlArr[position]) (<HTMLElement>(barHtmlArr[position])).style.backgroundColor =  animate.color;
        }
    }
    if(animate.arrRefs != 0) $('#ArrayReferences').html(animate.arrRefs.toString());
    if(animate.arrSwaps != 0) $('#ArraySwaps').html(animate.arrSwaps.toString());
}

function sleep(ms:number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

