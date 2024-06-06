import NavbarLandingPage from "../../../assets/ui/Navbar_Landing_Page";

function ReportKolaborator() {

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="w-full">
        <NavbarLandingPage />
      </nav>
      <main className="flex-grow flex items-center justify-center">
        <iframe 
          src="https://docs.google.com/forms/d/e/1FAIpQLSdzAuJXOE5wqdgaIem6l0LFQ5Ol1dpZmtSxBSXHmtDZfCYNWg/viewform?embedded=true" 
          width="640" 
          height="4466" 
          className="w-full max-w-4xl"
          title="Report Form"
        >
          Loading…
        </iframe>
      </main>
    </div>
  );
}

export default ReportKolaborator;
