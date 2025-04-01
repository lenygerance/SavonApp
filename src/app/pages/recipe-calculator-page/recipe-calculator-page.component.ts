import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalIngredientPickerComponent } from '../../shared/modal-ingredient-picker/modal-ingredient-picker.component';
import { LigneIngredient } from '../../models/ligneIngredient';
import { Recette } from '../../models/recette';
import { RecetteDTO } from '../../models/recetteDTO';
import { RecetteService } from '../../../services/recette.service';
import { Ingredient } from '../../models/ingredient';
import { IngredientService } from '../../../services/ingredients.service';
@Component({
  selector: 'app-recipe-calculator-page',
  templateUrl: './recipe-calculator-page.component.html',
  styleUrl: './recipe-calculator-page.component.css'
})
export class RecipeCalculatorPageComponent implements OnInit{
  availableIngredients: Ingredient[] = []; // à alimenter via service
  selectedIngredients: LigneIngredient[] = []; // Liste des ingrédients sélectionnés
  constructor(
  private ingredientService: IngredientService,
  private modalService: NgbModal
  ) {}
  /**
  * Appel du service de récupération des ingrédients à l'initialisation
  */
  ngOnInit(): void {
  this.loadIngredients();
  }
  loadIngredients(): void {
    this.ingredientService.getAllIngredients().subscribe({
      next: (ingredients) => {
      this.availableIngredients = ingredients;
      },
      error: (err) => {
      console.error('Erreur lors du chargement des ingrédients', err);
      }
      });
    }
    /**
* Modal de sélection des ingrédients.
*/
openIngredientModal(): void {
  const modalRef = this.modalService.open(ModalIngredientPickerComponent);
  modalRef.componentInstance.ingredients = this.availableIngredients;
  modalRef.result.then((selectedIngredient: Ingredient) => {
  if (selectedIngredient) {
  this.ajouterIngredient(selectedIngredient);
  }
  }).catch(() => {});
  }
  /**
  * Méthode d'ajout d'un ingrédient à la recette
  * @param ingredient Ingrédient à ajouter à la recette
  */
  ajouterIngredient(ingredient: Ingredient): void {
  // Empêcher les doublons
  if (this.selectedIngredients.find(l => l.ingredient?.id === ingredient.id)) {
  return;
  }
  this.selectedIngredients.push({
  ingredientId: 0, // valeur temporaire pour l'instant
  recette: null, // sera renseigné côté backend à la soumission
  ingredient: ingredient,
  quantite: 0,
  pourcentage: 0
  });
  }
  /**
  * Supprime un ingrédient préalablement choisi pour la recette en cours
  * @param index
  */
  supprimerIngredient(index: number): void {
  this.selectedIngredients.splice(index, 1);
  }
}
 
 
 
 
 
 
 
 
 
 
 

 
  
  /** 
  recette=new Recette()

  ingredientIdSelect: number | null = null;
  listeIngredients: Ingredient[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  constructor(
    private recetteService: RecetteService,
    private ingredientService: IngredientService 
  ) {}

  ngOnInit(): void {
    this.fetchIngredients(); // Charger les ingrédients disponibles
  }

  /**
   * Charge la liste des ingrédients disponibles depuis l'API.
   */
  /** 
  fetchIngredients(): void {
    this.isLoading = true;
    this.ingredientService.getAllIngredients().subscribe({
      next: (data) => {
        this.listeIngredients = data;
        this.isLoading = false;
      },
      error: (error:Error) => {
        this.errorMessage = 'Erreur lors du chargement des ingrédients.';
        this.isLoading = false;
      }
    });
  }

  /**
   * Ajoute un nouvel ingrédient à la recette.
   */

  /** 
  ajoutLigne(): void {
    console.log("Début de ajoutLigne");
    if (this.ingredientIdSelect) {
      console.log("Ingrédient sélectionné :", this.ingredientIdSelect);
      const ingredient = this.listeIngredients.find((i) => i.id == this.ingredientIdSelect);
      if (ingredient) {
        console.log("Ingrédient trouvé :", ingredient);
        const nouvelleLigne = new LigneIngredient();
        nouvelleLigne.ingredient = ingredient;
        nouvelleLigne.ingredientId = ingredient.id
        nouvelleLigne.quantite = 0;
        nouvelleLigne.pourcentage = 0;
        this.recette.ligneIngredients.push(nouvelleLigne);
        console.log("Nouvelle ligne ajoutée :", nouvelleLigne);
        this.ingredientIdSelect = null;
        this.majPourcentages();
        console.log("Pourcentages mis à jour :", this.recette.ligneIngredients);
      } else {
        console.error("Ingrédient non trouvé dans la liste.");
      }
    } else {
      console.error("Aucun ingrédient sélectionné.");
    }
  }

  /**
   * Met à jour les pourcentages des ingrédients en fonction des quantités.
   */
  /** 
  majPourcentages(): void {
    const totalQuantite = this.recette.ligneIngredients.reduce((sum, ligne) => sum + ligne.quantite, 0);
    this.recette.ligneIngredients.forEach((ligne) => {
      ligne.pourcentage = totalQuantite > 0 ? (ligne.quantite / totalQuantite) * 100 : 0;
    });
  }

  /**
   * Supprime une ligne d'ingrédient de la recette.
   */
  /** 
  supprimerLigne(index: number): void {
    this.recette.ligneIngredients.splice(index, 1);
    this.majPourcentages(); // Mettre à jour les pourcentages
  }

  /**
   * Soumet le formulaire pour créer une nouvelle recette.
   */
  /** 
  onSubmit(): void {
    console.log(this.recette);
  }
    */
