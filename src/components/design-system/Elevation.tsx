function Elevation() {
  return (
    <section id="elevation" className="space-y-8">
      <h2>Elevation</h2>

      <div className="flex flex-wrap gap-8">
        <div className="flex h-32 w-56 items-center justify-center rounded-lg bg-white shadow-card">
          <code>shadow-card</code>
        </div>

        <div className="flex h-32 w-56 items-center justify-center rounded-lg bg-white shadow-hover">
          <code>shadow-hover</code>
        </div>

        <div className="flex h-32 w-56 items-center justify-center rounded-lg bg-white shadow-focus">
          <code>shadow-focus</code>
        </div>
      </div>
    </section>
  );
}

export default Elevation;
