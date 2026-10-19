// config.js - la première ligne DOIT être un commentaire
// Clic molette sur un onglet : décharge l'onglet (ou le recharge s'il est déjà déchargé)
// au lieu de le fermer.
try {
  const { Services } = globalThis.Services
    ? globalThis
    : ChromeUtils.importESModule("resource://gre/modules/Services.sys.mjs");

  function setup(win) {
    if (win.__middleClickUnload) return;
    win.__middleClickUnload = true;
    let handled = false;

    const getTab = (e) =>
      e.button === 1 && e.target.closest?.("tab.tabbrowser-tab");

    win.addEventListener("mousedown", (e) => {
      if (getTab(e)) handled = false;
    }, true);

    const onClick = (e) => {
      const tab = getTab(e);
      if (!tab) return;
      // Empêche Firefox de fermer l'onglet
      e.preventDefault();
      e.stopImmediatePropagation();
      if (handled) return;
      handled = true;

      const gBrowser = win.gBrowser;
      if (tab.hasAttribute("pending")) {
        // Onglet déchargé -> on le recharge en arrière-plan
        gBrowser.reloadTab(tab);
      } else if (typeof gBrowser.explicitUnloadTabs === "function") {
        // Fonction native "Décharger l'onglet" (gère aussi l'onglet actif)
        gBrowser.explicitUnloadTabs([tab]);
      } else {
        if (tab.selected) {
          const other = gBrowser._findTabToBlurTo?.(tab);
          if (!other) return;
          gBrowser.selectedTab = other;
        }
        gBrowser.discardBrowser(tab);
      }
    };
    win.addEventListener("click", onClick, true);
    win.addEventListener("auxclick", onClick, true);
  }

  Services.obs.addObserver((subject) => {
    if (subject.location?.href === "chrome://browser/content/browser.xhtml") {
      setup(subject);
    }
  }, "browser-delayed-startup-finished");
} catch (ex) {
  Components.utils.reportError(ex);
}
