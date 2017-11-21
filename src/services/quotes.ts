import { Quote } from '../data/quotes.interface';
import { authService } from '../services/auth';
import { Injectable } from "@angular/core";
import { Http,Response } from '@angular/http';
import'rxjs';

@Injectable()

export class QuotesService {
    private favoriteQuotes: Quote[] = [];

    constructor(public http: Http, public authservice : authService) {
    }
    addQuoteToFavorites(quote: Quote){
        this.favoriteQuotes.push(quote)
    }
    removeQuoteFromFavorites(quote:Quote){
        let counter = this.favoriteQuotes.indexOf(quote)
        this.favoriteQuotes.splice(counter,1)
        console.log(this.favoriteQuotes)
    }
    isFavorite(quote: Quote){
        if(this.favoriteQuotes.indexOf(quote) > -1){
            return true
        }else{
            return false
        }
    }
    getAllFavoriteQuotes(){
        return this.favoriteQuotes;
    }

    storeList(token : string){
        const uid = this.authservice.getActiveUser().uid;
        return this.http
        .put('https://favoritequotesapp-9c44b.firebaseio.com/' +uid+ '/favquotes.json?auth=' +token, this.favoriteQuotes)
        .map((response: Response) => {
            return response.json();
        });
    }
}