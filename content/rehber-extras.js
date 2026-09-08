/* Ekip ekstraları: her format görünümüne favori butonu + yorum bölümü ekler. */
(function () {
  var ME = (window.__EKIP__ && window.__EKIP__.name) || null;
  if (!ME) return;

  var state = { favs: {}, comments: [] };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function timeAgo(ts) {
    var d = Date.now() - ts;
    var m = Math.floor(d / 60000);
    if (m < 1) return "az önce";
    if (m < 60) return m + " dk önce";
    var h = Math.floor(m / 60);
    if (h < 24) return h + " sa önce";
    return new Date(ts).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" });
  }

  function api(path, method, body) {
    return fetch(path, {
      method: method || "GET",
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    }).then(function (r) {
      if (!r.ok) throw new Error("api");
      return r.json();
    });
  }

  function favNames(game) {
    return state.favs[game] || [];
  }

  function renderFav(view, game) {
    var bar = view.querySelector(".ek-favbar");
    if (!bar) return;
    var names = favNames(game);
    var mine = names.indexOf(ME) !== -1;
    var others = names.filter(function (n) { return n !== ME; });
    var who = "";
    if (names.length) {
      var list = (mine ? ["sen"] : []).concat(others);
      who = list.join(", ") + (names.length === 1 && mine ? " sevdin" : " seviyor");
    }
    bar.innerHTML =
      '<button class="ek-fav' + (mine ? " on" : "") + '" type="button">' +
      '<span class="ek-heart">' + (mine ? "♥" : "♡") + "</span>" +
      (mine ? "Favorimde" : "Favorile") +
      (names.length ? " · " + names.length : "") +
      "</button>" +
      (who ? '<span class="ek-fav-who">' + esc(who) + "</span>" : "");
    bar.querySelector(".ek-fav").addEventListener("click", function () {
      var on = favNames(game).indexOf(ME) === -1;
      var arr = favNames(game).filter(function (n) { return n !== ME; });
      if (on) arr.push(ME);
      state.favs[game] = arr;
      renderFav(view, game);
      api("/api/ekip/fav", "POST", { game: game, on: on }).catch(function () {});
    });
  }

  function renderComments(view, game) {
    var wrap = view.querySelector(".ek-comments");
    if (!wrap) return;
    var items = state.comments.filter(function (c) { return c.game === game; });
    var listHtml = items.length
      ? '<ul class="ek-clist">' +
        items
          .map(function (c) {
            return (
              "<li><div class=\"ek-chead\"><span class=\"ek-cname\">" + esc(c.name) + "</span>" +
              '<span class="ek-ctime">' + timeAgo(c.ts) + "</span>" +
              (c.name === ME ? '<button class="ek-cdel" data-id="' + esc(c.id) + '">sil</button>' : "") +
              '</div><div class="ek-ctext">' + esc(c.text) + "</div></li>"
            );
          })
          .join("") +
        "</ul>"
      : '<p class="ek-cempty">Henüz yorum yok — ilk notu sen düş.</p>';
    wrap.innerHTML =
      "<h2>Ekip notları</h2>" +
      '<p class="ek-sub">Bu format hakkında ekipçe tuttuğumuz notlar.</p>' +
      listHtml +
      '<form class="ek-cform"><textarea placeholder="Provada fark ettiğin bir şey, bir fikir, bir uyarı…" maxlength="2000"></textarea>' +
      '<div class="ek-crow"><span class="ek-cempty">' + esc(ME) + " olarak yazıyorsun</span>" +
      '<button class="ek-csend" type="submit">Gönder</button></div></form>';

    wrap.querySelectorAll(".ek-cdel").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-id");
        state.comments = state.comments.filter(function (c) { return c.id !== id; });
        renderComments(view, game);
        api("/api/ekip/comment", "DELETE", { id: id }).catch(function () {});
      });
    });

    var form = wrap.querySelector(".ek-cform");
    var ta = form.querySelector("textarea");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var text = ta.value.trim();
      if (!text) return;
      var btn = form.querySelector(".ek-csend");
      btn.disabled = true;
      api("/api/ekip/comment", "POST", { game: game, text: text })
        .then(function (res) {
          state.comments.push(res.comment);
          renderComments(view, game);
        })
        .catch(function () {
          btn.disabled = false;
        });
    });
  }

  function init() {
    var views = document.querySelectorAll(".view[id^='v-']");
    var formats = [];
    views.forEach(function (view) {
      var art = view.querySelector("article.fmt");
      if (!art || !view.querySelector(".fmt-no")) return; // sadece format sayfaları
      var game = view.id.slice(2); // "v-01-armando" -> "01-armando"
      var h1 = art.querySelector("h1");
      var bar = document.createElement("div");
      bar.className = "ek-favbar";
      if (h1 && h1.nextSibling) h1.parentNode.insertBefore(bar, h1.nextSibling);
      else art.insertBefore(bar, art.firstChild);
      var com = document.createElement("section");
      com.className = "ek-comments";
      art.appendChild(com);
      formats.push({ view: view, game: game });
    });

    var chip = document.createElement("div");
    chip.className = "ek-userchip";
    chip.innerHTML = "🎭 " + esc(ME) + ' &middot; <a href="/ekip">ekip alanı</a>';
    document.body.appendChild(chip);

    api("/api/ekip/data")
      .then(function (data) {
        state.favs = data.favs || {};
        state.comments = data.comments || [];
        formats.forEach(function (f) {
          renderFav(f.view, f.game);
          renderComments(f.view, f.game);
        });
      })
      .catch(function () {});
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
