import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { HttpClientModule } from '@angular/common/http';
import { RecipeCalculatorPageComponent } from './pages/recipe-calculator-page/recipe-calculator-page.component';
import { RecipeManagerPageComponent } from './pages/recipe-manager-page/recipe-manager-page.component';
import { IngredientCreateComponent } from './pages/ingredient-create/ingredient-create.component';
import { FormsModule } from '@angular/forms';
import { RadarChartComponent } from './components/radar-chart/radar-chart.component';
import { RecetteIndexComponent } from './pages/recette-index/recette-index.component';
import { RecetteCreateComponent } from './pages/recette-create/recette-create.component';
import { IngredientListComponent } from './shared/ingredient-list/ingredient-list.component';
import { IngredientFormComponent } from './shared/ingredient-form/ingredient-form.component';
import { IngredientImportExportComponent } from './shared/ingredient-import-export/ingredient-import-export.component';
import { IngredientManagerPageComponent } from './pages/ingredient-manager-page/ingredient-manager-page.component';
import { ModalBoxConfirmationComponent } from './shared/modal-box-confirmation/modal-box-confirmation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecetteEditComponent } from './pages/recette-edit/recette-edit.component';
import { ModalIngredientPickerComponent } from './shared/modal-ingredient-picker/modal-ingredient-picker.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    PrivacyPolicyComponent,

    RecipeCalculatorPageComponent,
    RecipeManagerPageComponent,
    IngredientCreateComponent,
    RadarChartComponent,
    RecetteIndexComponent,
    RecetteCreateComponent,
    IngredientListComponent,
    IngredientFormComponent,
    IngredientImportExportComponent,
    IngredientManagerPageComponent,
    ModalBoxConfirmationComponent,
    RecetteEditComponent,
    ModalIngredientPickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
