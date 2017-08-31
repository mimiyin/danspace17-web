/*
Mimi Yin NYU-ITP
Mapping Kinect Skeleton locations to floor projection.
 */

// Set up the space
var quads = [];
// Space in meters
var fov = 70.6;
var near = 0.5;
var far = 4.5;
var maxfar = 0;

// Space in feet
var hwratio = h / w;
var fm = 0.3048;
var wm = w * fm;
var hm = h * fm;

// Space in pixels
var pmratio = 0;
var pnear = 0,
  pfar = 0;
var diag = 0;

// SOUNDS
var sounds = {
  0: [],
  1: [],
  2: [],
  3: []
};
var shush = [],
  sh = 0,
  shushVol = 0,
  pshushVol = 0;

// Movers
var movers = [];

function preload() {
  // Load Synth Sounds for Quads 0 and 2
  for (var i = 0; i < IPS.length; i++) {
    var ip = IPS[i];
    for (var s = 0; s < 15; s++) {
      switch (SOUND) {
        case "bach":
          sounds[ip].push(loadSound("data/bach/" + s + ".mp3"));
          break;
        case "synth":
          sounds[ip].push(loadSound("data/synth/" + ip + "/" + s + ".wav"));
          break;
        case "percussive":
          sounds[ip].push(loadSound("data/percussive/" + ip + "/" + s + ".mp3"));
          break;
        case "words":
          sounds[ip].push(loadSound("data/words/" + ip + "/" + s + ".wav"));
          break;
        default:
          break;
      }
    }
  }
}

function getQuadVertex(d, dir) {
  return createVector(dir * tan(TWO_PI * (fov / 2) / 360) * d, d);
}

function positionQuad(origin, angle) {
  vertices = [];

  function positionVertex(d, dir) {
    var vertex = getQuadVertex(d, dir);
    vertex.rotate(angle + (PI / 2)).add(origin);
    return vertex;
  }
  vertices[0] = positionVertex(pnear, -1);
  vertices[1] = positionVertex(pfar, -1);
  vertices[2] = positionVertex(pfar, 1);
  vertices[3] = positionVertex(pnear, 1);

  return vertices;
}

function getAvgSpeed(total, num) {
  return (total + num) / speeds.length;
}

function setup() {
  var ww = windowWidth;
  var _h = hwratio * ww;
  createCanvas(ww, _h);
  pmratio = width / wm;
  pnear = near * pmratio;
  pfar = far * pmratio;

  diag = sqrt(sq(width) + sq(height));

  // Caculate maximum distance from camera
  maxfar = getQuadVertex(far, 1).mag() * pmratio;

  // Initialize quads and movers
  reset();
}

function reset() {
  for (var q = 0; q < quads.length; q++) {
    quads[q].resetSounds();
  }
  quads = [];
  movers = [];

  for (var i = 0; i < IPS.length; i++) {
    var ip = IPS[i];
    var a = (ip * (TWO_PI / 4)) + PI;
    var x = (cos(a) * (width / 2)) + width / 2;
    var y = (sin(a) * (height / 2)) + height / 2;
    var o = createVector(x, y);
    var v = positionQuad(o, a);
    var q = new Quad(ip, o, a, v);
    quads.push(q);
    for (var s = 0; s < sounds[ip].length; s++) {
      var sound = sounds[ip][s];
      q.addSound(sound);
    }
  }
  for (var m = 0; m < NUM_MOVERS; m++) {
    setTimeout(function () {
      movers.push(createMover(width / 2, height / 2));
    }, m * DELAY);
  }
}

function createMover(x, y) {
  switch (CHOREOGRAPHY) {
    case "creep":
      return new Creeper(pnear, y);
    case "lunge":
      return new Lunger(pfar, y);
    case "bnf":
      return new BNFMover(pfar * 0.9, y);
    case "crossings":
      return new Crosser(pfar * 1.1, y);
    case "echo":
      return new Echo(pfar * 1.1, y);
    case "trajectories":
      return new Trajectory(pfar * 1.1, y);
    case "meander":
      return new Meanderer(x, y);
    default:
      return new Mover(x, y);
  }
}

function draw() {
  background(0);

  // Get speeds
  var speeds = [];

  for (var q = 0; q < quads.length; q++) {
    var quad = quads[q];
    var qid = quad.id;
    quad.update(movers);
    switch (MODE) {
      case "strike":
        quad.strike();
        break;
      default:
        quad.dj();
    }
    quad.display();

    // Get and append speeds, strikes and headings
    speeds = speeds.concat(quad.getSpeeds());
  }

  for (var m = 0; m < movers.length; m++) {
    var mover = movers[m];
    mover.update();
    mover.display();
  }

  if (shush.length > 0 && speeds.length > 0) {
    // Play next shush sound
    // Calculate avg speed
    var avgSpeed = speeds.reduce(getAvgSpeed);
    // Go too fast, the volume falls rapidly.
    shushVol += (SHUSH_TH - avgSpeed);

    //if(avgSpeed && shushVol) console.log(nfs(avgSpeed, 0, 2), nfs(shushVol, 0, 2));

    // Bottom out at -5
    shushVol = max(SHUSH_VOL_MIN, shushVol);

    // Play a new sound whenever you can start to hear something
    if (pshushVol <= 0 && shushVol > 0) {
      shush[sh].pause();
      sh = floor(random(shush.length));
      shush[sh].loop();
    }

    //console.log(shushVol, avgSpeed);
    shush[sh].setVolume(max(0, shushVol));

    // Remember shushVol
    pshushVol = shushVol;
    textSize(64);
    fill(255);
    noStroke();
    if (avgSpeed && shushVol)
      text(nfs(avgSpeed, 0, 2) + " " + nfs(shushVol, 0, 2), width / 2, height / 2);
  }
}

function restart() {
  start = !start;
  if (start) {
    reset();
    loop();
  }
  else {
    noLoop();
  }
}

function keyPressed() {
  console.log(keyCode);
  switch(keyCode) {
    case 32:
      restart();
      break;
    case UP_ARROW:
      DELAY += 500;
      restart();
      break;
    case DOWN_ARROW:
      DELAY -= 500;
      restart();
      break;
  }
}