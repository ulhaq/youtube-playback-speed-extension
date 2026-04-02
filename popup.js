var elm = document.querySelector("#speed");

chrome.storage.local.get("playbackSpeed", function (rs) {
  var speed = rs.playbackSpeed !== undefined ? rs.playbackSpeed : "1";
  if (rs.playbackSpeed === undefined) {
    chrome.storage.local.set({ "playbackSpeed": speed });
  }
  elm.value = speed;
});

elm.addEventListener("input", function () {
  var val = parseFloat(elm.value);
  if (val >= 0.05 && val <= 16) {
    chrome.storage.local.set({ "playbackSpeed": elm.value });
  }
});
