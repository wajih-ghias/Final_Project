import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton } from '@ionic/angular/standalone';
import { MyData } from '../services/my-data';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonButton, IonInput, IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, FormsModule],
})
export class HomePage {
  keyword: string="" ;
  constructor( private ds:MyData, private router:Router) {}

  async openMovies() {
    await this.ds.set("kw", this.keyword);
    this.router.navigate(['/movies']);

  }

}
