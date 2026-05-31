// ==UserScript==
// @name            Pixiv Ads Blocker
// @version         2.0
// @author          kuon
// @description     Ads blocker for Pixiv.
// @description:ja  素人自作＆自分用、Pixivの広告削除エクステンション
// @include         https://www.pixiv.net/*
// @include         http://www.pixiv.net/*
// @require         jquery
// ==/UserScript==

(function() {
    'use strict';

    // 広告を跡地ごと宇宙の彼方に葬り去る最強CSS
    const cssRule = `
        div[id*="adsdk"], 
        div[class*="ad-frame"],
        .ad-frame-container,
        a[href*="xn--pckua2a7gp15o89zb.com"], 
        img[src*="ads-pixiv.net"] {
            display: none !important;
            height: 0px !important;
            visibility: hidden !important;
            position: absolute !important;
            top: -9999px !important;
        }
    `;

    function injectStyleLoop() {
        let styleEl = document.getElementById('sleipnir-loop-style');
        
        if (!styleEl) {
            const target = document.head || document.body || document.documentElement;
            if (target) {
                styleEl = document.createElement('style');
                styleEl.id = 'sleipnir-loop-style';
                styleEl.innerHTML = cssRule;
                target.appendChild(styleEl);
            }
        } else {
            if (styleEl.innerHTML !== cssRule) {
                styleEl.innerHTML = cssRule;
            }
        }

        // 2秒（2000ms）ごとに、自分自身をずっと呼び出し続けてパトロール
        setTimeout(injectStyleLoop, 2000);
    }

    // 最初のノックを開始
    injectStyleLoop();

})();
})();
