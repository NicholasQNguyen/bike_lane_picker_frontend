import {createClient, SupabaseClient} from "@supabase/supabase-js";
import {Database} from "./database.types.ts";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_KEY;

let supabase: SupabaseClient<any, "public", any> | undefined = undefined;

if (supabaseUrl === undefined) {
  console.log("supabase url missing");
}
if (supabaseAnonKey === undefined) {
  console.log("supabase anon key missing");
}

if (supabaseUrl !== undefined && supabaseAnonKey !== undefined) {
  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
}

export default supabase;
