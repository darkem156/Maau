canvas.addEventListener('click', function(evt)
  {
      medida = (window.innerHeight - canvas.height) / 2;
      medidaAncho = (window.innerWidth - canvas.width) / 2;
      var mousePos = getMousePos(canvas, evt);

      if (medida < 0)
      {
        medida = 0;
      }

      if (medidaAncho < 0)
      {
        medidaAncho = 0;
      }


      var message = 'Mouse position: ' + ((mousePos.x - medidaAncho) / canvas.width) + ',' + ((mousePos.y - medida) / canvas.height);
      console.log(message);

      if (musicaFondo.volume < .1)
      {
        xMusicaMas = 693 * escala;
        xFinalMusicaMas = 723 * escala;
      }
      else if (musicaFondo.volume >= .1)
      {
        xMusicaMas = 723 * escala;
        xFinalMusicaMas = 760 * escala;
      }


      if (mousePos.x >= xJugar && mousePos.x <= xFinalJugar && menuPrincipal)
      {
        if (mousePos.y >= yJugar && mousePos.y <= yFinalJugar)
        {
          jugar();
        }
      }
      if (mousePos.x >= xAjustes && mousePos.x <= xFinalAjustes && menuPrincipal)
      {
        if (mousePos.y >= yAjustes && mousePos.y <= yFinalAjustes)
        {
          ajustesBoton = true;
          ajustes();
        }
      }
      if (mousePos.x >= xReiniciar && mousePos.x <= xFinalReiniciar && (pausa || perdiste || win))
      {
        if (mousePos.y >= yReiniciar && mousePos.y <= yFinalReiniciar)
        {
          canvas.width = canvas.width;
          pausa = false;
          jugar();
        }
      }
      if (mousePos.x >= xMenu && mousePos.x <= xFinalMenu && (pausa || perdiste || win))
      {
        if (mousePos.y >= yMenu && mousePos.y <= yFinalMenu)
        {
          location.reload();
        }
      }
      if (mousePos.x >= xVolver && mousePos.x <= xFinalVolver && (ajustesBoton || pausa))
      {
        if (mousePos.y >= yVolver && mousePos.y <= yFinalVolver)
        {
          if (!jugando)
          {
            menuPrincipal = true;
            dibujarMenu();
          }
          else {
            canvas.width = canvas.width;
            pausa = false;
            musicaFondo.play();
          }
        }
      }
      if (mousePos.x >= xMusica && mousePos.x <= xFinalMusica && (ajustesBoton || pausa))
      {
        if (mousePos.y >= yMusica && mousePos.y <= yFinalMusica)
        {
          ajustesBoton = true;
          console.log("musica -");

          if (musicaFondo.volume <= .1)
          {
            musicaFondo.volume = 0;
            xMusicaMas = canvas.width * .648 + medidaAncho;
          }
          if (musicaFondo.volume > 0)
          {
            musicaFondo.volume -= .1;
          }
          ajustes();
        }
      }
      if (mousePos.x >= xMusicaMas && mousePos.x <= xFinalMusicaMas && (ajustesBoton || pausa))
      {
        if (mousePos.y >= yMusicaMas && mousePos.y <= yFinalMusicaMas)
        {
          ajustesBoton = true;
          console.log("musica +");
          if (musicaFondo.volume >= .9)
          {
            musicaFondo.volume = 1;
          }
          if (musicaFondo.volume < 1)
          {
            musicaFondo.volume += .1;
          }
          ajustes();
        }
      }
  });
  function getMousePos(canvas, evt)
  {
      return {
          x: parseInt(evt.clientX),
          y: parseInt(evt.clientY)
        };
    };



    var xJugar = canvas.width * .49 + medidaAncho;
    var yJugar = canvas.height * .31 + medida;

    var xFinalJugar = canvas.width * .63 + medidaAncho;
    var yFinalJugar = canvas.height * .4 + medida;

    var xAjustes = canvas.width * .43 + medidaAncho;
    var yAjustes = canvas.height * .529 + medida;

    var xFinalAjustes = canvas.width * .6 + medidaAncho;
    var yFinalAjustes = canvas.height * .607 + medida;

    var xVolver = canvas.width * .2 + medidaAncho;
    var yVolver = canvas.height * .115 + medida;

    var xFinalVolver = canvas.width * .361 + medidaAncho;
    var yFinalVolver = canvas.height * .205 + medida;

    var xMusica = canvas.width * .514 + medidaAncho;
    var yMusica = canvas.height * .431 + medida;

    var xFinalMusica = canvas.width * .54 + medidaAncho;
    var yFinalMusica = canvas.height * .489 + medida;

    var xMusicaMas = canvas.width * .7 + medidaAncho;
    var yMusicaMas = canvas.height * .423 + medida;

    var xFinalMusicaMas = canvas.width * .72 + medidaAncho;
    var yFinalMusicaMas = canvas.height * .489 + medida;

    var xReiniciar = canvas.width * .4 + medidaAncho;
    var yReiniciar = canvas.height * .613 + medida;

    var xFinalReiniciar = canvas.width * .619 + medidaAncho;
    var yFinalReiniciar = canvas.height * .7 + medida;

    var xMenu = canvas.width * .32 + medidaAncho;
    var yMenu = canvas.height * .763 + medida;

    var xFinalMenu = canvas.width * .69 + medidaAncho;
    var yFinalMenu = canvas.height * .853 + medida;

// usa lo de arriba para el menu de pausa

var menuPrincipal = true;

function dibujarMenu()
{
  if (menuPrincipal)
  {
    canvas.width = canvas.width;
    dl.shadowOffsetX = 4 * escala;
    dl.shadowOffsetY = 4 * escala;
    dl.shadowBlur = 8 * escala;
    dl.shadowColor = "#DFBCB6";
    dl.drawImage(fondo, 0, 0, 5184, 1080, 0, 0, canvas.width * 2, canvas.height);
    fuente = (60 * escala) + "px sans-serif"
    dl.font = fuente;
    dl.fillStyle = "#000";
    dl.fillText("Jugar", canvas.width * .45, canvas.height * .4);
    dl.fillText("ajustes", canvas.width * .43, canvas.height * .6);
  }
}

dibujarMenu();
/*
canvas.addEventListener("click", function()
{
  if (menuPrincipal)
  {
    jugar();
  }
});
*/
function jugar()
{
  nivel1();
  perdiste = false;
  cantidadCatsup = 0;
  jugando = true;
  musicaFondo.play();
  menuPrincipal = false;
  ajustesBoton = false;
  suelo = parseInt(268 * escala);
  maau.x = parseInt((3 * escala));
  maau.limiteF = parseInt(3 * escala) + parseInt((83 * escala));
  mapaRecorte.x = 0;
  fondoRecorte.x = 0;
  maau.y = parseInt((268 * escala));
  imgNormal.src = "assets/pose_normal.png";
  imgEnemigo.src = "assets/enemigoNormal.png";
  balaActiva = false;
  powerUp = false;
  win = false;
  enemigos = 0;
}
