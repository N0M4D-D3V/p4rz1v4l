import { Component, OnInit } from "@angular/core";
import { blogcard, blogcards } from "./blog-cards-data";

@Component({
  selector: "app-blog-cards",
  templateUrl: "./blog-cards.component.html",
})
export class BlogCardsComponent {
  blogcards: blogcard[];

  constructor() {
    this.blogcards = blogcards;
  }
}
