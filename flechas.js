flechaIzquierda = new Image();
flechaIzquierda.src = "assets/flechaIzquierda.png";

flechaArriba = new Image();
flechaArriba.src = "assets/flechaArriba.png";

flechaDerecha = new Image();
flechaDerecha.src = "assets/flechaDerecha.png";

circuloDisparo = new Image();
circuloDisparo.src = "assets/circulo.png";


setInterval(function()
{
  if (jugando || !win || !perdiste)
  {
    moverDerecha();
    moverIzquierda();
  }
}, 50);


function dibujarFlechas()
{
  dl.drawImage(flechaIzquierda, 0, 0, 512, 512, canvas.width * .01, canvas.height * .82, 90 * escala, 90 * escala);
  dl.drawImage(flechaArriba, 0, 0, 512, 512, canvas.width * .085, canvas.height * .72, 90 * escala, 90 * escala);
  dl.drawImage(flechaDerecha, 0, 0, 512, 512, canvas.width * .161, canvas.height * .82, 90 * escala, 90 * escala);
  dl.drawImage(circuloDisparo, 0, 0, 512, 512, canvas.width * .9, canvas.height * .82, 90 * escala, 90 * escala);
     fuente = parseInt((40 * escala)) + "px sans-serif";
      dl.font = fuente;
      dl.fillText("II", canvas.width * .95, canvas.height * .1);
}

var xDerecha = canvas.width * .167 + medidaAncho;
var yDerecha = canvas.height * .833 + medida;

var xFinalDerecha = canvas.width * .243 + medidaAncho;
var yFinalDerecha = canvas.height * .987 + medida;

var xIzquierda = canvas.width * .007 + medidaAncho;
var yIzquierda = canvas.height * .833 + medida;

var xFinalIzquierda = canvas.width * .0811 + medidaAncho;
var yFinalIzquierda = canvas.height * .98 + medida;

var xArriba = canvas.width * .093 + medidaAncho;
var yArriba = canvas.height * .731 + medida;

var xFinalArriba = canvas.width * .1603 + medidaAncho;
var yFinalArriba = canvas.height * .883 + medida;

var xDisparo = canvas.width * .9 + medidaAncho;
var yDisparo = canvas.height * .821 + medida;

var xFinalDisparo = canvas.width * .98 + medidaAncho;
var yFinalDisparo = canvas.height * .985 + medida;


var fDerecha = false;
var fIzquierda = false;
var fArriba = false;
var cDisparo = false;

var xPausa = canvas.width * .948 + medidaAncho;
var yPausa = canvas.height * .041 + medida;

var xFinalPausa = canvas.width * .975 + medidaAncho;
var yFinalPausa = canvas.height * .103 + medida;

var movDerecha = false;
var movIzquierda = false;

canvas.addEventListener('click', function(evt)
  {
      var mousePos = getMousePos(canvas, evt);

      if (mousePos.x >= xDerecha && mousePos.x <= xFinalDerecha && jugando)
      {
        if (mousePos.y >= yDerecha && mousePos.y <= yFinalDerecha)
        {
          if (!movDerecha)
          {
            movDerecha = true;
            movIzquierda = false;
          } else {
            movDerecha = false;
          }
        }
      }
      if (mousePos.x >= xIzquierda && mousePos.x <= xFinalIzquierda && jugando)
      {
        if (mousePos.y >= yIzquierda && mousePos.y <= yFinalIzquierda)
        {
          if (!movIzquierda)
          {
            movIzquierda = true;
            movDerecha = false;
          } else {
            movIzquierda = false;
          }
        }
      }
      if (mousePos.x >= xArriba && mousePos.x <= xFinalArriba && jugando)
      {
        if (mousePos.y >= yArriba && mousePos.y <= yFinalArriba)
        {
            if (pausa || !jugando)
            {
              console.log();
            } else{
            saltar();
            }
        }
      }
      if (mousePos.x >= xDisparo && mousePos.x <= xFinalDisparo && jugando)
      {
        if (mousePos.y >= yDisparo && mousePos.y <= yFinalDisparo)
        {
            if (!spaceFree2 || !spaceFreeIzq2 || pausa || !jugando)
            {
              console.log();
            } else
            {
              if (poderDisparar)
              {
                disparar();
              }
            }
        }
      }
      if (mousePos.x >= xPausa && mousePos.x <= xFinalPausa && jugando)
      {
        if (mousePos.y >= yPausa && mousePos.y <= yFinalPausa)
        {
          pausarJuego();
          dibujarMenuPausa();
        }
      }

  });

function moverDerecha()
{
  funcionAltura();

  if (movDerecha)
  {
    if (!spaceFree2 || pausa || !jugando || perdiste)
    {
      movDerecha = false;
    }
    else
    {
      derecha();
    }
  }
  if (maau.x >= canvas.width * .85)
  {
    victoria();
    movDerecha = false;
  }
}

function moverIzquierda()
{

  funcionAltura();

  if (movIzquierda)
  {

    if (!spaceFreeIzq2 || maau.x < speed || pausa || !jugando || perdiste)
    {
      movIzquierda = false;
    }
    else
    {
      if (sueloN == 1)
      {
        izquierda();
      }
      else if (sueloN == 2)
      {
        izquierda();
      }
      else if (maau.y != parseInt((268 * escala)))
      {
        izquierda();
      }
    }
  }
}
