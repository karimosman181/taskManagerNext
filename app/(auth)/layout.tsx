
const AuthPageLayout = ( {
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="h-full">
        <main>
            <div className="w-full h-full flex flex-wrap content-center min-h-screen justify-center">
              {children}
            </div>
        </main>
    </div>
  );
}

export default AuthPageLayout;