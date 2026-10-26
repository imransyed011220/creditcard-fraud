"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/",          label: "Home"      },
  { href: "/dataset",   label: "Dataset"   },
  { href: "/algorithm", label: "Algorithm" },
  { href: "/results",   label: "Results"   },
  { href: "/code",      label: "Code"      },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(10,14,26,0.85)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(99,102,241,0.2)",
      height: "72px",
      display: "flex", alignItems: "center",
      padding: "0 32px",
      justifyContent: "space-between",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: 36, height: 36, borderRadius: "10px",
          background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 800, fontSize: 16,
        }}>🛡️</div>
        <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: "-0.3px" }}>
          Fraud<span style={{ color: "#6366f1" }}>Detect</span>
        </span>
        <span style={{
          marginLeft: 8, fontSize: 11, color: "#64748b",
          background: "rgba(99,102,241,0.1)", padding: "2px 8px",
          borderRadius: 20, border: "1px solid rgba(99,102,241,0.2)",
        }}>SVM · 2026</span>
      </div>

      <div style={{ display: "flex", gap: "4px" }}>
        {links.map(({ href, label }) => (
          <Link key={href} href={href} style={{
            padding: "8px 16px", borderRadius: "10px",
            fontSize: 14, fontWeight: 500, textDecoration: "none",
            transition: "all 0.2s",
            background: pathname === href ? "rgba(99,102,241,0.2)" : "transparent",
            color: pathname === href ? "#a78bfa" : "#94a3b8",
            border: pathname === href ? "1px solid rgba(99,102,241,0.3)" : "1px solid transparent",
          }}>{label}</Link>
        ))}
      </div>
    </nav>
  );
}
