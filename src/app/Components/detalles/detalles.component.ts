import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Abilities, Ability, Move, Type, Type2 } from 'src/app/Models/Habilidades';
import { PokeMoves } from 'src/app/Models/Movimientos';
import { Image } from 'src/app/Models/Image';
import { PokeService } from 'src/app/Services/poke.service';
import { NotificationsService } from 'angular2-notifications';
import { Prueba } from '../../Models/Prueba'
import { DomSanitizer } from '@angular/platform-browser';
import { Pokemones } from 'src/app/Models/Pokemones';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer, private _router: ActivatedRoute, private _servicio: PokeService) { }

  AbilitiesList: Ability[] = [];



  PokeNombre: string;
  pokeHeight: number;
  pokeWidth: number;
  Pokeweight: number;

  PokeMove: Move[] = [];
  type: Type[] = [];
  move: string[] = [];
  PokeMove2: Move[] = [];
  pokemones: Prueba;
  fileUrl;
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
      this.Pokeweight = data.weight;


      console.log(data.abilities[0]['ability']['name'])



      this.PokeMove.forEach(data => {
        this._servicio.GetPokeMoves(data.move.url).subscribe((data: PokeMoves) => {
          this.move.push(data.name)
        });
      });

    });


    this._servicio.GetPokeImage(nombre).subscribe((data: Image) => {
      this.Image = data.sprites.front_shiny;
    });
  }



  CreateArchive() {
    var blob;
    var incre = 0;

    //Habilidades
    var tempHabilities: any[] = [];
    var tep: any[] = [];

    //-------Obtener Tipo
    var tempType: any[] = [];
    var tepType: any[] = [];

    this.type.forEach(x => {

      tempType.push(x.type.name);
    });

    for (let index = 0; index < tempType.length; index++) {
      tepType += tempType[index];
    }

    //-------Obtener Habilidades
    this.AbilitiesList.forEach(x => {
      incre++;
      tempHabilities.push("**" + "Hability " + incre + ": " + x.ability.name + " ");
    });

    for (let index = 0; index < tempHabilities.length; index++) {
      tep += tempHabilities[index];
    }

    blob = new Blob(["-------------PokeDetails-------------" + "\n \n" + "Name: " + this.PokeNombre + "\n" + "Types: " + tempType + "\n" + "Habilities: " + tep + "\n" + "Height: " + this.pokeHeight + "\n" + "Weight: " + this.Pokeweight + "\n" + "Register Date: " + Date()], { type: 'application/octet-stream' });
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }

}
