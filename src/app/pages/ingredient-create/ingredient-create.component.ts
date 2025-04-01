import { Component } from '@angular/core';
import { Ingredient } from '../../models/ingredient';
import { IngredientService } from '../../../services/ingredients.service';
@Component({
  selector: 'app-ingredient-create',
  templateUrl: './ingredient-create.component.html',
  styleUrl: './ingredient-create.component.css'
})
export class IngredientCreateComponent {
  isLoading: boolean = true; // Flag marquant la récupération des données
  errorMessage: string = ""; // Eventuel message d'erreur
  ingredient: Ingredient = new Ingredient()
  constructor(private ingredientService: IngredientService) { }

  onSubmit() {
    this.ingredientService.addIngredient(this.ingredient).subscribe({
      next: (savedIngredient) => {
        console.log("Un ingredient a était ajouter " + savedIngredient)
        alert("Ingrédient crée avec succès.")
      },
      error: (e) => {
        console.log(e)
      }
    })
  }
}
