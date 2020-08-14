var spaceFreeEnemigo;
var spaceFreeIzqEnemigo;

class Enemigo extends Image
{
  constructor(x, y,cIzquierda, cDerecha)
  {
    super();
    this.z = x;
    this.v = y;
    this.limiteF = parseInt(this.z + parseInt(65 * escala));
    this.cDerecha = cDerecha;
    this.cIzquierda = cIzquierda;
    this.src = imgEnemigo.src
  }
  dibujarEnem()
  {
    dl.drawImage(this, 160, 0, 659, 758, this.z, this.v, parseInt((130 * escala)), parseInt((130 * escala)));
  }
  modificarPosicion()
  {
    if (maau.x >= (canvas.width * .55) && mapaRecorte.x <= limite)
    {
      this.z -= speed;
      this.limiteF -= speed;
    }
  }
  modificarPosicionIzq()
  {
    if (maau.x <= (canvas.width * .25) && mapaRecorte.x > 0)
    {
      this.z += speed;
      this.limiteF += speed;
    }
  }
  moverse()
  {
    if ((maau.limiteF + speed / 2 >= this.z && this.limiteF + speed / 2 > maau.x && this.v - parseInt(90 * escala) < maau.y))
    {
      if (powerUp)
      {
        this.v = 1000;
        enemigos++;
        powerUp = false;
      }
      else
      {
        gameOver();
      }
    }
    else if (maau.limiteF <= this.z && maau.limiteF >= this.z - (155 * escala))
    {
      this.src = enemigoIzq.src;
      if (this.cIzuierda != 0)
      {
        if (comprobarIzqEnemigo(this.cIzquierda, this))
        {
          izquierdaEnemigo(this);
        }
      }
      else
      {
        izquierdaEnemigo(this);
      }
    }
    else if (this.limiteF <= maau.x && this.limiteF >= maau.x - (155 * escala))
    {
      this.src = "assets/enemigoNormal.png";
      if (this.cDerecha != 0)
      {
        if (comprobarEnemigo(this.cDerecha, this))
        {
          derechaEnemigo(this);
        }
      }
      else
      {
        derechaEnemigo(this);
      }
    }
  }
  updateEnem()
  {
    this.dibujarEnem();
    this.moverse();
  }
  updatePosition()
  {
    this.modificarPosicion();
    this.modificarPosicionIzq();
  }
}

function dibujarEnemigos()
{
  enemigo1.updateEnem();
  enemigo2.updateEnem();
  enemigo3.updateEnem();
  enemigo4.updateEnem();
}

function posicionEnemigo()
{
  enemigo1.updatePosition();
  enemigo2.updatePosition();
  enemigo3.updatePosition();
  enemigo4.updatePosition();
}

function comprobarEnemigo(a, b)
{
  //cubo
  a.limiteF = a.x + parseInt((137 * escala));
  if ((b.limiteF + speed > a.x && b.z < a.limiteF) && b.v > a.y - parseInt((110 * escala)))
  {
    spaceFreeEnemigo = false;
  } else {
    spaceFreeEnemigo = true;
  }

  return spaceFreeEnemigo;
}

function comprobarIzqEnemigo(a, b)
{
  if (b.z - speed / 2 < a.limiteF && b.z >= a.limiteF && b.v > a.y - parseInt((110 * escala)))
  {
    spaceFreeIzqEnemigo = false;
  } else {
    spaceFreeIzqEnemigo = true;
  }
  return spaceFreeIzqEnemigo;
}

function matarEnemigos(a)
{
  morir(a, enemigo1);
  morir(a, enemigo2);
  morir(a, enemigo3);
  morir(a, enemigo4);
}

function morir(a, b)
{
  if ((a.y >= b.v - 20 * escala && a.y <= b.v + parseInt(130 * escala)) || powerUp)
  {
    if ((a.x > b.z && a.x <= b.limiteF) || (a.x < b.z && a.x >= b.limiteF))
    {
      enemigos++;
      balaActiva = false;
      b.v = 1000 * escala;
      var a = Math.floor(Math.random() * (5 - 1)) + 1;
      if (a == 3)
      {
        cantidadCatsup += 2;
      }
    }
  }
}

function derechaEnemigo(a)
{
    a.z += speed / 4;
    a.limiteF += speed / 4;
    window.setTimeout(function()
    {
      dl.drawImage(enemigoCorrer1, 160, 0, 659, 758, a.z, a.v, parseInt((130 * escala)), parseInt((130 * escala)));
    }, 108);
}

function izquierdaEnemigo(a)
{
    a.z -= speed / 4;
    a.limiteF -= speed / 4;
    window.setTimeout(function()
    {
      dl.drawImage(enemigoCorrerIzq1, 160, 0, 659, 758, a.z, a.v, parseInt((130 * escala)), parseInt((130 * escala)));
    }, 108);
}
