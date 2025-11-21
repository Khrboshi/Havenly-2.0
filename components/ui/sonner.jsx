"use client";

import { Toaster } from "sonner";

export function SonnerToaster() {
  return (
    <Toaster
      richColors
      closeButton
      position="bottom-center"
      expand={false}
    />
  );
}
