/////////////////////////////////////////////////////////////////////////////////////////////
var canvas = document.getElementById("canvas");
var gtx = canvas.getContext("2d");
var dl = gtx;

canvas.height = parseInt(window.screen.height * .85 /*para celular 1.2, para escritorio .85*/);
//canvas.height = 500;
canvas.width = parseInt(canvas.height * 2.096);

var medida = (window.innerHeight - canvas.height) / 2;
var medidaAncho = (window.innerWidth - canvas.width) / 2;

if (medida < 0)
{
  medida = 0;
}

if (medidaAncho < 0)
{
  medidaAncho = 0;
}

var escala = parseFloat((canvas.height / 500).toFixed(1));


//3500
//3490

var limite = 3500 - 7.7 * escala;

var musicaFondo = document.getElementById("musicaFondo");
musicaFondo.volume = .3;

var jugando = false;
var pausa = false;

var recorte = true;

var perdiste = false;

var balaActiva;

var powerUp = false;

var win = false;

var enemigos = 0;

////////////////////////////////////////////////////////////////////////////////////////////
var maau =
{
  x: parseInt((3 * escala)),
  y: parseInt((268 * escala)),
  limiteF: parseInt(3 * escala) + parseInt((83 * escala))
};

var mapaRecorte =
{
  x: 0
}

var fondoRecorte =
{
  x: 0,
  y: 0
}

/////////////////////////////////////////////////////////////////////////////////

class Cubo {
  constructor(x, y, altura)
  {
    this.x = x;
    this.y = y;
    this.altura = altura;
    this.limiteF = this.x + parseInt((137 * escala));
  }
  modificarPosicion()
  {
    if (maau.x >= (canvas.width * .55) && mapaRecorte.x <= limite)
    {
      this.x -= speed;
      this.limiteF -= speed;
    }
  }
  modificarPosicionIzq()
  {
    if (maau.x <= (canvas.width * .25) && mapaRecorte.x > 0)
    {
      this.x += speed;
      this.limiteF += speed;
    }
  }
}

function comprobar(a)
{
  //cubo
  a.limiteF = a.x + parseInt((137 * escala));
  if ((maau.limiteF + speed > a.x && maau.x < a.limiteF) && maau.y > a.y - parseInt((110 * escala)))
  {
    spaceFree = false;
  } else {
    spaceFree = true;
  }

  return spaceFree;
}
function comprobarIzq(a)
{
  //cubo
  a.limiteF = a.x + parseInt((137 * escala));
  if (maau.x - speed < a.limiteF && maau.x >= a.limiteF && maau.y > a.y - parseInt((110 * escala)))
  {
    spaceFreeIzq = false;
  } else {
    spaceFreeIzq = true;
  }
  return spaceFreeIzq;
}
function comprobarAltura(a)
{
  //cubo
  a.limiteF = a.x + parseInt((137 * escala));
  if (maau.limiteF + (speed) > a.x && maau.x - speed < a.limiteF)
  {
    sueloPos = a.altura;
  } else {
    sueloPos = 1;
  }

  if (maau.limiteF == a.x || maau.x == a.limiteF || maau.limiteF == a.x - 1 || maau.x == a.limiteF - 1)
  {
    if (maau.y <= parseInt((268 * escala)))
    {
      sueloPos = 1;
    }
    if (maau.y <= parseInt((146 * escala)))
    {
      sueloPos = 2;
    }
    if (maau.y <= parseInt((24 * escala)))
    {
      sueloPos = 3;
    }
  }

  return sueloPos;
}

class Catsup
{
  constructor(x, y)
  {
    this.x = x;
    this.y = y;
    this.power = false;
  }
  conseguirCatsup()
  {
    if ((maau.limiteF >= this.x - parseInt((20 * escala)) && maau.x <= this.x + parseInt((20 * escala))) && (maau.y >= this.y - parseInt((48 * escala)) && maau.y <= this.y + parseInt((48 * escala))))
    {
      this.y = 1000 * escala;
      if (!this.power)
      {
        cantidadCatsup++;
      }
      else
      {
        powerUp = true;
      }
    }
    if (this.power)
    {
      dl.drawImage(lentes, 0, 0, 1024, 517, this.x, this.y, parseInt((50 * escala)), parseInt((30 * escala)));
    }
    else
    {
      dl.drawImage(catsup, 0, 0, 250, 600, this.x, this.y, parseInt((20 * escala)), parseInt((48 * escala)));
    }
  }
  modificarPosicion()
  {
    if (maau.x >= (canvas.width * .55) && mapaRecorte.x <= limite)
    {
      this.x -= speed;
      this.limiteF -= speed;
    }
  }
  modificarPosicionIzq()
  {
    if (maau.x <= (canvas.width * .25) && mapaRecorte.x > 0)
    {
      this.limiteF += speed;
      this.x += speed;
    }
  }
}

