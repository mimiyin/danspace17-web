window.onload = function () {
  var as = document.getElementsByTagName('a');
  var body = document.getElementsByTagName('body')[0];
  var sizes = document.getElementsByClassName('size');
  var pages = document.getElementsByClassName('page');

  for(var s = 0; s < sizes.length; s++) {
    var sz = sizes[s];
    sz.onclick = function(e) {
      body.className = this.getAttribute('scale');
    }
  }

  for(var p = 0; p < pages.length; p++) {
    var pg = pages[p];
    pg.onclick = function(e) {
      if(body.className != "100") {
        body.className = "100";
        window.location.hash = "#" + this.getAttribute('id');
      }
    }
  }

  for (var a = 0; a < as.length; a++) {
    as[a].onclick = function (e) {
      console.log(e);
      var overlay = document.createElement('div');
      overlay.className = "overlay fadein";

      var iframe = document.createElement('iframe');
      iframe.src = this.getAttribute('src');
      iframe.className = this.className;
      var x = document.createElement('div');
      x.className = 'x';
      x.textContent = 'X';
      x.onclick = function() {
        overlay.remove();
      }

      overlay.append(iframe);
      overlay.append(x);
      body.append(overlay);
    }
  }
}