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
    if (barAmount == 400) {
      bars.populateData(500);
    } else {
      bars.populateData(barAmount);
    }
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
  let amount = bars.values.length;
  bars.populateData(amount);
  bars.populateBars();
});

$("#refreshPageTitle").on("click", function () {
  window.location.reload();
});

$("#sortClick").on("click", function () {
  console.log('Sort Button Clicked');
  let anime: cssAnimation[]; // animation array. 
  switch (bars.sortingtype) {
    case "Bubble":
      anime = bubbleSort(bars.values);
      Sorting(anime, bars.Sortdelay);
      break;
    case "Insertion":
      anime = insertionSort(bars.values);
      Sorting(anime, bars.Sortdelay);
      break;
    case "Selection":
      anime = selectionSort(bars.values);
      Sorting(anime, bars.Sortdelay);
      break;
    case "Quick":
      anime = quickSortWrapper(bars.values, 0, bars.values.length-1);
      Sorting(anime, bars.Sortdelay);
      break;
    case "Merge":
      anime = mergeSortWrapper(bars.values, 0);
      bars.values = mergeSort(bars.values, 0);
      Sorting(anime, bars.Sortdelay);
      break;
    case "BInsertion":
       anime = binaryinsertionSortWrapper(bars.values);
       Sorting(anime, bars.Sortdelay);
      break;
    default:
      console.log("no valid sorting method selected");
      $('#userInfoWarning').html("Please select a valid sorting method from the drop down menu");
      break;
  }
});

// Function that show all Sorting Animations
function Sorting(CssAnimatinos: cssAnimation[], speed: number) {
  let barHtmlArr = document.getElementsByClassName("arrayBar");

  $('#ArrayReferences').html("0");
   $('#ArraySwaps').html("0");

  $("#slider-bar-amount").draggable({ disabled: true });
  $("#slider-speed-amount").draggable({ disabled: true });
  $('#sortClick').prop('disabled', true);
  $('#generateNewArrayClick').prop('disabled', true);
  $('#userInfoWarning').html("Please wait until sorting is completed or refresh your page.");
  

  for (let i = 0; i < CssAnimatinos.length; i++) {
    setTimeout(() => {

    let animate = CssAnimatinos[i];
    
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

  }, speed * (i + 1));
  }

  //Fancy finishing animation. 
  const TIME_TO_FINISH_MAIN_ANIMATION = speed * CssAnimatinos.length + 10;
  for (let i = 0; i < bars.values.length; i++) {
    setTimeout(() => {
      (<HTMLElement>barHtmlArr[i]).style.backgroundColor = "white";
    }, FANCY_ANIMATION_DELAY * i + TIME_TO_FINISH_MAIN_ANIMATION);
  }
  setTimeout(() => {
    $("#slider-bar-amount").draggable({ disabled: false });
    $("#slider-speed-amount").draggable({ disabled: false });
    $('#sortClick').prop('disabled', false);
    $('#generateNewArrayClick').prop('disabled', false);
    $('#userInfoWarning').html("");
  }, bars.values.length* FANCY_ANIMATION_DELAY + TIME_TO_FINISH_MAIN_ANIMATION);  

}
