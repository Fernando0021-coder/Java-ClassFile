document.addEventListener('DOMContentLoaded', function() {
  const explainElements = document.querySelectorAll('.explain');
  explainElements.forEach(element => {
    const tooltip = document.createElement('div');
    tooltip.className = 'explain-tooltip';
    tooltip.innerHTML = `
      <strong>${element.getAttribute('data-title')}</strong>
      <p>${element.getAttribute('data-content')}</p>
    `;
    document.body.appendChild(tooltip);

    element.addEventListener('mouseenter', function(e) {
      const rect = element.getBoundingClientRect();
      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;
      let left = rect.left + scrollX;
      let top = rect.top + scrollY - tooltip.offsetHeight - 10;

      
      if (top < scrollY) {
        top = rect.bottom + scrollY + 10;
      }
 
      if (left + tooltip.offsetWidth > scrollX + window.innerWidth) {
        left = scrollX + window.innerWidth - tooltip.offsetWidth - 10;
      }
     
      if (left < scrollX) {
        left = scrollX + 10;
      }
      
      if (top + tooltip.offsetHeight > scrollY + window.innerHeight) {
        top = rect.top + scrollY - tooltip.offsetHeight - 10;
      }

      tooltip.style.left = left + 'px';
      tooltip.style.top = top + 'px';
      tooltip.style.opacity = '1';
    });

    element.addEventListener('mouseleave', function() {
      tooltip.style.opacity = '0';
    });
  });
});


document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    

    document.querySelectorAll('pre').forEach(pre => pre.style.display = 'none');
    document.getElementById('fileClassTab').style.display = 'none';
    
    const tabId = tab.getAttribute('data-tab');
    if (tabId === 'file-class') {
      document.getElementById('fileClassTab').style.display = 'block';
    } else {
      document.getElementById(tabId + 'Tab').style.display = 'block';
    }
  });
});


document.getElementById('copyButton').addEventListener('click', () => {
  const activeTab = document.querySelector('.tab.active').getAttribute('data-tab');
  let codeText = '';
  
  if (activeTab === 'file-class') {
   
    return;
  } else {
    const codeElement = document.getElementById(activeTab + 'Tab');
    codeText = codeElement.innerText;
  }
  
  navigator.clipboard.writeText(codeText).then(() => {
    const copyButton = document.getElementById('copyButton');
    copyButton.innerHTML = '<i class="fas fa-check"></i> ¡Copiado!';
    copyButton.classList.add('copied');
    
    setTimeout(() => {
      copyButton.innerHTML = '<i class="far fa-copy"></i> Copiar código';
      copyButton.classList.remove('copied');
    }, 2000);
  }).catch(err => {
    console.error('Error al copiar: ', err);
  });
});
