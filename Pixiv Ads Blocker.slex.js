// ==UserScript==
// @name:ja         ぷにる用支部アドブロック
// @name            Pixiv Ads Blocker
// @version         2.0
// @author          kuon
// @description     Ads blocker for Pixiv.
// @description:ja  素人自作＆自分用、Pixivの広告削除エクステンション
// @include         https://www.pixiv.net/*
// @include         http://www.pixiv.net/*
// ==/UserScript==

function clearAds(node) {
    if (node.nodeType !== 1) return;

    const targetAd = node.id?.startsWith('adsdk--') || node.className?.includes?.('ad-frame')
        ? node 
        : node.querySelector?.('[id^="adsdk--"], [class*="ad-frame"]');

    if (targetAd) {
        targetAd.style.display = 'none';
        targetAd.style.height = '0px';
        targetAd.style.visibility = 'hidden';
    }
}

const pixivFinalObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            clearAds(node);
        }
    }
});
pixivFinalObserver.observe(document.documentElement, { childList: true, subtree: true });

$(function() {
    $('[id^="adsdk--"], [class*="ad-frame"]').each(function() {
        clearAds(this);
    });
});
