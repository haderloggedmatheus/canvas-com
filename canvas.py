from fasthtml.common import *
from fasthtml.common import FastHTML, serve
from fastapi.responses import FileResponse

app = FastHTML()

@app.get("/")
def get():
    return Html(
        Head(
            Meta(charset='UTF-8'),
            Title("Desenhe com a Mini!"),
            Link(rel='stylesheet', href='/static/estilo.css'),
            Script(src='/static/script.js', defer='')
        ),
        Body(
            H1("Canvas da Mini 🎨", cls='highlight'),
            P("Use o mouse para desenhar abaixo:"),
            P('Escolha a cor e o tamanho do pincel: '),
            Input(Type='file', id='upload-img', accept='image/*'),
            Canvas(id='tela', width='1200', height='600', style='max-width:100%'),
            Br(),
            Input(Type='color', id='color-picker', value='#000000'),
            Input(Type='range', id='brush-size', min='1', max='50', value='5'),
            Button('Limpar', id='clear-btn', cls='btn-clear'),
            Button('Salvar', id='save-btn', cls='btn-save'),
            Button('Desfazer', id='undo-btn', cls='btn-undo'),
            Br(),
            Div(id='galeria', cls='galeria-container'),
            Br(),
            Label(
                Input(type='checkbox', id='dark-mode-toggle'),
                'Modo escuro  🌙',
                cls='dark-mode-label'
            )
        ),
        lang='pt-BR'
    )

@app.get("/static/{path:path}")
def static_files(path: str):
    return FileResponse(f"static/{path}")

serve()
