import { Component, EventEmitter,  Output, OnInit, Input, ViewChild} from '@angular/core';
import { NumerosComponent } from './numeros/numeros.component';
import { BomboService } from './services/bombo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(NumerosComponent) numeros: NumerosComponent;
  start: boolean;
  esconderNav: boolean;
  jugadores: number [];
  @Input() entrar: boolean;

  constructor(private bomboService: BomboService) {
    this.jugadores = [];
  }
  
  ngOnInit(): void {
    this.start = false;
    this.entrar = false;
    this.esconderNav = true;
  }

  //METODO QUE SE EJECUTA AL INICIAR EL JUEGO CON EL BOTON DEL NAVEGADOR "Nuevo Juego"
  onNuevoJuego(numeroDeOponentes){
    this.start = true;
    for (let i = 0; i < numeroDeOponentes; i++) {
        this.jugadores.push(0);
    }
    
    this.bomboService.startGame(); //Iniciamos todo.

    //Controlamos el cambio de pantalla.
    setTimeout(() => {
      this.entrar = true;  
    }, 5000);
    
  }

  inicio(){
    this.entrar = true;
  }

  ultimoNumero(){
    return this.bomboService.getUltimoNumero();
  }

  //Numeros salidos en el bombo para sacar en la vista de usuario.
  numerosVista(){    
    return this.bomboService.getNumeros().sort(this.bomboService.comparar);
  }

  //Titulo de ganadores.
  tituloGanadores(){
    return this.bomboService.getTituloGanadores();
  }

  //Cuerpo de texto de ganadores.
  ganadores(){
    return this.bomboService.getGanadores();
  }

  premio(){
    return this.bomboService.getPremio();
  }

  getInformacion(){
    return this.bomboService.getInformacion();
  }
}








