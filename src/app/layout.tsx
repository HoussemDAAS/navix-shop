import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Navix Shop - Carreau de Chaîne Magnétique",
  description: "Navix Shop - Carreau de chaîne magnétique rétractable haute qualité. Livraison partout en Tunisie.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
