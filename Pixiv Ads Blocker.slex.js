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

(function() {
    'use strict';

    // スレイプニルが起動した瞬間に動くCSS魔法
    function injectSleipnirStyle() {
        if (document.getElementById('sleipnir-adblock-style')) return;

        const target = document.head || document.body || document.documentElement;
        if (target) {
            const style = document.createElement('style');
            style.id = 'sleipnir-adblock-style';
            style.innerHTML = `
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
            target.appendChild(style);
        }
    }

    // 求人ボックスのリンクを親玉ごと道連れにする関数
    function heavyClean() {
        const badLinks = document.querySelectorAll('a[href*="xn--pckua2a7gp15o89zb.com"]');
        badLinks.forEach(link => {
            const container = link.closest('div');
            if (container) {
                container.style.display = 'none';
            }
        });
    }

    // スレイプニルの遅い起動タイミングに合わせて、
    // 動けるようになった瞬間に最速でCSSをブチ込む
    injectSleipnirStyle();

    // ページが読み込まれた後、1秒おきにパトロールして求人ボックスの息の根を止める
    window.addEventListener('load', () => {
        injectSleipnirStyle();
        heavyClean();
        setInterval(heavyClean, 1000);
    });

})();
