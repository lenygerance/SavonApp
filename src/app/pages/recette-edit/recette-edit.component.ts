import { Component, OnInit } from '@angular/core';
import { RecetteDTO } from '../../models/recetteDTO';
import { Ingredient } from '../../models/ingredient';
import { RecetteService } from '../../../services/recette.service';
import { IngredientService } from '../../../services/ingredients.service';
import { LigneIngredient } from '../../models/ligneIngredient';
import { ActivatedRoute } from '@angular/router';
import { Recette } from '../../models/recette';
import { error } from 'console';
@Component({
  selector: 'app-recette-edit',
  templateUrl: './recette-edit.component.html',
  styleUrl: './recette-edit.component.css'
})
export class RecetteEditComponent {
  recetteId!: number;
  recetteDTO=new RecetteDTO()

  ingredientIdSelect: number | null = null;
  listeIngredients: Ingredient[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  constructor(
    private recetteService: RecetteService,
    private ingredientService: IngredientService,
    private route: ActivatedRoute 
  ) {}

  ngOnInit(): void {
    this.fetchIngredients(); // Charger les ingrédients disponibles
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.recetteId = +id; // Convertir en nombre
        this.fetchRecette();
      }
    });
  
  }

  /**
   * Charge la liste des ingrédients disponibles depuis l'API.
   */
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
  fetchRecette(): void {
    this.isLoading = true;
    this.recetteService.getRecetteById(this.recetteId).subscribe({
      next: (data:Recette) => {
        this.recetteDTO.titre=data.titre;
        this.recetteDTO.description=data.description;
        this.recetteDTO.surgraissage=data.surgraissage;
        this.recetteDTO.avecSoude=data.avecSoude;
        this.recetteDTO.qteAlcalin=data.qteAlcalin;
        this.recetteDTO.concentrationAlcalin=data.concentrationAlcalin;
        this.recetteDTO.ligneIngredients=data.ligneIngredients;
        this.isLoading = false;
      },
      error: (error:Error) =>{
        this.errorMessage = 'Erreur lors du chargement de la recette.';
        this.isLoading = false;
      }
    }
  )
  }

  /**
   * Ajoute un nouvel ingrédient à la recette.
   */
  ajoutLigne(): void {
    console.log("Début de ajoutLigne");
    if (this.ingredientIdSelect) {
      console.log("Ingrédient sélectionné :", this.ingredientIdSelect);
      const ingredient = this.listeIngredients.find((i) => i.id == this.ingredientIdSelect);
      if (ingredient) {
        console.log("Ingrédient trouvé :", ingredient);
        const nouvelleLigne = new LigneIngredient();
        nouvelleLigne.ingredient = ingredient;
        nouvelleLigne.ingredientId = ingredient.id;
        nouvelleLigne.quantite = 0;
        nouvelleLigne.pourcentage = 0;
        this.recetteDTO.ligneIngredients.push(nouvelleLigne);
        console.log("Nouvelle ligne ajoutée :", nouvelleLigne);
        this.ingredientIdSelect = null;
        this.majPourcentages();
        console.log("Pourcentages mis à jour :", this.recetteDTO.ligneIngredients);
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
  majPourcentages(): void {
    const totalQuantite = this.recetteDTO.ligneIngredients.reduce((sum, ligne) => sum + ligne.quantite, 0);
    this.recetteDTO.ligneIngredients.forEach((ligne) => {
      ligne.pourcentage = totalQuantite > 0 ? (ligne.quantite / totalQuantite) * 100 : 0;
    });
  }

  /**
   * Supprime une ligne d'ingrédient de la recette.
   */
  supprimerLigne(index: number): void {
    this.recetteDTO.ligneIngredients.splice(index, 1);
    this.majPourcentages(); // Mettre à jour les pourcentages
  }

  /**
   * Soumet le formulaire pour créer une nouvelle recette.
   */
  onSubmit(): void {
    console.log(this.recetteDTO);
  
    this.recetteService.updateRecette(this.recetteId, this.recetteDTO).subscribe({
      next: (response) => {
        console.log('Recette enregistrée avec succès:', response);
        alert('Recette enregistrée avec succès !');
      },
      error: (error) => {
        console.error('Erreur lors de l\'enregistrement de la recette:', error);
        alert('Erreur lors de l\'enregistrement de la recette.');
      }
    });
  }

  /**
   * Réinitialise le formulaire après soumission.
   */
  resetForm(): void {
   this.recetteDTO=new RecetteDTO()
  } 
}
