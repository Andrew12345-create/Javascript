// --- Supabase Setup ---
const SUPABASE_URL = 'https://cgwhktwtgzjxbhvuzccs.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnd2hrdHd0Z3pqeGJodnV6Y2NzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzOTg0NDIsImV4cCI6MjA2NTk3NDQ0Mn0.72p0s_3h3e1cLIMmgugNxdiEjQFrt7c20a5QjXJqldo';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const leaderboardDiv = document.getElementById("leaderboard");

async function getLeaderboard() {
  const { data, error } = await client
    .from("quiz_scores")
    .select("name, score, time_taken")
    .order("score", { ascending: false })
    .order("time_taken", { ascending: true })
    .limit(10);

  if (error) {
    leaderboardDiv.innerHTML = "<p>Could not load leaderboard.</p>";
    console.error(error);
    return;
  }

  let html = '<h3>🏆 Fastest Leaderboard</h3><ol>';
  data.forEach((entry, idx) => {
    const medal = idx === 0 ? "🥇"
               : idx === 1 ? "🥈"
               : idx === 2 ? "🥉"
               : "";
    const rowClass = idx === 0 ? "top1"
                  : idx === 1 ? "top2"
                  : idx === 2 ? "top3"
                  : "";
    html += `
      <li class="${rowClass}">
         ${medal} <strong>#${idx + 1}</strong> ${entry.name}
         <span class="score">${entry.score} pts</span>
         <span style="margin-left:6px;">⏱️ ${entry.time_taken !== null && entry.time_taken !== undefined ? entry.time_taken : 0}s</span>
      </li>`;
  });
  html += "</ol>";
  leaderboardDiv.innerHTML = html;
}

getLeaderboard();