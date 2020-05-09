import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})


export class ApiService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  };


  // Use your own API-key here.
  private API_KEY = '0e6da493848bce79b514981005d24f35';

  // Different URLs used in the functions below.
  private MOVIE_URL = 'https://api.themoviedb.org/3/movie/';

  private BASE_URL = 'https://api.themoviedb.org';

  private SEARCH_URL = 'https://api.themoviedb.org/3/search/multi';

  public searchResults = new Subject();


  constructor(private httpClient: HttpClient) { }

  // Function that displays popular movies at Dashboard.
  getMovies() {
    return this.httpClient.get(`https://api.themoviedb.org/3/movie/popular?api_key=${this.API_KEY}`);
  }

  // Function that gets the id for a specific movie, to show more details about it.
  getMovie(movieId) {
    return this.httpClient.get(`${this.MOVIE_URL}${movieId}?api_key=${this.API_KEY}`);
  }

  // Function used to search in TMDBs API, it takes a query(string,input) and joins it with
  // SEARCH_URL to build up a correct URL.
  searchTmdb(query: string): Observable<any> {
    const params: string = [`query=${query}`, `api_key=${this.API_KEY}`].join('&');
    const queryUrl = `${this.SEARCH_URL}?${params}`;
    return this.httpClient.get(queryUrl);
  }

  // Sets and gets the search-results, used in search.comp.ts
  setResults(results: any): void {
    this.searchResults.next(results);
  }
  getResults(): Observable<any> {
    return this.searchResults.asObservable();
  }


  // Function that gets a Persons ID so we can se more details about a specific person.
  getPerson(id: number): Observable<any> {
    const actorUrl = `${this.BASE_URL}/3/person/${id}?api_key=${this.API_KEY}`;
    return this.httpClient.get<any>(actorUrl);
  }

  // Function that gets a specific movies credits, we can see a movies cast/crew.
  getCredits(id: number) {
    return this.httpClient.get(`${this.MOVIE_URL}${id}/credits?api_key=${this.API_KEY}`);
  }
}




