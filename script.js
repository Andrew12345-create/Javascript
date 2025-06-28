// /*************************************************
//  * Supabase project credentials
//  *************************************************/

// const supabaseUrl = 'https://cgwhktwtgzjxbhvuzccs.supabase.co'
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnd2hrdHd0Z3pqeGJodnV6Y2NzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzOTg0NDIsImV4cCI6MjA2NTk3NDQ0Mn0.72p0s_3h3e1cLIMmgugNxdiEjQFrt7c20a5QjXJqldo'
// const supabase = createClient(supabaseUrl, supabaseKey)


// /* --------- DOM References --------- */
// const form      = document.getElementById("feedbackForm");
// const statusDiv = document.getElementById("status");
// const showBtn   = document.getElementById("showBtn");
// const listEl    = document.getElementById("feedbackList");

// /* =========== Helper =========== */
// function setStatus(msg, color){
//   statusDiv.textContent = msg;
//   statusDiv.style.color = color;
// }

// /* ===============================
//  * 1.  SUBMIT  (POST) FEEDBACK
//  * ============================= */
// form.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const name    = document.getElementById("name").value.trim();
//   const message = document.getElementById("message").value.trim();

//   if (!name || !message){
//     setStatus("Please fill in all fields.", "red");
//     return;
//   }

//   try {
//     const { error } = await supabase
//       .from('feedback')
//       .insert([{ name, message }]);

//     if (error) throw error;

//     const ts = new Date().toLocaleString();
//     setStatus(`✅ Thank you, ${name}! Submitted at ${ts}`, "green");
//     form.reset();
//     await loadFeedback();
//   } catch (err) {
//     console.error(err);
//     setStatus("❌ Error submitting feedback.", "red");
//   }
// });

// /* ===============================
//  * 2.  SHOW FEEDBACK  (GET)
//  * ============================= */
// showBtn.addEventListener("click", loadFeedback);

// async function loadFeedback(){
//   listEl.innerHTML = "<li>Loading…</li>";

//   try {
//     const { data, error } = await supabase
//       .from('feedback')
//       .select('name, message, created_at')
//       .order('created_at', { ascending: false })
//       .limit(20);

//     listEl.innerHTML = "";

//     if (error) throw error;

//     if (!data || data.length === 0){
//       listEl.innerHTML = "<li>No feedback yet.</li>";
//       return;
//     }

//     data.forEach(row => {
//       const li = document.createElement("li");
//       const time = new Date(row.created_at).toLocaleString();
//       li.innerHTML = `
//         <strong>${row.name}</strong> <em>(${time})</em><br>
//         ${row.message}
//       `;
//       listEl.appendChild(li);
//     });

//   } catch (err) {
//     console.error(err);
//     listEl.innerHTML = "<li style='color:red'>Error loading feedback.</li>";
//   }
// }

// // Optionally, load feedback on page load
// // loadFeedback();


/* ---  Import supabase-js directly from a CDN  --- */
import { createClient } from
  "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

/*************************************************
 *  Supabase credentials  (anon key is safe in browser)
 *************************************************/
const supabaseUrl = "https://cgwhktwtgzjxbhvuzccs.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnd2hrdHd0Z3pqeGJodnV6Y2NzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzOTg0NDIsImV4cCI6MjA2NTk3NDQ0Mn0.72p0s_3h3e1cLIMmgugNxdiEjQFrt7c20a5QjXJqldo";   // ← your anon key
const supabase    = createClient(supabaseUrl, supabaseKey);

/* DOM refs */
const form   = document.getElementById("feedbackForm");
const status = document.getElementById("status");
const showBtn = document.getElementById("showBtn");
const list   = document.getElementById("feedbackList");

/* helper */
const setStatus = (msg, color) => {
  status.textContent = msg;
  status.style.color = color;
};

/* ---------- POST feedback ---------- */
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name    = document.getElementById("name").value.trim();
  const message = document.getElementById("message").value.trim();
  if (!name || !message) return setStatus("Fill in all fields", "red");

  const { error } = await supabase.from("feedback").insert({ name, message });
  if (error) {
    console.error(error);
    return setStatus("❌ insert failed", "red");
  }

  setStatus(`✅ Thank you, ${name}! (${new Date().toLocaleString()})`, "green");
  form.reset();
  loadFeedback();                      // auto-refresh list
});

/* ---------- GET feedback list ---------- */
showBtn.addEventListener("click", loadFeedback);

async function loadFeedback() {
  list.innerHTML = "<li>Loading…</li>";

  const { data, error } = await supabase
    .from("feedback")
    .select("name, message, created_at")
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    console.error(error);
    list.innerHTML = "<li style='color:red'>load failed</li>";
    return;
  }

  list.innerHTML = data.length
    ? ""
    : "<li>No feedback yet</li>";

  data.forEach(({ name, message, created_at }) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${name}</strong> 
                    <em>(${new Date(created_at).toLocaleString()})</em><br>
                    ${message}`;
    list.appendChild(li);
  });
}

/* optional: auto-list on load */
// loadFeedback();