class Bala
{
  constructor(x, y)
  {
    this.x = x;
    this.y = y;
  }
}

///////////////////////////////////////////////////////////////////////////////

function funcionCatsup()
{
  for (var i = 0; i < arrayCatsup.length; i++)
  {
    arrayCatsup[i].conseguirCatsup();
  }
}

function posicionCatsup()
{
  for (var i = 0; i < arrayCatsup.length; i++)
  {
    arrayCatsup[i].modificarPosicion();
  }
}
function posicionCatsupIzq()
{
  for (var i = 0; i < arrayCatsup.length; i++)
  {
    arrayCatsup[i].modificarPosicionIzq();
  }
}

function posicionCubo()
{
  for (var i = 0; i < arrayCubos.length; i++)
  {
    arrayCubos[i].modificarPosicion();
  }
}
function posicionCuboIzq()
{
  for (var i = 0; i < arrayCubos.length; i++)
  {
    arrayCubos[i].modificarPosicionIzq();
  }
}

function funcionAltura()
{
  if
  (
    comprobar(cubo) &&
    comprobar(cubo1) &&
    comprobar(cubo6) &&
    comprobar(cubo3) &&
    comprobar(cubo4) &&
    comprobar(cubo7) &&
    comprobar(cubo8) &&
    comprobar(cubo9) &&
    comprobar(cubo10) &&
    comprobar(cubo11)
  )
  {
    spaceFree2 = true;
  } else {
    spaceFree2 = false;
  }

  if
  (
    comprobarIzq(cubo) &&
    comprobarIzq(cubo1) &&
    comprobarIzq(cubo6) &&
    comprobarIzq(cubo3) &&
    comprobarIzq(cubo4) &&
    comprobarIzq(cubo7) &&
    comprobarIzq(cubo8) &&
    comprobarIzq(cubo9) &&
    comprobarIzq(cubo10) &&
    comprobarIzq(cubo11)
  )
  {
    spaceFreeIzq2 = true;
  } else {
    spaceFreeIzq2 = false;
  }

  if
  (
    comprobarAltura(cubo1) == 3 ||
    comprobarAltura(cubo6) == 3 ||
    comprobarAltura(cubo9) == 3
  )
  {
    sueloN = 3;
  }
  else if
  (
    comprobarAltura(cubo) == 2 ||
    comprobarAltura(cubo5) == 2 ||
    comprobarAltura(cubo3) == 2 ||
    comprobarAltura(cubo4) == 2 ||
    comprobarAltura(cubo7) == 2 ||
    comprobarAltura(cubo8) == 2 ||
    comprobarAltura(cubo10) == 2 ||
    comprobarAltura(cubo11) == 2
  )
  {
    sueloN = 2;
  }
  else {
    sueloN = 1;
  }

  if (maau.y == parseInt((268 * escala)))
  {
    sueloN = 1;
  }
  if (sueloN == 1)
  {
    suelo = parseInt((268 * escala));
  } else if (sueloN == 2)
  {
    suelo = parseInt((146 * escala));
  } else if (sueloN == 3)
  {
    suelo = parseInt((24 * escala));
  }
  if (maau.y >= parseInt(268 * escala))
  {
    suelo = parseInt(268 * escala);
    maau.y = parseInt(268 * escala);
  }
}

///////////////////////////////////////////////////////

var xPos;
var yPos;
var disparo = false;

var sueloPos;
var suelo = parseInt((268 * escala));

var poderDisparar = true;

var posX;
var posX2;

var cantidadCatsup = 0;

var sueloN;

var spaceFree;
var spaceFreeIzq;

var spaceFree2;
var spaceFreeIzq2;

var speed = parseInt((10 * escala));

var mira = 1;

////////////////////////////////////////////////////////////////////////////////

document.addEventListener("keydown", function(evento)
{

    funcionAltura();

    if (evento.keyCode == 39 || evento.keyCode == 68)
    {
      if (!spaceFree2 || pausa || !jugando)
      {
        console.log();
      }
      else
      {
        derecha();
      }
    }
    else if (evento.keyCode == 37 || evento.keyCode == 65)
      {
        if (!spaceFreeIzq2 || maau.x < speed || pausa || !jugando)
        {
          console.log();
        } else
        {
          izquierda();
        }
    }
    else if (evento.keyCode == 38 || evento.keyCode == 87)
      {
        if (pausa || !jugando)
        {
          console.log();
        }
        else
        {
          saltar();
        }
      }
    else if (evento.keyCode == 32 || evento.keyCode == 13)
    {
      if (!spaceFree2 || !spaceFreeIzq2 || pausa || !jugando)
      {
        console.log();
      }
      else
      {
        if (poderDisparar)
        {
          disparar();
        }
      }
    }
    else if (evento.keyCode == 27)
    {
      if (jugando)
      {
        pausarJuego();
        dibujarMenuPausa();
      }
    }
});

