// The Quad represents the fov of the kinect camera
var Quad = function (_id, _o, _a, _v) {
  // Position quad
  this.id = _id;
  var o = _o;
  var a = _a;
  var sounds = [];
  var selectFrom = [];
  var playlist = {};
  var quad = new Polygon(_v);
  var center = quad.getCenter();
  var bm = new BodyManager(this);

  this.addSound = function (sound) {
    sounds.push(sound);
    selectFrom.push(sounds.length - 1);
  }

  this.resetSounds = function () {
    for (var s = 0; s < sounds.length; s++) sounds[s].pause();
    playlist = {};
    sounds = [];
    selectFrom = [];
  }

  this.display = function () {
    fill(255, 32);
    noStroke();
    quad.display();
    fill(255);
    ellipse(o.x, o.y, 50, 50);
  }

  this.update = function (movers) {
    bm.update(movers);
  }

  this.dj = function () {
    var bodies = bm.getBodies();
    // Get positions of all tracked bodies
    for (var b in bodies) {
      // Draw all the body positions
      var body = bodies[b];
      var id = b;
      var pos = body.pos;

      var item = playlist[id];
      var d = p5.Vector.sub(o, pos).mag() / maxfar;
      if (selectFrom.length > 0 && !(id in playlist)) {
        var ssel = floor(random(selectFrom.length));
        var s = selectFrom[ssel];
        playlist[id] = new Sound(sounds[s], s);
        selectFrom.splice(ssel, 1);
      }
      if (id in playlist) playlist[id].update(d);
      var sz = d * 50;
      noStroke();
      fill(0, 255, 0);
      ellipse(pos.x, pos.y, sz, sz);
    }


    // Check all the ids in movers to see if they are dead
    // If they are, kill the loops
    for (var id in playlist) {
      var item = playlist[id];
      // If body is dead
      if (item.isDead()) {
        console.log("DEAD!", id);
        selectFrom.push(item.getIndex());
        playlist[id].kill();
        delete playlist[id];
      }
      else if (!(id in bodies)) {
        item.die();
      }
    }
  }

  this.contains = function (body) {
    return quad.contains(body.pos);
  }

  this.getSpeeds = function (bodies) {
    var speeds = [];
    for (var b in bodies) {
      // Draw all the body positions
      var body = bodies[b];
      speeds.push(body.vel.mag());
    }
    return speeds;
  }

  this.getAccs = function () {
    var accs = [];
    var bodies = bm.getBodies();
    for (var b in bodies) {
      // Draw all the body positions
      var body = bodies[b];
      accs.push(body.acc.mag());
    }
    return accs;
  }

  this.strike = function () {
    var strikes = [];
    var bodies = bm.getBodies();
    for (var b in bodies) {
      // Draw all the body positions
      var body = bodies[b];
      var pos = body.pos;
      var acc = body.acc.mag() / width;
      var strike = body.acc.mag() > STR_TH ? 1 : 0;
      strikes.push(strike);

      var sz = acc * 250;
      noStroke();
      if (strike == 1) {
        for (var s = 0; s < sounds.length; s++) {
          var index = floor(random(sounds.length));
          if (sounds[index].isPlaying()) continue;
          sounds[index].jump();
          break;
        }
        fill(0, 255, 0);
      }
      else fill(255, 0, 0);
      ellipse(pos.x, pos.y, sz, sz);

    }
    fill(255);
    textSize(32);
    textAlign(CENTER);
    text(words[this.id], center.x, center.y);

    return strikes;
  }

  this.getHeadings = function (bodies) {
    var headings = [];
    for (var b in bodies) {
      // Draw all the body positions
      var body = bodies[b];
      var heading = map(body.vel.heading(), -PI, PI, 0, TWO_PI);
      headings.push(heading);
    }
    return headings;
  }
}