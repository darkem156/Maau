function nivel1()
{

  ////////////////////////////////////////////////////////////////////////////////
  // para crear uno toma el numero del cubo, multiplicalo por 120 y restale 74, 114, o 94
  // esa sera la posicion en x (el primer atributo)
  // el tercer atributo es el nivel de altura en la que se encuentra el cubo
  cubo = new Cubo(parseInt((606 * escala)), parseInt((258 * escala)), 2);
  cubo1 = new Cubo(parseInt((726 * escala)), parseInt((136 * escala)), 3);
  cubo3 = new Cubo(parseInt((976 * escala)), parseInt((258 * escala)), 2); //9
  cubo4 = new Cubo(parseInt((1216 * escala)), parseInt((258 * escala)), 2); //11
  cubo5 = new Cubo(parseInt((1346 * escala)), parseInt((258 * escala)), 2); //12
  cubo6 = new Cubo(parseInt((1466 * escala)), parseInt((137 * escala)), 3); //13
  cubo7 = new Cubo(parseInt((1586 * escala)), parseInt((258 * escala)), 2); //14
  cubo8 = new Cubo(parseInt(2076 * escala), parseInt(258 * escala), 2)//18
  cubo9 = new Cubo(parseInt(2326 * escala), parseInt(136 * escala), 3)//20
  cubo10 = new Cubo(parseInt(2936 * escala), parseInt(258 * escala), 2)//21
  cubo11 = new Cubo(parseInt(3436 * escala), parseInt(258 * escala), 2)//29

/////////////////////////////////////////
//cada cubo + 120
  catsupPrueba = new Catsup(parseInt((670 * escala)), parseInt((170 * escala)));
  catsup2 = new Catsup(parseInt((550 * escala)), parseInt((300 * escala)));
  catsup3 = new Catsup(parseInt((420 * escala)), parseInt((45 * escala)));
  if (Math.floor(Math.random() * (10 - 1)) + 1 == 2)
  {
    catsup3.power = true;
  }
  catsup4 = new Catsup(parseInt((790 * escala)), parseInt((45 * escala)));
  catsup5 = new Catsup(parseInt((910 * escala)), parseInt((300 * escala)));
  catsup6 = new Catsup(parseInt((1040 * escala)), parseInt((170 * escala)));
  catsup7 = new Catsup(parseInt(1160 * escala), parseInt(300 * escala));
  catsup8 = new Catsup(parseInt(1290 * escala), parseInt(170 * escala));
  catsup9 = new Catsup(parseInt(1410 * escala), parseInt(170 * escala));

  ////////////////////////////////////////////////////////////////////////////

  enemigo1 = new Enemigo(parseInt(2000 * escala), parseInt(268 * escala), cubo7, cubo8);
  enemigo2 = new Enemigo(parseInt(2502 * escala), parseInt(268 * escala), cubo9, cubo10);
  enemigo3 = new Enemigo(parseInt(3200 * escala), parseInt(268 * escala), cubo10, cubo11);
  enemigo4 = new Enemigo(parseInt(3600 * escala), parseInt(268 * escala), cubo11, 0);

  mapa = new Image();
  mapa.src = "assets/mapa.png";
  //////////////////////////////////////////////////////////////////////////////////
  arrayEnem =
  [
    enemigo1,
    enemigo2,
    enemigo3,
    enemigo4
  ];

  arrayCubos =
  [
    cubo,
    cubo1,
    cubo3,
    cubo4,
    cubo5,
    cubo6,
    cubo7,
    cubo8,
    cubo9,
    cubo10,
    cubo11
  ];

  arrayCatsup =
  [
    catsupPrueba,
    catsup2,
    catsup3,
    catsup4,
    catsup5,
    catsup6,
    catsup7,
    catsup8,
    catsup9
  ];
  ///////////////////////////////////////////////////////////////////////////////////////////////

}
