import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonIcon, IonCardContent, IonButtons } from '@ionic/angular/standalone';
import { MyData } from '../services/my-data';
import { OnInit } from '@angular/core';
import { MyHttpService } from '../services/my-http-service';
import { HttpOptions } from '@capacitor/core';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { homeOutline, heart, heartOutline, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [ IonCardContent, IonIcon, IonCardTitle, IonCardHeader, IonCard, IonButton, IonInput, IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, FormsModule, RouterModule],
})
export class HomePage implements OnInit {
  keyword: string="" ;
  movieInfo: any[] = [];
  apiKey = "79c899073398240e8015ac544982ea07";
  posterBaseUrl = "https://image.tmdb.org/t/p/w500";


  constructor( private ds:MyData, private router:Router, private mhs: MyHttpService) {
    addIcons({ homeOutline, heart, heartOutline, trashOutline });
  }

  ngOnInit() {}
     
  async ngAfterViewInit() {
    this.loadTrending();
  }

  async loadTrending() {
    const options: HttpOptions = {
      url: `https://api.themoviedb.org/3/trending/movie/day?api_key=${this.apiKey}`
  
    };
    try {
      const result = await this.mhs.get(options);
     
      this.movieInfo = result.data.results;
      console.log("Movies stored in movieInfo:", this.movieInfo);
    } catch (error) {
      console.error("Trending fetch failed", error);
    }
  }
  async openMovies() {

    if (!this.keyword || this.keyword.trim() === "") {
      console.log("No keyword entered - staying on trending page");
      
      this.loadTrending();
      return; 
    }

    await this.ds.set("kw", this.keyword);
    this.router.navigate(['/movies']);

  }

}
