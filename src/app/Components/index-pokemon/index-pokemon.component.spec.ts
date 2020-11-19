import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPokemonComponent } from './index-pokemon.component';

describe('IndexPokemonComponent', () => {
  let component: IndexPokemonComponent;
  let fixture: ComponentFixture<IndexPokemonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexPokemonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
