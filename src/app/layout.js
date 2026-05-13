import "./globals.css";

export const metadata = {
  title: "Grand Ender | Perumahan Subsidi Modern di Cirebon",
  icons: {
    icon: "/home1.png",
  },
  description:
    "Landing page Grand Ender dari Rizqoena Land. Informasi rumah subsidi modern minimalis di Desa Ender, Pangenan, Cirebon.",
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
