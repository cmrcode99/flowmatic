// pages/sitemap.xml.js
const Sitemap = () => {
  // getServerSideProps handles sending the XML,
  // so this component does not render anything.
  return null;
};

export async function getServerSideProps({ res }) {
  const baseUrl = 'https://flowmatic-consulting.com';

  // List of static pages. Update this array with all your static routes.
  const staticPages = [
    '',
    'about',
    'services',
    'case-studies',
    'blog',
    'contact'
  ];

  // Create the XML sitemap string
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map((page) => {
      // Customize priority or lastmod as needed
      const url = page ? `${baseUrl}/${page}` : baseUrl;
      return `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`;
    })
    .join('')}
</urlset>`;

  // Set the response header to XML
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default Sitemap;
