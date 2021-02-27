import { Component, Input, OnInit } from '@angular/core';
import { BomboService } from '../services/bombo.service';

@Component({
  selector: 'app-bannerderecho',
  templateUrl: './bannerderecho.component.html',
  styleUrls: ['./bannerderecho.component.css']
})
export class BannerderechoComponent implements OnInit {

  @Input () premio: number; //Premio total al bingo.
  @Input () informacion: string; //String de información relevante para el usuario.
  
  constructor(private bomboService: BomboService) { 

  }

  ngOnInit(): void {
    this.premio = 0 //Valor inicial hasta que se establece en el servicio.
  }

  /**
   * Funcion que llama a la función para comprobar el bingo del jugador.
   */
  comprobarBingo(){
    this.bomboService.comprobarBingo(true);
  }
}
