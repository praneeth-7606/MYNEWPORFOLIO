"use client";

// Lightweight lazy toast facade. react-toastify (~20 kB + styles) is only pulled
// into the bundle the first time a toast is actually triggered, and the
// ToastContainer is mounted on demand. This keeps the lib off the critical
// rendering path on every page.

let api = null;
let promise = null;

const containerProps = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: "dark",
};

async function loadToast() {
  if (api) return api;
  if (!promise) {
    promise = (async () => {
      const React = await import("react");
      const { createRoot } = await import("react-dom/client");
      const { ToastContainer, toast } = await import("react-toastify");
      await import("react-toastify/dist/ReactToastify.css");

      // Mount the container outside the React tree; render() purges nothing here
      // since this root is ours alone.
      const host = document.createElement("div");
      host.setAttribute("aria-live", "polite");
      Object.assign(host.style, { position: "fixed", inset: "0 auto auto 0", width: 0, height: 0, overflow: "hidden" });
      document.body.appendChild(host);
      createRoot(host).render(React.createElement(ToastContainer, containerProps));

      api = toast;
      return api;
    })().catch((error) => {
      promise = null;
      throw error;
    });
  }
  return promise;
}

// Warm the async chunk on the first user interaction so a later toast call has
// no visible latency.
if (typeof window !== "undefined") {
  const warm = () => {
    loadToast().catch(() => {});
    window.removeEventListener("pointerdown", warm);
  };
  window.addEventListener("pointerdown", warm, { passive: true, once: true });
}

export const toast = {
  success: (message, options) => loadToast().then((t) => t.success(message, options)),
  error: (message, options) => loadToast().then((t) => t.error(message, options)),
  info: (message, options) => loadToast().then((t) => t.info(message, options)),
  warn: (message, options) => loadToast().then((t) => t.warn(message, options)),
};