/////////////////////////////////////////////////////////////////////////////////

imgNormal = new Image();
imgNormal.src = "assets/pose_normal.png";

imgCorrer = new Image();
imgCorrer.src = "assets/correr1.png";

imgCorrer1 = new Image();
imgCorrer1.src = "assets/correr2.png";

imgCorrer2 = new Image();
imgCorrer2.src = "assets/correr3.png";

imgCorrer3 = new Image();
imgCorrer3.src = "assets/correr4.png";

imgCubo = new Image();
imgCubo.src = "assets/cuboMaikra.png";

imgIzquierda = new Image();
imgIzquierda.src = "assets/izquierda.png";

imgIzquierda1 = new Image();
imgIzquierda1.src = "assets/izquierda1.png";

imgIzquierda2 = new Image();
imgIzquierda2.src = "assets/izquierda2.png";

imgIzquierda3 = new Image();
imgIzquierda3.src = "assets/izquierda3.png";

imgCubo = new Image();
imgCubo.src = "assets/cuboMaikra.png";

imgIzq = new Image();
imgIzq.src = "assets/normalizq.png";

catsup = new Image();
catsup.src = "assets/catsup.png";

disparoCatsup = new Image();
disparoCatsup.src = "assets/disparoCatsup.png";

disparoCatsupIzq = new Image();
disparoCatsupIzq.src = "assets/disparoCatsupIzq.png";

fondo = new Image();
fondo.src = "assets/fondo.png";

imgEnemigo = new Image();
imgEnemigo.src = "assets/enemigoNormal.png";

enemigoCorrer1 = new Image();
enemigoCorrer1.src = "assets/enemigoCorrer1.png";

enemigoIzq = new Image();
enemigoIzq.src = "assets/enemigoIzq.png";

enemigoCorrerIzq1 = new Image();
enemigoCorrerIzq1.src = "assets/enemigoCorrerIzq1.png";

lentes = new Image();
lentes.src = "assets/lentes.png";

lentesIzq = new Image();
lentesIzq.src = "assets/lentesIzq.png";

/////////////////////////////////////////////////////////////////////////////////////////


setInterval(function()
{
  if (jugando && !pausa)
  {
    principal();
  }
}, 1000/60);

////////////////////////////////////////////////////////////////////////////////



function principal()
{
  if (!pausa)
  {
      dl.shadowOffsetX = 0;
      dl.shadowOffsetY = 0;
      dl.shadowBlur = 0;
      canvas.width = canvas.width;
      gravedad();
      dl.drawImage(fondo, fondoRecorte.x, 0, 5184, 1080, 0, 0, canvas.width * 2, canvas.height);
      funcionCatsup();
      fisicaCatsup();
      dl.drawImage(mapa, mapaRecorte.x, 502, 4802, 1002, 0, 0, parseInt((4802 * escala)), parseInt((1002 * escala)));
      fuente = parseInt((90 * escala)) + "px sans-serif";
      dl.font = fuente;
      //dl.fillText(cantidadCatsup, parseInt((110 * escala)), parseInt((130 * escala)));
      dibujarCantCatsup();
      dl.shadowOffsetX = 0;
      dl.shadowOffsetY = 0;
      dl.shadowBlur = 0;
      dl.drawImage(imgNormal, 160, 0, 659, 758, maau.x, maau.y, parseInt((130 * escala)), parseInt((130 * escala)));
      dl.drawImage(catsup, 0, 0, 250, 600, parseInt((30 * escala)), parseInt((20 * escala)), parseInt((60 * escala)), parseInt((144 * escala))); // cambia segun la cantidad de catsup
      //dl.drawImage(imgCubo, 0, 0, 120, 120, cubo8.x, cubo8.y, 120, 120);
      //dibujarFlechas();
      dibujarLentes();
      dibujarEnemigos();
  }
}


