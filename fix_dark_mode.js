const fs = require('fs');
const glob = require('glob');
const path = require('path');

const files = fs.readdirSync('src/components').filter(f => f.endsWith('.tsx')).map(f => path.join('src/components', f));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Replace background colors for dark mode
  content = content.replace(/bg-\[#1c1c1e\]\/\d+/g, 'bg-neutral-800/80');
  content = content.replace(/bg-\[#2c2c2e\]\/\d+/g, 'bg-neutral-700/80');

  // Replace text-white with text-blue-500 for headings in lightMode ternary
  content = content.replace(/\? "text-black" : "text-white"/g, '? "text-black" : "text-blue-500"');
  
  // Replace text-gray-400 or text-gray-300 with text-white for content
  content = content.replace(/\? "text-gray-600" : "text-gray-400"/g, '? "text-gray-600" : "text-white"');
  content = content.replace(/\? "text-gray-600" : "text-gray-300"/g, '? "text-gray-600" : "text-white"');

  fs.writeFileSync(file, content);
});
console.log("Done");
