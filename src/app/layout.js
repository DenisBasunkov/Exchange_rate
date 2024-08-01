import { Inter } from "next/font/google";
import "./global.scss";
import TheHeader from "@/components/Header"
import 'rsuite/dist/rsuite-no-reset.min.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Курсы валют",
  icons: {
    icon: "/App.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TheHeader />
        <>
          {children}
        </>
      </body>
    </html>
  );
}
