import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// uniform wrapper for better DX + safety
export async function sb(table) {
  return {
    select: (columns = "*") => supabase.from(table).select(columns),
    insert: (values) => supabase.from(table).insert(values),
    update: (values) => supabase.from(table).update(values),
    delete: () => supabase.from(table).delete(),
  };
}
