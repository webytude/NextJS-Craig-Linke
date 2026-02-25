export default async function SlugLayout({ children, params }) {
  
    const resolvedParams = await params;

  return (
    <div className={`page-${resolvedParams.slug}`}>
      {children}
    </div>
  );
}