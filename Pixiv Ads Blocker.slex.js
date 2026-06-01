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


function removeAds() {
  $('div[id^="adsdk--"]').html('').css({'display': 'none',});
  $('div[class^="w-full"]').remove();
  $('div[class*="ad-frame"]').remove();
}

setTimeout(() => {
  removeAds();
  setInterval(removeAds, 1000);
}, 1000);
