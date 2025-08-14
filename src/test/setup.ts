import '@testing-library/jest-dom';


class RO {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
}
(globalThis as any).ResizeObserver = RO;
