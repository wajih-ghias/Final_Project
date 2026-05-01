import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonButton, IonIcon, IonButtons } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { trashOutline, heart, homeOutline } from 'ionicons/icons';
import { RouterModule } from '@angular/router';
import { MyHttpService } from '../services/my-http-service';
import { MyData } from '../services/my-data';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonButtons, IonIcon, IonButton, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, CommonModule, FormsModule, RouterModule ]
})
export class DetailsPage implements OnInit {
favorites: any[] = [];
isFavorite: boolean = false;
fallbackImage = "https://via.placeholder.com/300x450?text=No+Image";
person: any = null;
movies: any[] = [];
posterBaseUrl = "https://image.tmdb.org/t/p/w500";
apiKey = "79c899073398240e8015ac544982ea07";

  constructor(private route: ActivatedRoute, private mhs: MyHttpService, private ds: MyData, private router: Router) {
    addIcons({ trashOutline, heart, homeOutline });
   }

   ngOnInit() {}
  async ngAfterViewInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
  
    const url = `https://api.themoviedb.org/3/person/${id}?api_key=${this.apiKey}&append_to_response=movie_credits`;
  
    try {
      const result = await this.mhs.get({ url });
  
      this.person = result.data;
    
      this.movies = this.person.movie_credits.cast;
      this.favorites = await this.ds.get('favorites') || [];
      this.isFavorite = this.favorites.some((f: any) => f.id === this.person.id);
  
    } catch (error) {
      console.error("Error loading person", error);
    }
  }

  getImage(path: string) {
    return path ? this.posterBaseUrl + path : this.fallbackImage;
  }
  async addToFavorites() {
    if (!this.favorites.some((f: any) => f.id === this.person.id)) {
      this.favorites.push({ ...this.person, type: 'person' });
      await this.ds.set('favorites', this.favorites);
      this.isFavorite = true;
    }}

    async removeFromFavorites() {
      this.favorites = this.favorites.filter((f: any) => f.id !== this.person.id);
      await this.ds.set('favorites', this.favorites);
      this.isFavorite = false;
    }
  

  async openHomePage() {
    this.router.navigate(['/home']);
  }

}
