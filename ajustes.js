var ajustesBoton = false;

function ajustes()
{
  if (ajustesBoton || jugando)
  {
    canvas.width = canvas.width;
    dl.shadowOffsetX = 4 * escala;
    dl.shadowOffsetY = 4 * escala;
    dl.shadowBlur = 8 * escala;
    dl.shadowColor = "#DFBCB6";
    fuente = (60 * escala) + "px sans-serif"
    dl.font = fuente;
    dl.fillStyle = "#000";
    menuPrincipal = false;
    console.log("ajustes");
    dl.drawImage(fondo, 0, 0, 5184, 1080, 0, 0, canvas.width * 2, canvas.height);
    dl.fillText("Volver", canvas.width * .2, canvas.height * .2)
    dl.fillText("Música: " + "< " + parseInt(musicaFondo.volume * 100) + "%" + " >", canvas.width * .3, canvas.height * .5)
      if (pausa)
      {
        dReiniciar();
      }
  }
}
