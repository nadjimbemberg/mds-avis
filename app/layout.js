import "./globals.css";

export const metadata = {
  title: "MDS Avis",
  description: "Découvrez et partagez vos avis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="h-full bg-gray-900">
      <body className="h-full antialiased">{children}</body>
    </html>
  );
}
