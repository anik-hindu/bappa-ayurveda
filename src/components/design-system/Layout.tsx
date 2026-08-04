function Layout() {
  return (
    <section className="space-y-8">
      <h2>Layout Widths</h2>

      <div className="space-y-6">
        <div>
          <p>Content Width</p>

          <div className="h-12 max-w-content rounded border bg-bg-surface" />
        </div>

        <div>
          <p>Article Width</p>

          <div className="h-12 max-w-article rounded border bg-bg-surface" />
        </div>

        <div>
          <p>Narrow Width</p>

          <div className="h-12 max-w-narrow rounded border bg-bg-surface" />
        </div>
      </div>
    </section>
  );
}

export default Layout;
