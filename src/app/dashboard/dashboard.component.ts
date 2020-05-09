import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  movies: any[];


  constructor(private apiService: ApiService) { }


  // OnInit, get popular movies and display.
  ngOnInit(): void {
    this.apiService.getMovies().subscribe((data) => {
      console.log(data);
      this.movies = data['results'];
    });


  }
}
