export class Movie {
    _id: string;
    name: string;
    cardImage: string;
    genres : string[];
    upcoming:boolean;
    price:number;
    reviews : [{
        author: string;
        rating: number;
        reviewText: string;
    }];
}
