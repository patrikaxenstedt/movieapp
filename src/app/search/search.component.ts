import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchResult: any;
  timer: any;
  searchValue = '';

  constructor(
    private apiService: ApiService,

  ) { }

  ngOnInit(): void { }

  search(query: string): void {
    this.searchResult = null;
    clearTimeout(this.timer);
    this.timer = setTimeout(this.executeSearch.bind(this), 250, query);
  }
  // If search-input is < 2 give no results
  // If search-input is > 2 give success and 
  // display results of media type 'movie' and 'person'
  // depending on media type matches string/input.
  executeSearch(query: string): void {
    if (query === '' || query.length <= 2) {
      this.apiService.setResults(null);
      return;
    }

    this.apiService.searchTmdb(query).subscribe(
      success => {
        this.searchResult = success.results.filter(
          (item: { media_type: string }) =>
            item.media_type === 'movie' || item.media_type === 'person'
        );
        this.apiService.setResults(this.searchResult);
      },
      error => {
        console.error(error);
      }
    );
  }
}
