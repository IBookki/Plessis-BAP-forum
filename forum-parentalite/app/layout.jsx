export const metadata = {
  title: 'Forum Parentalité',
  description: 'Forum pour les parents',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </head>
      <body>{children}</body>
    </html>
  )
}
