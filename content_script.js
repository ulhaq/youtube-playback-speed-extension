var root = document.createElement("div");
root.id = "playback-speed-controllor";

var inp = document.createElement("input");
inp.type = "range";
inp.setAttribute("step", "0.05");
inp.setAttribute("min", "0.05");
inp.setAttribute("max", "16");
inp.setAttribute("oninput", "javascript:document.querySelectorAll('video')[0].playbackRate=this.value;document.querySelector('#playback-speed-output').value=this.value;");

var output = document.createElement("output");
output.id = "playback-speed-output";

document.querySelector("body").prepend(root);
root.append(inp);
root.prepend(output);

chrome.storage.local.get("playbackSpeed", (rs) => {
    inp.value = output.value = rs.playbackSpeed;
    document.querySelectorAll("video")[0].playbackRate = rs.playbackSpeed;
});