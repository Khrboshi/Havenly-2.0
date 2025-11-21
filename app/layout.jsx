import "./styles.css"; // Correct path

export const metadata = {
  title: "Havenly",
  description: "Mindful journaling & emotional wellness",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
