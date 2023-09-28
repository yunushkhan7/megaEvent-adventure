import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackDropLoaderComponent } from './back-drop-loader/back-drop-loader.component';
import { MaterialExModule } from './material.module';
import { LanguageComponent } from './language/language.component';
import { FormsModule } from '@angular/forms';

const components = [
  BackDropLoaderComponent,
  LanguageComponent
]
@NgModule({
  declarations: components,
  imports: [CommonModule,
    MaterialExModule,
    FormsModule
  ],
  exports: components
})
export class SharedModule { }
