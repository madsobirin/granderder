export default function robots() {
  const baseUrl = "https://grandender.com"; // Ganti dengan domain website aslinya

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/dashboard/", "/login/"], // Kita memblokir halaman yang tidak perlu di-index oleh Google
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
