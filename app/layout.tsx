import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Credit Card Fraud Detection | SVM Project",
  description: "ML Lab Project – Credit Card Fraud Detection using Support Vector Machine (SVM). B.Tech CSE AI&ML, 2026.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main style={{ paddingTop: "72px" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
