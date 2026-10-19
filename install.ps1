# À lancer en PowerShell administrateur, Firefox fermé
$ff = "C:\Program Files\Mozilla Firefox"
Copy-Item "$PSScriptRoot\config.js" "$ff\config.js" -Force
Copy-Item "$PSScriptRoot\defaults\pref\autoconfig.js" "$ff\defaults\pref\autoconfig.js" -Force
Write-Host "Installé. Relance Firefox."
