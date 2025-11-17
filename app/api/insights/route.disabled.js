const sendReflection = async () => {
  if (!text.trim()) return;

  setLoading(true);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    window.location.href = "/auth/login";
    return;
  }

  try {
    const res = await fetch("/api/insights", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }), // DO NOT SEND user_id
    });

    if (!res.ok) throw new Error("API error");

    const data = await res.json();
    setResponse(data.summary || "Something went wrong.");
  } catch (err) {
    console.error(err);
    setResponse("Something went wrong.");
  }

  setLoading(false);
};
