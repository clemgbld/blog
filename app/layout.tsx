import ReduxProvider from "./components/ReduxProvider/ReduxProvider";
import Header from "./components/Header/Header";

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
