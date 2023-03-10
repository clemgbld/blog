import "./globals.scss";

import Header from "../components/common/Header/Header";
import Footer from "../components/common/Footer/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Footer>
          <Header>{children}</Header>
        </Footer>
      </body>
    </html>
  );
}
