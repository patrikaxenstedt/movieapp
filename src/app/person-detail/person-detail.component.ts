import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from '../api.service';
import { Person } from '../person';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss']
})
export class PersonDetailComponent implements OnInit {
  actor: Person;
  id: number;
  age: number;
  imageUri = 'https://image.tmdb.org/t/p/w300/';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.getPerson();
  }
  // Fuction that gets persons id and checks if actor.birthday is true 
  // and then calculates age with BD and time now.
  getPerson(): void {
    this.apiService.getPerson(this.id).subscribe(
      actor => {
        this.actor = actor;
        if (actor.birthday) {
          const birth = new Date(actor.birthday).getTime();
          let now;
          const timeDiff: number = now - birth;
          this.age = Math.floor(timeDiff / 31536000000);
        }
      },
      error => {
        console.error(error);
      }
    );
  }
  // If Person have a profile image, display it.
  getPersonProfileUri(actor: Person): string {
    if (actor.profile_path) {
      return this.imageUri + actor.profile_path;
    }

  }
}
