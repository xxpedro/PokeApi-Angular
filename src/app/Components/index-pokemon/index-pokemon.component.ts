import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { Image } from 'src/app/Models/Image';
import { Pokemones, Result } from 'src/app/Models/Pokemones';
import { PokeService } from 'src/app/Services/poke.service';

@Component({
  selector: 'app-index-pokemon',
  templateUrl: './index-pokemon.component.html',
  styleUrls: ['./index-pokemon.component.css']
})
export class IndexPokemonComponent implements OnInit {

  constructor(private _PokeServices: PokeService, private formbuilder: FormBuilder, private notification: NotificationsService) {
    this.buscador = this.formbuilder.group({
      name: ''
    });

  }

  buscador: FormGroup;
  PokeList: Result[] = [];
  PokeList2: Result[] = [];
  PokeList3: Result[] = [];
  image: string;

  ngOnInit(): void {
    this.GetData();

  }

  GetData() {
    this._PokeServices.GetPokeData().subscribe((data: Pokemones) => {
      this.PokeList = data.results;
      this.PokeList3 = data.results;


    });
  }

  SearchPokemon() {
    var Sname = this.buscador.get('name').value
    this.PokeList = this.PokeList3;
    this.PokeList2 = [];
    this.PokeList.forEach(data => {

      if (data.name.includes(Sname)) {
        this.PokeList2.push(data)

      }

    });
    this.PokeList = this.PokeList2;



  }

}
