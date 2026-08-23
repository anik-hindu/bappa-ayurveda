import AuthorHero from "@/components/authors/AuthorHero";

async function AuthorsDetailPage({}) {
  const author = {
    name: "Anik Saha",
    role: "Ayurvedic Practitioner",
    shortBio:
      "Anik is a passionate Ayurvedic practitioner with over 10 years of experience in the field.",
    expertise: ["Digestive Health", "Stress Management", "Sleep Quality"],
    linkedIn: "https://www.linkedin.com/in/anik-saha-dev",
    image: {
      asset: {},
      alt: "Anik Saha",
      hotspot: {
        x: 0.5,
        y: 0.35,
      },
    },
  };
  return (
    <main>
      <AuthorHero author={author} />
    </main>
  );
}

export default AuthorsDetailPage;
