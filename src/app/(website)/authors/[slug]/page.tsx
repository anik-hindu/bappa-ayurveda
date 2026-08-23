type AuthorsDetailPageProps = {
  params: { slug: string };
};

async function AuthorsDetailPage({ params }: AuthorsDetailPageProps) {
  const { slug } = await params;

  return <div>Author Slug: {slug}</div>;
}

export default AuthorsDetailPage;
