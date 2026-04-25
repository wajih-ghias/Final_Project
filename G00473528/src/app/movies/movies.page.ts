import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardTitle, IonCardContent, IonCardHeader, IonCardSubtitle } from '@ionic/angular/standalone';
import { MyData } from '../services/my-data'
import { MyHttpService } from '../services/my-http-service';
import { HttpOptions } from '@capacitor/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
  standalone: true,
  imports: [IonCardSubtitle, IonCardHeader, IonCardContent, IonCardTitle, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MoviesPage implements OnInit {
  posterBaseUrl = "https://image.tmdb.org/t/p/w500"; 
  movieInfo: any[] = [];
  keyword:string = "" ;
 
  apiKey = "79c899073398240e8015ac544982ea07" ;
  options: HttpOptions = {
    url: ""//"https://api.themoviedb.org/3/search/movie?query=%20story"+"&api_key="+this.apiKey 
  }     ;
    


  constructor(private ds: MyData, private mhs: MyHttpService) { }

  ngOnInit() {
    this.KW();
  }
  async KW() {
    const storedKeyword = await this.ds.get('kw');
    this.keyword = storedKeyword ? storedKeyword.trim() : "" ;
    let myUrl = "" ;
    if(this.keyword === "") {
      myUrl = `https://themoviedb.org{this.apiKey}`;
    } else {
     myUrl = "https://api.themoviedb.org/3/search/movie?query=" + this.keyword + "&api_key=" + this.apiKey;
    
    }
     this.options.url = myUrl;
    try {
      const result = await this.mhs.get(this.options);
      this.movieInfo = result.data.results;
      console.log(this.movieInfo);
      //console.log("Success!", result);
    } catch (error) {
      console.error("API Call failed", error);
      this.movieInfo = [];
    }


    //this.options.url = this.options.url.concat(this.keyword);
    //this.mhs.get(this.options)
  }

}
