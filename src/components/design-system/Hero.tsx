function Hero() {
  return (
    <section id="overview" className="space-y-4">
      <span className="text-label tracking-[0.2em] text-text-accent uppercase">
        Living Documentation
      </span>

      <h1>Bappa Ayurveda Design System</h1>

      <p className="max-w-180 text-body-lg">
        This page documents every design token used throughout the project.
        Components should consume semantic tokens rather than hard-coded values.
      </p>
    </section>
  );
}

export default Hero;
