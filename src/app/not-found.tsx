import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="bg-[var(--color-burgundy)] py-24 text-center text-[var(--color-blush)]">
      <Container className="max-w-2xl">
        <h1 className="font-[family-name:var(--font-display)] text-[length:var(--text-h2-size)] leading-none uppercase tracking-[var(--tracking-display)]">
          404
        </h1>
        <p className="mt-4 text-[length:var(--text-body-large-size)]">
          Page not found.
        </p>
        <p className="mt-2 text-base">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button
            href="/"
            className="bg-[var(--color-blush)] text-[var(--color-burgundy)]"
          >
            Back to Home
          </Button>
          <Button
            href="/contact"
            variant="secondary"
            className="border-[var(--color-blush)] text-[var(--color-blush)]"
          >
            Contact
          </Button>
        </div>
      </Container>
    </section>
  );
}

