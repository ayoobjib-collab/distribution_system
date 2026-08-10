import { createInertiaApp } from '@inertiajs/react'
import createServer from '@inertiajs/react/server'
import ReactDOMServer from 'react-dom/server'

createServer(page =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        resolve: name => {
            const pages = import.meta.glob(
                [
                    './Pages/**/*.jsx',
                    './Admin/**/*.jsx'
                ],
                { eager: true }
            )
            return pages[`./Pages/${name}.jsx`]
        },
        setup: ({ App, props }) => <App {...props} />,
    }),
)

// resolve: (name) => resolvePageComponent(
//     `./${name}.jsx`,
//     import.meta.glob(
//         [
//             './Pages/**/*.jsx',
//             './Admin/**/*.jsx'
//         ]
//     )
// ),
// setup({ el, App, props }) {
//     createRoot(el).render(<App {...props} />);
// },
// progress: {
//     delay: 250,
//     color: '#29d',
//     includeCSS: true,
//     showSpinner: true,
// },