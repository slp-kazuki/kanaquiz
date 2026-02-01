// オフライン用キャッシュ名（更新したので v3 に）
const CACHE_NAME = 'kana-quiz-v3';

// 最初に必ずキャッシュしておきたいファイル
const STATIC_ASSETS = [
  './',
  './Hiragana_quiz_Index.html',
  './manifest.json'
];

// インストール時：静的ファイルをキャッシュ
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// 古いキャッシュを削除
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
});

// すべての同一オリジンのリクエストをキャッシュ優先で処理
self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  // 自分のサーバー（localhost:8000）以外は触らない
  if (url.origin !== self.location.origin) {
    return;
  }

  // GET 以外（POST等）はそのまま
  if (req.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(req).then(cached => {
      // すでにキャッシュがあればそれを返す
      if (cached) return cached;

      // なければネットから取得 → 取れたらキャッシュに保存
      return fetch(req)
        .then(res => {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(req, resClone);
          });
          return res;
        })
        .catch(() => {
          // オフラインでネットにもなくて、キャッシュもない場合はそのまま失敗
          return cached;
        });
    })
  );
});
