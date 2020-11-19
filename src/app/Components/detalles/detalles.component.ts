import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Abilities, Ability, Move, Type } from 'src/app/Models/Habilidades';
import { PokeMoves } from 'src/app/Models/Movimientos';
import { Image } from 'src/app/Models/Image';
import { PokeService } from 'src/app/Services/poke.service';
import { NotificationsService } from 'angular2-notifications';
import { Prueba } from '../../Models/Prueba'
import { Pokemones } from 'src/app/Models/Pokemones';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  constructor(private _router: ActivatedRoute, private _servicio: PokeService) { }

  AbilitiesList: Ability[] = [];


  PokeNombre: string;
  pokeHeight: number;
  pokeWidth: number;

  PokeMove: Move[] = [];
  type: Type[] = [];
  move: string[] = [];
  PokeMove2: Move[] = [];
  pokemones: Prueba;

  Image: string;
  ngOnInit(): void {
    this.PokeDetails();
  }

  PokeDetails() {
    var nombre = this._router.snapshot.params.id;
    this.PokeNombre = nombre;

    this._servicio.GetPokeAbilities(nombre).subscribe((data: Abilities) => {
      this.AbilitiesList = data.abilities;
      this.PokeMove = data.moves;
      this.type = data.types;
      this.pokeHeight = data.height;
      this.pokeWidth = data.weight;

      console.log(data.species)




      this.PokeMove.forEach(data => {
        this._servicio.GetPokeMoves(data.move.url).subscribe((data: PokeMoves) => {
          this.move.push(data.name)
        });
      });

    });


    this._servicio.GetPokeImage(nombre).subscribe((data: Image) => {
      this.Image = data.sprites.front_shiny;
      console.log(data.sprites.front_shiny)
    });
  }



  CreateArchive() {
    var url;
    const blob = new Blob(["Name: " + this.PokeNombre + "\n" + "Height: " + this.pokeHeight.toString() + "\n" + "Width: " + this.pokeWidth.toString() + "\n" + "Register Date: " + Date()], { type: 'txt/csv' });
    url = window.URL.createObjectURL(blob);
    window.open(url);
  }

}
