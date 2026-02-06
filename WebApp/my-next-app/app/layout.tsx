import "bootstrap/dist/css/bootstrap.min.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mon Projet Bootstrap",
  description: "Configuration Next.js avec Bootstrap",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        {/* 'children' contiendra automatiquement le contenu de ton fichier page.tsx */}
        {children}
      </body>
    </html>
  );
}
