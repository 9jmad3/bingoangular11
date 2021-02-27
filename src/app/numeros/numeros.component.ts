import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { BomboService } from '../services/bombo.service';

@Component({
  selector: 'app-numeros',
  templateUrl: './numeros.component.html',
  styleUrls: ['./numeros.component.css']
})


export class NumerosComponent implements OnInit {

  numeros: number[];
  @Input() ultimoNumero: number; //Ultimo número salido del bombo.
  @Input() numerosVista: number[]; //Números salidos del bombo.
  @Input() tituloGanadores: string; //String de ganadores
  @Input() ganadores: number[]; //Número de ganadores.
 
  //CONSTRUCTOR
  constructor(private bomboService: BomboService) {
    this.numeros = [];
  }  

  ngOnInit(): void { 
    
  }
  
}
