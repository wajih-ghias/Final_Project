import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardTitle, IonCardContent, IonCardHeader, IonCardSubtitle } from '@ionic/angular/standalone';
import { MyData } from '../services/my-data'
import { MyHttpService } from '../services/my-http-service';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
  standalone: true,
  imports: [IonCardSubtitle, IonCardHeader, IonCardContent, IonCardTitle, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MoviesPage implements OnInit {

  keyword:string = "" ;
  apiKey = "79c899073398240e8015ac544982ea07" ;
  options: HttpOptions = {
    url: "https://api.themoviedb.org/3/search/movie?query=%20story" + "&api_key=" + this.apiKey 
  }     
    ////  https://api.themoviedb.org/3/search/movie?query=toy%20story&api_key=

 
  // https://api.themoviedb.org/3/search/movie?query=toy story&api_key=YOUR_API_KEY


  constructor(private ds: MyData, private mhs: MyHttpService) { }

  ngOnInit() {
    this.KW();
  }
  async KW() {
    this.keyword = await this.ds.get('kw');
    this.options.url.concat(this.keyword);
    this.mhs.get(this.options)
  }

}
