const commands = {
  "fd": amt => turtle.forward(amt),
  "bd": amt => turtle.forward(-amt),
  "rt": angle => turtle.right(angle),
  "lt": angle => turtle.right(-angle),
  "pu": () => turtle.pen = false,
  "pd": () => turtle.pen = true,
  "color": (r, g = 0, b = 0) => turtle.changeColor(r, g, b)
}

class Turtle {
  constructor(x, y, angle, r, g = 0, b = 0) {
    this.x = x;
    this.y = y;
    this.dir = angle;
    this.colorR = r;
    this.colorG = g;
    this.colorB = b;
  }

  reset() {
    translate(this.x, this.y);
    rotate(this.dir);
    this.pen = true;
  }

  forward(amt) {
    amt = parseInt(amt);
    if (this.pen) {
      if (isNaN(this.colorR)) {
        stroke(this.colorR);
      } else {
        stroke(this.colorR, this.colorG, this.colorB);
      }
      
      strokeWeight(2);
      line(0, 0, amt, 0);
    }
    translate(amt, 0);
  }

  right(angle) {
    rotate(angle);
  }

  changeColor(r, g, b) {
    this.colorR = isNaN(r) ? r : Number(r);
    this.colorG = Number(g);
    this.colorB = Number(b);
  }


}