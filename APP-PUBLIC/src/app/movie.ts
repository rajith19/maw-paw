export class Movie {
    _id: string;
    name: string;
    cardImage: string;
    ingredients : string[];
    upcoming:boolean;
    price:number;
    reviews : [{
        author: string;
        rating: number;
        reviewText: string;
    }];
}
