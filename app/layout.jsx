// /app/layout.jsx
import "./globals.css";

export const metadata = {
  title: "Havenly",
  description: "A warm space for guided emotional wellbeing.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-orange-50 to-rose-50 min-h-screen">
        <div className="max-w-md mx-auto bg-white shadow-xl min-h-screen relative overflow-hidden">
          {children}

          {/* Bottom Navigation */}
          <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md">
            <div className="nav-container">
              <a href="/dashboard" className="nav-item">
                <span className="material-symbols-rounded">home</span>
              </a>
              <a href="/journal" className="nav-item">
                <span className="material-symbols-rounded">edit</span>
              </a>

              {/* Floating action button */}
              <a href="/mood" className="fab">
                <span className="material-symbols-rounded text-white text-3xl">
                  add
                </span>
              </a>

              <a href="/insights" className="nav-item">
                <span className="material-symbols-rounded">insights</span>
              </a>
              <a href="/profile" className="nav-item">
                <span className="material-symbols-rounded">person</span>
              </a>
            </div>
          </nav>
        </div>
      </body>
    </html>
  );
}
