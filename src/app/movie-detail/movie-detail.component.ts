import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Movie } from '../movie';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})

export class MovieDetailComponent implements OnInit {
  movie: Movie;


  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getMovie();
    this.getDetails();
  }


  getMovie() {
    const movieId = window.location.pathname.split('/')[2];
    this.apiService
      .getMovie(movieId)
      .subscribe((response) => {
        this.movie = response;
      });
  }


  getDetails(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.apiService.getCredits(id).subscribe((response: any) => {
      console.log('credits', response);
      this.movie.cast = response.cast;
      this.movie.crew = response.crew;
      console.log('cast', this.movie.cast);
    });
  };
}





