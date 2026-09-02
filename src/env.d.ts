/// <reference types="astro/client" />

import type { Auth } from "./lib/auth";

declare namespace App {
  interface Locals {
    user: NonNullable<Awaited<ReturnType<Auth["api"]["getSession"]>>>["user"] | null;
    session: NonNullable<Awaited<ReturnType<Auth["api"]["getSession"]>>>["session"] | null;
  }
}
