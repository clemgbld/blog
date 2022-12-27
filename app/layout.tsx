import ReduxProvider from "./(components)/common/ReduxProvider/ReduxProvider";
import Header from "./(components)/common/Header/Header";

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
          <Header>{children}</Header>
        </ReduxProvider>
      </body>
    </html>
  );
}
