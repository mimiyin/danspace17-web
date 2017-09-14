function getJsonFromUrl() {
  var query = location.search.substr(1);
  var result = {};
  query.split("&").forEach(function(part) {
    var item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
}

var setups = ["layout", "bach", "timbres", "rhythms", "crossings", "bnf", "echo", "trajectories", "velocity"];
var su = getJsonFromUrl().setup; //new URLSearchParams(window.location.search).get("setup");

// Are we striking or DJing?
var MODE = null; //"strike";

var choreographies = ["mouse", "creep", "lunge", "crossings", "bnf", "echo", "trajectories", "meander"];
var soundsets = ["bach", "synth", "percussive", "words"];

// Setup parameters
var IPS, CHOREOGRAPHY, SOUND, NUM_MOVERS, DELAY, start;

// SET-UPS:
switch (su) {
  // Bach Mouse
  case setups[1]:
    IPS = [0];
    CHOREOGRAPHY = choreographies[0];
    SOUND = soundsets[0];
    NUM_MOVERS = 1;
    DELAY = 0;
    start = true;
    break;

    // Synth Mouse
  case setups[2]:
    IPS = [0, 2];
    CHOREOGRAPHY = choreographies[0];
    SOUND = soundsets[1];
    NUM_MOVERS = 1;
    DELAY = 0;
    start = true;
    break;

    // Percussive Mouse
  case setups[3]:
    IPS = [0, 2];
    CHOREOGRAPHY = choreographies[0];
    SOUND = soundsets[2];
    NUM_MOVERS = 1;
    DELAY = 0;
    start = true;
    break;

    // CROSSINGS
  case setups[4]:
    CHOREOGRAPHY = choreographies[3];
    SOUND = soundsets[2];
    NUM_MOVERS = 1;
    DELAY = 0;
    start = false;
    break;

    // BNF
  case setups[5]:
    CHOREOGRAPHY = choreographies[4];
    SOUND = soundsets[1];
    NUM_MOVERS = 1;
    DELAY = 0;
    start = false;
    break;

    // ECHO
  case setups[6]:
    IPS = [0];
    CHOREOGRAPHY = choreographies[5];
    SOUND = soundsets[0];
    NUM_MOVERS = 2;
    DELAY = 500;
    start = false;
    break;

    // TRAJECTORIES
  case setups[7]:
    IPS = [0];
    CHOREOGRAPHY = choreographies[6];
    SOUND = soundsets[1];
    NUM_MOVERS = 2;
    DELAY = 0;
    start = false;
    break;

    // VELOCITY
  case setups[8]:
    MODE = "strike";
    words = ["Yes", "Probably/Not", "No/Never", "Maybe/So"];
    IPS = [0, 1, 2, 3];
    CHOREOGRAPHY = choreographies[0];
    SOUND = soundsets[3];
    NUM_MOVERS = 1;
    DELAY = 0;
    start = false;
    break;

  default:
    IPS = [0, 1, 2, 3];
    CHOREOGRAPHY = choreographies[7];
    SOUND = null;
    NUM_MOVERS = 6;
    DELAY = 3000;
    start = true;
}