////////////////////////////////////////////////////////////////////////////////
function derecha()
{
  if (maau.x >= canvas.width * .9)
  {
    victoria();
  }

  if (sueloN > 0 || maau.y != parseInt(268 * escala))
  {
    posicionCatsup();
    posicionCubo();
    posicionEnemigo();
    if (maau.x >= (canvas.width * .55) && mapaRecorte.x <= limite)
    {
      mapaRecorte.x += speed / escala;
      fondoRecorte.x += speed / escala / 4;
    }
    else
    {
      if (maau.x < canvas.width * .9)
      {
        maau.x += speed;
        maau.limiteF += speed;
      }
    }

    imgNormal.src = "assets/pose_normal.png";
    window.setTimeout(function()
    {
      dl.drawImage(imgCorrer, 160, 0, 659, 758, maau.x, maau.y, parseInt((130 * escala)), parseInt((130 * escala)));
      if (powerUp)
      {
        dl.drawImage(lentesIzq, 0, 0, 1024, 517, maau.x + 24.615384615384613 * escala, maau.y + 3.846153846153846 * escala, parseInt((50 * escala)), parseInt((30 * escala)));
      }
    }, 0);
    window.setTimeout(function()
    {
      dl.drawImage(imgCorrer1, 160, 0, 659, 758, maau.x, maau.y, parseInt((130 * escala)), parseInt((130 * escala)));
      if (powerUp)
      {
        dl.drawImage(lentesIzq, 0, 0, 1024, 517, maau.x + 24.615384615384613 * escala, maau.y + 3.846153846153846 * escala, parseInt((50 * escala)), parseInt((30 * escala)));
      }
    }, 3);
    window.setTimeout(function()
    {
      dl.drawImage(imgCorrer2, 160, 0, 659, 758, maau.x, maau.y, parseInt((130 * escala)), parseInt((130 * escala)));
      if (powerUp)
      {
        dl.drawImage(lentesIzq, 0, 0, 1024, 517, maau.x + 24.615384615384613 * escala, maau.y + 3.846153846153846 * escala, parseInt((50 * escala)), parseInt((30 * escala)));
      }
    }, 6);
    window.setTimeout(function()
    {
      dl.drawImage(imgCorrer3, 160, 0, 659, 758, maau.x, maau.y, parseInt((130 * escala)), parseInt((130 * escala)));
      if (powerUp)
      {
        dl.drawImage(lentesIzq, 0, 0, 1024, 517, maau.x + 24.615384615384613 * escala, maau.y + 3.846153846153846 * escala, parseInt((50 * escala)), parseInt((30 * escala)));
      }
    }, 9);
  }
}

function izquierda()
{
  if (sueloN > 0 || maau.y != parseInt(268 * escala))
  {
    posicionCatsupIzq();
    posicionCuboIzq();
    posicionEnemigoIzq();
    if (maau.x <= (canvas.width * .25) && mapaRecorte.x > 0)
    {
      mapaRecorte.x -= speed / escala;
      if (fondoRecorte.x > 0 && recorte)
      {
        fondoRecorte.x -= speed / escala / 4;
      }
    }
    else if (maau.x > speed)
    {
      maau.x -= speed;
      maau.limiteF -= speed;
    }


    imgNormal.src = imgIzq.src;
    window.setTimeout(function()
    {
      dl.drawImage(imgIzquierda, 160, 0, 659, 758, maau.x, maau.y, parseInt((130 * escala)), parseInt((130 * escala)));
      if (powerUp)
      {
        dl.drawImage(lentes, 0, 0, 1024, 517, maau.x + 24.615384615384613 * escala, maau.y + 3.846153846153846 * escala, parseInt((50 * escala)), parseInt((30 * escala)));
      }
    }, 0);
    window.setTimeout(function()
    {
      dl.drawImage(imgIzquierda1, 160, 0, 659, 758, maau.x, maau.y, parseInt((130 * escala)), parseInt((130 * escala)));
      if (powerUp)
      {
        dl.drawImage(lentes, 0, 0, 1024, 517, maau.x + 24.615384615384613 * escala, maau.y + 3.846153846153846 * escala, parseInt((50 * escala)), parseInt((30 * escala)));
      }
    }, 3);
    window.setTimeout(function()
    {
      dl.drawImage(imgIzquierda2, 160, 0, 659, 758, maau.x, maau.y, parseInt((130 * escala)), parseInt((130 * escala)));
      if (powerUp)
      {
        dl.drawImage(lentes, 0, 0, 1024, 517, maau.x + 24.615384615384613 * escala, maau.y + 3.846153846153846 * escala, parseInt((50 * escala)), parseInt((30 * escala)));
      }
    }, 6);
    window.setTimeout(function()
    {
      dl.drawImage(imgIzquierda3, 160, 0, 659, 758, maau.x, maau.y, parseInt((130 * escala)), parseInt((130 * escala)));
      if (powerUp)
      {
        dl.drawImage(lentes, 0, 0, 1024, 517, maau.x + 24.615384615384613 * escala, maau.y + 3.846153846153846 * escala, parseInt((50 * escala)), parseInt((30 * escala)));
      }
    }, 9);
  }
}

