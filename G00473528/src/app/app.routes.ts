import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'movie-details/:id',
    loadComponent: () => import('./movie-details/movie-details.page').then( m => m.MovieDetailsPage)
  },
  {
    path: 'details',
    loadComponent: () => import('./details/details.page').then( m => m.DetailsPage)
  },
  {
    path: 'favourites',
    loadComponent: () => import('./favourites/favourites.page').then( m => m.FavouritesPage)
  },
  {
    path: 'movies',
    loadComponent: () => import('./movies/movies.page').then( m => m.MoviesPage)
  },
];
