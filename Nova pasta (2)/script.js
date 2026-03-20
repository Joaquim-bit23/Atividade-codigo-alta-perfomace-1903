const produtos = document.querySelectorAll('.produto');
const elementoTotal = document.getElementById('valor-total');
const btnWhatsapp = document.getElementById('enviar-whatsapp');

produtos.forEach(produto => {
    const btnMais = produto.querySelector('.btn-mais');
    const btnMenos = produto.querySelector('.btn-menos');
    const displayQtd = produto.querySelector('.qtd');

    btnMais.addEventListener('click', () => {
        let qtd = parseInt(displayQtd.textContent);
        displayQtd.textContent = ++qtd;
        atualizarTotal();
    });

    btnMenos.addEventListener('click', () => {
        let qtd = parseInt(displayQtd.textContent);
        if (qtd > 0) {
            displayQtd.textContent = --qtd;
            atualizarTotal();
        }
    });
});

function atualizarTotal() {
    let somaTotal = 0;
    produtos.forEach(produto => {
        const qtd = parseInt(produto.querySelector('.qtd').textContent);
        const preco = parseFloat(produto.getAttribute('data-preco'));
        somaTotal += qtd * preco;
    });
    elementoTotal.textContent = somaTotal.toFixed(2).replace('.', ',');
}

btnWhatsapp.addEventListener('click', () => {
    let mensagem = "🍩 *Novo Pedido - Dreamy Donuts* 🍩\n\n";
    let temItens = false;

    produtos.forEach(produto => {
        const qtd = parseInt(produto.querySelector('.qtd').textContent);
        const nome = produto.querySelector('h3').textContent;
        if (qtd > 0) {
            mensagem += `*${qtd}x* ${nome}\n`;
            temItens = true;
        }
    });

    mensagem += `\n*Total: R$ ${elementoTotal.textContent}*`;

    if (temItens) {
        const seuTelefone = "5511999999999"; 
        const link = `https://wa.me/${seuTelefone}?text=${encodeURIComponent(mensagem)}`;
        window.open(link, '_blank');
    } else {
        alert("Ops! Adicione pelo menos um donut ao seu carrinho primeiro.");
    }
});