const MIN_BAR_HEIGHT = 10;
export class barsGroup {
    constructor(sortingtype, data, Sortdelay, maxHeight) {
        this.sortingtype = sortingtype;
        this.values = data;
        this.isSorting = false;
        this.Sortdelay = Sortdelay;
        this.maxHeight = maxHeight;
        this.cssAnime = [];
    }
    populateData(amount) {
        this.clearArray();
        const max = this.maxHeight;
        let val;
        for (let i = 0; i < amount; i++) {
            console.log("pushed a value");
            let val = Math.floor(Math.random() * (max - MIN_BAR_HEIGHT)) + MIN_BAR_HEIGHT;
            if (typeof (val) != 'undefined') {
                this.values.push(val);
            }
            ;
        }
    }
    populateBars() {
        var barHolder = document.getElementById('barHolder');
        let row;
        let amount = this.values.length;
        if (barHolder) {
            while (barHolder.firstChild) {
                barHolder.firstChild.remove();
            }
            for (let i = 0; i < amount; i++) {
                row = `<div class = "flex-fill arrayBar" style="height:${this.values[i]}px;"></div>`;
                barHolder.innerHTML += row;
            }
        }
    }
    clearArray() {
        this.values = [];
    }
}
