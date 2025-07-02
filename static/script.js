window.addEventListener('DOMContentLoaded', () => {
  let historico = [];
  const canvas = document.getElementById('tela');
  const ctx = canvas.getContext('2d');
  const toggle = document.getElementById('dark-mode-toggle');
  const body = document.body;

  let desenhando = false;
  let lastX = 0;
  let lastY = 0;

  let brushColor = document.getElementById('color-picker').value;
  let brushSize = parseInt(document.getElementById('brush-size').value, 10);

  document.getElementById('color-picker').addEventListener('change', (e) => {
    brushColor = e.target.value;
  });

  document.getElementById('brush-size').addEventListener('input', (e) => {
    brushSize = parseInt(e.target.value, 10);
  });

  canvas.addEventListener('mousedown', (e) => {
    desenhando = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
    historico.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  });

  canvas.addEventListener('mouseup', () => {
    desenhando = false;
  });

  canvas.addEventListener('mouseout', () => {
    desenhando = false;
  });

  canvas.addEventListener('mousemove', (e) => {
    if (!desenhando) return;
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    [lastX, lastY] = [e.offsetX, e.offsetY];
  });

  // Modo escuro persistente
  if (localStorage.getItem('modoEscuro') === 'true') {
    body.classList.add('dark-mode');
    toggle.checked = true;
  }

  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      body.classList.add('dark-mode');
      localStorage.setItem('modoEscuro', 'true');
    } else {
      body.classList.remove('dark-mode');
      localStorage.setItem('modoEscuro', 'false');
    }
  });

  // Upload de imagem
  const uploadInput = document.getElementById('upload-img');
  uploadInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    const reader = new FileReader();

    reader.onload = (event) => {
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  });

  // Limpar
  document.getElementById('clear-btn').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    historico = [];
  });

  // Salvar imagem + galeria
  document.getElementById('save-btn').addEventListener('click', () => {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'meu_desenho.png';
    link.click();

    let desenhos = JSON.parse(localStorage.getItem('desenhos')) || [];
    desenhos.push(dataURL);
    localStorage.setItem('desenhos', JSON.stringify(desenhos));
    atualizarGaleria();
  });

  // Desfazer
  document.getElementById('undo-btn').addEventListener('click', () => {
    if (historico.length > 0) {
      const ultimo = historico.pop();
      ctx.putImageData(ultimo, 0, 0);
    }
  });

  function atualizarGaleria() {
    const galeria = document.getElementById('galeria');
    galeria.innerHTML = '';
    const desenhos = JSON.parse(localStorage.getItem('desenhos')) || [];
    desenhos.forEach((src, index) => {
      const img = document.createElement('img');
      img.src = src;
      img.title = `Desenho ${index + 1}`;
      galeria.appendChild(img);
    });
  }

  atualizarGaleria();
});


