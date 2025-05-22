import './globals.css';  // ← This tells Next.js to load it site-wide

// Root layout for all pages (wraps pages with consistent HTML structure and styles) (not sure if we'll keep this yet)

export const metadata = {
  title: 'ThymeCrate',
  description: 'Shop fresh, shop local.',
  icons: {
    icon: '/images/transparentcrate-cropped.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
