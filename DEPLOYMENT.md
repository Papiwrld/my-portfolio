# 🚀 Deployment Guide

This guide explains how to deploy your portfolio to various hosting platforms.

## 📋 Table of Contents

- [GitHub Pages](#github-pages-recommended)
- [Netlify](#netlify)
- [Vercel](#vercel)
- [Custom Domain](#custom-domain-setup)
- [Pre-Deployment Checklist](#pre-deployment-checklist)

---

## 🌐 GitHub Pages (Recommended)

GitHub Pages is free and perfect for static portfolios.

### Step 1: Create Repository

1. **Go to GitHub** and create a new repository
2. **Name it:** `your-username.github.io`
   - Example: `papiwrld.github.io`
3. **Make it public**
4. **Don't initialize** with README (you already have one)

### Step 2: Push Your Code

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Portfolio v1.0.0"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/your-username.github.io.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**

### Step 4: Wait for Deployment

- Deployment takes 1-5 minutes
- Your site will be live at: `https://your-username.github.io`

### GitHub Pages Configuration

Create `.github/workflows/pages.yml` for advanced deployment:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

---

## 🎨 Netlify

Netlify offers continuous deployment and more features.

### Method 1: Drag and Drop

1. Go to [Netlify](https://www.netlify.com)
2. Sign up/Login
3. Drag your project folder to the deployment area
4. Site is live instantly!

### Method 2: Git Integration

1. **Connect GitHub**
   - Click "New site from Git"
   - Choose GitHub
   - Select your repository

2. **Configure Build Settings**
   ```
   Build command: (leave empty)
   Publish directory: /
   ```

3. **Deploy**
   - Click "Deploy site"
   - Automatic deployments on every push!

### Netlify Configuration

Create `netlify.toml` in your root directory:

```toml
[build]
  publish = "."
  
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "no-referrer-when-downgrade"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/Images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

## ⚡ Vercel

Vercel offers fast deployments with automatic HTTPS.

### Deployment Steps

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Production Deploy**
   ```bash
   vercel --prod
   ```

### Vercel Configuration

Create `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "headers": [
    {
      "source": "/sw.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

### Git Integration

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import from GitHub
4. Select your repository
5. Click "Deploy"

---

## 🌍 Custom Domain Setup

### For GitHub Pages

1. **Buy a domain** (Namecheap, GoDaddy, etc.)

2. **Add CNAME file** to your repository:
   ```
   yourdomain.com
   ```

3. **Configure DNS** at your domain registrar:
   ```
   Type: A
   Host: @
   Value: 185.199.108.153
   
   Type: A
   Host: @
   Value: 185.199.109.153
   
   Type: A
   Host: @
   Value: 185.199.110.153
   
   Type: A
   Host: @
   Value: 185.199.111.153
   
   Type: CNAME
   Host: www
   Value: your-username.github.io
   ```

4. **Enable HTTPS** in GitHub Settings → Pages

### For Netlify/Vercel

1. Go to site settings
2. Click "Add custom domain"
3. Follow the DNS configuration instructions
4. HTTPS is automatic!

---

## ✅ Pre-Deployment Checklist

### Content Updates

- [ ] Update `yourdomain.com` to actual domain in:
  - `robots.txt`
  - `sitemap.xml`
  - `index.html` (structured data)
  - `manifest.json` (if needed)

### SEO Optimization

- [ ] Verify all meta tags are correct
- [ ] Test Open Graph with [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Test Twitter Cards with [Card Validator](https://cards-dev.twitter.com/validator)
- [ ] Submit sitemap to [Google Search Console](https://search.google.com/search-console)
- [ ] Submit site to [Bing Webmaster Tools](https://www.bing.com/webmasters)

### Performance Testing

- [ ] Run [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] Test with [GTmetrix](https://gtmetrix.com/)
- [ ] Check mobile-friendliness: [Google Mobile Test](https://search.google.com/test/mobile-friendly)
- [ ] Validate HTML: [W3C Validator](https://validator.w3.org/)
- [ ] Validate CSS: [CSS Validator](https://jigsaw.w3.org/css-validator/)

### Browser Testing

- [ ] Chrome (Desktop & Mobile)
- [ ] Firefox (Desktop & Mobile)
- [ ] Safari (Desktop & iOS)
- [ ] Edge
- [ ] Different screen sizes (320px to 1920px+)

### Functionality Testing

- [ ] All navigation links work
- [ ] Theme toggle works and persists
- [ ] Contact form validation works
- [ ] Portfolio filtering works
- [ ] Project modals open/close correctly
- [ ] Social media links open correctly
- [ ] Service worker installs correctly
- [ ] PWA can be installed
- [ ] Images load correctly
- [ ] Animations work smoothly
- [ ] Back-to-top button works

### Accessibility Testing

- [ ] Keyboard navigation works
- [ ] Screen reader compatibility (NVDA/JAWS)
- [ ] Color contrast meets WCAG AA standards
- [ ] All images have alt text
- [ ] Form labels are properly associated

### Security

- [ ] HTTPS is enabled
- [ ] No sensitive data in code
- [ ] Content Security Policy configured (if needed)
- [ ] Security headers configured

---

## 📊 Post-Deployment

### Analytics Setup

**Google Analytics:**
```html
<!-- Add to <head> in index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

**Google Search Console:**
1. Add and verify your site
2. Submit sitemap: `https://yourdomain.com/sitemap.xml`
3. Monitor indexing and performance

### Monitoring

- Check Google Analytics for traffic
- Monitor Search Console for SEO health
- Use Uptime Robot for availability monitoring
- Check Lighthouse scores regularly

---

## 🔄 Updating Your Site

### For GitHub Pages

```bash
# Make changes to your files
git add .
git commit -m "Update: description of changes"
git push origin main

# GitHub automatically deploys changes
```

### For Netlify/Vercel

- Changes auto-deploy on `git push`
- View deployment logs in dashboard
- Rollback if needed

---

## 🐛 Troubleshooting

### GitHub Pages Issues

**Site not loading:**
- Check repository name is correct
- Verify Pages is enabled in settings
- Wait 5-10 minutes for propagation

**404 errors:**
- Ensure `index.html` is in root
- Check file name capitalization
- Clear browser cache

### Service Worker Issues

**Not updating:**
```javascript
// Force update in sw.js
const CACHE_NAME = 'eugene-portfolio-v1.0.1'; // Increment version
```

**Clear cache:**
- Chrome: Dev Tools → Application → Clear Storage
- Firefox: Dev Tools → Storage → Clear All

### Performance Issues

**Slow loading:**
- Optimize images (compress with TinyPNG)
- Enable CDN (Cloudflare)
- Check server response times

---

## 📞 Support

Need help with deployment?

- **Email:** kwesieugene77@gmail.com
- **GitHub Issues:** [Report a problem](https://github.com/Papiwrld/papiwrld.github.io/issues)
- **Twitter:** [@papiwrld_](https://x.com/papiwrld_)

---

**Happy Deploying! 🚀**
