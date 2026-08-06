# AvalynxToast

[![npm version](https://jbs-newmedia.de/badge/npm/avalynx-toast/version.svg)](https://www.npmjs.com/package/avalynx-toast)
[![npm downloads](https://jbs-newmedia.de/badge/npm/avalynx-toast/download.svg)](https://www.npmjs.com/package/avalynx-toast)
[![Composer version](https://jbs-newmedia.de/badge/composer/avalynx/avalynx-toast/version.svg)](https://packagist.org/packages/avalynx/avalynx-toast)
[![Composer downloads](https://jbs-newmedia.de/badge/composer/avalynx/avalynx-toast/download.svg)](https://packagist.org/packages/avalynx/avalynx-toast)
[![jsDelivr](https://jbs-newmedia.de/badge/jsdelivr/avalynx-toast/hits.svg)](https://www.jsdelivr.com/package/npm/avalynx-toast)
[![License](https://jbs-newmedia.de/badge/npm/avalynx-toast/license.svg)](LICENSE)
[![Tests](https://jbs-newmedia.de/badge/github/avalynx/avalynx-toast/tests.svg)](https://github.com/avalynx/avalynx-toast/actions/workflows/tests.yml)
[![codecov](https://jbs-newmedia.de/badge/codecov/avalynx/avalynx-toast/coverage.svg)](https://codecov.io/gh/avalynx/avalynx-toast)
[![GitHub stars](https://jbs-newmedia.de/badge/github/avalynx/avalynx-toast/stars.svg)](https://github.com/avalynx/avalynx-toast)

AvalynxToast is a lightweight, dependency-free toast notification system designed for web applications. It leverages Bootstrap (version 5.3 or higher) to provide a seamless integration with your project, offering a range of customizable toasts that can be positioned anywhere on the screen.

## Features

- **Customizable Toasts**: Supports various toast types like primary, secondary, success, danger, warning, info, light, and dark.
- **Optional Title**: Provide an optional title to display in the toast header.
- **Flexible Positioning**: Choose from predefined positions such as top-left, top-center, top-right, bottom-left, bottom-center, and bottom-right.
- **Duration Control**: Set the duration for how long the toast should be displayed.
- **Closeable Toasts**: Optionally allow users to close toasts.
- **Autohide Functionality**: Toasts can automatically disappear after a certain period.
- **Easy to Use**: Simple API for creating and managing toasts within your web applications.

## Examples

Here's a simple example of how to use AvalynxToast in your project:

* [Overview](https://avalynx-toast.jbs-newmedia.de/examples/index.html)
* [Simple toast](https://avalynx-toast.jbs-newmedia.de/examples/simple-toast.html)
* [Toast with title](https://avalynx-toast.jbs-newmedia.de/examples/toast-with-title.html)
* [Toast with title and subtitle](https://avalynx-toast.jbs-newmedia.de/examples/toast-with-subtitle.html)
* [Toast with image](https://avalynx-toast.jbs-newmedia.de/examples/toast-with-image.html)
* [Body-only toast (headerless)](https://avalynx-toast.jbs-newmedia.de/examples/toast-body-only.html)
* [Random toasts](https://avalynx-toast.jbs-newmedia.de/examples/random-toasts.html)
* [Callback on close](https://avalynx-toast.jbs-newmedia.de/examples/callback-onclose.html)
* [Random toasts every 3 seconds](https://avalynx-toast.jbs-newmedia.de/examples/random-toasts-every-3s.html)

## Installation

To use AvalynxToast in your project, you can directly include it in your HTML file. Ensure you have Bootstrap 5.3 or higher included in your project for AvalynxToast to work correctly.

First, include Bootstrap:

```html
<!-- Bootstrap -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3/dist/js/bootstrap.bundle.min.js"></script>
```

Then, include AvalynxToast:

```html
<link href="path/to/avalynx-toast.css" rel="stylesheet">
<script src="path/to/avalynx-toast.js"></script>
```

Replace `path/to/avalynx-toast.js` and `path/to/avalynx-toast.css` with the actual path to the files in your project.

## Installation via jsDelivr ([Link](https://cdn.jsdelivr.net/npm/avalynx-toast/))

AvalynxToast is also available via [jsDelivr](https://www.jsdelivr.com/). You can include it in your project like this:

```html
<link href="https://cdn.jsdelivr.net/npm/avalynx-toast@1.0.0/dist/css/avalynx-toast.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/avalynx-toast@1.0.0/dist/js/avalynx-toast.js"></script>
```

Make sure to also include Bootstrap's JS/CSS in your project to ensure AvalynxToast displays correctly.

## Installation via NPM ([Link](https://www.npmjs.com/package/avalynx-toast))

AvalynxToast is also available as a npm package. You can add it to your project with the following command:

```bash
npm install avalynx-toast
```

After installing, you can import AvalynxToast into your JavaScript file like this:

```javascript
import { AvalynxToast } from 'avalynx-toast';
import 'avalynx-toast/dist/css/avalynx-toast.css';
```

Make sure to also include Bootstrap's JS/CSS in your project to ensure AvalynxToast displays correctly.

## Installation via Symfony AssetMapper

```bash
php bin/console importmap:require avalynx-toast
```

After installing, you can import AvalynxToast into your JavaScript file like this:

```javascript
import { AvalynxToast } from 'avalynx-toast';
import 'avalynx-toast/dist/css/avalynx-toast.css';
```

Make sure to also include Bootstrap's JS/CSS in your project to ensure AvalynxToast displays correctly.

## Installation via Symfony AssetComposer

More information about the Symfony AssetComposer Bundle can be found [here](https://github.com/jbsnewmedia/asset-composer-bundle).

```twig
{% do addAssetComposer('avalynx/avalynx-toast/dist/css/avalynx-toast.css') %}
{% do addAssetComposer('avalynx/avalynx-toast/dist/js/avalynx-toast.js') %}
```

Make sure to also include Bootstrap's JS/CSS in your project to ensure AvalynxToast displays correctly.

## Installation via Composer ([Link](https://packagist.org/packages/avalynx/avalynx-toast))

AvalynxToast is also available as a Composer package. You can add it to your project with the following command:

```bash
composer require avalynx/avalynx-toast
```

After installing, you can import AvalynxToast into your HTML file like this:

```html
<link href="vendor/avalynx/avalynx-toast/dist/css/avalynx-toast.css" rel="stylesheet">
<script src="vendor/avalynx/avalynx-toast/dist/js/avalynx-toast.js"></script>
```

Make sure to also include Bootstrap's JS/CSS in your project to ensure AvalynxToast displays correctly.

## Usage

To create a toast, simply instantiate a new `AvalynxToast` object with the desired options:

```javascript
new AvalynxToast('Your message here', 'success', {
  title: 'Hello',
  subtitle: '4 mins ago',
  image: 'avatar.png',
  duration: 5000,
  position: 'top-right',
  closeable: true,
  autohide: true,
  headerless: false,
  width: '350px'
});
```

## Options

AvalynxToast allows the following options for customization:

- `message`: (string) The message to display in the toast body (default: `''`).
- `type`: (string) The type of toast. One of (`primary`, `secondary`, `success`, `danger`, `warning`, `info`, `light`, `dark`) (default: `'info'`).
- `options`: An object containing the following keys:
    - `title`: (string) The title to display in the toast header (default: `''`).
    - `subtitle`: (string) A muted text to display in the toast header, right of the title (default: `''`).
    - `image`: (string) URL of an image (e.g. avatar) to display in the toast header, left of the title (default: `''`).
    - `headerless`: (boolean) Render the toast without a header (only body + close button) (default: `false`).
    - `duration`: (number) Duration in milliseconds for the toast to be displayed (default: `5000`).
    - `position`: (string) Position of the toast on the screen. One of `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right` (default: `'top-right'`).
    - `closeable`: (boolean) Whether the toast can be closed by the user (default: `true`).
    - `autohide`: (boolean) Whether the toast will hide automatically after the duration (default: `true`).
    - `width`: (string) The width of the toast (default: `'350px'`).
    - `onClose`: (function) A callback function to execute when the toast is hidden (default: `null`).

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request with your changes or improvements. We're looking for contributions in the following areas:

- Bug fixes
- Feature enhancements
- Documentation improvements

Before submitting your pull request, please ensure that your changes are well-documented and follow the existing coding style of the project.

## License

AvalynxToast is open-sourced software licensed under the [MIT license](LICENSE).

## Contact

If you have any questions, feature requests, or issues, please open an issue on our [GitHub repository](https://github.com/avalynx/avalynx-toast/issues) or submit a pull request.

Thank you for considering AvalynxToast for your project!