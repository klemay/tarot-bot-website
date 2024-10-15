self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('datastore').then((cache) => cache.addAll([
      '/index.html',
      '/card-template.html',
      '/explore.html',
      '/install.html',
      '/meta-tags.html',
      '/privacy.html',
      '/reading.html',
      '/template.html',
      '/major-arcana.html',
      '/major-arcana/',
      '/major-arcana/death.html',
      '/major-arcana/judgement.html',
      '/major-arcana/justice.html',
      '/major-arcana/strength.html',
      '/major-arcana/temperance.html',
      '/major-arcana/the-chariot.html',
      '/major-arcana/the-devil.html',
      '/major-arcana/the-emperor.html',
      '/major-arcana/the-empress.html',
      '/major-arcana/the-fool.html',
      '/major-arcana/the-hanged-man.html',
      '/major-arcana/the-hermit.html',
      '/major-arcana/the-hierophant.html',
      '/major-arcana/the-high-priestess.html',
      '/major-arcana/the-lovers.html',
      '/major-arcana/the-magician.html',
      '/major-arcana/the-moon.html',
      '/major-arcana/the-star.html',
      '/major-arcana/the-sun.html',
      '/major-arcana/the-tower.html',
      '/major-arcana/the-world.html',
      '/major-arcana/wheel-of-fortune.html',
      '/suit-of-cups.html',
      '/suit-of-cups/',
      '/suit-of-cups/ace-of-cups.html',
      '/suit-of-cups/eight-of-cups.html',
      '/suit-of-cups/five-of-cups.html',
      '/suit-of-cups/four-of-cups.html',
      '/suit-of-cups/king-of-cups.html',
      '/suit-of-cups/knight-of-cups.html',
      '/suit-of-cups/nine-of-cups.html.html',
      '/suit-of-cups/page-of-cups.html',
      '/suit-of-cups/queen-of-cups.html.html',
      '/suit-of-cups/seven-of-cups.html',
      '/suit-of-cups/six-of-cups.html',
      '/suit-of-cups/ten-of-cups.html',
      '/suit-of-cups/three-of-cups.html',
      '/suit-of-cups/two-of-cups.html',
      '/suit-of-pentacles.html',
      '/suit-of-pentacles/',
      '/suit-of-pentacles/ace-of-pentacles.html',
      '/suit-of-pentacles/eight-of-pentacles.html',
      '/suit-of-pentacles/five-of-pentacles.html',
      '/suit-of-pentacles/four-of-pentacles.html',
      '/suit-of-pentacles/king-of-pentacles.html',
      '/suit-of-pentacles/knight-of-pentacles.html',
      '/suit-of-pentacles/nine-of-pentacles.html.html',
      '/suit-of-pentacles/page-of-pentacles.html',
      '/suit-of-pentacles/queen-of-pentacles.html.html',
      '/suit-of-pentacles/seven-of-pentacles.html',
      '/suit-of-pentacles/six-of-pentacles.html',
      '/suit-of-pentacles/ten-of-pentacles.html',
      '/suit-of-pentacles/three-of-pentacles.html',
      '/suit-of-pentacles/two-of-pentacles.html',
      '/suit-of-swords.html',
      '/suit-of-swords/',
      '/suit-of-swords/ace-of-swords.html',
      '/suit-of-swords/eight-of-swords.html',
      '/suit-of-swords/five-of-swords.html',
      '/suit-of-swords/four-of-swords.html',
      '/suit-of-swords/king-of-swords.html',
      '/suit-of-swords/knight-of-swords.html',
      '/suit-of-swords/nine-of-swords.html.html',
      '/suit-of-swords/page-of-swords.html',
      '/suit-of-swords/queen-of-swords.html.html',
      '/suit-of-swords/seven-of-swords.html',
      '/suit-of-swords/six-of-swords.html',
      '/suit-of-swords/ten-of-swords.html',
      '/suit-of-swords/three-of-swords.html',
      '/suit-of-swords/two-of-swords.html',
      '/suit-of-pentacles.html',
      '/suit-of-wands.html',
      '/suit-of-wands/',
      '/suit-of-wands/ace-of-wands.html',
      '/suit-of-wands/eight-of-wands.html',
      '/suit-of-wands/five-of-wands.html',
      '/suit-of-wands/four-of-wands.html',
      '/suit-of-wands/king-of-wands.html',
      '/suit-of-wands/knight-of-wands.html',
      '/suit-of-wands/nine-of-wands.html.html',
      '/suit-of-wands/page-of-wands.html',
      '/suit-of-wands/queen-of-wands.html.html',
      '/suit-of-wands/seven-of-wands.html',
      '/suit-of-wands/six-of-wands.html',
      '/suit-of-wands/ten-of-wands.html',
      '/suit-of-wands/three-of-wands.html',
      '/suit-of-wands/two-of-wands.html',
      '/css/',
      '/css/card.css',
      '/css/explore.css',
      '/css/install.css',
      '/css/major.css',
      '/css/reading.css',
      '/css/style.css',
      '/images/',
      '/images/cardBack.jpg',
      '/images/icon.png',
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});