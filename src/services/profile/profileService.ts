import { getSupabaseClient } from "../../lib/supabase/client";
import type { ProfileUpdateInput } from "../../types/profile";

export async function updateUserProfile(
  userId: string,
  data: ProfileUpdateInput
): Promise<{ error: string | null }> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { error: "Supabase não configurado." };
  }

  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      full_name: data.fullName,
      phone: data.phone,
      email: data.email,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);

  if (profileError) {
    return { error: profileError.message };
  }

  const { error: authError } = await supabase.auth.updateUser({
    email: data.email,
    data: {
      full_name: data.fullName,
      phone: data.phone,
    },
  });

  if (authError) {
    return { error: authError.message };
  }

  return { error: null };
}
