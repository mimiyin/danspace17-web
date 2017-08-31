var setups = ["layout", "bach", "timbres", "rhythms", "crossings", "bnf", "echo", "trajectories", "velocity"];
var setup = new URLSearchParams(window.location.search).get("setup");



// Are we striking or DJing?
var MODE = null; //"strike";

var choreographies = ["mouse", "creep", "lunge", "crossings", "bnf", "echo", "trajectories", "meander"];
var soundsets = ["bach", "synth", "percussive", "words"];


// SET-UPS:
switch (setup) {
  // Bach Mouse
  case setups[1]:
    var IPS = [0];
    var CHOREOGRAPHY = choreographies[0];
    var SOUND = soundsets[0];
    var NUM_MOVERS = 1;
    var DELAY = 0;
    var start = true;
    break;

    // Synth Mouse
  case setups[2]:
    var IPS = [0, 2];
    var CHOREOGRAPHY = choreographies[0];
    var SOUND = soundsets[1];
    var NUM_MOVERS = 1;
    var DELAY = 0;
    var start = true;
    break;

    // Percussive Mouse
  case setups[3]:
    var IPS = [0, 2];
    var CHOREOGRAPHY = choreographies[0];
    var SOUND = soundsets[2];
    var NUM_MOVERS = 1;
    var DELAY = 0;
    var start = true;
    break;

    // CROSSINGS
  case setups[4]:
    var CHOREOGRAPHY = choreographies[3];
    var SOUND = soundsets[2];
    var NUM_MOVERS = 1;
    var DELAY = 0;
    var start = false;
    break;

    // BNF
  case setups[5]:
    var CHOREOGRAPHY = choreographies[4];
    var SOUND = soundsets[1];
    var NUM_MOVERS = 1;
    var DELAY = 0;
    var start = false;
    break;

    // ECHO
  case setups[6]:
    var IPS = [0];
    var CHOREOGRAPHY = choreographies[5];
    var SOUND = soundsets[0];
    var NUM_MOVERS = 2;
    var DELAY = 500;
    var start = false;
    break;

    // TRAJECTORIES
  case setups[7]:
    var CHOREOGRAPHY = choreographies[6];
    var SOUND = soundsets[1];
    var NUM_MOVERS = 2;
    var DELAY = 0;
    var start = false;
    break;

    // VELOCITY
  case setups[8]:
    var MODE = "strike";
    var words = ["Yes", "Probably/Not", "No/Never", "Maybe/So"];
    var IPS = [0, 1, 2, 3];
    var CHOREOGRAPHY = choreographies[0];
    var SOUND = soundsets[3];
    var NUM_MOVERS = 1;
    var DELAY = 0;
    var start = false;
    break;

  default:
    var IPS = [0, 1, 2, 3];
    var CHOREOGRAPHY = choreographies[7];
    var SOUND = null;
    var NUM_MOVERS = 6;
    var DELAY = 3000;
    var start = true;
}