import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import '../css/app.css';

import '@/vanilla/ripple.js';

import { StrictMode } from 'react';

createInertiaApp({
    resolve: (name) => resolvePageComponent(
        `./Pages/${name}.jsx`,
        import.meta.glob(
            [
                './Pages/**/*.jsx'
            ]
        )
    ),
    setup({ el, App, props }) {
        createRoot(el).render(<StrictMode><App {...props} /></StrictMode>);
    },
    progress: {
        delay: 250,
        color: '#29d',
        includeCSS: true,
        showSpinner: true,
    },
});