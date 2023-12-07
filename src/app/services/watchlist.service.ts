import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class WatchListService {
    public watchlistUpdated: Subject<void> = new Subject<void>();

    private watchListKey = 'watchlist';
    private watchlist: any[] = [];

    constructor(){
        this.loadWatchList();
    }

    public getWatchList(): any[] {
        return this.watchlist;
    }

    public addToWatchList(movieid: string): void {
        if(!this.isInWatchList(movieid)) {
            this.watchlist.push(movieid);
            this.saveWatchList();
            this.watchlistUpdated.next();
        }
    }

    public removeFromWatchList(movieId: string): void {
        this.watchlist = this.watchlist.filter((id) => id !== movieId);
        this.saveWatchList();
        this.watchlistUpdated.next();
    }

    public isInWatchList(movieId: string): boolean {
        return this.watchlist.includes(movieId);
    }

    private loadWatchList(): void {
        const storedWatchList = localStorage.getItem(this.watchListKey);
        this.watchlist = storedWatchList ? JSON.parse(storedWatchList) : [];
    }

    private saveWatchList(): void {
        localStorage.setItem(this.watchListKey, JSON.stringify(this.watchlist));
    }
}