import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BodyComponent } from './Components/body/body.component';
import { DetallesComponent } from './Components/detalles/detalles.component';
import { IndexPokemonComponent } from './Components/index-pokemon/index-pokemon.component';


const routes: Routes = [{

  path: '',
  component: BodyComponent
},
{
  path: "Pokemon/:id",
  component: DetallesComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
