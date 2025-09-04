# 🤖 AI Code Reviewer (GitHub Action)

Automatically review Pull Requests using OpenAI.
This action analyzes code diffs and adds comments directly to your PRs — like having a senior developer on your team.

## 🚀 Features

- Runs automatically on every PR
- Uses OpenAI to detect bugs, style issues, and improvements
- Posts inline comments directly in GitHub PRs
- Lightweight setup — no servers required

## ⚡ Quick Start

1. Add workflow file

Create `.github/workflows/ai-review.yml` in your repo and paste:

```yaml
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
```

2. 🔐 Add required secrets

   1. Go to GitHub → Settings → Secrets and variables → Actions

   2. Add the following secret(s):
      * OPENAI_API_KEY — your OpenAI API key (or API key for whichever provider you use)
      * BASE_URL — optional — set if you use an alternative endpoint (OpenRouter, NVIDIA, a proxy, etc.). If not set, the action uses https://api.openai.com/v1.

3. Open a Pull Request

   - Push a new branch and open a PR.

   - The action will run automatically.

   - AI review comments will appear inside your PR.

## ⚙️ Optional Configuration

You can create a `.aicodereview.json` file in the root of your repo to customize review rules.

```json
{
  "languages": {
    "js": { "styleGuide": "airbnb", "maxFunctionLength": 50 }
  },
  "security": {
    "bannedAPIs": ["eval", "exec"]
  }
}
```

## 🛠️ Development

To run locally:

```bash
npm install
node index.js

```

## 📌 Notes

- Requires Node.js 18+

- Uses OpenAI GPT models (default: gpt-4o-mini)

- GITHUB_TOKEN is automatically provided by GitHub Actions

## 📷 Example

Pull Request with AI comments:

```txt
🤖 AI Review: Consider handling null values in this function.

```

# 📄 License

MIT © Souvik Karmakar
