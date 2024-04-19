export default function RegistrationLayout({
  children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
  return (
    <section>
      {children}
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav>
                navigation
      </nav>
    </section>
  );
}