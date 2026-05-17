import "./globals.css";

export const metadata = {
  title: "Grand Ender | Perumahan Subsidi Modern di Cirebon",
  description:
    "Landing page Grand Ender dari Rizqoena Land. Informasi rumah subsidi modern minimalis di Desa Ender, Pangenan, Cirebon.",
  keywords: [
    "grand ender",
    "grand ender website",
    "perumahan grand ender",
    "rumah subsidi cirebon",
    "perumahan cirebon",
    "rizqoena land",
    "desa ender pangenan",
  ],
  authors: [{ name: "Rizqoena Land" }],
  openGraph: {
    title: "Grand Ender | Perumahan Subsidi Modern di Cirebon",
    description:
      "Landing page Grand Ender dari Rizqoena Land. Informasi rumah subsidi modern minimalis di Desa Ender, Pangenan, Cirebon.",
    url: "https://grandender.com",
    siteName: "Grand Ender",
    images: [
      {
        url: "/home1.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  icons: {
    icon: "/home1.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="h-full scroll-smooth" suppressHydrationWarning>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
