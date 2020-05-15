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
        for (let i = 0; i < amount; i++) {
            console.log("pushed a value");
            this.values.push(Math.floor(Math.random() * (max - MIN_BAR_HEIGHT)) + MIN_BAR_HEIGHT);
        }
    }
    populateBars() {
        var barHolder = document.getElementById('barHolder');
        console.log("Got here");
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
        while (this.values.length) {
            this.values.pop();
        }
    }
}
