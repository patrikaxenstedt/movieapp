import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  searchResults: any;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.apiService.searchResults.subscribe(
      success => {
        this.searchResults = success;
      },
      error => {
        console.error(error);
      }
    );
  }
  // Navigates to the search-results(#searchBox input) path + id.
  goTo(path: string, id: number): void {
    this.searchResults = null;
    const searchBoxElm: HTMLInputElement = document.querySelector('#searchBox');
    searchBoxElm.value = '';
    this.router.navigate([path, id]);
  }
}
