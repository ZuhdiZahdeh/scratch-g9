
/* --- scratch-lesson2 code colorizer --- */
(function(){
  const categories = [
    { cat:'events',    rx: /(when\s+green\s+flag\s+clicked|when\s+\w+\s+key\s+pressed|when\s+this\s+sprite\s+clicked)/i },
    { cat:'pen',       rx: /(pen\s+down|pen\s+up|erase\s+all|set\s+pen\s+size|change\s+pen\s+size|set\s+pen\s+color|change\s+pen\s+color|stamp)/i },
    { cat:'motion',    rx: /(move\s+\(?[\w\-\+]+\)?\s+steps|turn\s+(clockwise|counterclockwise)|go\s+to\s+x:|glide\s+\(?[\w\-\+]+\)?\s+secs\s+to\s+x:|point\s+in\s+direction|change\s+[xy]\s+by|go\s+to\s+random\s+position)/i },
    { cat:'control',   rx: /(repeat\s*\(|forever|if\s*\(|else|wait\s*\(|stop\s+all|until\s*\()/i },
    { cat:'variables', rx: /(set\s+\[?.+?\]?\s+to|change\s+\[?.+?\]?\s+by)/i },
    { cat:'myblocks',  rx: /(define\s+\w+|^\s*ارسم\s|لبنة\s+مخص)/i }
  ];

  function detectCat(line){
    const t = line.trim();
    for(const rule of categories){
      if(rule.rx.test(t)) return rule.cat;
    }
    return 'none';
  }

  function colorize(pre){
    const code = pre.querySelector('code');
    const text = (code ? code.textContent : pre.textContent) || '';
    const lines = text.split(/\r?\n/);
    pre.innerHTML = ''; // clear
    for(const ln of lines){
      const span = document.createElement('span');
      span.className = 'line';
      span.dataset.cat = detectCat(ln);
      span.textContent = ln.length ? ln : ' ';
      pre.appendChild(span);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('pre.scratch-code').forEach(colorize);
  });
})();
