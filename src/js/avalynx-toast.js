/**
 * AvalynxToast
 *
 * AvalynxToast is a simple toast system for web applications. Based on Bootstrap >=5.3 without any framework dependencies.
 *
 * @version 1.0.0
 * @license MIT
 * @author https://github.com/avalynx/avalynx-toast/graphs/contributors
 * @website https://github.com/avalynx/
 * @repository https://github.com/avalynx/avalynx-toast.git
 * @bugs https://github.com/avalynx/avalynx-toast/issues
 *
 * @param {string} message - The message to display in the toast body. HTML is escaped to prevent XSS (default: '').
 * @param {string} type - The type of toast. One of 'default', 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark' (default: 'info').
 * @param {object} options - An object containing the following keys:
 * @param {string} options.title - The title to display in the toast header (default: '').
 * @param {string} options.subtitle - A muted text to display in the toast header, right of the title (default: '').
 * @param {string} options.image - URL of an image (e.g. avatar) to display in the toast header, left of the title (default: '').
 * @param {boolean} options.headerless - Render the toast without a header (only body + close button) (default: false).
 * @param {number} options.duration - Duration in milliseconds for the toast to be displayed (default: 5000).
 * @param {string} options.position - Position of the toast on the screen. One of 'top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right' (default: 'top-right').
 * @param {boolean} options.closeable - Whether the toast can be closed by the user (default: true).
 * @param {boolean} options.autohide - Whether the toast will hide automatically after the duration (default: true).
 * @param {string} options.width - The width of the toast (default: '350px').
 * @param {function} options.onClose - A callback function to execute when the toast is hidden (default: null).
 *
 */

class AvalynxToast {
    constructor(message, type, options = {}) {
        this.message = this.sanitize(message);
        this.type = type;
        if (options === null || typeof options !== 'object') {
            options = {};
        }
        this.options = {
            title: options.title || '',
            subtitle: options.subtitle || '',
            image: options.image || '',
            headerless: options.headerless || false,
            duration: options.duration || 5000,
            position: options.position || 'top-right',
            closeable: options.closeable || true,
            autohide: options.autohide || true,
            width: options.width || '350px',
            onClose: options.onClose || null,
            ...options
        };
        if (!['default', 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'].includes(this.type)) {
            this.type = 'info';
        }
        if (!['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'].includes(this.options.position)) {
            this.options.position = 'top-right';
        }
        if (this.options.autohide !== false && this.options.autohide !== true) {
            this.options.autohide = true;
        }
        if (this.options.headerless !== false && this.options.headerless !== true) {
            this.options.headerless = false;
        }
        if ((this.options.closeable !== false && this.options.closeable !== true) || (this.options.autohide === true)) {
            this.options.closeable = true;
        }

        this.init();
    }

    sanitize(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }

    ensureToastContainer() {
        if (!document.getElementById('avalynx-toast-container-' + this.options.position)) {
            var container = document.createElement('div');
            container.id = 'avalynx-toast-container-' + this.options.position;
            container.style.width = '100%';
            container.style.maxWidth = this.options.width;
            container.style.zIndex = '1000';
            container.classList.add('toast-container', 'p-3');

            container.style.position = 'fixed';
            switch (this.options.position) {
                case 'top-left':
                    container.style.top = '0px';
                    container.style.left = '0px';
                    break;
                case 'top-center':
                    container.style.top = '0px';
                    container.style.left = '50%';
                    container.style.transform = 'translateX(-50%)';
                    break;
                case 'top-right':
                    container.style.top = '0px';
                    container.style.right = '0px';
                    break;
                case 'bottom-left':
                    container.style.bottom = '0px';
                    container.style.left = '0px';
                    break;
                case 'bottom-center':
                    container.style.bottom = '0px';
                    container.style.left = '50%';
                    container.style.transform = 'translateX(-50%)';
                    break;
                default:
                    container.style.bottom = '0px';
                    container.style.right = '0px';
            }

            document.body.appendChild(container);
        }
    }

    init() {
        this.ensureToastContainer();

        var toast = document.createElement('div');
        toast.className = `toast avalynx-toast avalynx-toast-${this.type}`;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        toast.setAttribute('aria-atomic', 'true');

        if (this.options.headerless) {
            toast.classList.add('align-items-center');
            var flexContainer = document.createElement('div');
            flexContainer.className = 'd-flex';
            var body = document.createElement('div');
            body.className = 'toast-body avalynx-toast-body';
            body.innerHTML = this.message;
            flexContainer.appendChild(body);
            if (this.options.closeable) {
                var closeBtn = document.createElement('button');
                closeBtn.type = 'button';
                closeBtn.className = 'btn-close me-2 m-auto avalynx-toast-close';
                closeBtn.setAttribute('data-bs-dismiss', 'toast');
                closeBtn.setAttribute('aria-label', 'Close');
                flexContainer.appendChild(closeBtn);
            }
            toast.appendChild(flexContainer);
        } else {
            var header = document.createElement('div');
            header.className = 'toast-header';
            if (this.options.image) {
                var imageEl = document.createElement('img');
                imageEl.className = 'rounded me-2 avalynx-toast-image';
                imageEl.setAttribute('src', this.options.image);
                imageEl.setAttribute('alt', '');
                header.appendChild(imageEl);
            }
            var titleEl = document.createElement('strong');
            titleEl.className = 'me-auto avalynx-toast-title';
            if (this.options.title) {
                titleEl.textContent = this.options.title;
            }
            header.appendChild(titleEl);
            var subtitleEl = document.createElement('small');
            subtitleEl.className = 'text-muted avalynx-toast-subtitle';
            if (this.options.subtitle) {
                subtitleEl.textContent = this.options.subtitle;
            }
            header.appendChild(subtitleEl);
            if (this.options.closeable) {
                var closeBtn = document.createElement('button');
                closeBtn.type = 'button';
                closeBtn.className = 'btn-close';
                closeBtn.setAttribute('data-bs-dismiss', 'toast');
                closeBtn.setAttribute('aria-label', 'Close');
                header.appendChild(closeBtn);
            }
            toast.appendChild(header);

            var body = document.createElement('div');
            body.className = 'toast-body avalynx-toast-body';
            body.innerHTML = this.message;
            toast.appendChild(body);
        }

        if (this.options.autohide) {
            var timerBar = document.createElement('div');
            timerBar.className = 'toast-timer avalynx-toast-timer';
            timerBar.style.height = '5px';
            timerBar.style.width = '0';
            toast.appendChild(timerBar);
        }

        document.getElementById('avalynx-toast-container-' + this.options.position).appendChild(toast);

        var toastInstance = new bootstrap.Toast(toast, {
            animation: true,
            autohide: this.options.autohide,
            delay: this.options.duration
        });
        this.toastInstance = toastInstance;

        if (this.options.autohide) {
            var timerBar = toast.querySelector('.avalynx-toast-timer');
            timerBar.style.transition = `width ${this.options.duration}ms linear`;

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    timerBar.style.width = '100%';
                });
            });
        }

        toast.addEventListener('hidden.bs.toast', () => {
            toast.remove();
            if (typeof this.options.onClose === 'function') {
                this.options.onClose();
            }
        });

        toastInstance.show();
    }
}

/* istanbul ignore next */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AvalynxToast;
}