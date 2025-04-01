import { LigneIngredient } from "./ligneIngredient";
import { LigneIngredientDTO } from "./ligneIngredientsDTO";

export class RecetteDTO {
  id: number | null = null;
  titre: string = '';
  description: string = '';
  surgraissage: number = 0;
  avecSoude: boolean = false;
  concentrationAlcalin: number = 0;
  qteAlcalin: number = 0;
  ligneIngredients: LigneIngredient[] = [];
  ligneIngredientsDTO: LigneIngredientDTO[] = [];

}
