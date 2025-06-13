
export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-8 bg-card border-t border-border">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <p className="text-lg font-semibold text-primary font-headline mb-2">
          @iampowerbuilt
        </p>
        <p className="text-sm">
          &copy; {currentYear} @iampowerbuilt. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Empowering your fitness journey.
        </p>
      </div>
    </footer>
  );
}
