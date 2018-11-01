const commands = {
  "fd": amt => turtle.forward(amt),
  "bd": amt => turtle.forward(-amt),
  "rt": angle => turtle.right(angle),
  "lt": angle => turtle.right(-angle),
  "pu": () => turtle.pen = false,
  "pd": () => turtle.pen = true
}

class Turtle {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.dir = angle;
  }

  reset() {
    console.log(this.x, this.y, this.dir);
    translate(this.x, this.y);
    rotate(this.dir);
    this.pen = true;
  }

  forward(amt) {
    amt = parseInt(amt);
    if (this.pen) {
      stroke(255);
      strokeWeight(2);
      line(0, 0, amt, 0);
    }
    translate(amt, 0);
  }

  right(angle) {
    rotate(angle);
  }


}