function victoria()
{
  var puntos = cantidadCatsup + enemigos;
  let mejorPuntuacion = localStorage.getItem("mejorPuntuacion");

  clearInterval(principal);

    if (puntos > parseInt(mejorPuntuacion) || mejorPuntuacion == null)
    {
      localStorage.setItem("mejorPuntuacion", puntos);
      mejorPuntuacion = puntos;
      if (mejorPuntuacion == null)
      {
        mejorPuntuacion = 0;
      }
    }

  window.setTimeout(function()
  {
    canvas.width = canvas.width;
    jugando = false;
    musicaFondo.pause();
    musicaFondo.currentTime = 0;
    dl.drawImage(fondo, 0, 0, 5184, 1080, 0, 0, canvas.width * 2, canvas.height);
    win = true;
    fuente = (70 * escala) + "px sans-serif"
    dl.font = fuente;
    dl.fillStyle = "#000";
    dl.shadowOffsetX = 4 * escala;
    dl.shadowOffsetY = 4 * escala;
    dl.shadowBlur = 8 * escala;
    dl.shadowColor = "#DFBCB6";
    dl.fillText("¡GANASTE!", canvas.width * .35, canvas.height * .15);
    fuente = (50 * escala) + "px sans-serif";
    dl.font = fuente;
    dl.shadowOffsetX = 4 * escala;
    dl.shadowOffsetY = 4 * escala;
    dl.shadowBlur = 8 * escala;
    dl.shadowColor = "#DFBCB6";
    dl.fillText("Enemigos eliminados: " + enemigos, canvas.width * .17, canvas.height * .28);
    dl.fillText("Catsup: " + cantidadCatsup, canvas.width * .17, canvas.height * .38);
    dl.fillText("Puntos totales: " + puntos, canvas.width * .17, canvas.height * .48);
    dl.fillText("Mejor puntuación: " + mejorPuntuacion, canvas.width * .17, canvas.height * .58);
    dReiniciar();
  }, 200);
}
