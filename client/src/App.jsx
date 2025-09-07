import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// --- Replace with your Supabase project credentials ---
const supabase = createClient(
  "https://YOUR_PROJECT_ID.supabase.co",
  "YOUR_ANON_PUBLIC_KEY"
);

export default function App() {
  const [session, setSession] = useState(null);
  const [savedLooks, setSavedLooks] = useState([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    supabase.auth.onAuthStateChange((_event, session) => setSession(session));
  }, []);

  async function signIn() {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  async function saveLook() {
    const look = { top: "Relaxed Cotton Tee", bottom: "Baggy Denim", shoes: "White Sneakers" };
    await supabase.from("looks").insert([{ user_id: session.user.id, look }]);
    fetchLooks();
  }

  async function fetchLooks() {
    const { data } = await supabase.from("looks").select("*").eq("user_id", session.user.id);
    setSavedLooks(data || []);
  }

  useEffect(() => {
    if (session) fetchLooks();
  }, [session]);

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>Pinterest → Outfit Recommender</h1>
      {!session ? (
        <button onClick={signIn}>Login with Google</button>
      ) : (
        <>
          <p>Logged in as {session.user.email}</p>
          <button onClick={signOut}>Logout</button>

          <h2>Recommended Look</h2>
          <button onClick={saveLook}>Save Example Look</button>

          <h2>Saved Looks</h2>
          <ul>
            {savedLooks.map((l) => (
              <li key={l.id}>{JSON.stringify(l.look)}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
