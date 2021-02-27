import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class BomboService {

  bombo: number[]; //Array que contiene los números que van saliendo en el bombo.
  ultimoNumero: number; 
  cartones: any[]; //Array donde se encuentran todos los cartones generados.
  carton: number [] //Array que se usa para generar un carton. Esta se pushea a la array "cartones".
  numeros: number[]; 
  numerosVista: string; 
  premio: number; //Premio total.
  precio: number; //Precio del cartón.
  cartonJugador: number[]; //Cartón del jugador con todos los números (excluyendo 0).
  id: number; //Id del cartón para saber a que jugador pertenece.
  time; //Variable que se usa para generar el contador.
  velocidad: number; //Variable que se usa para ajustar la velocidad de repeticion.
  cambiarPantalla: boolean; //Control de pantallas.
  tituloGanadores: string; //Mensaje de ganadores.
  ganadores: number []; //Ids de los ganadores.
  informacion: string; //Información por pantalla al usuario.

  constructor() { 
    this.bombo = [];
    this.ultimoNumero;    
    this.cartones = [];
    this.numeros = [];
    this.numerosVista = "";
    this.precio = 1;
    this.cartonJugador = [];
    this.id = 0;
    this.velocidad = 5000;
    this.cambiarPantalla = false;
    this.tituloGanadores = "Esperando ganador/es";
    this.ganadores = [];
    this.premio = this.getPremio();
    this.informacion = "Juego en curso";
  }

  /**
   * Función para generar un número aleatorio
   * Si el número ya existe se vuelve a generar otro. Cuando el número es 
   * valido se guarda en el array "bombo".
   * @returns num
   * @param reset Parametro que informa si hay que vaciar el bombo.
   */
  getRandom(reset = null): number{
    if(reset){
      this.bombo = [];
    }else{
      if (this.bombo.length < 90) {
        let valido: boolean = false;
        var num:number = Math.floor(Math.random() * (91 - 1)) + 1;
        
        while (!valido) {
          if (this.bombo.includes(num)) {
            num =  Math.floor(Math.random() * (91 - 1)) + 1;
          } else {
            this.bombo.push(num);
            this.bombo.sort();
            this.ultimoNumero = num;
            valido = true;
          }
        } 
        return num; 
      }  
    }
  }
  //Fin de la funcion get random

  /**Retorna el ultimo número que ha salido del bombo. */
  getUltimoNumero(){
    return this.ultimoNumero;
  }

  /**
   * Función para devolver los numeros en formato array
   * @returns this.numeros
   */
  getNumeros(){
    return this.numeros;
  }

  /**
   * Función que devuelve un string con todos los números que han salido.
   * @returns this.numerosVista
   */
  getNumerosVista(){
    return this.numerosVista;
  }

  /**
   * Función para devolver todos los números que han salido.
   * @returns this.bombo
   */
  getAll(){
    return this.bombo;
  }

  /**
   * Método que comprueba si ha ganado alguien.
   * @param click Vemos si el evento se ha generado por un click del jugador.
   */
  comprobarBingo(click = null){

    //Comprobamos que no haya finalizado ya la partida.
    if(this.tituloGanadores != "¡Unico ganador!" && this.tituloGanadores != "¡GANADORES!"){
      let comodin: number []=[];
      let jugador: number = 0;
      
      //Comprobamos cartón por cartón
      for (let i = 0; i < this.cartones.length; i++) {

        //Comprobamos casilla por casilla dentro de un cartón.
        for (let j = 0; j < this.cartones[i].length; j++) {
          
          //Si el bombo incluye el número de la casilla del cartón pusheamos el número a un nuevo array.
          if (this.bombo.includes(this.cartones[i][j])) {
            comodin.push(this.cartones[i][j]);
          }
        }  
        
        //Si el nuevo array es igual a 15 es porque el bingo es correcto.
        //Pusheamos el id del jugador ganador a un nuevo array de ganadores, y vaciamos el array para comprobar el siguiente cartón.
        if(comodin.length == 15){
          this.ganadores.push(jugador);
          comodin = [];         
        }
        jugador++; //Aumentamos el id del jugador para coincidir con el cartón.
        comodin = []; //vaciamos el array de comprobación de bingo para la siguiente comprobación.
      }

      //Si el jugador ha pulsado el botón de comprobar bingo y este no es correcto se le muestra en el apartadod e información.
      if(click && this.ganadores.length === 0){
        this.informacion = "El bingo no es correcto."
      }

      //Si solo hay un ganador
      if(this.ganadores.length === 1){

        //Y ese ganador es el jugador
        if (this.ganadores[0] == 0) {
          this.tituloGanadores = "¡Unico ganador!"
          this.informacion = "Enhorabuena!"
        }else{
          this.tituloGanadores = "¡Unico ganador!"
          this.informacion = "Más suerte la próxima vez."
        }
        
        comodin = []
        //Paramos el bombo.
        clearInterval(this.time);
      }

      //Si hay mas de un ganador
      if(this.ganadores.length>1){
        
        this.tituloGanadores = "¡GANADORES!"

        for (let i = 0; i < this.ganadores.length; i++) {
          console.log(this.ganadores[i]);
        }
        
        this.informacion = "¡Nos vemos en la próxima!"
        //Paramos el bombo.
        clearInterval(this.time);
      }
    }
  }

  /**
   * Función que inicia todo el juego.
   */
  startGame(){
    this.startBombo();
  }

  /**
   * 
   */
  startBombo(){
    this.time = setInterval(()=>{
      this.cambiarPantalla = true;
      
      this.ultimoNumero = this.getRandom(); //Generamos un nuevo número random válido.
      this.numeros.push(this.ultimoNumero); //Lo metemos en el array de números salidos en el juego.
      this.numeros.sort(); //Ordenamos esos números.
      this.comprobarBingo(); //Comprobamos si hay ganadores.

      if (this.numeros.length === 90) { //Si ya han salido los 90 números.
        //Paramos el bombo.
        clearInterval(this.time);
      }
    },this.velocidad); //Variable de velocidad de salida de números.
  }


  /**
   * Función para generar los cartónes del juego.
   */
  getCarton(){
    let rowOne: number [] = []; //Linea 1 del cartón
    let rowTwo: number [] = []; //Linea 2 del cartón
    let rowThree: number [] = []; //Linea 3 del cartón
    let cartonComodin = []; 
    this.carton = []; 
    let num: number;
    let contador: number = 0;
    let f: number = 10;
    let contadorUno: number = 0;
    let contadorDos: number = 0;
    let contadorTres: number = 0;
    
    /*
     * Generar 27 números validos.
     * Funcionamiento:
     * Se incrementa la i del for cuando se han generado tres números de cada decena.
     * Si el número ya existe en el array cartón se decrementa la i en 10 para que en la siguientre vuelta del for vuelva a valer lo mismo y por lo tanto, 
     * se vuelva a buscar un número de la misma decena. 
     * Si el número no está ya en el cartón y por lo tanto es válido, miramos cuandos números tenemos de esa decena con la variable contador.
     * Si contador es menor que dos es que aun nos faltan números de la decena actual, por lo tanto, sumamos uno al contador, restamos 10 a i para volver a buscar por la misma decena 
     * y metemos el número válido en el cartón.
     * Si el contador no es menor que dos quiere decir que ya tenemos los tres números de la decena actual y por lo tanto, debemos aumentar i. Para ello, no restamos esta vez 10 a "i" pero 
     * si incrementamos "f" que es el valor mayor por el que se va a buscar el número aleatorio. También ponemos el contador a 0 para buscar de nuevo 3 números y metemos el número en
     * el array cartón.
     */
    for (let i = 1; this.carton.length < 27; i+=10) {
        num = Math.floor(Math.random() * (f - i)) + i; //Número random entre f->mayor y i->menor.
        
        if (this.carton.includes(num))  {
          num = Math.floor(Math.random() * (f - i)) + i;
          i-=10;
        } else {
          if (contador < 2) {
            contador ++;
            i-=10;
            this.carton.push(num);
          }else{ 
            contador = 0;
            this.carton.push(num);
            f+=10;
          }          
        }
    
    }

    //Ordenamos el cartón
    this.carton.sort(this.comparar);

    //Separamos por lineas metiendo un número de cada decena en cada línea.
    for (let i = 0; i < this.carton.length; i++) {
      if (i%3 == 0) {
        rowOne.push(this.carton[i]);
      }else if(i>1 && i%2 == 0){
        rowThree.push(this.carton[i]);
      }else{
        rowTwo.push(this.carton[i]);
      }  
    }  
    
    //Insertamos los 0 necesarios para dejar los espacios en blanco.
    //Para ello vamos comprobando línea por línea que se introducen los ceros necesarios.
    while (contadorUno <=3 || contadorDos <=3 || contadorTres <=3) { 
      num = Math.floor(Math.random() * (9 - 0)) + 0;

      if (contadorUno<=3) {
        num = Math.floor(Math.random() * (9 - 0)) + 0;
        if (rowOne[num] == 0) {
          num = Math.floor(Math.random() * (9 - 0)) + 0;
        }else{
          rowOne[num] = 0;
          contadorUno++;
        }
      }

      if (contadorDos<=3) {
        num = Math.floor(Math.random() * (9 - 0)) + 0;
        if (rowTwo[num] == 0) {
          num = Math.floor(Math.random() * (9 - 0)) + 0;
        }else{
          rowTwo[num] = 0;
          contadorDos++;
        }
      }

      if (contadorTres<=3) {
        num = Math.floor(Math.random() * (9 - 0)) + 0;
        if (rowThree[num] == 0) {
          num = Math.floor(Math.random() * (9 - 0)) + 0;
        }else{
          rowThree[num] = 0;
          contadorTres++;
        }
      }
    }

  
    this.carton = rowOne.concat(rowTwo, rowThree); //Añadimos las tres líneas a un mismo array.

    /*
    * Recorremos el cartón metiendo los números exceptuando los 0 en un nuevo array que se utilizará internamente 
    * para comprobar el bingo, por eso quitamnos los ceros.
    */
    for (let i = 0; i < this.carton.length; i++) {
      if (this.carton[i] != 0) {
        cartonComodin.push(this.carton[i]);
      }
    }

    //Igualamos el valor ordenandolo.
    this.carton = cartonComodin.sort(this.comparar);

    //Metemos en cartón comodín las líneas del cartón y el id del jugador que se usarán para maquetar.
    cartonComodin = [];
    cartonComodin[0] = rowOne;
    cartonComodin[1] = rowTwo;
    cartonComodin[2] = rowThree;
    cartonComodin[3] = this.id;

    this.id++; //Aumentamos el id del jugador.
    this.cartones.push(this.carton);   //Metemos el cartón (sin ceros y ordenado) en el array de cartones de jugadores. 

    return cartonComodin;
  }

  /**
   * Función para comparar y ordenar las lineas de los cartones. Se usa dentro de la funcion "getCarton"
   * @returns
   */
  comparar(a, b){
    return a -b;
  }

  /**
   * Función para devolver el premio entre los ganadores.
   * @returns 
   * Se devuelve la cantidad entre los ganadores o total si aún no ha ganado nadie.
   */
  getPremio(){
    if (this.ganadores.length<1) {
      return parseFloat(((this.precio * this.cartones.length)*0.8).toFixed(2));
    } else {
      return parseFloat((((this.precio * this.cartones.length) / this.ganadores.length)*0.8).toFixed(2));
    }
  }

  /**
   * Función para modificar el premio
   */
  setPremio(precio){    
    this.precio = precio;
  }

  /**
   * Función que permite rellenar el array de cartón jugador con los números que ha pulsado en su cartón.
   * @argument cartonActual
   * carton actual: array con los números pulsados por el usuario.
   */
  setCartonJugador(cartonActual){
    //Actualizamos el cartón. Para ello primero lo vaciamos y lo rellenamos parseando los datos a int.
    this.cartonJugador = [];
    for (let i = 0; i < cartonActual.length; i++) {
       this.cartonJugador.push(parseInt(cartonActual[i]));
    }   
  }

  /**
   * Función que devuelve información para el funcionamiento del programa.
   * @returns boolean.
   */
  getCambiarPantalla(){    
    return this.cambiarPantalla;
  }

  /**
   * Función para devolver los ganadores.
   * @returns 
   * this.ganadores: array con los id de los ganadores.
   */
  getGanadores(){
    return this.ganadores;
  }

  /**
   * Función para devolver el titulo en el espacio de ganadores.
   * @returns
   * this.tituloGanadores: string con el titulo adecuado.
   */
  getTituloGanadores(){
    return this.tituloGanadores;
  }

  /**
   * Función para devolver información de interes al usuario.
   * @returns
   * this.informacion: string con informacion de interes.
   */
  getInformacion(){
    return this.informacion;
  }

}
