import localFont from 'next/font/local'

export const akonyFont = localFont({
    src: [
        {
            path: '../public/akony.woff2',
        }
    ],
    variable: '--font-akony',
    display: 'swap'
})