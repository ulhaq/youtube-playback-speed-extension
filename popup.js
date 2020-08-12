var elm = document.querySelector("#speed");

chrome.storage.local.get("playbackSpeed", (rs) => {
    if (rs.playbackSpeed === undefined) {
        chrome.storage.local.set({ "playbackSpeed": "2" });
    }

    elm.value = rs.playbackSpeed;
});

elm.oninput = () => {
    chrome.storage.local.set({ "playbackSpeed": elm.value });
};