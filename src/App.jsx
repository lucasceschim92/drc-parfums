import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Plus, 
  Minus, 
  X, 
  Check, 
  ChevronRight, 
  Trash2,
  Crown,
  Ban
} from 'lucide-react';

// Catálogo DRC Parfums sincronizado com Fragrantica
const PERFUMES = [
  {
    id: 'boadicea-blue-sapphire',
    marca: 'BOADICEA THE VICTORIOUS',
    linha: 'NICHO · COMPARTILHÁVEL',
    nome: 'Blue Sapphire',
    precoPorMl: 34.00,
    mlDisponiveis: 11,
    apcDisponivel: false, // Variável de controle da APC
    familia: 'Oriental Amadeirado',
    saida: 'Limão, Camomila, Sálvia, Açafrão e Tagetes',
    coracao: 'Rosa, Jasmim Indiano e Magnólia',
    fundo: 'Agarwood (Oud), Patchouli e Âmbar',
    imagem: 'https://fimgs.net/mdimg/perfume/375x500.18518.jpg'
  },
  {
    id: 'crivelli-hibiscus-mahajad',
    marca: 'MAISON CRIVELLI',
    linha: 'EXTRAIT DE PARFUM · COMPARTILHÁVEL',
    nome: 'Hibiscus Mahajád',
    precoPorMl: 38.00,
    mlDisponiveis: 40,
    apcDisponivel: false,
    familia: 'Floral Oriental Frutado',
    saida: 'Hibisco, Cassis e Hortelã Picante',
    coracao: 'Rosa Damascena e Canela',
    fundo: 'Baunilha, Couro, Ambreta e Cedro',
    imagem: 'https://fimgs.net/mdimg/perfume/375x500.69069.jpg'
  },
  {
    id: 'xerjoff-naxos',
    marca: 'XERJOFF',
    linha: 'XJ 1861 COLLECTION · COMPARTILHÁVEL',
    nome: 'XJ 1861 Naxos',
    precoPorMl: 16.00,
    mlDisponiveis: 30,
    apcDisponivel: false,
    familia: 'Aromático Especiado',
    saida: 'Lavanda, Bergamota e Limão Siciliano',
    coracao: 'Mel, Canela, Cashmeran e Jasmim Sambac',
    fundo: 'Folha de Tabaco, Fava Tonka e Baunilha',
    imagem: 'https://fimgs.net/mdimg/perfume/375x500.30529.jpg'
  },
  {
    id: 'lv-ombre-nomade',
    marca: 'LOUIS VUITTON',
    linha: 'ALTA PERFUMARIA · COMPARTILHÁVEL',
    nome: 'Ombre Nomade',
    precoPorMl: 35.00,
    mlDisponiveis: 47,
    apcDisponivel: false,
    familia: 'Oriental Amadeirado',
    saida: 'Framboesa, Açafrão e Rosa Damascena',
    coracao: 'Agarwood (Oud) e Olíbano',
    fundo: 'Bétula, Benjoim, Madeira de Âmbar e Gerânio',
    imagem: 'https://fimgs.net/mdimg/perfume/375x500.49755.jpg'
  }
];

const TAXA_FRASCO_DECANT = 9.00; // Custo fixo do atomizador decant
const TAXA_FRASCO_APC = 40.00;    // Custo fixo do frasco/embalagem APC
const TELEFONE_WHATSAPP = "5528999317240";

