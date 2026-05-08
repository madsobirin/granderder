import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Grand Ender | Perumahan Subsidi Modern di Cirebon",
  description:
    "Landing page Grand Ender dari Rizqoena Land. Informasi rumah subsidi modern minimalis di Desa Ender, Pangenan, Cirebon.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${poppins.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
