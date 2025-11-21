"use client";

export async function registerPasskey(email) {
  const res = await fetch("/api/auth/webauthn/register", {
    method: "POST",
    body: JSON.stringify({ email }),
  });

  const options = await res.json();

  const credential = await navigator.credentials.create({
    publicKey: options,
  });

  const verify = await fetch("/api/auth/webauthn/register/verify", {
    method: "POST",
    body: JSON.stringify(credential),
  });

  return await verify.json();
}

export async function loginWithPasskey(email) {
  const res = await fetch("/api/auth/webauthn/login", {
    method: "POST",
    body: JSON.stringify({ email }),
  });

  const options = await res.json();

  const assertion = await navigator.credentials.get({
    publicKey: options,
  });

  const verify = await fetch("/api/auth/webauthn/login/verify", {
    method: "POST",
    body: JSON.stringify(assertion),
  });

  return await verify.json();
}