export default function App() {
  const [selectedPerfume, setSelectedPerfume] = useState(null);
  const [volumeDesejado, setVolumeDesejado] = useState(3);
  const [querAPC, setQuerAPC] = useState(false);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const [cep, setCep] = useState('');
  const [freteCalculado, setFreteCalculado] = useState(null);
  const [isCalculandoFrete, setIsCalculandoFrete] = useState(false);

  const handleOpenDossie = (perfume) => {
    setSelectedPerfume(perfume);
    setVolumeDesejado(3);
    setQuerAPC(false);
  };

  const handleIncrement = () => {
    if (selectedPerfume && volumeDesejado < selectedPerfume.mlDisponiveis) {
      setVolumeDesejado(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (volumeDesejado > 3) {
      setVolumeDesejado(prev => prev - 1);
    }
  };

  const handleToggleAPC = () => {
    if (!selectedPerfume.apcDisponivel) return;

    if (!querAPC) {
      setVolumeDesejado(selectedPerfume.mlDisponiveis);
      setQuerAPC(true);
    } else {
      setVolumeDesejado(3);
      setQuerAPC(false);
    }
  };

  const handleAddToCart = () => {
    if (!selectedPerfume) return;
    const taxaAplicada = querAPC ? TAXA_FRASCO_APC : TAXA_FRASCO_DECANT;
    const subtotalLiquido = volumeDesejado * selectedPerfume.precoPorMl;
    const subtotalTotal = subtotalLiquido + taxaAplicada;

    const newItem = {
      id: `${selectedPerfume.id}-${Date.now()}`,
      perfumeId: selectedPerfume.id,
      nome: selectedPerfume.nome,
      marca: selectedPerfume.marca,
      imagem: selectedPerfume.imagem,
      ml: volumeDesejado,
      isAPC: querAPC,
      precoPorMl: selectedPerfume.precoPorMl,
      taxaFrasco: taxaAplicada,
      subtotal: subtotalTotal
    };

    setCart(prev => [...prev, newItem]);
    setSelectedPerfume(null);
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleCalcularFrete = () => {
    if (cep.length < 8) return;
    setIsCalculandoFrete(true);
    setTimeout(() => {
      setFreteCalculado({
        transportadora: 'LOGGI',
        prazo: '5 a 7 dias úteis',
        valor: 32.50
      });
      setIsCalculandoFrete(false);
    }, 600);
  };

  const subtotalItens = cart.reduce((acc, item) => acc + item.subtotal, 0);
  const valorFrete = freteCalculado ? freteCalculado.valor : 0;
  const totalCartao = subtotalItens + valorFrete;
  const totalPix = totalCartao * 0.90; // 10% OFF no Pix

  const handleFinalizarWhatsApp = () => {
    let texto = `Olá! Gostaria de finalizar meu pedido na *DRC PARFUMS*.\n\n`;
    texto += `*Meu pedido:*\n`;

    cart.forEach(item => {
      if (item.isAPC) {
        texto += `🥂 *APC — APRESENTAÇÃO COMPLETA*\n`;
        texto += `• *${item.marca} ${item.nome}* — ${item.ml} ml restantes\n`;
        texto += `  (Frasco original + Embalagem/Caixa oficial: + R$ ${TAXA_FRASCO_APC.toFixed(2)})\n`;
        texto += `  R$ ${item.subtotal.toFixed(2)}\n\n`;
      } else {
        texto += `🧴 *DECANT*\n`;
        texto += `• *${item.marca} ${item.nome}* — ${item.ml} ml\n`;
        texto += `  Frasco: Recravado com atomizador (+ R$ ${TAXA_FRASCO_DECANT.toFixed(2)})\n`;
        texto += `  R$ ${item.subtotal.toFixed(2)}\n\n`;
      }
    });

    if (freteCalculado && cep) {
      texto += `📦 *Entrega:* CEP ${cep}\n`;
      texto += `${freteCalculado.transportadora} · ${freteCalculado.prazo} · R$ ${freteCalculado.valor.toFixed(2)}\n`;
      texto += `*(Ou acumular pedido por até 60 dias)*\n\n`;
    }

    texto += `💳 *Total no cartão:* R$ ${totalCartao.toFixed(2)}\nAté 5x sem juros\n\n`;
    texto += `💰 *Total no Pix (10% OFF):* R$ ${totalPix.toFixed(2)}\n\n`;
    texto += `Pode confirmar a disponibilidade do volume para mim?`;

    const url = `https://wa.me/${TELEFONE_WHATSAPP}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F9F9F8] text-[#1A1A1A] font-sans antialiased">
      {/* Topo / Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-[#E5E5E0] px-4 lg:px-8 py-3.5 flex items-center justify-between">
        <div>
          <span className="text-[10px] tracking-[0.3em] font-semibold text-neutral-500 uppercase block">Alta Perfumaria de Nicho</span>
          <h1 className="text-lg font-serif tracking-wider font-bold">DRC PARFUMS</h1>
        </div>

        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative flex items-center gap-2 bg-[#1A1A1A] text-white px-3.5 py-2 rounded-full text-xs font-medium tracking-wide hover:bg-black transition-colors cursor-pointer"
        >
          <ShoppingBag size={16} />
          <span>{cart.length}</span>
          {cart.length > 0 && (
            <span className="hidden sm:inline border-l border-neutral-700 pl-2">
              R$ {totalPix.toFixed(2)}
            </span>
          )}
        </button>
      </header>

      {/* Grid de Produtos */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-baseline justify-between border-b border-neutral-200 pb-3">
          <div>
            <span className="text-[11px] tracking-widest text-neutral-500 font-medium uppercase">Curadoria Disponível</span>
            <h2 className="text-xl font-serif font-medium mt-0.5">Escolha o seu decant de nicho</h2>
          </div>
          <span className="text-xs text-neutral-500 font-mono">{PERFUMES.length} fragrâncias</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {PERFUMES.map((perfume) => (
            <div 
              key={perfume.id} 
              className="bg-white border border-[#ECECE8] rounded-xl p-4 flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <div className="relative aspect-square mb-3 bg-white rounded-lg overflow-hidden flex items-center justify-center border border-neutral-100 p-2">
                <img 
                  src={perfume.imagem} 
                  alt={perfume.nome} 
                  className="object-contain w-full h-full hover:scale-105 transition-transform duration-500" 
                />
                <span className="absolute top-2 right-2 text-[9px] font-mono uppercase tracking-widest bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded text-neutral-600 border border-neutral-200">
                  Ver Dossiê
                </span>
              </div>

              <div>
                <span className="text-[10px] tracking-wider font-semibold text-neutral-500 uppercase block">{perfume.marca}</span>
                <h3 className="font-serif text-sm font-semibold text-neutral-900 line-clamp-1">{perfume.nome}</h3>
                
                <div className="flex items-baseline justify-between mt-2 pt-2 border-t border-dashed border-neutral-200">
                  <div>
                    <span className="text-sm font-bold text-neutral-900">R$ {perfume.precoPorMl.toFixed(2)}</span>
                    <span className="text-[10px] text-neutral-500 ml-1">/ ml</span>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    perfume.mlDisponiveis <= 15 ? 'bg-amber-100 text-amber-900' : 'text-neutral-500 bg-neutral-100'
                  }`}>
                    {perfume.mlDisponiveis} ml disp.
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleOpenDossie(perfume)}
                className="mt-3.5 w-full py-2 px-3 border border-neutral-300 rounded-lg text-xs font-semibold tracking-wide hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <Plus size={13} /> Escolher ml
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Modal de Dossiê Olfativo e Seleção */}
      {selectedPerfume && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl p-6 max-h-[92vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-neutral-500">{selectedPerfume.marca} · {selectedPerfume.linha}</span>
                <h3 className="text-xl font-serif font-bold text-neutral-900 mt-0.5">{selectedPerfume.nome}</h3>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-base font-bold text-neutral-900">R$ {selectedPerfume.precoPorMl.toFixed(2)} <span className="text-xs font-normal text-neutral-500">/ ml</span></span>
                  <span className="text-[11px] font-mono text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                    ⚠️ Restam apenas {selectedPerfume.mlDisponiveis} ML
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedPerfume(null)}
                className="p-1 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Pirâmide Olfativa (Fragrantica) */}
            <div className="my-5 p-3.5 bg-[#FAF9F6] border border-[#ECECE8] rounded-xl">
              <div className="flex justify-between items-center mb-2.5 pb-2 border-b border-neutral-200/60">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">Pirâmide Olfativa (Fragrantica)</span>
                <span className="text-xs font-serif font-medium text-neutral-800">{selectedPerfume.familia}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-[11px]">
                <div>
                  <span className="text-[9px] uppercase tracking-wider font-semibold text-neutral-400 block mb-0.5">Saída</span>
                  <p className="text-neutral-700 leading-snug">{selectedPerfume.saida}</p>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider font-semibold text-neutral-400 block mb-0.5">Coração</span>
                  <p className="text-neutral-700 leading-snug">{selectedPerfume.coracao}</p>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider font-semibold text-neutral-400 block mb-0.5">Fundo</span>
                  <p className="text-neutral-700 leading-snug">{selectedPerfume.fundo}</p>
                </div>
              </div>
            </div>

            {/* Controle Condicional de APC */}
            {selectedPerfume.apcDisponivel ? (
              <div 
                onClick={handleToggleAPC}
                className={`p-3 rounded-xl border transition-all cursor-pointer mb-4 flex items-center justify-between ${
                  querAPC 
                    ? 'bg-amber-50 border-amber-400 text-amber-950' 
                    : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:border-neutral-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                    querAPC ? 'bg-amber-600 border-amber-600 text-white' : 'bg-white border-neutral-300'
                  }`}>
                    {querAPC && <Check size={13} />}
                  </div>
                  <div>
                    <span className="text-xs font-bold block flex items-center gap-1.5">
                      <Crown size={14} className="text-amber-600" /> Disputar APC (Apresentação Completa)
                    </span>
                    <span className="text-[10px] text-neutral-500">Frasco original + Caixa oficial (+ R$ {TAXA_FRASCO_APC.toFixed(2)})</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold uppercase bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                  {selectedPerfume.mlDisponiveis} ml
                </span>
              </div>
            ) : (
              <div className="p-2.5 rounded-xl border border-neutral-200 bg-neutral-50/80 mb-4 flex items-center justify-between text-neutral-400">
                <div className="flex items-center gap-2">
                  <Ban size={14} className="text-neutral-400" />
                  <span className="text-xs font-medium">Apresentação Completa (APC) Indisponível</span>
                </div>
                <span className="text-[10px] font-mono uppercase bg-neutral-200/60 text-neutral-500 px-2 py-0.5 rounded">
                  Frasco Retido
                </span>
              </div>
            )}

            {/* Seletor de Quantidade do Decant */}
            {!querAPC && (
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <label className="text-xs uppercase tracking-wider font-semibold text-neutral-600">Volume do Decant</label>
                  <span className="text-[11px] text-neutral-400">Mínimo de 3 ml</span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[3, 5, 10, 15].map((vol) => (
                    <button
                      key={vol}
                      disabled={vol > selectedPerfume.mlDisponiveis}
                      onClick={() => setVolumeDesejado(vol)}
                      className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        volumeDesejado === vol 
                          ? 'bg-neutral-900 text-white border-neutral-900' 
                          : 'border-neutral-200 text-neutral-700 hover:border-neutral-400 bg-white'
                      } disabled:opacity-30 disabled:cursor-not-allowed`}
                    >
                      {vol} ml
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between border border-neutral-300 rounded-xl p-2 bg-white mt-2">
                  <button 
                    onClick={handleDecrement}
                    disabled={volumeDesejado <= 3}
                    className="w-10 h-10 flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-100 disabled:opacity-30 cursor-pointer"
                  >
                    <Minus size={16} />
                  </button>
                  <div className="text-center">
                    <span className="text-2xl font-serif font-bold text-neutral-900">{volumeDesejado}</span>
                    <span className="text-xs font-mono uppercase text-neutral-400 block -mt-1">ML</span>
                  </div>
                  <button 
                    onClick={handleIncrement}
                    disabled={volumeDesejado >= selectedPerfume.mlDisponiveis}
                    className="w-10 h-10 flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-100 disabled:opacity-30 cursor-pointer"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div className="mt-2 p-3 bg-neutral-50 border border-neutral-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px]">
                      <Check size={12} />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-neutral-900 block">Frasco com atomizador · + R$ {TAXA_FRASCO_DECANT.toFixed(2)}</span>
                      <span className="text-[10px] text-neutral-500">Vidro premium graduado e etiquetado</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase">Incluso</span>
                </div>
              </div>
            )}

            {/* Rodapé do Modal */}
            <div className="mt-6 pt-4 border-t border-neutral-200 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase block">
                  {querAPC ? 'Apresentação Completa' : `${volumeDesejado} ml + Frasco`}
                </span>
                <span className="text-xl font-bold font-serif text-neutral-900">
                  R$ {((volumeDesejado * selectedPerfume.precoPorMl) + (querAPC ? TAXA_FRASCO_APC : TAXA_FRASCO_DECANT)).toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-neutral-900 text-white py-3.5 px-4 rounded-xl text-xs font-semibold tracking-wider uppercase hover:bg-black transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{querAPC ? 'Garantir Disputa de APC' : 'Adicionar Decant'}</span>
                <Plus size={15} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Drawer Lateral do Pedido */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-md h-full flex flex-col justify-between p-6 shadow-2xl">
            <div>
              <div className="flex justify-between items-start pb-4 border-b border-neutral-200">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">DRC Parfums</span>
                  <h3 className="text-lg font-serif font-bold text-neutral-900">Conferência do Pedido</h3>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 text-neutral-400 hover:text-neutral-900 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="divide-y divide-neutral-100 max-h-[38vh] overflow-y-auto my-3 pr-1">
                {cart.length === 0 ? (
                  <p className="text-xs text-neutral-400 py-8 text-center">Nenhum item selecionado ainda.</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="py-3 flex justify-between items-center gap-3">
                      <div className="flex items-center gap-3">
                        <img src={item.imagem} alt={item.nome} className="w-12 h-12 object-contain rounded-lg bg-white border border-neutral-200 p-1" />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] font-bold text-neutral-500 uppercase">{item.marca}</span>
                            {item.isAPC && (
                              <span className="text-[8px] font-mono bg-amber-100 text-amber-900 font-bold px-1 rounded">APC</span>
                            )}
                          </div>
                          <h4 className="text-xs font-serif font-semibold text-neutral-900">{item.nome}</h4>
                          <span className="text-[11px] text-neutral-500 font-mono">
                            {item.ml} ml {item.isAPC ? '· Frasco + Caixa Oficial (+R$40)' : '· Frasco incluso (+R$9)'}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold font-serif text-neutral-900 block">R$ {item.subtotal.toFixed(2)}</span>
                        <button 
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="text-neutral-400 hover:text-rose-600 mt-1 cursor-pointer"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {cart.length > 0 && (
              <div className="border-t border-neutral-200 pt-4 space-y-4">
                <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
                  <div className="bg-neutral-50 border border-neutral-200 py-2 rounded-lg font-medium text-neutral-700">
                    Até 5x <span className="text-neutral-500">sem juros</span>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-200 py-2 rounded-lg font-bold text-emerald-800">
                    10% OFF <span className="font-normal text-emerald-700">no Pix</span>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-1.5">Calcular Frete</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="00000-000"
                      maxLength={9}
                      value={cep}
                      onChange={(e) => setCep(e.target.value)}
                      className="flex-1 border border-neutral-300 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-neutral-900"
                    />
                    <button 
                      onClick={handleCalcularFrete}
                      disabled={isCalculandoFrete}
                      className="bg-neutral-900 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-black disabled:opacity-50 cursor-pointer"
                    >
                      {isCalculandoFrete ? '...' : 'Calcular'}
                    </button>
                  </div>
                  {freteCalculado && (
                    <div className="mt-2 p-2 bg-neutral-50 border border-neutral-200 rounded-lg flex justify-between items-center text-xs">
                      <span className="font-mono text-neutral-700">{freteCalculado.transportadora} · {freteCalculado.prazo}</span>
                      <span className="font-bold font-mono text-neutral-900">R$ {freteCalculado.valor.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-1.5 pt-2 border-t border-dashed border-neutral-200 text-xs">
                  <div className="flex justify-between text-neutral-500">
                    <span>Subtotal de itens</span>
                    <span>R$ {subtotalItens.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-500">
                    <span>Envio</span>
                    <span>{freteCalculado ? `R$ ${freteCalculado.valor.toFixed(2)}` : 'A calcular / Acúmulo'}</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2 text-neutral-900 font-medium">
                    <span>Total no cartão</span>
                    <span className="text-sm font-bold font-serif">R$ {totalCartao.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-baseline p-2.5 bg-emerald-50 text-emerald-950 rounded-xl border border-emerald-200">
                    <div>
                      <span className="font-bold block text-xs">Total no Pix</span>
                      <span className="text-[10px] text-emerald-700">10% de desconto aplicado</span>
                    </div>
                    <span className="text-base font-bold font-serif text-emerald-900">R$ {totalPix.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleFinalizarWhatsApp}
                  className="w-full bg-[#1FAF38] hover:bg-[#1C9631] text-white py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <span>Finalizar pelo WhatsApp</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}