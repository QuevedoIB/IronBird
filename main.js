const main = () => {
  const buildDom = html => {
    const body = document.querySelector("body");
    body.innerHTML = html;
    return body;
  };

  const buildSplash = () => {
    buildDom(`
    <section class="splash">
    <h1 class="title">IronBird</h1>
    <button class="start-button">START</button>
    <button class="leader-boards-button">LEADERBOARDS</button>
    </section>
    `);
  };

  buildSplash();
};

window.addEventListener("load", main);
