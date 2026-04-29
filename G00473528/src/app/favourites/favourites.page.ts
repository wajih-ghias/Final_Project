import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButton, IonButtons, IonCard, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { MyData } from '../services/my-data';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { homeOutline, heart, heartOutline, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonCardTitle, IonCardHeader, IonCard, IonButtons, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonButton, IonIcon, CommonModule, RouterLink]
})
export class FavouritesPage implements OnInit {
  favMovies: any[] = [];
  posterBaseUrl = "https://tmdb.org";

  constructor(private ds:MyData) { }

  ngOnInit() {
  }
  async ionViewWillEnter() {
    this.favMovies = await this.ds.get('favorites') || [];
  }
  async clearAll() {
    await this.ds.set('favorites', []);
    this.favMovies = [];
  }


}
