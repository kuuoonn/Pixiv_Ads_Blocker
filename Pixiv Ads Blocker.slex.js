// ==UserScript==
// @name            Pixiv Ads Blocker
// @version         2.0
// @author          kuon
// @description     Ads blocker for Pixiv.
// @description:ja  素人自作＆自分用、Pixivの広告削除エクステンション
// @include         https://www.pixiv.net/*
// @include         http://www.pixiv.net/*
// @require         api
// ==/UserScript==

(function() {
    'use strict';

    // スレイプニル専用の命令で、広告を跡地ごと宇宙の彼方に葬り去る
    SLEX_addStyle(`
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
    `);

})();
