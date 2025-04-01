import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { RecipeCalculatorPageComponent } from './pages/recipe-calculator-page/recipe-calculator-page.component';
import { IngredientCreateComponent } from './pages/ingredient-create/ingredient-create.component';
import { RecetteIndexComponent } from './pages/recette-index/recette-index.component';
import { RecetteCreateComponent } from './pages/recette-create/recette-create.component';
import { IngredientManagerPageComponent } from './pages/ingredient-manager-page/ingredient-manager-page.component';
import { RecetteEditComponent } from './pages/recette-edit/recette-edit.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'confidentialite', component: PrivacyPolicyComponent },
  { path: 'calcul', component: RecipeCalculatorPageComponent},
  { path: 'ajout-ingredient', component: IngredientCreateComponent},
  { path: 'recette', component: RecetteIndexComponent},
  { path: 'recette/creer', component: RecetteCreateComponent},
  { path: 'ingredients', component: IngredientManagerPageComponent},
  { path: 'recette/edit/:id', component: RecetteEditComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
