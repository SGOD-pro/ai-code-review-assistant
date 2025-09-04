# 🤖 AI Code Reviewer (GitHub Action)

Automatically review Pull Requests using OpenAI (or other LLM providers).  
This action analyzes code diffs and adds comments directly to your PRs — like having a senior developer on your team.

---

## 🚀 Features

* Runs automatically on every PR. `git push origin test`
* Uses OpenAI (or custom providers via `BASE_URL`) to detect bugs, style issues, and improvements
* Posts inline comments directly in GitHub PRs
* Lightweight setup — no servers required

---

## ⚡ Quick Start

### 1\. Add workflow file

Create `.github/workflows/ai-review.yml` in your repo and paste:
``` yaml
name: AI Code Review

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  ai-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: SGOD-pro/ai-code-review-assistant@v1
        with:
          openai_api_key: ${{ secrets.OPENAI_API_KEY }}
          # Optional: base_url for alternate providers (leave unset for OpenAI)
          base_url: ${{ secrets.BASE_URL }}

````

---

### 2\. 🔐 Add required secrets

Go to **GitHub → Settings → Secrets and variables → Actions** and add:

* `OPENAI_API_KEY` → your API key (OpenAI, OpenRouter, NVIDIA, etc.)
* `BASE_URL` _(optional)_ → custom endpoint (defaults to `https://api.openai.com/v1` if unset)

---

### 3\. Open a Pull Request

* Push a new branch and open a PR
* The action runs automatically
* AI review comments will appear **inside your PR (Conversation tab, inline with code)**

---
## 📌 When It Runs

* ✅ **On new PRs:** The AI reviewer checks your code changes when you open a Pull Request.
* ✅ **On PR updates:** If you push new commits to a branch with an open PR, the action runs again and re-reviews only the new changes.
* ✅ **On reopened PRs:** If you close and later reopen a PR, the action runs again.
* ❌ **Does NOT run** if you just push commits to a branch without opening a PR.
* ❌ **Does NOT run** if you commit directly to `main` or merge without a PR.

👉 In short: The AI reviewer only works with **Pull Requests**, because that’s where reviews and inline comments make sense.

## ⚙️ Optional Configuration

You can create a `.aicodereview.json` file in the root of your repo to customize rules:

`{
  "languages": {
    "js": { "styleGuide": "airbnb", "maxFunctionLength": 50 }
  },
  "security": {
    "bannedAPIs": ["eval", "exec"]
  }
}
`

---

## 🚀 How to Trigger AI Code Review

Once you’ve added the workflow and secrets:

### Case 1: Working on `main`

`git checkout -b feature-branch
git add .
git commit -m "my feature changes"
git push origin feature-branch
`

Then go to **GitHub → Pull requests → Compare & pull request**

* base = `main`
* compare = `feature-branch`

→ Open PR → Action runs → AI review comments appear in Conversation tab.

---

### Case 2: Already working on another branch (e.g. `dev`)

`git add .
git commit -m "my dev changes"
git push origin dev
`

Then open PR:

* base = `main`
* compare = `dev`

→ Action runs automatically.

---

### Case 3: Comparing two feature branches

You can also open PRs between non-main branches:

* base = `feature-a`
* compare = `feature-b`

→ Action runs → AI comments show in Conversation tab.

---

## 🛠️ Development

To run locally:

1. Clone this repo
2. Create a `.env` file:  
`OPENAI_API_KEY=sk-xxxxx  
BASE_URL=https://xxxx.com   # optional  
GITHUB_TOKEN=ghp_xxxxxxx  
GITHUB_REPO=SGOD-pro/ai-code-review-assistant  
GITHUB_PR=1  
GITHUB_SHA=HEAD  
GITHUB_BASE_SHA=main  
`
3. Run:  
`npm install  
node index.js  
`

---

## 📌 Notes

* Requires **Node.js 18+**
* Default model: **gpt-4o-mini**
* `GITHUB_TOKEN` is automatically provided by GitHub Actions

---

## 📷 Example

Pull Request with AI comments:

`@github-actions
🤖 AI Review: Remove console.log statement before production deployment.
`

---

# 📄 License

MIT © Souvik Karmakar