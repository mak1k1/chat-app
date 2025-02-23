"use client";

import { ThemeProvider } from "./theme-provider";
import { QueryProvider } from './query-provider';
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
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
          <Toaster />
        </ThemeProvider>
      </ClerkProvider>
    </QueryProvider>
  );
}
