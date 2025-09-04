## 🔄 Updating Your Action in the Future

Right now you published v1.

If you improve your code later (say add better prompts, support summaries, etc.), you have two options:

1. Update v1 in place
     * Just push commits to main
     * Run:
     ```bash
     git tag -d v1
     git push origin :refs/tags/v1   # delete old tag remotely
     git tag v1
     git push origin v1
     ```

     * Now, anyone using @v1 automatically gets the new behavior.

2. Publish a new version tag

     * Example:
     ``` bash
     git tag v2
     git push origin v2
     ```

     * Then people can choose SGOD-pro/ai-code-review-assistant@v2.

     * Best if you want to give users stability and choice.

### 👉 Common convention:

* v1, v2 … are stable.

* main or @dev can be your latest experimental version.