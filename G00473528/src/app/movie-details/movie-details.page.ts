import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonBadge, IonLabel, IonItem, IonList, IonIcon, IonButtons } from '@ionic/angular/standalone';
import { MyHttpService } from '../services/my-http-service';
import { HttpOptions } from '@capacitor/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyData } from '../services/my-data';
import { addIcons } from 'ionicons';
import { homeOutline, heart, heartOutline, trashOutline } from 'ionicons/icons'; 
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { listOutline } from 'ionicons/icons';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [IonButtons, IonIcon, RouterLink,  IonList, IonItem, IonLabel, IonButton,  IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MovieDetailsPage implements OnInit, AfterViewInit {
  favorites: any[] = [];
  movie: any=null;
  cast: any;
  crew: any;
  isFavorite: boolean =false ;
  apiKey = "79c899073398240e8015ac544982ea07";
  posterBaseUrl = "https://image.tmdb.org/t/p/w500";



  constructor(private route: ActivatedRoute, private mhs: MyHttpService, private ds: MyData, private router: Router) {
    addIcons({ homeOutline, heart, heartOutline, trashOutline, listOutline });
   }

  async ngOnInit() { }
    
    async ngAfterViewInit() {
    
    const id = this.route.snapshot.paramMap.get('id');
    console.log("Navigated to ID:", id); 
    if(!id) return;
    
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}&append_to_response=credits`;
    //"https://api.themoviedb.org/3/movie/" + id + "/credits?api_key=" + this.apiKey;
    //const headers = {'Authorization':'Bearer ' + this.apiKey  }
    console.log(url)
    
 
    try {
    const result = await this.mhs.get({ url });
    // console.log(result.data)
    this.movie = result.data;
    //this.cast = result.data.cast.slice(0, 10) ?? result.data.cast; // Top 10 actors
    this.cast = this.movie.credits.cast.slice(0, 10);
 
    this.crew = this.movie.credits.crew.filter((m: any) => m.job === 'Director');
    
    //console.log(this.movie);
    // Check if favorite
    this.favorites = await this.ds.get('favorites') || [];
    this.isFavorite = this.favorites.some((f: any) => f.id === this.movie.id);
    console.log('favorties: ',this.favorites);
    console.log('favorties: ',typeof this.favorites)
  } catch (error) {
    console.error("API Error loading Page:", error);
  }
}

  async addToFavorites(movie: any) {
    let favorites = await this.ds.get('favorites') || [];
  
    if (!favorites.some((f: any) => f.id === movie.id)) {
      favorites.push({ ...movie, type: 'movie' }); 
      await this.ds.set('favorites', favorites);
      this.isFavorite = true;
    }
  }
  async removeFromFavorites(movie: any) {
    let favorites = await this.ds.get('favorites') || [];
  
    favorites = favorites.filter((f: any) => f.id !== movie.id);
  
    await this.ds.set('favorites', favorites);
    this.isFavorite = false;
  }

  async addMovieToFavorites() {
    let favorites = await this.ds.get('favorites') || [];
  
    if (!favorites.some((f: any) => f.id === this.movie.id && f.type === 'movie')) {
      favorites.push({
        id: this.movie.id,
        title: this.movie.title,
        poster_path: this.movie.poster_path,
        type: 'movie'   
      });
  
      await this.ds.set('favorites', favorites);
      this.favorites = favorites;
  
      console.log("Movie added:", this.movie.title);
    }
  }
  async removeMovieFromFavorites() {
    let favorites = await this.ds.get('favorites') || [];
  
    favorites = favorites.filter(
      (f: any) => !(f.id === this.movie.id && f.type === 'movie')
    );
  
    await this.ds.set('favorites', favorites);
    this.favorites = favorites;
  
    console.log("Movie removed");
  }
  isMovieFavorite(): boolean {
    if (!this.favorites) return false;
  
    return this.favorites.some(
      (f: any) => f.id === this.movie.id && f.type === 'movie'
    );
  }


 isFavoriteActor(actor: any): boolean {
  if (!this.favorites) return false; 
  return this.favorites.some((f: any) => f.id === actor.id);
  
 
  }




  
  async openHomePage() {
    this.router.navigate(['/home']);
  }

}


