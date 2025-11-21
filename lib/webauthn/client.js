"use client";

export async function registerPasskey() {
  const res = await fetch("/api/auth/register-passkey");
  const options = await res.json();

  const credential = await navigator.credentials.create({
    publicKey: options,
  });

  const verify = await fetch("/api/auth/register-passkey", {
    method: "POST",
    body: JSON.stringify(credential),
  });

  return verify.json();
}
