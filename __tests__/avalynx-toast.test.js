/**
 * AvalynxToast Jest Tests
 * Comprehensive test suite for all important functionality
 */

// Mock bootstrap Toast
global.bootstrap = {
    Toast: jest.fn().mockImplementation(function(element, options) {
        this.element = element;
        this.options = options;
        this._isShown = false;
        this.show = jest.fn(() => { this._isShown = true; });
        this.hide = jest.fn(() => { this._isShown = false; });
        return this;
    })
};

const AvalynxToast = require('../src/js/avalynx-toast.js');

describe('AvalynxToast', () => {
    let consoleErrorSpy;

    beforeEach(() => {
        // Clear document body
        document.body.innerHTML = '';

        // Mock console.error
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        // Clear all timers
        jest.clearAllTimers();

        // Reset bootstrap mock
        global.bootstrap.Toast.mockClear();
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
        jest.clearAllMocks();

        // Clean up any toast containers
        const containers = document.querySelectorAll('[id^="avalynx-toast-container-"]');
        containers.forEach(container => container.remove());
    });

    describe('Constructor', () => {
        test('should initialize with valid message, type, and default options', () => {
            const toast = new AvalynxToast('Test message', 'success');
            expect(toast.message).toBe('Test message');
            expect(toast.type).toBe('success');
            expect(toast.options.title).toBe('');
            expect(toast.options.subtitle).toBe('');
            expect(toast.options.image).toBe('');
            expect(toast.options.headerless).toBe(false);
            expect(toast.options.duration).toBe(5000);
            expect(toast.options.position).toBe('top-right');
            expect(toast.options.closeable).toBe(true);
            expect(toast.options.autohide).toBe(true);
            expect(toast.options.width).toBe('350px');
            expect(toast.options.onClose).toBeNull();
        });

        test('should merge custom options with defaults', () => {
            const onClose = jest.fn();
            const toast = new AvalynxToast('Test', 'info', {
                title: 'Hello',
                subtitle: '4 mins ago',
                image: 'avatar.png',
                headerless: true,
                duration: 3000,
                position: 'bottom-left',
                closeable: false,
                autohide: false,
                width: '500px',
                onClose
            });
            expect(toast.options.title).toBe('Hello');
            expect(toast.options.subtitle).toBe('4 mins ago');
            expect(toast.options.image).toBe('avatar.png');
            expect(toast.options.headerless).toBe(true);
            expect(toast.options.duration).toBe(3000);
            expect(toast.options.position).toBe('bottom-left');
            expect(toast.options.closeable).toBe(false);
            expect(toast.options.autohide).toBe(false);
            expect(toast.options.width).toBe('500px');
            expect(toast.options.onClose).toBe(onClose);
        });

        test('should default to "info" type for invalid type', () => {
            const toast = new AvalynxToast('Test', 'invalid-type');
            expect(toast.type).toBe('info');
        });

        test('should accept all valid toast types', () => {
            const validTypes = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];
            validTypes.forEach(type => {
                document.body.innerHTML = '';
                const toast = new AvalynxToast('Test', type);
                expect(toast.type).toBe(type);
            });
        });

        test('should default to "top-right" position for invalid position', () => {
            const toast = new AvalynxToast('Test', 'info', { position: 'invalid-position' });
            expect(toast.options.position).toBe('top-right');
        });

        test('should accept all valid positions', () => {
            const validPositions = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'];
            validPositions.forEach(position => {
                document.body.innerHTML = '';
                const toast = new AvalynxToast('Test', 'info', { position });
                expect(toast.options.position).toBe(position);
            });
        });

        test('should force closeable to true when autohide is true', () => {
            const toast = new AvalynxToast('Test', 'info', {
                closeable: false,
                autohide: true
            });
            expect(toast.options.closeable).toBe(true);
        });

        test('should allow closeable to be false when autohide is false', () => {
            const toast = new AvalynxToast('Test', 'info', {
                closeable: false,
                autohide: false
            });
            expect(toast.options.closeable).toBe(false);
        });

        test('should default autohide to true for non-boolean values', () => {
            const toast = new AvalynxToast('Test', 'info', { autohide: 'yes' });
            expect(toast.options.autohide).toBe(true);
        });

        test('should default headerless to false for non-boolean values', () => {
            const toast = new AvalynxToast('Test', 'info', { headerless: 'yes' });
            expect(toast.options.headerless).toBe(false);
        });
    });

    describe('Container Creation', () => {
        test('should create toast container if it does not exist', () => {
            new AvalynxToast('Test', 'info', { position: 'top-right' });
            const container = document.getElementById('avalynx-toast-container-top-right');
            expect(container).not.toBeNull();
            expect(container.classList.contains('toast-container')).toBe(true);
            expect(container.classList.contains('p-3')).toBe(true);
        });

        test('should reuse existing container if it already exists', () => {
            new AvalynxToast('Test 1', 'info', { position: 'top-right' });
            new AvalynxToast('Test 2', 'success', { position: 'top-right' });
            const containers = document.querySelectorAll('#avalynx-toast-container-top-right');
            expect(containers.length).toBe(1);
        });

        test('should apply correct styles for top-left position', () => {
            new AvalynxToast('Test', 'info', { position: 'top-left' });
            const container = document.getElementById('avalynx-toast-container-top-left');
            expect(container.style.position).toBe('fixed');
            expect(container.style.top).toBe('0px');
            expect(container.style.left).toBe('0px');
            expect(container.style.right).toBe('');
        });

        test('should apply correct styles for top-center position', () => {
            new AvalynxToast('Test', 'info', { position: 'top-center' });
            const container = document.getElementById('avalynx-toast-container-top-center');
            expect(container.style.position).toBe('fixed');
            expect(container.style.top).toBe('0px');
            expect(container.style.left).toBe('50%');
            expect(container.style.transform).toBe('translateX(-50%)');
        });

        test('should apply correct styles for top-right position', () => {
            new AvalynxToast('Test', 'info', { position: 'top-right' });
            const container = document.getElementById('avalynx-toast-container-top-right');
            expect(container.style.position).toBe('fixed');
            expect(container.style.top).toBe('0px');
            expect(container.style.right).toBe('0px');
            expect(container.style.left).toBe('');
        });

        test('should apply correct styles for bottom-left position', () => {
            new AvalynxToast('Test', 'info', { position: 'bottom-left' });
            const container = document.getElementById('avalynx-toast-container-bottom-left');
            expect(container.style.position).toBe('fixed');
            expect(container.style.bottom).toBe('0px');
            expect(container.style.left).toBe('0px');
            expect(container.style.top).toBe('');
        });

        test('should apply correct styles for bottom-center position', () => {
            new AvalynxToast('Test', 'info', { position: 'bottom-center' });
            const container = document.getElementById('avalynx-toast-container-bottom-center');
            expect(container.style.position).toBe('fixed');
            expect(container.style.bottom).toBe('0px');
            expect(container.style.left).toBe('50%');
            expect(container.style.transform).toBe('translateX(-50%)');
        });

        test('should apply correct styles for bottom-right position', () => {
            new AvalynxToast('Test', 'info', { position: 'bottom-right' });
            const container = document.getElementById('avalynx-toast-container-bottom-right');
            expect(container.style.position).toBe('fixed');
            expect(container.style.bottom).toBe('0px');
            expect(container.style.right).toBe('0px');
            expect(container.style.left).toBe('');
            expect(container.style.top).toBe('');
        });

        test('should not have top or bottom set for left/right positions', () => {
            new AvalynxToast('Test', 'info', { position: 'top-left' });
            const containerTopLeft = document.getElementById('avalynx-toast-container-top-left');
            expect(containerTopLeft.style.bottom).toBe('');

            document.body.innerHTML = '';
            new AvalynxToast('Test', 'info', { position: 'top-right' });
            const containerTopRight = document.getElementById('avalynx-toast-container-top-right');
            expect(containerTopRight.style.bottom).toBe('');
            expect(containerTopRight.style.left).toBe('');

            document.body.innerHTML = '';
            new AvalynxToast('Test', 'info', { position: 'bottom-left' });
            const containerBottomLeft = document.getElementById('avalynx-toast-container-bottom-left');
            expect(containerBottomLeft.style.top).toBe('');
            expect(containerBottomLeft.style.right).toBe('');
        });

        test('should set container width and z-index', () => {
            new AvalynxToast('Test', 'info', { width: '600px' });
            const container = document.getElementById('avalynx-toast-container-top-right');
            expect(container.style.width).toBe('100%');
            expect(container.style.maxWidth).toBe('600px');
            expect(container.style.zIndex).toBe('1000');
        });
    });

    describe('Toast Element Creation', () => {
        test('should create toast element with correct message', () => {
            new AvalynxToast('Hello World', 'info');
            const toast = document.querySelector('.avalynx-toast');
            expect(toast.innerHTML).toContain('Hello World');
        });

        test('should create toast with correct type class', () => {
            new AvalynxToast('Test', 'danger');
            const toast = document.querySelector('.avalynx-toast');
            expect(toast.classList.contains('avalynx-toast-danger')).toBe(true);
            expect(toast.classList.contains('toast')).toBe(true);
        });

        test('should add role, aria-live and aria-atomic attributes', () => {
            new AvalynxToast('Test', 'info');
            const toast = document.querySelector('.avalynx-toast');
            expect(toast.getAttribute('role')).toBe('alert');
            expect(toast.getAttribute('aria-live')).toBe('assertive');
            expect(toast.getAttribute('aria-atomic')).toBe('true');
        });

        test('should add close button when closeable is true', () => {
            new AvalynxToast('Test', 'info', { closeable: true });
            const closeButton = document.querySelector('.avalynx-toast .btn-close');
            expect(closeButton).not.toBeNull();
            expect(closeButton.getAttribute('data-bs-dismiss')).toBe('toast');
            expect(closeButton.getAttribute('aria-label')).toBe('Close');
        });

        test('should not include close button when closeable is false', () => {
            new AvalynxToast('Test', 'info', { closeable: false, autohide: false });
            const closeButton = document.querySelector('.avalynx-toast .btn-close');
            expect(closeButton).toBeNull();
        });

        test('should set toast header title when title option is provided', () => {
            new AvalynxToast('Test body', 'info', { title: 'My Title' });
            const titleEl = document.querySelector('.avalynx-toast-title');
            expect(titleEl).not.toBeNull();
            expect(titleEl.textContent).toBe('My Title');
            expect(titleEl.classList.contains('me-auto')).toBe(true);
        });

        test('should not set title when title option is empty', () => {
            new AvalynxToast('Test body', 'info');
            const titleEl = document.querySelector('.avalynx-toast-title');
            expect(titleEl).not.toBeNull();
            expect(titleEl.textContent).toBe('');
        });

        test('should set toast header subtitle when subtitle option is provided', () => {
            new AvalynxToast('Test body', 'info', { subtitle: '4 mins ago' });
            const subtitleEl = document.querySelector('.avalynx-toast-subtitle');
            expect(subtitleEl).not.toBeNull();
            expect(subtitleEl.tagName).toBe('SMALL');
            expect(subtitleEl.classList.contains('text-muted')).toBe(true);
            expect(subtitleEl.textContent).toBe('4 mins ago');
        });

        test('should render empty subtitle element when subtitle option is empty', () => {
            new AvalynxToast('Test body', 'info');
            const subtitleEl = document.querySelector('.avalynx-toast-subtitle');
            expect(subtitleEl).not.toBeNull();
            expect(subtitleEl.tagName).toBe('SMALL');
            expect(subtitleEl.classList.contains('text-muted')).toBe(true);
            expect(subtitleEl.textContent).toBe('');
        });

        test('should render subtitle between title and close button in header', () => {
            new AvalynxToast('Test body', 'info', { title: 'Hello', subtitle: 'now', closeable: true });
            const header = document.querySelector('.avalynx-toast .toast-header');
            expect(header.children.length).toBe(3);
            expect(header.children[0].classList.contains('avalynx-toast-title')).toBe(true);
            expect(header.children[1].classList.contains('avalynx-toast-subtitle')).toBe(true);
            expect(header.children[2].classList.contains('btn-close')).toBe(true);
        });

        test('should render image in header when image option is provided', () => {
            new AvalynxToast('Test body', 'info', { image: 'avatar.png' });
            const img = document.querySelector('.avalynx-toast-image');
            expect(img).not.toBeNull();
            expect(img.tagName).toBe('IMG');
            expect(img.classList.contains('rounded')).toBe(true);
            expect(img.getAttribute('src')).toBe('avatar.png');
        });

        test('should not render image when image option is empty', () => {
            new AvalynxToast('Test body', 'info');
            const img = document.querySelector('.avalynx-toast-image');
            expect(img).toBeNull();
        });

        test('should render image before title in header', () => {
            new AvalynxToast('Test body', 'info', { image: 'avatar.png', title: 'Hello', closeable: true });
            const header = document.querySelector('.avalynx-toast .toast-header');
            expect(header.children[0].classList.contains('avalynx-toast-image')).toBe(true);
            expect(header.children[1].classList.contains('avalynx-toast-title')).toBe(true);
        });

        test('should render headerless toast without toast-header', () => {
            new AvalynxToast('Just a body', 'info', { headerless: true });
            const toast = document.querySelector('.avalynx-toast');
            expect(toast.classList.contains('align-items-center')).toBe(true);
            expect(toast.querySelector('.toast-header')).toBeNull();
            const body = toast.querySelector('.toast-body');
            expect(body).not.toBeNull();
            expect(body.innerHTML).toContain('Just a body');
        });

        test('should render close button inside d-flex wrapper when headerless', () => {
            new AvalynxToast('Body only', 'info', { headerless: true, closeable: true });
            const wrapper = document.querySelector('.avalynx-toast .d-flex');
            expect(wrapper).not.toBeNull();
            const closeBtn = wrapper.querySelector('.btn-close');
            expect(closeBtn).not.toBeNull();
            expect(closeBtn.classList.contains('me-2')).toBe(true);
            expect(closeBtn.classList.contains('m-auto')).toBe(true);
            expect(closeBtn.classList.contains('avalynx-toast-close')).toBe(true);
        });

        test('should not include close button when headerless and not closeable', () => {
            new AvalynxToast('Body only', 'info', { headerless: true, closeable: false, autohide: false });
            const wrapper = document.querySelector('.avalynx-toast .d-flex');
            expect(wrapper.querySelector('.btn-close')).toBeNull();
        });

        test('should still render timer bar when headerless and autohide is true', () => {
            new AvalynxToast('Body only', 'info', { headerless: true });
            const timerBar = document.querySelector('.avalynx-toast-timer');
            expect(timerBar).not.toBeNull();
        });

        test('should create toast body with message content', () => {
            new AvalynxToast('Body content', 'info');
            const body = document.querySelector('.avalynx-toast-body');
            expect(body).not.toBeNull();
            expect(body.classList.contains('toast-body')).toBe(true);
            expect(body.innerHTML).toContain('Body content');
        });

        test('should create timer bar when autohide is true', () => {
            new AvalynxToast('Test', 'info', { autohide: true });
            const timerBar = document.querySelector('.avalynx-toast-timer');
            expect(timerBar).not.toBeNull();
            expect(timerBar.classList.contains('toast-timer')).toBe(true);
            expect(timerBar.style.height).toBe('5px');
            expect(timerBar.style.width).toBe('0px');
        });

        test('should not create timer bar when autohide is false', () => {
            new AvalynxToast('Test', 'info', { autohide: false });
            const timerBar = document.querySelector('.avalynx-toast-timer');
            expect(timerBar).toBeNull();
        });

        test('should append toast to correct container', () => {
            new AvalynxToast('Test', 'info', { position: 'bottom-left' });
            const container = document.getElementById('avalynx-toast-container-bottom-left');
            const toast = container.querySelector('.avalynx-toast');
            expect(toast).not.toBeNull();
        });

        test('should support multiple toasts in same container', () => {
            new AvalynxToast('First', 'info', { position: 'top-right' });
            new AvalynxToast('Second', 'success', { position: 'top-right' });
            const container = document.getElementById('avalynx-toast-container-top-right');
            const toasts = container.querySelectorAll('.avalynx-toast');
            expect(toasts.length).toBe(2);
        });
    });

    describe('Bootstrap Toast integration', () => {
        test('should create a new bootstrap.Toast instance', () => {
            new AvalynxToast('Test', 'info');
            expect(global.bootstrap.Toast).toHaveBeenCalledTimes(1);
        });

        test('should pass toast element and options to bootstrap.Toast', () => {
            const toast = new AvalynxToast('Test', 'info', { duration: 3000 });
            const toastEl = document.querySelector('.avalynx-toast');
            expect(global.bootstrap.Toast).toHaveBeenCalledWith(toastEl, {
                animation: true,
                autohide: true,
                delay: 3000
            });
        });

        test('should pass autohide false to bootstrap.Toast when autohide is false', () => {
            new AvalynxToast('Test', 'info', { autohide: false });
            expect(global.bootstrap.Toast).toHaveBeenCalledWith(
                expect.anything(),
                expect.objectContaining({ autohide: false })
            );
        });

        test('should call toast.show() to display the toast', () => {
            const toast = new AvalynxToast('Test', 'info');
            expect(toast.toastInstance._isShown).toBe(true);
        });

        test('should remove toast and call onClose when hidden.bs.toast event fires', () => {
            const onClose = jest.fn();
            new AvalynxToast('Test', 'info', { onClose });

            const toastEl = document.querySelector('.avalynx-toast');
            expect(toastEl).not.toBeNull();

            toastEl.dispatchEvent(new Event('hidden.bs.toast'));

            expect(onClose).toHaveBeenCalledTimes(1);
            expect(document.querySelector('.avalynx-toast')).toBeNull();
        });

        test('should not throw error if onClose is not a function', () => {
            expect(() => {
                new AvalynxToast('Test', 'info', { onClose: null });
                const toastEl = document.querySelector('.avalynx-toast');
                toastEl.dispatchEvent(new Event('hidden.bs.toast'));
            }).not.toThrow();
        });

        test('should not throw error if onClose is not a function (non-null)', () => {
            expect(() => {
                new AvalynxToast('Test', 'info', { onClose: 'not-a-function' });
                const toastEl = document.querySelector('.avalynx-toast');
                toastEl.dispatchEvent(new Event('hidden.bs.toast'));
            }).not.toThrow();
        });
    });

    describe('Timer Bar', () => {
        test('should set transition on timer bar', () => {
            new AvalynxToast('Test', 'info', { duration: 5000, autohide: true });
            const timerBar = document.querySelector('.avalynx-toast-timer');
            expect(timerBar.style.transition).toContain('5000ms');
        });

        test('should set transition with custom duration', () => {
            new AvalynxToast('Test', 'info', { duration: 1234, autohide: true });
            const timerBar = document.querySelector('.avalynx-toast-timer');
            expect(timerBar.style.transition).toContain('1234ms');
        });

        describe('with fake timers', () => {
            beforeEach(() => {
                jest.useFakeTimers();
            });

            afterEach(() => {
                jest.useRealTimers();
            });

            test('should animate timer bar to 100% width after requestAnimationFrame', () => {
                new AvalynxToast('Test', 'info', { duration: 5000, autohide: true });
                jest.advanceTimersByTime(50);
                const timerBar = document.querySelector('.avalynx-toast-timer');
                expect(timerBar.style.width).toBe('100%');
            });
        });
    });

    describe('Edge Cases', () => {
        test('should handle empty message', () => {
            expect(() => {
                new AvalynxToast('', 'info');
            }).not.toThrow();
            const toast = document.querySelector('.avalynx-toast');
            expect(toast).not.toBeNull();
        });

        test('should handle undefined message', () => {
            expect(() => {
                new AvalynxToast(undefined, 'info');
            }).not.toThrow();
        });

        test('should handle null message', () => {
            expect(() => {
                new AvalynxToast(null, 'info');
            }).not.toThrow();
        });

        test('should handle HTML content in message', () => {
            new AvalynxToast('<strong>Bold</strong> text', 'info');
            const toast = document.querySelector('.avalynx-toast');
            expect(toast.innerHTML).toContain('<strong>Bold</strong>');
        });

        test('should handle very long messages', () => {
            const longMessage = 'A'.repeat(1000);
            expect(() => {
                new AvalynxToast(longMessage, 'info');
            }).not.toThrow();
        });

        test('should handle very large duration', () => {
            expect(() => {
                new AvalynxToast('Test', 'info', { duration: 999999 });
            }).not.toThrow();
        });

        test('should handle options with extra properties', () => {
            expect(() => {
                new AvalynxToast('Test', 'info', {
                    duration: 3000,
                    extraProp: 'should be ignored',
                    anotherExtra: 123
                });
            }).not.toThrow();
        });

        test('should handle missing type parameter', () => {
            const toast = new AvalynxToast('Test', undefined);
            expect(toast.type).toBe('info');
        });

        test('should handle missing options parameter', () => {
            expect(() => {
                new AvalynxToast('Test', 'info');
            }).not.toThrow();
        });

        test('should handle null options parameter', () => {
            expect(() => {
                new AvalynxToast('Test', 'info', null);
            }).not.toThrow();
        });

        test('should handle array as options parameter', () => {
            expect(() => {
                new AvalynxToast('Test', 'info', ['invalid', 'options']);
            }).not.toThrow();
        });

        test('should handle number as options parameter', () => {
            expect(() => {
                new AvalynxToast('Test', 'info', 12345);
            }).not.toThrow();
        });

        test('should handle string as options parameter', () => {
            expect(() => {
                new AvalynxToast('Test', 'info', 'invalid options');
            }).not.toThrow();
        });

        test('should handle false as options parameter', () => {
            expect(() => {
                new AvalynxToast('Test', 'info', false);
            }).not.toThrow();
        });
    });

    describe('Integration Tests', () => {
        test('should create multiple toasts with different types', () => {
            new AvalynxToast('Success', 'success');
            new AvalynxToast('Error', 'danger');
            new AvalynxToast('Warning', 'warning');

            const toasts = document.querySelectorAll('.avalynx-toast');
            expect(toasts.length).toBe(3);
        });

        test('should create toasts in different positions simultaneously', () => {
            new AvalynxToast('Top', 'info', { position: 'top-right' });
            new AvalynxToast('Bottom', 'success', { position: 'bottom-center' });

            const topContainer = document.getElementById('avalynx-toast-container-top-right');
            const bottomContainer = document.getElementById('avalynx-toast-container-bottom-center');

            expect(topContainer.querySelectorAll('.avalynx-toast').length).toBe(1);
            expect(bottomContainer.querySelectorAll('.avalynx-toast').length).toBe(1);
        });

        test('should handle rapid successive toast creation', () => {
            for (let i = 0; i < 10; i++) {
                new AvalynxToast(`Toast ${i}`, 'info');
            }

            const toasts = document.querySelectorAll('.avalynx-toast');
            expect(toasts.length).toBe(10);
        });

        test('should execute multiple onClose callbacks in correct order', () => {
            const calls = [];
            const onClose1 = jest.fn(() => calls.push(1));
            const onClose2 = jest.fn(() => calls.push(2));

            new AvalynxToast('First', 'info', { onClose: onClose1 });
            new AvalynxToast('Second', 'info', { onClose: onClose2 });

            const toasts = document.querySelectorAll('.avalynx-toast');
            toasts[0].dispatchEvent(new Event('hidden.bs.toast'));
            expect(calls).toEqual([1]);

            toasts[1].dispatchEvent(new Event('hidden.bs.toast'));
            expect(calls).toEqual([1, 2]);
        });
    });

    describe('Module Export', () => {
        test('should export AvalynxToast as module.exports', () => {
            expect(AvalynxToast).toBeDefined();
            expect(typeof AvalynxToast).toBe('function');
        });

        test('should be instantiable as a class', () => {
            const toast = new AvalynxToast('Test', 'info');
            expect(toast).toBeInstanceOf(AvalynxToast);
        });
    });
});