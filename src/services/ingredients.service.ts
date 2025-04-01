import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingredient } from '../app/models/ingredient';


@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  private apiUrl = 'http://localhost:8080/api-savon/v1/ingredient';

  constructor(private http: HttpClient) {}

  getAllIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(`${this.apiUrl}`);
    }
    /**
    * Récupère un ingrédient spécifique par son ID.
    * @param id - Identifiant de l'ingrédient.
    * @returns Observable contenant l'ingrédient correspondant.
    */
    getIngredientById(id: number): Observable<Ingredient> {
    return this.http.get<Ingredient>(`${this.apiUrl}/${id}`);
    }
    /**
    * Ajoute un nouvel ingrédient à la base de données.
    * @param ingredient - L'objet Ingredient à ajouter.
    * @returns Observable contenant l'ingrédient ajouté.
    */
    addIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.post<Ingredient>(this.apiUrl, ingredient);
    }
    /**
    * Met à jour un ingrédient existant dans la base de données.
    * @param id - Identifiant de l'ingrédient à mettre à jour.
    * @param ingredient - L'objet Ingredient mis à jour.
    * @returns Observable contenant l'ingrédient modifié.
    */
    updateIngredient(id: number, ingredient: Ingredient): Observable<Ingredient> {
    return this.http.put<Ingredient>(`${this.apiUrl}/${id}`, ingredient);
    }
    deleteIngredient(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
      }
      /**
      * Supprimer TOUS les ingrédients.
      */
      deleteAllIngredients(): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/all`);
      }

  /**
   * Importe des ingrédients à partir d'un fichier CSV via l'API.
   * @param file - Le fichier CSV à importer.
   * @returns Un Observable contenant la liste des ingrédients importés.
   */
  importFromCSV(file: File): Observable<Ingredient[]> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<Ingredient[]>(`${this.apiUrl}/ingredient/import`, formData);
  }

  /**
   * Exporte tous les ingrédients vers un fichier CSV via l'API.
   * @returns Un Observable contenant le fichier CSV.
   */
  exportToCSV(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/ingredient/export`, { responseType: 'blob' });
  }


}