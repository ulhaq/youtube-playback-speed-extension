(function () {
  var root = document.createElement("div");
  root.id = "playback-speed-controller";

  var inp = document.createElement("input");
  inp.type = "range";
  inp.step = "0.05";
  inp.min = "0.05";
  inp.max = "16";

  var output = document.createElement("output");
  output.id = "playback-speed-output";

  inp.addEventListener("input", function () {
    output.value = inp.value;
    var video = document.querySelector("video");
    if (video) {
      video.playbackRate = parseFloat(inp.value);
    }
  });

  document.body.prepend(root);
  root.append(inp);
  root.prepend(output);

  function waitForVideo(callback) {
    var video = document.querySelector("video");
    if (video) return callback(video);
    var observer = new MutationObserver(function () {
      var v = document.querySelector("video");
      if (v) {
        observer.disconnect();
        callback(v);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function applySpeed(speed) {
    waitForVideo(function (video) {
      video.playbackRate = speed;
    });
  }

  chrome.storage.local.get("playbackSpeed", function (rs) {
    var speed = parseFloat(rs.playbackSpeed) || 1;
    inp.value = speed;
    output.value = speed;
    applySpeed(speed);
  });

  document.addEventListener("yt-navigate-finish", function () {
    applySpeed(parseFloat(inp.value) || 1);
  });
})();
