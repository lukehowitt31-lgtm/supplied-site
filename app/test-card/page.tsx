import { Container } from "@/components/ui/Container";
import { TeamCard } from "@/components/ui/TeamCard";
import { getTeamMembers } from "@/lib/content/team";

export default function TestCardPage() {
  const team = getTeamMembers();

  return (
    <div className="min-h-screen pt-32 pb-20" style={{ background: "#111" }}>
      <Container className="text-center">
        <p className="text-sm text-supplied-ink-40 mb-2 uppercase tracking-widest font-semibold">
          Component Preview
        </p>
        <h1 className="text-3xl font-extrabold text-white mb-12">
          Team Member Cards
        </h1>

        <div className="grid grid-cols-4 gap-6 justify-items-center">
          {team.map((member) => (
            <TeamCard key={member.slug} {...member} />
          ))}
        </div>
      </Container>
    </div>
  );
}
