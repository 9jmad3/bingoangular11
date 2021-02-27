import { Component, OnInit, Output, EventEmitter, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BomboService } from '../services/bombo.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Output() nuevoJuego: EventEmitter<number>;

  verJugadoresSeleccionados: number; //Opción de jugadores (oponentes) seleccionador por el jugador.
  jugadoresSeleccionados: number; 
  jugadores: number []; //Opciones de número de jugadores.
  precios: number []; //Opciones de precios por cartón.
  cronometro: number;
  mensaje: string;
  hidden: boolean;

  constructor(private bomboService: BomboService) { 
    this.nuevoJuego = new EventEmitter();
    this.jugadores = [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20] 
    this.precios = [1,2,3,4,5]
    this.verJugadoresSeleccionados = 5;
    
  }

  ngOnInit(): void {
    this.hidden = false;
  }

  /**
   * Se genera una cuenta atras para el inicio del juego, cuando esta acaba se cambia de pantalla y se le pasa la información al servicio para que 
   * genére los cartones y comience el juego.
   */
  onClick(){
    this.hidden = true;
    this.cronometro = 5;
    this.mensaje = "El juego empieza en "
    let time = setInterval(()=>{
      this.cronometro--;
    },1000);

    this.nuevoJuego.emit(this.verJugadoresSeleccionados);
  }

  /**
   * 
   * @param event Número de oponentes seleccionados.
   */
  capturarJugadorSeleccionado(event){    
    this.verJugadoresSeleccionados = event.target.value;    
  }

  /**
   * 
   * @param event Precio del cartón seleccionado.
   */
  capturarPrecioSeleccionado(event){
    this.bomboService.setPremio(event.target.value)
  }
}
