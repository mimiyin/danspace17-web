var BodyManager = function (_quad) {
  var quad = _quad;
  var qid = quad.id;
  var bodies = {};
  var counter = 0;

  var addBody = function (body) {
    body.enter(qid, counter);
    bodies[counter] = body;
    counter++;
  }

  var removeBody = function (body) {
    var id = body.getQID(qid);
    delete bodies[body.getQID(qid)];
    body.exit(qid)
  }

  this.update = function (bodies) {
    for (var b = 0; b < bodies.length; b++) {
      var body = bodies[b];
      if (quad.contains(body)) {
        if (body.wasOutside(qid)) addBody(body);
      }
      else {
        if (body.wasInside(qid)) removeBody(body);
      }
    }
  }

  this.getBodies = function () {
    return bodies;
  }
}