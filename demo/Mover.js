var Mover = function (x, y) {
  this.quads = {};
  this.pos = createVector(x, y);
  this.ppos = createVector(x, y);
  this.vel = createVector();
  this.pvel = createVector();
  this.acc = createVector();

  Mover.prototype.move = function () {
    this.pos.set(mouseX, mouseY);
  }

  Mover.prototype.update = function () {
    this.ppos = this.pos.copy();
    this.pspeed = this.speed;
    this.move();
    this.vel = p5.Vector.sub(this.pos, this.ppos);
    this.acc = p5.Vector.sub(this.vel, this.pvel);
    //console.log(this.id, this.quads);
  }


  Mover.prototype.enter = function (q, id) {
    //console.log("ENTERING", q, id);
    this.quads[q] = id;
    //console.log("ENTERED", this.quads);
  }

  Mover.prototype.exit = function (q) {
    //console.log("EXITING", q, this.quads);
    if (q in this.quads) delete this.quads[q];
  }

  Mover.prototype.wasOutside = function (q) {
    //console.log(this.id, q, this.quads);
    return !(q in this.quads);
  }

  Mover.prototype.wasInside = function (q) {
    //console.log("WAS INSIDE", this.id, this.quads);
    return q in this.quads;
  }

  Mover.prototype.getQID = function (q) {
    return this.quads[q];
  }

  Mover.prototype.display = function () {
    fill(255, 0, 0);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 10, 10);
  }
}

var Creeper = function (x, y) {
  Mover.call(this, x, y);

  this.move = function () {
    this.pos.add(createVector(0.1, 0));
  }
}

Creeper.prototype = Object.create(Mover.prototype);
Creeper.constructor = Creeper;

var Lunger = function (x, y) {
  Mover.call(this, x, y);
  var t = 0;

  this.move = function () {
    if (this.pos.x > (pnear * 3) && this.pos.x < pfar * 0.9) {
      t += 0.25;
      this.pos.x -= pow(2, t);
    }
    else this.pos.x -= pfar * 0.0005;
  }
}

Lunger.prototype = Object.create(Mover.prototype);
Lunger.constructor = Lunger;

var BNFMover = function (x, y) {
  Mover.call(this, x, y);
  var t = 0;

  this.move = function () {
    t += 0.1;
    this.pos.x -= sin(t) * pfar * 0.02;
  }
}

BNFMover.prototype = Object.create(Mover.prototype);
BNFMover.constructor = BNFMover;

var Crosser = function (x, y) {
  Mover.call(this, x, y);
  var getRandomXing = function (to, from) {
    var xing = p5.Vector.sub(to, from).setMag(5);
    return xing.rotate(random(-PI / 6), PI / 6);
  }
  var center = createVector(pfar / 2, height / 2);
  this.vel = getRandomXing(center, this.pos);
  var ready = false;
  var counter = 0;

  this.move = function () {
    if (!(0 in this.quads)) {
      ready = true;
    }
    if (ready) counter++;

    if ((counter > 30) || (2 in this.quads) && ready) {
      this.vel = getRandomXing(center, this.pos);
      ready = false;
      counter = 0;
    }

    this.pos.add(this.vel);
  }
}

Crosser.prototype = Object.create(Mover.prototype);
Crosser.constructor = Crosser;

var Echo = function (x, y) {
  Mover.call(this, x, y);
  this.pos.y += -25 + movers.length * 25;
  this.vel = createVector(-0.1, 0);

  this.move = function () {
    this.pos.add(this.vel);
  }
}

Echo.prototype = Object.create(Mover.prototype);
Echo.constructor = Echo;

var Trajectory = function (x, y) {
  Mover.call(this, x, y);
  var mag = .1;
  if(movers.length%2 == 0)
    this.vel = createVector(-3, 0).setMag(mag);
  else this.vel = createVector(-3, -5).setMag(mag);

  this.move = function () {
    this.pos.add(this.vel);
  }
}

Trajectory.prototype = Object.create(Mover.prototype);
Trajectory.constructor = Trajectory;

var Meanderer = function (x, y) {
  Mover.call(this, x, y);
  var t = random(1000);

  this.move = function () {
    t += 0.01;
    var noisy = createVector(noise(t), noise(t + 100));
    noisy.sub(createVector(0.5, 0.5));
    noisy.mult(5);
    //var noisy = createVector(1, 0);
    this.pos.add(noisy);
  }
}

Meanderer.prototype = Object.create(Mover.prototype);
Meanderer.constructor = Meanderer;