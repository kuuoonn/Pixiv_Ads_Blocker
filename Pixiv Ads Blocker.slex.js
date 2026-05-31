// ==UserScript==
// @name:ja         ぷにる用支部アドブロック
// @name            Pixiv Ads Blocker
// @version         2.0
// @author          kuon
// @description     Ads blocker for Pixiv.
// @description:ja  素人自作＆自分用、Pixivの広告削除エクステンション
// @include         https://www.pixiv.net/*
// @require         jquery
// ==/UserScript==

(function() {
    'use strict';

    // 【新兵器】最速で「広告は最初から非表示」というルール（CSS）をページにブチ込む
    const style = document.createElement('style');
    style.innerHTML = `
        [id^="adsdk--"], 
        [class*="ad-frame"], 
        [class*="ad-frame-container"] {
            display: none !important;
            height: 0px !important;
            visibility: hidden !important;
        }
    `;
    // HTMLの頭（document.documentElement）に最速でくっつける
    document.documentElement.appendChild(style);

    // 【バックアップ】念のため後から湧き出る特殊なノード対策の監視員
    function clearAds(node) {
        if (!node || node.nodeType !== 1) return;
        const targetAd = node.id?.startsWith('adsdk--') || 
                         node.className?.includes?.('ad-frame') || 
                         node.className?.includes?.('t_novel_comment_section')
            ? node 
            : node.querySelector?.('[id^="adsdk--"], [class*="ad-frame"], [class*="t_novel_comment_section"]');

        if (targetAd) {
            targetAd.style.display = 'none';
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

})();
