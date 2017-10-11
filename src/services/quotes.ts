import { Quote } from '../data/quotes.interface';

export class QuotesService {
    private favoriteQuotes: Quote[] = [];

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
}