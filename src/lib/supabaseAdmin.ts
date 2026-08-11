import "server-only";
import { createClient } from "@supabase/supabase-js";

// service_role bypasses RLS — server-only, used from Server Actions that are
// already gated behind our own admin session check. Never import this from
// a client component.
export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const GALLERY_BUCKET = "gallery-photos";
