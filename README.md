# middle-click-unload

Middle-click a Firefox tab to **unload** it instead of closing it. Middle-click an unloaded tab to **load it back** in the background.

*Clic molette sur un onglet Firefox : le décharge au lieu de le fermer. Clic molette sur un onglet déchargé : le recharge en arrière-plan.*

## Why not a regular add-on?

WebExtensions cannot intercept clicks on the tab strip, so this can't be published on addons.mozilla.org. It uses Firefox's built-in [autoconfig](https://support.mozilla.org/kb/customizing-firefox-using-autoconfig) mechanism instead.

## Install (Windows)

1. Close Firefox.
2. Open PowerShell **as administrator** and run:
   ```powershell
   .\install.ps1
   ```
3. Start Firefox.

Manual install: copy `config.js` into the Firefox install folder (e.g. `C:\Program Files\Mozilla Firefox\`) and `defaults/pref/autoconfig.js` into its `defaults\pref\` subfolder. On Linux/macOS, use the equivalent Firefox install directory.

## Uninstall

Delete `config.js` and `defaults\pref\autoconfig.js` from the Firefox install folder.

## Notes

- Works on the active tab too (Firefox switches to another tab first).
- Firefox updates usually keep these files; if it stops working after an update, run `install.ps1` again.
- Errors, if any, show up in the Browser Console (`Ctrl+Shift+J`).

## License

Copyright (C) 2026 tom.tourbez

middle-click-unload is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. It is distributed WITHOUT ANY WARRANTY. See [LICENSE](LICENSE) for the full text (GPL-3.0-or-later).
