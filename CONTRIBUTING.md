# Contributing to Eugene's Portfolio

Thank you for considering contributing to this project! This document provides guidelines and instructions for contributing.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## 🤝 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards others

**Unacceptable behavior includes:**
- Harassment, trolling, or derogatory comments
- Publishing others' private information
- Any conduct which could be considered inappropriate

## 🎯 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Screenshots** if applicable
- **Browser and OS** information
- **Additional context** if relevant

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description**
- **Use case** for the enhancement
- **Expected benefits**
- **Potential implementation** ideas
- **Examples** from other projects if applicable

### Contributing Code

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Make your changes**
4. **Test thoroughly**
5. **Commit your changes** (see commit guidelines below)
6. **Push to your fork** (`git push origin feature/AmazingFeature`)
7. **Open a Pull Request**

## 🛠️ Development Setup

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Code editor (VS Code recommended)
- Git for version control
- Local web server

### Setup Instructions

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/papiwrld.github.io.git
cd papiwrld.github.io

# Create a new branch
git checkout -b feature/your-feature-name

# Start development server (choose one)
# Python
python -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

### Project Structure

```
Personal Portfolio/
├── index.html      # Main HTML structure
├── style.css       # Stylesheet
├── script.js       # JavaScript functionality
├── sw.js          # Service worker
├── manifest.json   # PWA manifest
└── Images/        # Image assets
```

## 📝 Coding Standards

### HTML

- Use semantic HTML5 elements
- Include proper ARIA labels
- Maintain consistent indentation (2 spaces)
- Add meaningful comments for complex sections
- Ensure accessibility compliance

```html
<!-- Good -->
<section id="about" class="about">
  <h2>About Me</h2>
  <p>Professional description...</p>
</section>

<!-- Avoid -->
<div id="about" class="about">
  <span>About Me</span>
  <div>Professional description...</div>
</div>
```

### CSS

- Use CSS custom properties for theming
- Follow BEM naming convention where applicable
- Maintain mobile-first responsive design
- Group related properties together
- Add comments for complex selectors

```css
/* Good */
.service-card {
  background: var(--bg-card);
  padding: var(--spacing-2xl);
  border-radius: var(--radius-xl);
  transition: all var(--transition-normal);
}

/* Avoid */
.service-card {
  background: #1e1e1e;
  padding: 32px;
  border-radius: 16px;
}
```

### JavaScript

- Use modern ES6+ syntax
- Write clear, self-documenting code
- Add JSDoc comments for functions
- Handle errors gracefully
- Optimize for performance

```javascript
// Good
/**
 * Animate counter from 0 to target value
 * @param {HTMLElement} counter - Counter element
 */
function animateCounter(counter) {
  const target = parseInt(counter.getAttribute('data-target'));
  // Implementation...
}

// Avoid
function animateCounter(c) {
  var t = c.getAttribute('data-target');
  // Implementation...
}
```

## 💬 Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Formatting, missing semicolons, etc.
- **refactor**: Code restructuring
- **perf**: Performance improvements
- **test**: Adding tests
- **chore**: Maintenance tasks

### Examples

```
feat(portfolio): add project filtering functionality

- Implement filter buttons
- Add animation transitions
- Update project display logic

Closes #123
```

```
fix(navigation): resolve mobile menu overlay issue

Mobile menu was not closing when clicking outside.
Added event listener to handle outside clicks.

Fixes #456
```

## 🔄 Pull Request Process

### Before Submitting

1. **Test thoroughly** across different browsers
2. **Check responsiveness** on various screen sizes
3. **Validate HTML/CSS** with online validators
4. **Run linters** if configured
5. **Update documentation** if needed

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on Safari
- [ ] Tested on mobile devices
- [ ] Tested responsive design

## Screenshots
Add screenshots if applicable

## Checklist
- [ ] Code follows project standards
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No console errors
```

### Review Process

1. **Automated checks** must pass
2. **Code review** by maintainer
3. **Testing verification**
4. **Approval** required before merge
5. **Squash and merge** for clean history

## 🎨 Design Guidelines

### Color Palette

- **Primary:** #00bcd4 (Cyan)
- **Dark Background:** #0a0a0a
- **Light Text:** #ffffff
- **Secondary Text:** #b0b0b0

### Typography

- **Headings:** Poppins
- **Body:** Inter
- **Sizes:** Use CSS custom properties

### Spacing

Use CSS custom properties:
- `--spacing-xs` to `--spacing-3xl`

## 🐛 Debugging Tips

### Common Issues

1. **Service Worker Caching**
   - Clear browser cache
   - Unregister service worker
   - Hard reload (Ctrl+Shift+R)

2. **CSS Not Updating**
   - Check browser cache
   - Verify file path
   - Check for syntax errors

3. **JavaScript Errors**
   - Open browser console
   - Check for undefined variables
   - Verify element selectors

## 📚 Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)
- [Web.dev](https://web.dev/)

## 🙋 Questions?

Feel free to:
- Open an issue
- Contact via email: kwesieugene77@gmail.com
- Connect on [LinkedIn](https://linkedin.com/in/eugene-awagah-86068a341)

## 🎉 Thank You!

Your contributions make this project better. Thank you for taking the time to contribute!

---

**Happy Coding!** 🚀
