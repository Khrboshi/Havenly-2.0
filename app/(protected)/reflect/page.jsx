const sendReflection = async () => {
  if (!text.trim()) return;

  setLoading(true);

  const session = await supabase.auth.getSession();
  const user = session.data.session?.user;

  if (!user) {
    window.location.href = "/auth/login";
    return;
  }

  const res = await fetch("/api/insights", {
    method: "POST",
    body: JSON.stringify({
      text,
      user_id: user.id,
    }),
  });

  const data = await res.json();
  setResponse(data.summary || "Something went wrong.");
  setLoading(false);
};
