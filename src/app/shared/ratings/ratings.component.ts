import { Component, Input, EventEmitter, Output, OnInit } from "@angular/core";

@Component({
  selector: 'ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss'],
})
export class RatingsComponent implements OnInit {

  @Input("rating") rating: number = 0;
  @Input("sizeInEm") sizeInEm: number = 1;
  @Input("type") type: "r" | "rw" = 'rw';
  @Input("icon") icon: "star" | "heart" = "star"
  @Input("successColor") successColor: string = "#12B17E"
  @Input("mediumColor") mediumColor: string = "#F99B58"
  @Input("dangerColor") dangerColor: string = "#E45E4F"
  NO_COLOR: string = "grey";

  @Output() ratingChange: EventEmitter<number> = new EventEmitter();

  iconClass: string;
  ratingHover: boolean = false;

  constructor() { }

  ngOnInit() {
    if (this.icon === "star") {
      this.iconClass = "fa fa-star"
    } else if (this.icon === "heart") {
      this.iconClass = "fa fa-heart"
    }
  }

  rate(index: number) {
    if (this.type === 'r')
      return;
    this.rating = index;
    this.ratingHover = true
    this.ratingChange.emit(this.rating);
  }

  mouseLeave() {
    if (this.type === 'r' || this.ratingHover) {
      return;
    }
    this.rating = 0
  }

  mouseOver(index: number) {
    if (this.type === 'r' || this.ratingHover)
      return;
    this.rating = index;
  }

  getColor(index: number) {
    if (this.isAboveRating(index)) {
      return this.NO_COLOR;
    }
    switch (this.rating) {
      case 1:
      case 2:
        return this.dangerColor;
      case 3:
        return this.mediumColor;
      case 4:
      case 5:
        return this.successColor;
      default:
        return this.NO_COLOR;
    }
  }

  isAboveRating(index: number): boolean {
    return index > this.rating;
  }
}



