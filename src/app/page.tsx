import Image from "next/image";
import logo from "../../public/images/logo.jpeg";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="space-y-4 text-center">
        <Image
          src={logo}
          alt="brand logo of Bappa Ayurveda"
          className="max-w-75 object-cover mix-blend-multiply"
        />
        <h1 className="text-5xl font-bold">Bappa Ayurveda</h1>
        <p className="text-lg text-text/70">Foundation Sprint — In Progress</p>
        <div className="mx-auto h-px w-16 bg-accent" />
      </div>
    </main>
  );
}
