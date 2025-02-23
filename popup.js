document.getElementById("execute").addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        world: "MAIN",  // Chạy trong context chính của trang
        func: () => {
            (() => {
                const { setTimeout, setInterval } = window;
                window.setTimeout = (fn, t) => setTimeout(fn, Math.max(1, t / 25));
                window.setInterval = (fn, t) => setInterval(fn, Math.max(1, t / 25));
                console.log("Time functions patched!");
            })();
        }
    });
});
