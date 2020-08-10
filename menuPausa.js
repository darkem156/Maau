function dibujarMenuPausa()
{
  if (pausa && jugando)
  {
    ajustes();
    dReiniciar();
  }
  else {
    canvas.width = canvas.width;
  }
}

function dReiniciar()
{
  dl.shadowOffsetX = 4 * escala;
  dl.shadowOffsetY = 4 * escala;
  dl.shadowBlur = 8 * escala;
  dl.shadowColor = "#DFBCB6";
  fuente = (60 * escala) + "px sans-serif"
  dl.font = fuente;
  dl.fillStyle = "#000";
  dl.fillText("Reiniciar", canvas.width * .4, canvas.height * .7);
  dl.fillText("Menú principal", canvas.width * .32, canvas.height * .85);
}
