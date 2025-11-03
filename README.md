# CI/CD GitHub Actions Demo

![Build Status](https://github.com/akashsinhamahapatra78-cmd/cicd-github-actions-demo/workflows/CI%2FCD%20Pipeline/badge.svg?branch=main)

A comprehensive CI/CD pipeline demonstration using **GitHub Actions**. This project showcases how to automate testing, building, and deployment using modern DevOps practices.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Workflow Details](#workflow-details)
- [Local Testing](#local-testing)
- [Deployment Options](#deployment-options)
- [GitHub Pages Deployment](#github-pages-deployment)
- [Netlify Deployment](#netlify-deployment)
- [S3 Deployment](#s3-deployment)
- [Monitoring & Troubleshooting](#monitoring--troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

This repository demonstrates a complete CI/CD pipeline using **GitHub Actions** that automatically:

1. **Triggers** on every push to the `main` branch
2. **Sets up** Node.js environment (multi-version testing)
3. **Installs** project dependencies
4. **Runs** automated tests using Jest
5. **Builds** the project
6. **Stores** build artifacts
7. **Deploys** to GitHub Pages (optional)

## ✨ Features

✅ **Automated Testing** - Jest test suite runs on every push  
✅ **Multi-Version Testing** - Tests run on Node.js 18.x and 20.x  
✅ **Build Automation** - Automatic project build on code changes  
✅ **Artifact Storage** - Build outputs are saved for 30 days  
✅ **GitHub Pages Deployment** - Automatic deployment to GitHub Pages  
✅ **Comprehensive Logging** - Detailed workflow logs for debugging  
✅ **Quick Feedback** - Get results within minutes of pushing code  

## 📁 Project Structure

```
cicd-github-actions-demo/
├── .github/
│   └── workflows/
│       └── main.yml              # CI/CD Pipeline Configuration
├── app.test.js                   # Jest Test Suite
├── index.js                      # Demo Application
├── package.json                  # Project Configuration & Dependencies
├── .gitignore                    # Git Ignore Rules
├── README.md                     # Documentation (this file)
└── dist/                         # Build Output Directory (generated)
```

## 📦 Prerequisites

- A GitHub account with a repository
- Node.js 18.x or higher (for local development)
- npm or yarn package manager
- Git installed on your machine

## 🚀 Getting Started

### Local Setup

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/cicd-github-actions-demo.git
cd cicd-github-actions-demo
```

2. **Install dependencies:**

```bash
npm install
```

3. **Run tests locally:**

```bash
npm test
```

4. **Build the project:**

```bash
npm run build
```

5. **Start the application:**

```bash
npm start
```

## 🔧 Workflow Details

### Main Workflow File: `.github/workflows/main.yml`

The GitHub Actions workflow is configured with the following jobs:

#### **Job 1: build-and-test**

Runs on: `ubuntu-latest`

Matrix Testing: Tests on Node.js 18.x and 20.x

Steps:
1. **Checkout code** - Uses `actions/checkout@v4`
2. **Set up Node.js** - Uses `actions/setup-node@v4`
3. **Install dependencies** - `npm install` with caching
4. **Run tests** - `npm test` (Jest)
5. **Build project** - `npm run build`
6. **Upload artifacts** - Stores build outputs for 30 days

#### **Job 2: deploy-to-github-pages** (Optional)

Runs on: `ubuntu-latest`  
Dependency: Requires `build-and-test` to pass  
Trigger: Only on successful push to main branch

Steps:
1. **Checkout code**
2. **Set up Node.js**
3. **Install & build**
4. **Deploy to GitHub Pages** - Uses `peaceiris/actions-gh-pages@v3`

### Workflow Triggers

The workflow is triggered on:
- **Push** events to `main` branch
- **Pull Request** events to `main` branch

## 🧪 Local Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Building Locally

```bash
# Create a production build
npm run build

# Start the server
npm start
```

## 🌐 Deployment Options

### GitHub Pages Deployment

GitHub Pages is already configured in the workflow!

**Steps to enable:**

1. Go to repository **Settings** → **Pages**
2. Select `Deploy from a branch`
3. Choose branch: `gh-pages`
4. Choose folder: `/ (root)`
5. Click **Save**

Your site will be published at: `https://yourusername.github.io/cicd-github-actions-demo`

**To customize the domain:**
- Edit `.github/workflows/main.yml`
- Uncomment and update the `cname` field in the deploy step
- Replace `example.com` with your custom domain

### Netlify Deployment

**Steps:**

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Connect your repository:
```bash
netlify init
```

3. Configure `netlify.toml` in project root:
```toml
[build]
  command = "npm run build"
  publish = "dist"
```

4. Add to `.github/workflows/main.yml`:
```yaml
- name: Deploy to Netlify
  uses: nwtgck/actions-netlify@v2.0
  with:
    publish-dir: './dist'
    production-branch: main
    github-token: ${{ secrets.GITHUB_TOKEN }}
    deploy-message: "Deploy from GitHub Actions"
  env:
    NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
    NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### S3 Deployment

**Steps:**

1. Add AWS credentials as secrets to your repository:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`

2. Add S3 deployment step to workflow:
```yaml
- name: Deploy to S3
  uses: jakejarvis/s3-sync-action@master
  with:
    args: --acl public-read --follow-symlinks --delete
  env:
    AWS_S3_BUCKET: ${{ secrets.AWS_S3_BUCKET }}
    AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
    AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    AWS_REGION: 'us-east-1'
    SOURCE_DIR: './dist'
```

## 📊 Monitoring & Troubleshooting

### View Workflow Status

1. Go to your repository
2. Click on **Actions** tab
3. Select the workflow run to view details

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Tests fail in workflow | Check `.github/workflows/main.yml` syntax |
| Dependencies not installing | Ensure `package.json` is valid |
| Build fails | Review npm scripts in `package.json` |
| Deployment fails | Verify GitHub Pages settings |
| Artifacts not uploading | Check artifact path in workflow |

### Debug Mode

Enable debug logging in GitHub Actions:
1. Go to repository Settings
2. Secrets and variables → Actions
3. Add secret: `ACTIONS_STEP_DEBUG` = `true`

## 📝 Workflow YAML Reference

### Key Actions Used

- **actions/checkout@v4** - Check out repository code
- **actions/setup-node@v4** - Set up Node.js environment
- **actions/upload-artifact@v3** - Store build outputs
- **peaceiris/actions-gh-pages@v3** - Deploy to GitHub Pages

### Environment Variables

- `GITHUB_TOKEN` - Automatically available in workflow
- `GITHUB_REF` - Current branch reference
- `GITHUB_EVENT_NAME` - Type of event triggering the workflow

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Actions Best Practices](https://docs.github.com/en/actions/guides)
- [Node.js GitHub Actions](https://github.com/actions/setup-node)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Netlify GitHub Integration](https://docs.netlify.com/git/overview/)

## ❓ FAQ

**Q: How often does the workflow run?**  
A: Every time you push to the main branch or create a pull request.

**Q: How can I see workflow logs?**  
A: Go to Actions tab → Select a workflow run → View the detailed logs.

**Q: Can I disable the deployment step?**  
A: Yes, remove or comment out the `deploy-to-github-pages` job in `.github/workflows/main.yml`.

**Q: How do I add more test files?**  
A: Create files ending in `.test.js` and Jest will automatically detect them.

---

**Made with ❤️ for GitHub Actions automation**
