import { Component, OnInit } from '@angular/core';
import { BomboService } from '../services/bombo.service';

@Component({
  selector: 'app-carton',
  templateUrl: './carton.component.html',
  styleUrls: ['./carton.component.css']
})
export class CartonComponent implements OnInit {
  carton: number []; //Cartón del usuario
  num: number; 
  rowOne: number []; //Fila uno usada para maquetar
  rowTwo: number []; //Fila dos usada para maquetar
  rowThree: number []; //Fila tres usada para maquetar
  marcado: string; //Fondo de la celda.
  numerosSeleccionados: number []; //Números seleccionados por el usuario.
  id: number; //Id del jugador.

  constructor(private bomboService: BomboService) {
    this.num = 12;
    this.numerosSeleccionados = [];
   }

  ngOnInit(): void {
    let carton = this.bomboService.getCarton(); //Array con los números del cartón separados por líneas. [[Linea 1][Linea 2][Linea 3][id del jugador]]
    this.rowOne =  carton[0];
    this.rowTwo = carton[1];
    this.rowThree = carton[2]; 
    this.id = carton[3]; 
    // this.carton = this.rowOne.concat(this.rowTwo, this.rowThree); //Array con los números totales del cartón del jugador.
    this.carton = [];
    this.marcado = "bg-white"; //Fondo de la celda.
  }

  /**
   * Cuando el usuario pulsa un número en su cartón se pinta el fondo de rojo si no estaba seleccionado o de blanco en caso contrario.
   * También se comprueba si ese número existe en el array de números seleccionados. Si no existe se mete y si no se saca.
   *  
   * @param num número pulsado por el jugador en su cartón.
   */
  onClick(num){
    
    //Si no existe el número pulsado lo incluimos en el array, si existe lo buscamos su indice y lo borramos.
    if (!this.carton.includes(num.innerHTML)) {
      this.carton.push(num.innerHTML);
    }else{
      this.carton.splice(this.carton.indexOf(num.innerHTML),1);
    }
    
    this.bomboService.setCartonJugador(this.carton);    

    // //ENTRADA O SALIDA EN ARRAY DE NUMEROS SELECCIONADOS
    // if (this.numerosSeleccionados.indexOf(num.innerHTML) != -1) {
    //   this.numerosSeleccionados.splice(this.numerosSeleccionados.indexOf(num.innerHTML), 1);
    // }else{
    //   this.numerosSeleccionados.push(num.innerHTML);
    // }
   

    //CAMBIO DE COLOR DE FONDO EN LAS CELDAS solo si el carton es el del usuario,
    if (this.id === 0) {
      if (num.className === "bg-white") {
        num.className = "bg-danger";
      }else{
        num.className = "bg-white";
      } 
    }
  
  }
}
