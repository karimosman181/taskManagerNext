
const LandingPageLayout = ( {
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="h-full bg-slate-100">
        <main>
            {children}
        </main>
    </div>
  );
}

export default LandingPageLayout;