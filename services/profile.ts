import { Profile, UpdateProfile } from "@/database.types";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { User } from "@supabase/supabase-js";

type GetProfileResponse = { profile: Profile | null; error?: string };
type UpdateProfileResponse = { profile: Profile | null; error?: string };

type CreateProfileResponse = {
  profile: Profile | null;
  error?: string;
};

export const ProfileService = {
  async ensureProfileForUser(
    user: User,
    username?: string,
  ): Promise<Profile | null> {
    const supabase = getSupabaseBrowserClient();
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    if (existingProfile) return existingProfile;
    const { profile } = await this.createProfile(user, username);
    return profile;
  },

  async getProfile(): Promise<GetProfileResponse> {
    const supabase = getSupabaseBrowserClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .single();

    if (error) return { profile: null, error: error.message };
    return { profile: data };
  },

  async updateProfile(updates: UpdateProfile): Promise<UpdateProfileResponse> {
    const supabase = getSupabaseBrowserClient();
    const userId = (await supabase.auth.getUser()).data.user?.id;

    if (!userId) return { profile: null, error: "Not authenticated" };

    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", userId)
      .select()
      .single();

    return error ? { profile: null, error: error.message } : { profile: data };
  },
  async createProfile(
    user: User,
    username?: string,
  ): Promise<CreateProfileResponse> {
    const supabase = getSupabaseBrowserClient();
    try {
      const { data, error } = await supabase
        .from("profiles")
        .upsert(
          {
            id: user.id,
            username:
              username ||
              user.user_metadata?.username ||
              user.email?.split("@")[0],
            avatar_url: user.user_metadata?.avatar_url || null,
            bio: user.user_metadata?.bio || null,
          },
          {
            onConflict: "id",
          },
        )
        .select()
        .single();
      if (error) return { profile: null, error: error.message };
      return { profile: data };
    } catch (err) {
      return {
        profile: null,
        error: err instanceof Error ? err.message : String(err),
      };
    }
  },
};
