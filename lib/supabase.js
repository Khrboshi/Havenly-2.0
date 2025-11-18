import { createClient } from "@supabase/supabase-js";
import { logError } from "./errors";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function sb(table) {
  return {
    select: async (columns = "*") => {
      try {
        return await supabase.from(table).select(columns);
      } catch (e) {
        logError(`Supabase SELECT ${table}`, e);
        return { data: null, error: e };
      }
    },
    insert: async (values) => {
      try {
        return await supabase.from(table).insert(values);
      } catch (e) {
        logError(`Supabase INSERT ${table}`, e);
        return { error: e };
      }
    },
    update: async (values) => {
      try {
        return await supabase.from(table).update(values);
      } catch (e) {
        logError(`Supabase UPDATE ${table}`, e);
        return { error: e };
      }
    },
    delete: async () => {
      try {
        return await supabase.from(table).delete();
      } catch (e) {
        logError(`Supabase DELETE ${table}`, e);
        return { error: e };
      }
    },
  };
}
