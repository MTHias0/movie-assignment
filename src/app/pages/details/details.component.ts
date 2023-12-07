import { Pipe, PipeTransform, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { movies } from 'src/api/movies';
import { WatchListService } from 'src/app/services/watchlist.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit  {

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private watchListService: WatchListService
  ) {}

  public movieId: any;
  public movieArr: any;
  public movie: any;
  public videoId: string = '';
  public safeUrl: any;

  ngOnInit(): void {

    this.reload();

    this.movieId = this.route.snapshot.paramMap.get('id');

    this.movieArr = movies.filter((movie) => {return movie.id === this.movieId});

    this.movie = this.movieArr[0];

    this.safeUrl = this.getSafeUrl();
    
  }

  public isInWatchList(): boolean {
    return this.watchListService.isInWatchList(this.movie.id);
  }

  public toggleWatchList(): void {
    console.log('Toggle Watch List clicked');
    this.isInWatchList() ? 
    this.watchListService.removeFromWatchList(this.movieId) :
    this.watchListService.addToWatchList(this.movieId);
    console.log('Watch List updated');
  }

  public getSafeUrl(): any {
    this.videoId = this.movie.trailer.split('v=')[1]
    const url = `https://www.youtube.com/embed/${this.videoId}`;
    console.log(url)
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
    
  }

  private reload(): any {
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
  }
  
}
