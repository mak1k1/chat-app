"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "./theme-provider";
import { QueryProvider } from './query-provider';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {

  return (
    <QueryProvider>
        <ClerkProvider>

      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        >
        {children}
      </ThemeProvider>
          </ClerkProvider>
    </QueryProvider>
  );
}
