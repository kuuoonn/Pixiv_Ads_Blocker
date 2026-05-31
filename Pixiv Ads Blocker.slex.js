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

    // スレイプニル用の最強CSS注入関数
    function injectSleipnirStyle() {
        // すでに流し込み済みならスキップ
        if (document.getElementById('sleipnir-adblock-style')) return;

        // headタグ、またはbodyタグ、最悪でもdocumentElementを探す
        const target = document.head || document.body || document.documentElement;
        if (target) {
            const style = document.createElement('style');
            style.id = 'sleipnir-adblock-style';
            style.innerHTML = `
                [id^="adsdk--"],
                [class*="ad-frame"],
                [class*="ad-frame-container"] {
                    display: none !important;
                    height: 0px !important;
                    visibility: hidden !important;
                    opacity: 0 !important;
                    pointer-events: none !important;
                }
            `;
            target.appendChild(style);
        }
    }

    // 【対策】スレイプニルの気まぐれな起動タイミングに合わせて「4重」に実行する
    injectSleipnirStyle(); // 1発目：起動した瞬間

    document.addEventListener('DOMContentLoaded', injectSleipnirStyle); // 2発目：HTML読込時
    window.addEventListener('load', injectSleipnirStyle); // 3発目：全部読込時

    // 4発目：最終手段（後から湧き出る広告用に1秒ごとにCSSを再注入し続ける）
    setInterval(injectSleipnirStyle, 1000);

})();
