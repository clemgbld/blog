import "./globals.scss";
import ReduxProvider from "./(components)/common/ReduxProvider/ReduxProvider";
import Header from "./(components)/common/Header/Header";
import ThemeWrapper from "./(components)/common/ThemeWrapper/ThemeWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head></head>
      <body>
        <ReduxProvider>
          <ThemeWrapper>
            <Header>{children}</Header>
          </ThemeWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
