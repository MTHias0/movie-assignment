import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WatchListService } from 'src/app/services/watchlist.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent {

  @Input() movieId : any;
  @Input() title: string = '';
  @Input() genre: string = '';
  @Input() rating: number = 0;
  
  public isHovered: boolean = false;

  constructor(private watchListService: WatchListService){}
  
  public toggleWatchList(): void {
    this.isInWatchList() ? 
    this.watchListService.removeFromWatchList(this.movieId) :
    this.watchListService.addToWatchList(this.movieId);
  }

  public isInWatchList(): boolean {
    return this.watchListService.isInWatchList(this.movieId);
  }

  public handleMouseEnter(): void {
    this.isHovered = true;
  }

  public handleMouseLeave(): void {
    this.isHovered = false
  }
}
