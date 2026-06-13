/* Minimal service worker for Roadless.
 * Its only job today is to host showNotification() so arrival reminders
 * can fire, and to focus the app when a notification is tapped. No offline
 * caching — routing always needs the network.
 */
self.addEventListener("install", function () {
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (clients) {
      for (var i = 0; i < clients.length; i++) {
        if ("focus" in clients[i]) return clients[i].focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow("./");
    })
  );
});
