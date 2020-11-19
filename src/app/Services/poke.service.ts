import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Abilities, Move, Type } from '../Models/Habilidades';
import { Pokemones } from '../Models/Pokemones';
import { Image } from '../Models/Image';
import { PokeMoves } from '../Models/Movimientos';

@Injectable({
  providedIn: 'root'
})
export class PokeService {

  constructor(private _http: HttpClient) { }


  GetPokeData() {
    return this._http.get<Pokemones>("https://localhost:44335/api/Pokemones/GetPokemones");
  }
  GetPokeAbilities(data: string) {
    return this._http.get<Abilities>(`https://localhost:44335/api/Pokemones/GetPokemones/${data}`);
  }

  GetPokeImage(data: string) {
    return this._http.get<Image>(`https://localhost:44335/api/Pokemones/ObtenerImagenes/${data}`);
  }
  GetPokeMoves(data: string) {
    return this._http.get<PokeMoves>(data);
  }
  CreateFile(name: string, habilities: string) {
    return this._http.get(`https://localhost:44335/api/Pokemones/CrearArchivo/${name}/${habilities}`)
  }



  GetIdexImage(data: string) {
    return this._http.get<Image>(data);
  }
}
