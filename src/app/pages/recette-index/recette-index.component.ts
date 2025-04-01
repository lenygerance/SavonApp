import { Component } from '@angular/core';
import { Recette } from '../../models/recette';
import { RecetteService } from '../../../services/recette.service';

@Component({
  selector: 'app-recette-index',
  templateUrl: './recette-index.component.html',
  styleUrl: './recette-index.component.css'
})
export class RecetteIndexComponent {
  recettes: Recette[] = []; // Liste des ingrédients de l’API
  isLoading: boolean = true; // Flag marquant la récupération des données
  errorMessage: string = ""; // Eventuel message d'erreur

  constructor(private recetteService: RecetteService) {}
ngOnInit(): void {
  this.fetchRecettes();
}
fetchRecettes(): void {
  this.recetteService.getAllRecettes().subscribe({
  next: (data) => {
  this.recettes = data;
  this.isLoading = false;
  },
  error: (error) => {
  this.errorMessage = "Erreur lors du chargement des ingrédients.";
  console.error("Erreur API:", error);
  this.isLoading = false;
  }
  });
}
}

