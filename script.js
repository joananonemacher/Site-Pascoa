let carrinho = [];
const cidadesAtendidas = ["porto alegre", "poa", "canoas", "alvorada", "cachoeirinha", "esteio"];

// Abre/Fecha Carrinho
document.getElementById('abrir-carrinho').onclick = toggleCarrinho;

function toggleCarrinho() {
    const sb = document.getElementById('sidebar-carrinho');
    const overlay = document.getElementById('overlay');
    sb.classList.toggle('ativo');
    overlay.style.display = sb.classList.contains('ativo') ? 'block' : 'none';
}

function adicionarAoCarrinho(nome, preco, imagem) {
    const itemExistente = carrinho.find(item => item.nome === nome);

    if (itemExistente) {
        if (itemExistente.qtd < 3) {
            itemExistente.qtd++;
        } else {
            alert("O pedido máximo é de 3 unidades do mesmo sabor.");
        }
    } else {
        carrinho.push({ nome, preco, imagem, qtd: 1 });
    }
    renderizarCarrinho();
    if (!document.getElementById('sidebar-carrinho').classList.contains('ativo')) toggleCarrinho();
}

function mudarQtd(index, delta) {
    const novoValor = carrinho[index].qtd + delta;
    if (novoValor > 3) {
        alert("O pedido máximo é de 3 unidades do mesmo sabor.");
    } else if (novoValor <= 0) {
        carrinho.splice(index, 1);
    } else {
        carrinho[index].qtd = novoValor;
    }
    renderizarCarrinho();
}

function renderizarCarrinho() {
    const container = document.getElementById('itens-carrinho');
    const totalEl = document.getElementById('total-carrinho');
    container.innerHTML = "";
    let total = 0;

    carrinho.forEach((item, index) => {
        total += item.preco * item.qtd;
        container.innerHTML += `
            <div class="item-carrinho">
                <img src="${item.imagem}" class="img-mini">
                <div>
                    <p><strong>${item.nome}</strong></p>
                    <div class="controles-qtd">
                        <button onclick="mudarQtd(${index}, -1)">-</button>
                        <span>${item.qtd}</span>
                        <button onclick="mudarQtd(${index}, 1)">+</button>
                    </div>
                </div>
                <p>R$ ${item.preco * item.qtd}</p>
            </div>
        `;
    });

    totalEl.innerText = `R$ ${total.toFixed(2)}`;
    document.getElementById('contador-notas').innerText = carrinho.length;
}

function irParaCheckout() {
    if (carrinho.length === 0) {
        alert("Não há nada no seu carrinho!");
        return;
    }
    document.getElementById('sidebar-carrinho').classList.remove('ativo');
    document.getElementById('sidebar-checkout').classList.add('ativo');
}

function voltarParaCarrinho() {
    document.getElementById('sidebar-checkout').classList.remove('ativo');
    document.getElementById('sidebar-carrinho').classList.add('ativo');
}

function calcularFrete() {
    const endereco = document.getElementById('endereco').value.toLowerCase();
    const res = document.getElementById('resultado-frete');
    const pag = document.getElementById('area-pagamento');
    
    // Verifica se alguma cidade da lista está no texto do endereço
    const atende = cidadesAtendidas.some(cidade => endereco.includes(cidade));

    if (atende) {
        res.innerHTML = `<p style="color: green;">Frete: R$ 10,00<br>Entrega em até 2h!</p>`;
        pag.style.display = 'block';
    } else {
        res.innerHTML = `<p style="color: red;">Desculpe, não entregamos nesse endereço.</p>`;
        pag.style.display = 'none';
    }
}

function finalizarCompra() {
    alert("Compra finalizada, aguarde seu pedido!");
    location.reload(); // Recarrega a página para limpar tudo
}

function fecharTudo() {
    document.getElementById('sidebar-carrinho').classList.remove('ativo');
    document.getElementById('sidebar-checkout').classList.remove('ativo');
    document.getElementById('overlay').style.display = 'none';
}