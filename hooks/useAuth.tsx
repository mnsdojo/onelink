"use client";

import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { User, SupabaseClient } from "@supabase/supabase-js";
import { useCallback, useEffect, useRef, useState } from "react";

export function useAuth(initialUser: User | null = null) {
  const supabaseRef = useRef<SupabaseClient | null>(null);
  const [user, setUser] = useState<User | null>(initialUser);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (supabaseRef.current == null) {
      supabaseRef.current = getSupabaseBrowserClient();
    }
  }, []);

  useEffect(() => {
    const supabase = supabaseRef.current;
    if (!supabase) return;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = useCallback(
    async (args: { email: string; password: string; username?: string }) => {
      const supabase = supabaseRef.current;
      if (!supabase) throw new Error("Supabase not initialized");

      setError(null);

      const { data, error } = await supabase.auth.signUp({
        email: args.email,
        password: args.password,
        options: {
          emailRedirectTo: `${window.location.origin}/welcome`,
          data: {
            username: args.username,
          },
        },
      });

      if (error) {
        setError(error.message);
        throw error;
      }

      return data;
    },
    [],
  );

  const signIn = useCallback(
    async (args: { email: string; password: string }) => {
      const supabase = supabaseRef.current;
      if (!supabase) throw new Error("Supabase not initialized");

      setError(null);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: args.email,
        password: args.password,
      });

      if (error) {
        setError(error.message);
        throw error;
      }

      return data;
    },
    [],
  );

  const signOut = useCallback(async () => {
    const supabase = supabaseRef.current;
    if (!supabase) return;

    setError(null);

    const { error } = await supabase.auth.signOut();

    if (error) {
      setError(error.message);
      throw error;
    }

    setUser(null);
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const supabase = supabaseRef.current;
    if (!supabase) throw new Error("Supabase not initialized");

    setError(null);

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/`,
        // Google automatically provides avatar_url in raw_user_meta_data
      },
    });

    if (error) {
      setError(error.message);
      throw error;
    }

    return data;
  }, []);

  return {
    user,
    signInWithGoogle,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    isAuthenticated: !!user,
  };
}
