window.onload = function () {
  var body = document.body;
  var sizes = document.getElementsByClassName('size');
  var pages = document.getElementsByClassName('page');
  var as = body.querySelectorAll("[type=overlay]");

  // Keep track of which page you're on
  setInterval(function () {
    if (body.getAttribute('scale') == "full") {
      for (var p = 0; p < pages.length; p++) {
        var pg = pages[p];
        var pstart = pg.offsetTop;
        var pend = pstart + pg.offsetHeight;
        var spos = body.scrollTop;
        var margin = window.innerHeight / 3;
        if (spos > pstart - margin && spos < pend - margin) {
          pg.setAttribute("reading", "true");
        }
        else pg.setAttribute("reading", "false");
      }
    }
  }, 500);

  // Change the scale of the page
  for (var s = 0; s < sizes.length; s++) {
    var sz = sizes[s];
    sz.onclick = function (e) {
      body.setAttribute("scale", this.getAttribute('scale'));
      setTimeout(function () {
        var pg = body.querySelector("[reading=true]");
        pg.scrollIntoView(false);
      }, 500);
    }
  }

  // Jump to selected page in full view
  for (var p = 0; p < pages.length; p++) {
    var pg = pages[p];
    pg.onclick = function (e) {
      if (body.getAttribute("scale") != "full") {
        body.setAttribute("scale", "full");
        window.location.hash = this.getAttribute('id');
        var thispg = this;
        setTimeout(function () {
          thispg.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "start"
          });
        }, 500);
      }
    }
  }

  // Overlay with iframe
  for (var a = 0; a < as.length; a++) {
    as[a].onclick = function (e) {
      var overlay = document.createElement('div');
      overlay.className = "overlay fadein";
      var iframe = document.createElement('iframe');
      iframe.src = this.getAttribute('src');
      iframe.className = this.className;
      iframe.setAttribute('allowFullScreen', '');
      iframe.setAttribute('mozallowFullScreen', '');
      iframe.setAttribute('webkitallowFullScreen', '');
      var x = document.createElement('div');
      x.className = 'x';
      x.textContent = 'X';
      x.onclick = function () {
        overlay.remove();
      }

      overlay.appendChild(iframe);
      overlay.appendChild(x);
      body.appendChild(overlay);

      // Append instructions for sketches
      if (this.className == "sketch") {
        var blurb = document.createElement('div');
        blurb.className = "blurb";
        blurb.textContent = this.parentNode.parentNode.querySelector(".blurb").textContent;
        overlay.appendChild(blurb);
      }
    }
  }
}