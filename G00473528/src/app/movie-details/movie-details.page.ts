import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonBadge, IonLabel, IonItem, IonList, IonIcon, IonButtons } from '@ionic/angular/standalone';
import { MyHttpService } from '../services/my-http-service';
import { HttpOptions } from '@capacitor/core';
import { ActivatedRoute } from '@angular/router';
import { MyData } from '../services/my-data';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [IonButtons, IonIcon, IonList, IonItem, IonLabel, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MovieDetailsPage implements OnInit {

  movie: any;
  cast: any;
  crew: any;
  isFavorite: boolean =false ;
  apiKey = "79c899073398240e8015ac544982ea07";

  constructor(private route: ActivatedRoute, private mhs: MyHttpService, private ds: MyData) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const url = "https://api.themoviedb.org/3/search/movie?query=" +  + "&api_key=" + this.apiKey;
    
    const result = await this.mhs.get({ url });
    this.movie = result.data;
    this.cast = result.data.credits.cast.slice(0, 10); // Top 10 actors
    this.crew = result.data.credits.crew.filter((m: any) => m.job === 'Director'); // Get Director
    
    // Check if favorite
    const favorites = await this.ds.get('favorites') || [];
    this.isFavorite = favorites.some((f: any) => f.id === this.movie.id);
  }

  async addToFavorites() {
    let favorites = await this.ds.get('favorites') || [];
    // Ensure we don't add duplicates
    if (!favorites.some((f: any) => f.id === this.movie.id)) {
      favorites.push(this.movie);
      await this.ds.set('favorites', favorites);
      this.isFavorite = true;
      console.log("Added to favorites");
    }
  }
  
  async removeFromFavorites() {
    let favorites = await this.ds.get('favorites') || [];
    // Filter out the current movie
    favorites = favorites.filter((f: any) => f.id !== this.movie.id);
    await this.ds.set('favorites', favorites);
    this.isFavorite = false;
    console.log("Removed from favorites");
  }
}


