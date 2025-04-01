"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "./supabase";

export type UserRole = "shooter" | "range_owner";

interface AuthContextType {
  user: User | null;
  userRole: UserRole | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    role: UserRole,
  ) => Promise<User | null>;
  signIn: (email: string, password: string) => Promise<User | null>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error.message);
        setUser(null);
        setUserRole(null);
      } else if (data?.user) {
        setUser(data.user);
        const role = (data.user.user_metadata?.role as UserRole) || "shooter";
        setUserRole(role);

        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("userRole", role);
      }
      setLoading(false);
    };

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser(session.user);
          const role =
            (session.user.user_metadata?.role as UserRole) || "shooter";
          setUserRole(role);

          localStorage.setItem("user", JSON.stringify(session.user));
          localStorage.setItem("userRole", role);
        } else {
          setUser(null);
          setUserRole(null);
          localStorage.removeItem("user");
          localStorage.removeItem("userRole");
        }
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    role: UserRole,
  ): Promise<User | null> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { fullName, role } },
      });

      if (error) throw error;

      const user = data.user;
      if (!user) throw new Error("Sign-up failed: No user returned");

      setUser(user);
      setUserRole(role);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userRole", role);

      return user;
    } catch (error) {
      console.error("Sign-up error:", error);
      throw error;
    }
  };

  const signIn = async (
    email: string,
    password: string,
  ): Promise<User | null> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      const user = data.user;
      if (!user) throw new Error("Authentication failed: No user found");

      setUser(user);
      const role = (user.user_metadata?.role as UserRole) || "shooter";
      setUserRole(role);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userRole", role);

      return user;
    } catch (error) {
      console.error("Sign-in error:", error);
      throw error;
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setUserRole(null);
      localStorage.removeItem("user");
      localStorage.removeItem("userRole");
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, userRole, loading, signUp, signIn, signOut }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
