import "./globals.scss";

import Header from "../components/common/Header/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head></head>
      <body>
        <Header>{children}</Header>
      </body>
    </html>
  );
}
