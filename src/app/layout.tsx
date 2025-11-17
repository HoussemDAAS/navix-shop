import type { Metadata } from "next";
import Script from "next/script";
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
      <head>
        {/* Meta Pixel Code */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1551243926011296');
fbq('track', 'PageView');`}
        </Script>
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              '<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1551243926011296&ev=PageView&noscript=1"/>',
          }}
        />
        {/* End Meta Pixel Code */}
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
