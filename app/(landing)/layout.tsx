import { Footer } from "./components/footer";
import { Navbar } from "./components/nav";

const LandingPageLayout = ( {
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="h-full bg-slate-100">
        <Navbar />
        <main>
            {children}
        </main>
        <Footer />
    </div>
  );
}

export default LandingPageLayout;