import { AfterViewInit, Component, OnInit } from '@angular/core';
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
export class MovieDetailsPage implements OnInit, AfterViewInit {

  movie: any;
  cast: any;
  crew: any;
  isFavorite: boolean =false ;
  apiKey = "79c899073398240e8015ac544982ea07";
  posterBaseUrl = "https://image.tmdb.org/t/p/w500";

      // let favorites = await this.ds.get('favorites') || [];
    favorites: any;

  constructor(private route: ActivatedRoute, private mhs: MyHttpService, private ds: MyData) { }

  async ngOnInit() { }
    
    async ngAfterViewInit() {
    
    const id = this.route.snapshot.paramMap.get('id');
    const url = "https://api.themoviedb.org/3/movie/" + id + "/credits?api_key=" + this.apiKey;
    //const headers = {'Authorization':'Bearer ' + this.apiKey  }
    

    console.log("AAAAAAAAAAAAA")
    console.log(url)
    const result = await this.mhs.get({ url });
    // console.log(result.data)
    this.movie = result.data;
    this.cast = result.data.cast.slice(0, 10) ?? result.data.cast; // Top 10 actors
    this.crew = result.data.crew.filter((m: any) => m.job === 'Director'); // Get Director
    //console.log(this.movie);
    // Check if favorite
    this.favorites = await this.ds.get('favorites') || [];
    // this.isFavorite = favorites.some((f: any) => f.id === this.movie.id);
    console.log('favorties: ',this.favorites);
    console.log('favorties: ',typeof this.favorites)
    }

  async addToFavorites(actor: any) {
    let favorites = await this.ds.get('favorites') || [];
    // Ensure we don't add duplicates
    if (!favorites.some((f: any) => f.id === actor.id)) {
      favorites.push(actor);
      await this.ds.set('favorites', favorites);
      this.favorites = favorites;
      this.isFavorite = true;
      console.log("Added to favorites");
    }
  }
  
  async removeFromFavorites(actor: any) {
    let favorites = await this.ds.get('favorites') || [];
    // Filter out the current movie
    favorites = favorites.filter((f: any) => f.id !== actor.id);
    await this.ds.set('favorites', favorites);
    this.favorites = favorites;
    this.isFavorite = false;
    console.log("Removed from favorites");
  }


 isFavoriteActor(actor: any): boolean {
    const found = this.favorites.filter((f: any) => f.id === actor.id);
    return found.length > 0 ;
  }

}


