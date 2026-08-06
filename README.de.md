# AvalynxToast

[![npm version](https://jbs-newmedia.de/badge/npm/avalynx-toast/version.svg)](https://www.npmjs.com/package/avalynx-toast)
[![npm downloads](https://jbs-newmedia.de/badge/npm/avalynx-toast/download.svg)](https://www.npmjs.com/package/avalynx-toast)
[![jsDelivr](https://jbs-newmedia.de/badge/jsdelivr/avalynx-toast/hits.svg)](https://www.jsdelivr.com/package/npm/avalynx-toast)
[![License](https://jbs-newmedia.de/badge/npm/avalynx-toast/license.svg)](LICENSE)
[![Tests](https://jbs-newmedia.de/badge/github/avalynx/avalynx-toast/tests.svg)](https://github.com/avalynx/avalynx-toast/actions/workflows/tests.yml)
[![codecov](https://jbs-newmedia.de/badge/codecov/avalynx/avalynx-toast/coverage.svg)](https://codecov.io/gh/avalynx/avalynx-toast)
[![GitHub stars](https://jbs-newmedia.de/badge/github/avalynx/avalynx-toast/stars.svg)](https://github.com/avalynx/avalynx-toast)

AvalynxToast ist ein leichtgewichtiges, eigenständiges Toast-Benachrichtigungssystem für Web-Anwendungen. Es nutzt Bootstrap (ab Version 5.3) und bietet anpassbare Toasts, die flexibel auf dem Bildschirm positioniert werden können.

## Funktionen

- **Verschiedene Toast-Typen**: `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `light`, `dark`.
- **Optionaler Titel und Untertitel**: Titel fett im Header, dezenter Untertitel rechts daneben (z. B. „vor 4 Minuten").
- **Optionales Bild**: Avatar oder Logo als kleines Bild im Header.
- **Body-only Variante**: Ohne Header, nur Body + Schließen-Button (Bootstrap „Custom content"-Pattern).
- **Flexible Positionierung**: `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right`.
- **Steuerbare Dauer**: Anzeigezeit in Millisekunden konfigurierbar.
- **Schließbar**: Optional kann ein Schließen-Button angezeigt werden.
- **Automatisches Ausblenden**: Toasts können nach Ablauf der Dauer automatisch ausgeblendet werden.
- **Einfache API**: Schlanke Verwendung ohne Framework-Abhängigkeiten.

## Beispiele

Hier ist ein einfaches Beispiel für die Verwendung von AvalynxToast in Ihrem Projekt:

* [Übersicht](https://avalynx-toast.jbs-newmedia.de/examples/index.html)
* [Einfacher Toast](https://avalynx-toast.jbs-newmedia.de/examples/simple-toast.html)
* [Toast mit Titel](https://avalynx-toast.jbs-newmedia.de/examples/toast-with-title.html)
* [Toast mit Titel und Untertitel](https://avalynx-toast.jbs-newmedia.de/examples/toast-with-subtitle.html)
* [Toast mit Bild](https://avalynx-toast.jbs-newmedia.de/examples/toast-with-image.html)
* [Body-only Toast (ohne Header)](https://avalynx-toast.jbs-newmedia.de/examples/toast-body-only.html)
* [Zufällige Toasts](https://avalynx-toast.jbs-newmedia.de/examples/random-toasts.html)
* [Callback bei Schließen](https://avalynx-toast.jbs-newmedia.de/examples/callback-onclose.html)
* [Zufällige Toasts alle 3 Sekunden](https://avalynx-toast.jbs-newmedia.de/examples/random-toasts-every-3s.html)

## Installation

Um AvalynxToast in Ihrem Projekt zu verwenden, können Sie es direkt in Ihre HTML-Datei einbinden. Stellen Sie sicher, dass Bootstrap 5.3 oder höher in Ihrem Projekt enthalten ist, damit AvalynxToast korrekt funktioniert.

Zuerst Bootstrap einbinden:

```html
<!-- Bootstrap -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3/dist/js/bootstrap.bundle.min.js"></script>
```

Dann AvalynxToast einbinden:

```html
<link href="pfad/zu/avalynx-toast.css" rel="stylesheet">
<script src="pfad/zu/avalynx-toast.js"></script>
```

Ersetzen Sie `pfad/zu/avalynx-toast.*` durch den tatsächlichen Pfad zu den Dateien in Ihrem Projekt.

## Installation über jsDelivr ([Link](https://cdn.jsdelivr.net/npm/avalynx-toast/))

AvalynxToast ist auch über [jsDelivr](https://www.jsdelivr.com/) verfügbar. Sie können es wie folgt in Ihr Projekt einbinden:

```html
<link href="https://cdn.jsdelivr.net/npm/avalynx-toast@1.0.0/dist/css/avalynx-toast.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/avalynx-toast@1.0.0/dist/js/avalynx-toast.js"></script>
```

Stellen Sie sicher, dass Sie auch Bootstrap JS/CSS in Ihr Projekt einbinden, um eine korrekte Anzeige von AvalynxToast zu gewährleisten.

## Installation über NPM ([Link](https://www.npmjs.com/package/avalynx-toast))

AvalynxToast ist auch als NPM-Paket verfügbar. Sie können es mit dem folgenden Befehl zu Ihrem Projekt hinzufügen:

```bash
npm install avalynx-toast
```

Nach der Installation können Sie AvalynxToast wie folgt in Ihre JavaScript-Datei importieren:

```javascript
import { AvalynxToast } from 'avalynx-toast';
import 'avalynx-toast/dist/css/avalynx-toast.css';
```

Stellen Sie sicher, dass Sie auch Bootstrap JS/CSS in Ihr Projekt einbinden, um eine korrekte Anzeige von AvalynxToast zu gewährleisten.

## Installation über Symfony AssetMapper

```bash
php bin/console importmap:require avalynx-toast
```

Nach der Installation können Sie AvalynxToast wie folgt in Ihre JavaScript-Datei importieren:

```javascript
import { AvalynxToast } from 'avalynx-toast';
import 'avalynx-toast/dist/css/avalynx-toast.css';
```

Stellen Sie sicher, dass Sie auch Bootstrap JS/CSS in Ihr Projekt einbinden, um eine korrekte Anzeige von AvalynxToast zu gewährleisten.

## Installation über Symfony AssetComposer

Weitere Informationen über das Symfony AssetComposer Bundle finden Sie [hier](https://github.com/jbsnewmedia/asset-composer-bundle).

```twig
{% do addAssetComposer('avalynx/avalynx-toast/dist/css/avalynx-toast.css') %}
{% do addAssetComposer('avalynx/avalynx-toast/dist/js/avalynx-toast.js') %}
```

Stellen Sie sicher, dass Sie auch Bootstrap JS/CSS in Ihr Projekt einbinden, um eine korrekte Anzeige von AvalynxToast zu gewährleisten.

## Installation über Composer ([Link](https://packagist.org/packages/avalynx/avalynx-toast))

AvalynxToast ist auch als Composer-Paket verfügbar. Sie können es mit dem folgenden Befehl zu Ihrem Projekt hinzufügen:

```bash
composer require avalynx/avalynx-toast
```

Nach der Installation können Sie AvalynxToast wie folgt in Ihre HTML-Datei einbinden:

```html
<link href="vendor/avalynx/avalynx-toast/dist/css/avalynx-toast.css" rel="stylesheet">
<script src="vendor/avalynx/avalynx-toast/dist/js/avalynx-toast.js"></script>
```

Stellen Sie sicher, dass Sie auch Bootstrap JS/CSS in Ihr Projekt einbinden, um eine korrekte Anzeige von AvalynxToast zu gewährleisten.

## Verwendung

Einen Toast erzeugen Sie, indem Sie ein neues `AvalynxToast`-Objekt mit den gewünschten Optionen instanziieren:

```javascript
new AvalynxToast('Ihre Nachricht', 'success', {
  title: 'Hallo',
  subtitle: 'vor 4 Minuten',
  image: 'avatar.png',
  duration: 5000,
  position: 'top-right',
  closeable: true,
  autohide: true,
  headerless: false,
  width: '350px'
});
```

## Optionen

AvalynxToast ermöglicht die folgenden Optionen zur Anpassung:

- `message`: (string) Die anzuzeigende Nachricht im Toast-Body (Standard: `''`).
- `type`: (string) Der Typ des Toasts. Einer von (`primary`, `secondary`, `success`, `danger`, `warning`, `info`, `light`, `dark`) (Standard: `'info'`).
- `options`: Ein Objekt, das die folgenden Schlüssel enthält:
    - `title`: (string) Der im Toast-Header anzuzeigende Titel (Standard: `''`).
    - `subtitle`: (string) Ein dezenter Text im Toast-Header rechts neben dem Titel, z. B. eine Zeitangabe (Standard: `''`).
    - `image`: (string) URL eines Bildes (z. B. Avatar), das im Toast-Header links neben dem Titel angezeigt wird (Standard: `''`).
    - `headerless`: (boolean) Toast ohne Header rendern (nur Body + Schließen-Button) (Standard: `false`).
    - `duration`: (number) Anzeigezeit in Millisekunden (Standard: `5000`).
    - `position`: (string) Position des Toasts auf dem Bildschirm. Einer von `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right` (Standard: `'top-right'`).
    - `closeable`: (boolean) Ob der Nutzer den Toast schließen kann (Standard: `true`).
    - `autohide`: (boolean) Ob der Toast nach Ablauf automatisch ausgeblendet wird (Standard: `true`).
    - `width`: (string) Breite des Toasts (Standard: `'350px'`).
    - `onClose`: (function) Eine Callback-Funktion, die beim Ausblenden ausgeführt wird (Standard: `null`).

## Beitragen

Beiträge sind willkommen! Wenn Sie etwas beitragen möchten, forken Sie bitte das Repository und senden Sie einen Pull-Request mit Ihren Änderungen oder Verbesserungen. Wir suchen Beiträge in den folgenden Bereichen:

- Fehlerbehebungen (Bug fixes)
- Funktionserweiterungen
- Dokumentationsverbesserungen

Bevor Sie Ihren Pull-Request einreichen, stellen Sie bitte sicher, dass Ihre Änderungen gut dokumentiert sind und dem bestehenden Codestil des Projekts entsprechen.

## Lizenz

AvalynxToast ist quelloffene Software, die unter der [MIT-Lizenz](LICENSE) lizenziert ist.

## Kontakt

Wenn Sie Fragen, Funktionswünsche oder Probleme haben, eröffnen Sie bitte ein Issue in unserem [GitHub-Repository](https://github.com/avalynx/avalynx-toast/issues) oder reichen Sie einen Pull-Request ein.

Vielen Dank, dass Sie AvalynxToast für Ihr Projekt in Betracht ziehen!