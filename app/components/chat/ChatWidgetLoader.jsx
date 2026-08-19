'use client';

import dynamic from 'next/dynamic';

// The widget renders collapsed on first paint and pulls in framer-motion plus a
// react-icons pack, so it has no business blocking the initial bundle. Loading it
// client-side after hydration keeps it off the critical path on every page.
const ChatWidget = dynamic(() => import('./ChatWidget'), { ssr: false });

export default function ChatWidgetLoader() {
  return <ChatWidget />;
}
