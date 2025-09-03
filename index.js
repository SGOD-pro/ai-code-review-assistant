import { execSync } from "child_process";
import OpenAI from "openai";
import { Octokit } from "@octokit/rest";

// --- Setup clients ---
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.BASE_URL || "https://api.openai.com/v1",
});
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const [owner, repo] = process.env.GITHUB_REPO.split("/");
const prNumber = process.env.GITHUB_PR;

async function main() {
  console.log("🔍 Fetching git diff...");
  const base = process.env.GITHUB_BASE_SHA;
  const head = process.env.GITHUB_SHA;
  const diff = execSync(`git diff ${base} ${head} --unified=0`).toString();

  console.log("🤖 Sending to OpenAI...");
  const prompt = `
You are a senior code reviewer.
Review the following GitHub Pull Request diff.
Return a short JSON with at most ONE issue.

Example format:
{"file":"src/index.js","line":5,"message":"Consider handling null values."}

Diff:
${diff}
`;

  const resp = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  let review = {};
  try {
    review = JSON.parse(resp.choices[0].message.content || "{}");
  } catch (e) {
    console.error("⚠️ Failed to parse AI response:", resp.choices[0].message.content);
  }

  console.log("📋 AI Review:", review);

  if (!review.file || !review.message) {
    console.log("✅ No issues found by AI");
    return;
  }

  console.log("💬 Posting comment to PR...");
  await postComment(review);
}

async function postComment(review) {
  try {
    await octokit.pulls.createReviewComment({
      owner,
      repo,
      pull_number: prNumber,
      body: `🤖 AI Review: ${review.message}`,
      commit_id: process.env.GITHUB_SHA,
      path: review.file,
      line: review.line,
    });
    console.log("✅ Inline comment posted!");
  } catch (err) {
    console.warn("⚠️ Inline comment failed, falling back:", err.message);
    await octokit.issues.createComment({
      owner,
      repo,
      issue_number: prNumber,
      body: `🤖 AI Review: ${review.message}`,
    });
    console.log("✅ Regular PR comment posted!");
  }
}

main().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
