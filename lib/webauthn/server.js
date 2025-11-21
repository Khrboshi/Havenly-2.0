import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
} from "@simplewebauthn/server";
import { cookies } from "next/headers";

export async function generatePasskeyRegistration() {
  const opts = generateRegistrationOptions({
    rpName: "Havenly",
    userID: "user-id",
    userName: "user@example.com",
  });

  cookies().set("passkey-challenge", opts.challenge);
  return opts;
}

export async function verifyPasskeyRegistration(response) {
  const expectedChallenge = cookies().get("passkey-challenge")?.value;

  return verifyRegistrationResponse({
    response,
    expectedChallenge,
    expectedRPID: process.env.NEXT_PUBLIC_DOMAIN,
    expectedOrigin: process.env.NEXT_PUBLIC_ORIGIN,
  });
}
