import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Subscription } from 'rxjs';
import { movies } from 'src/api/movies';
import { WatchListService } from 'src/app/services/watchlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeInOunt', [
      transition(':enter', [
        style({ opacity: 0}),
        animate('500ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})

export class HomeComponent implements OnInit, OnDestroy  {

  @Output() searchEvent = new EventEmitter<string>();

  public bannerResult: any = [];
  public movies = movies;
  public carrouselMovies = movies;
  public watchlist: any = [];
  public searchValue: string = '';
  public activeIndex = 0;
  public timerId: any;
  public showWatchList: boolean = false;

  private watchlistUpdatedSubscription!: Subscription;

  constructor(private watchListService: WatchListService){}

ngOnInit(): void {
  this.startTimer();
  this.fixMovieName(this.movies);
  this.setWatchList();
  console.log(movies)
  this.watchlistUpdatedSubscription = this.watchListService.watchlistUpdated.subscribe(() => {
    this.setWatchList();
  });
}

ngOnDestroy(): void {
    this.watchlistUpdatedSubscription.unsubscribe();
}

public search() {
  this.searchEvent.emit(this.searchValue);
  const filteredMovies = this.movies.filter(
    (movie) => {

      return movie.title.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      movie.genre.toLowerCase().includes(this.searchValue.toLowerCase() || '')
    }
  );

  !this.searchValue ? this.movies = movies :
  filteredMovies.length === 0 ? this.movies = movies :
  this.movies = filteredMovies;
  
}

public next(){
  this.resetTimer()
  this.activeIndex = (this.activeIndex + 1) % this.carrouselMovies.length;
}

public previous(){
  this.resetTimer();
  this.activeIndex = (this.activeIndex - 1) % this.carrouselMovies.length;
  if(this.activeIndex === -1) {
    this.activeIndex = this.carrouselMovies.length -1
  }

}

private fixMovieName(movies: any): void {
  movies.map((movie: any) => {
  //trocar para switch case
    if(movie.title.includes(':')) {
      movie.title = movie.title.split(':')[0];
    }
    if(movie.title.includes('-')){
      movie.title = movie.title.replace('-', ' ')
      
    }
  });
}

private startTimer() {
  this.timerId = setInterval(() => {
    this.next()
  }, 4500); 
}

private resetTimer() {
  clearInterval(this.timerId);
  this.startTimer();
}

private setWatchList() {
  const movieId = this.watchListService.getWatchList();
  this.watchlist = this.movies.filter(movie => movieId.includes(movie.id));
}
}
