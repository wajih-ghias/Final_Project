import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonCard, 
  IonCardHeader, IonCardTitle, IonButton, IonIcon, 
  IonButtons, IonList, IonItem, IonLabel, IonAvatar, IonThumbnail, IonCardContent } from '@ionic/angular/standalone';
import { MyData } from '../services/my-data';
import { addIcons } from 'ionicons';
import { trashOutline, heart, homeOutline } from 'ionicons/icons';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  standalone: true,
  imports: [IonCardContent, 
      IonButtons, 
    IonIcon, IonButton, IonCardTitle, IonCardHeader, IonCard, 
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, 
    FormsModule, RouterModule
  ]
})
export class FavouritesPage {
  favorites: any[] = [];
  posterBaseUrl = "https://tmdb.org";
 


  constructor(private ds: MyData, private router: Router) {
  
    addIcons({ trashOutline, heart, homeOutline });
  }

  
  async ionViewWillEnter() {
    this.favorites = await this.ds.get('favorites') || [];
    console.log("Loaded Favorites:", this.favorites);
  }

  
  async removeFromFavorites(item: any) {
   
    this.favorites = this.favorites.filter((f: any) => f.id !== item.id);
    

    await this.ds.set('favorites', this.favorites);
    
    console.log("Item removed. Updated list:", this.favorites);
  }

  getImage(path: string) {
    return path 
      ? "https://image.tmdb.org/t/p/w500" + path 
      : "https://via.placeholder.com/300x450?text=No+Image";
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}