///////////////////////////////////////////////////////////////////////////////////

function saltar()
{
  if (maau.y == suelo)
  {
    console.log();
    var saltando = setInterval(function()
    {
      maau.y -= parseInt((10 * escala));
    }, 20);
    function parar(){clearInterval(saltando);}
    window.setTimeout(parar, 500);
  }
}

function gravedad()
{
  if (parseInt(maau.y) == suelo || parseInt(maau.y) - 1 == suelo || parseInt(maau.y) - 2 == suelo)
  {
    maau.y = suelo;
  }
  else //if(maau.y <= parseInt(268 * escala))
  {
    maau.y += Math.round((2 * escala));
  }
}

function disparar()
{
  if (imgNormal.src == imgIzq.src)
  {
    mira = 2;
  } else {
    mira = 1;
  }
  poderDisparar = false;
  window.setTimeout(function()
  {
    poderDisparar = true;
  }, 900);

  if (cantidadCatsup > 0)
  {
    balaActiva = true
    cantidadCatsup--;
    xPos = maau.x;
    yPos = maau.y;
    disparo = true;
    posX = xPos + parseInt((500 * escala));
    posX2 = xPos - parseInt((500 * escala));
  }
}


function fisicaCatsup()
{
  if (disparo)
  {
    new Bala(xPos, yPos);
    if (xPos > posX || xPos < posX2 || !balaActiva)
    {
      xPos = -1000;
      disparo = false;
    }
    else
    {
      balaActiva = true;
      if (mira == 1)
      {
        disparoCatsup.src = "assets/disparoCatsup.png";
        dl.drawImage(disparoCatsup, 0, 0, 500, 500, new Bala(xPos, yPos).x, new Bala(xPos, yPos).y, parseInt((50 * escala)), parseInt((50 * escala)));
        xPos += speed;
        matarEnemigos(new Bala(xPos, yPos));
      } else if (mira == 2)
      {
        disparoCatsup.src = disparoCatsupIzq.src;
        dl.drawImage(disparoCatsup, 0, 0, 500, 500, new Bala(xPos, yPos).x, new Bala(xPos, yPos).y, parseInt((50 * escala)), parseInt((50 * escala)));
        xPos -= speed;
        matarEnemigos(new Bala(xPos, yPos));
      }
    }
  }
}

function pausarJuego()
{
  if (pausa)
  {
    pausa = false;
    console.log("despausa");
    musicaFondo.play();
  }
  else
  {
    pausa = true;
    console.log("pausa");
    musicaFondo.pause();
  }
}

function dibujarCantCatsup()
{
  dl.shadowOffsetX = 4 * escala;
  dl.shadowOffsetY = 4 * escala;
  dl.shadowBlur = 8 * escala;
  dl.shadowColor = "#DFBCB6";
  dl.fillText(cantidadCatsup, parseInt((110 * escala)), parseInt((130 * escala)));
}

function gameOver()
{
  jugando = false;
  musicaFondo.pause();
  musicaFondo.currentTime = 0;
  window.setTimeout(function()
  {
    canvas.width = canvas.width;
    dl.drawImage(fondo, fondoRecorte.x, 0, 5184, 1080, 0, 0, canvas.width * 2, canvas.height);
    fuente = parseInt((90 * escala)) + "px sans-serif";
    dl.font = fuente;
    dl.shadowOffsetX = 4 * escala;
    dl.shadowOffsetY = 4 * escala;
    dl.shadowBlur = 8 * escala;
    dl.shadowColor = "#DFBCB6";
    dl.fillText("GAME OVER", canvas.width * .25, canvas.height * .5);
    perdiste = true;
    dReiniciar();
  }, 200);
}

function dibujarLentes()
{
  if (powerUp)
  {
    if (imgNormal.src == imgIzq.src)
    {
      dl.drawImage(lentes, 0, 0, 1024, 517, maau.x + 16.923076923076923 * escala, maau.y + 3.846153846153846 * escala, parseInt((50 * escala)), parseInt((30 * escala)));
    }
    else
    {
      dl.drawImage(lentesIzq, 0, 0, 1024, 517, maau.x + 24.615384615384613 * escala, maau.y + 3.846153846153846 * escala, parseInt((50 * escala)), parseInt((30 * escala)));
    }
  }
}
////////////////////////////////////////////////////////////////////////////////////////
