const fs = require('fs');
const path = require('path');

const replacements = [
  // CSS variables
  ['--color-accent-violet', '--color-primary'],
  ['--color-accent-coral', '--color-secondary'],
  ['--color-accent-lime', '--color-accent'],
  
  ['--color-accent-violet-hover', '--color-primary-hover'],
  ['--color-accent-coral-hover', '--color-secondary-hover'],
  
  // Dark mode explicit replacements (to be safe if there are any)
  ['--color-accent-violet-dark', '--color-primary-dark'],
  ['--color-accent-coral-dark', '--color-secondary-dark'],
  ['--color-accent-lime-dark', '--color-accent-dark'],
  
  ['--color-accent-violet-hover-dark', '--color-primary-hover-dark'],
  ['--color-accent-coral-hover-dark', '--color-secondary-hover-dark'],

  // The short aliases
  ['var(--violet)', 'var(--primary)'],
  ['var(--violet-hover)', 'var(--primary-hover)'],
  ['var(--coral)', 'var(--secondary)'],
  ['var(--coral-hover)', 'var(--secondary-hover)'],
  ['var(--lime)', 'var(--accent)'],
  
  // The CSS declarations for aliases
  ['--violet:', '--primary:'],
  ['--violet-hover:', '--primary-hover:'],
  ['--coral:', '--secondary:'],
  ['--coral-hover:', '--secondary-hover:'],
  ['--lime:', '--accent:'],

  // Classes like badge-violet
  ['badge-violet', 'badge-primary'],
  ['badge-coral', 'badge-secondary'],
  ['badge-lime', 'badge-accent'],
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (
      fullPath.endsWith('.ts') || 
      fullPath.endsWith('.tsx') || 
      fullPath.endsWith('.css')
    ) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      
      for (const [searchValue, replaceValue] of replacements) {
        if (content.includes(searchValue)) {
          // Replace all occurrences using split-join
          content = content.split(searchValue).join(replaceValue);
          modified = true;
        }
      }
      
      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

const targetDir = path.join(__dirname, 'src');
processDirectory(targetDir);
console.log('Done!');
