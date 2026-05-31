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

// 【共通のお掃除関数】
function clearAds(node) {
    if (node.nodeType !== 1) return;

    // IDが「adsdk--」で始まる、または、クラス名に「ad-frame」が含まれるものを探す
    // ※ [class*="ad-frame"] にすることで、「abc-ad-frame-123」みたいな名前でも全キャッチします
    const targetAd = node.id?.startsWith('adsdk--') || node.className?.includes?.('ad-frame')
        ? node
        : node.querySelector?.('[id^="adsdk--"], [class*="ad-frame"]');

    if (targetAd) {
        // 発見したら存在を「無」にする
        targetAd.style.display = 'none';
        targetAd.style.height = '0px';
        targetAd.style.visibility = 'hidden';
    }
}

// 1. 【後から湧く広告用】監視スタート
const pixivFinalObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            clearAds(node);
        }
    }
});
pixivFinalObserver.observe(document.documentElement, { childList: true, subtree: true });

// 2. 【最初からある広告用】ページが開いた瞬間に、今あるやつを一度全部チェックする
$(function() {
    // 画面内にあるターゲットを一斉捜索して処理
    $('[id^="adsdk--"], [class*="ad-frame"]').each(function() {
        clearAds(this);
    });
});
