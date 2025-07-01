# Canvas

## Um editor de desenho feito com [FastHTML](https://github.com/piccolo-orm/fast-html)!  
## Desenhe, mude a cor e tamanho do pincel, carregue imagens e salve sua obra-prima! 🖌️✨

---

## ✨ Funcionalidades

- 🎨 **Canvas com pincel suave**
- 🌈 **Cor e tamanho do pincel ajustáveis**
- 🗂️ **Camadas simuladas (como no Photoshop!)**
- 🌑 **Modo escuro com toggle**
- 🖼️ **Upload de imagem como fundo**
- 💾 **Botão de salvar como PNG**
- 🔙 **Desfazer última ação**
- 📸 **Galeria local com miniaturas dos desenhos**

---

## 🚀 Como executar o projeto localmente

1. Instale o FastAPI e Uvicorn:

```bash
pip install fastapi uvicorn
```

2. Execute o projeto com:

```bash
python canvas.py
```

3. Abra o navegador e acesse:

```
http://localhost:8000
```

---

## 📁 Estrutura de pastas

```
canvas-com-a-mini/
├── canvas.py                # Código principal FastHTML
├── static/
│   ├── estilo.css           # Arquivo de estilos
│   └── script.js            # Código JavaScript com as lógicas do canvas
```
---

# 🔧Para desenvolvedores:

Este projeto utiliza FastAPI com FastHTML para gerar páginas dinâmicas que manipulam elementos gráficos via JavaScript puro. O foco está em desenhar em camadas sobre o canvas HTML.


---

## Entrada para usuarios:

| Elemento          | Tipo     | ID             | Função                                        |
|-------------------|----------|----------------|------------------------------------------------|
| 🎨 Cor do Pincel   | `<input>`| `color-picker` | Define a cor usada para desenhar               |
| 🔧 Tamanho do Pincel | `<input>`| `brush-size`   | Controla a espessura do traço (1–50)           |
| 🖼️ Upload de imagem | `<input>`| `upload-img`   | Define a imagem de fundo carregada pelo usuário|
| 🖱️ Área de desenho | `<canvas>`| `canvas-camada1` | Camada superior usada para desenhar         |


## 📤 Saídas (Outputs)

| Saída                     | Tipo         | Descrição                                                                 |
|---------------------------|--------------|---------------------------------------------------------------------------|
| 💾 `meu_desenho.png`       | Arquivo PNG  | Imagem combinando a base e a camada de desenho                           |
| 🖼️ Miniaturas na galeria  | `<img>` tag  | Imagens salvas exibidas via `localStorage` no final da página            |
| 📁 `canvas.toDataURL()`    | Base64       | Representação da imagem final para download                              |

Essas saídas são geradas automaticamente ao interagir com os botões **Salvar**, **Desfazer** e **Upload**.


## 🧁 Créditos

Feito com carinho por **Mestre** e a ajudante **Mini Yaemori** 🐾✨  
Use, compartilhe, brinque e customize à vontade!

---
