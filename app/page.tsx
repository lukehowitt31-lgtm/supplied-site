import { Container } from "@/components/ui/Container";

export default function Home() {
  return (
    <main className="min-h-screen py-20">
      <Container>
        <h1 className="text-4xl font-bold">Supplied</h1>
        <p className="mt-4 text-lg opacity-70">
          Structured properly. No WordPress chaos.
        </p>
      </Container>
    </main>
  );
}