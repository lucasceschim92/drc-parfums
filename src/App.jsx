import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  Plus, 
  Minus, 
  X, 
  Check, 
  ChevronRight, 
  Trash2,
  Crown,
  Ban,
  CreditCard
} from 'lucide-react';

const PERFUMES = [
  {
    id: 'boadicea-blue-sapphire',
    marca: 'BOADICEA THE VICTORIOUS',
    linha: 'NICHO · COMPARTILHÁVEL',
    nome: 'Blue Sapphire',
    precoPorMl: 34.00,
    mlDisponiveis: 18,
    apcDisponivel: false,
    familia: 'Oriental Amadeirado',
    saida: 'Limão, Camomila, Sálvia, Açafrão e Tagetes',
    coracao: 'Rosa, Jasmim Indiano e Magnólia',
    fundo: 'Agarwood (Oud), Patchouli e Âmbar',
    imagem: 'https://fimgs.net/mdimg/perfume/375x500.18518.jpg'
  },
  {
    id: 'lv-ombre-nomade',
    marca: 'LOUIS VUITTON',
    linha: 'ALTA PERFUMARIA · COMPARTILHÁVEL',
    nome: 'Ombre Nomade',
    precoPorMl: 35.00,
    mlDisponiveis: 18,
    apcDisponivel: false,
    familia: 'Oriental Amadeirado',
    saida: 'Framboesa, Açafrão e Rosa Damascena',
    coracao: 'Agarwood (Oud) e Olíbano',
    fundo: 'Bétula, Benjoim, Madeira de Âmbar e Gerânio',
    imagem: 'https://fimgs.net/mdimg/perfume/375x500.49755.jpg'
  },
  {
    id: 'crivelli-hibiscus-mahajad',
    marca: 'MAISON CRIVELLI',
    linha: 'EXTRAIT DE PARFUM · COMPARTILHÁVEL',
    nome: 'Hibiscus Mahajád',
    precoPorMl: 38.00,
    mlDisponiveis: 13,
    apcDisponivel: false,
    familia: 'Floral Oriental Frutado',
    saida: 'Hibisco, Cassis e Hortelã Picante',
    coracao: 'Rosa Damascena e Canela',
    fundo: 'Baunilha, Couro, Ambreta e Cedro',
    imagem: 'https://fimgs.net/mdimg/perfume/375x500.69069.jpg'
  },
  {
    id: 'bdk-gris-charnel',
    marca: 'BDK PARFUMS',
    linha: 'EAU DE PARFUM · COMPARTILHÁVEL',
    nome: 'Gris Charnel',
    precoPorMl: 18.00,
    mlDisponiveis: 18,
    apcDisponivel: false,
    familia: 'Oriental Especiado',
    saida: 'Cardamomo, Figo e Chá Preto',
    coracao: 'Íris e Vetiver de Bourbon',
    fundo: 'Sândalo e Fava Tonka',
    imagem: 'https://fimgs.net/mdimg/perfume/375x500.57038.jpg'
  },
  {
    id: 'birkholz-portraits-of-portofino',
    marca: 'BIRKHOLZ',
    linha: 'CLASSIC COLLECTION · COMPARTILHÁVEL',
    nome: 'Portraits of Portofino',
    precoPorMl: 19.50,
    mlDisponiveis: 24,
    apcDisponivel: false,
    familia: 'Cítrico Floral Amadeirado',
    saida: 'Bergamota, Mandarina e Limão Siciliano',
    coracao: 'Magnólia, Jasmim e Flores Brancas',
    fundo: 'Âmbar, Almíscar, Gengibre, Patchouli e Madeira',
    imagem: 'https://fimgs.net/mdimg/perfume/375x500.74869.jpg'
  },
  {
    id: 'amouage-jubilation-xxv',
    marca: 'AMOUAGE',
    linha: 'MAIN COLLECTION · MASCULINO',
    nome: 'Jubilation XXV Man',
    precoPorMl: 33.00,
    mlDisponiveis: 8,
    apcDisponivel: false,
    familia: 'Oriental Fougère',
    saida: 'Amora, Olíbano, Ládano, Laranja e Coentro',
    coracao: 'Mel, Madeira Guaiac, Canela e Louro',
    fundo: 'Oud, Mirra, Cedro, Patchouli e Âmbar',
    imagem: 'https://fimgs.net/mdimg/perfume/375x500.2366.jpg'
  },
  {
    id: 'xerjoff-40-knots',
    marca: 'XERJOFF',
    linha: 'JOIN THE CLUB COLLECTION · COMPARTILHÁVEL',
    nome: '40 Knots',
    precoPorMl: 15.00,
    mlDisponiveis: 38,
    apcDisponivel: false,
    familia: 'Aromático Aquático Amadeirado',
    saida: 'Notas Salgadas, Água do Mar e Cedro',
    coracao: 'Notas Verdes e Especiarias Frescas',
    fundo: 'Notas Amadeiradas, Cedro e Âmbar Suave',
    imagem: 'https://fimgs.net/mdimg/perfume/375x500.16445.jpg'
  },
  {
    id: 'creed-bois-du-portugal',
    marca: 'CREED',
    linha: 'HERITAGE COLLECTION · MASCULINO',
    nome: 'Bois du Portugal',
    precoPorMl: 24.00,
    mlDisponiveis: 44,
    apcDisponivel: false,
    familia: 'Oriental Amadeirado',
    saida: 'Bergamota da Calábria',
    coracao: 'Lavanda Francesa',
    fundo: 'Sândalo de Mysore, Cedro, Vetiver e Âmbar Cinzento',
    imagem: 'https://fimgs.net/mdimg/perfume/375x500.3805.jpg'
  },
  {
    id: 'clive-christian-1872',
    marca: 'CLIVE CHRISTIAN',
    linha: 'ORIGINAL COLLECTION · MASCULINO',
    nome: '1872 For Men',
    precoPorMl: 45.00,
    mlDisponiveis: 43,
    apcDisponivel: false,
    familia: 'Cítrico Aromático Especiado',
    saida: 'Petitgrain, Lima, Bergamota, Alecrim e Toranja',
    coracao: 'Sálvia Esclareia, Tagetes, Frésia e Jasmim',
    fundo: 'Cedro da Virgínia, Patchouli, Olíbano e Âmbar',
    imagem: 'https://fimgs.net/mdimg/perfume/375x500.4646.jpg'
  },
  {
    id: 'nishane-hacivat-x',
    marca: 'NISHANE',
    linha: 'X COLLECTION · COMPARTILHÁVEL',
    nome: 'Hacivat X',
    precoPorMl: 18.00,
    mlDisponiveis: 19,
    apcDisponivel: false,
    familia: 'Chipre Frutado',
    saida: 'Abacaxi, Bergamota e Pimenta Rosa',
    coracao: 'Lima, Flor de Laranjeira Tunisiana e Jasmim',
    fundo: 'Vetiver do Haiti, Patchouli e Cedro',
    imagem: 'https://fimgs.net/mdimg/perfume/375x500.80462.jpg'
  },
  {
    id: 'creed-absolu-aventus',
    marca: 'CREED',
    linha: 'AVENTUS COLLECTION · MASCULINO',
    nome: 'Absolu Aventus',
    precoPorMl: 33.00,
    mlDisponiveis: 15,
    apcDisponivel: false,
    familia: 'Chipre Frutado Especiado',
    saida: 'Abacaxi, Groselha Preta, Toranja e Pimenta Rosa',
    coracao: 'Canela, Gengibre e Cardamomo',
    fundo: 'Vetiver, Patchouli, Ambroxan e Musgo de Carvalho',
    imagem: 'https://fimgs.net/mdimg/perfume/375x500.84112.jpg'
  }
];

const TAXA_FRASCO_DECANT = 9.00;
const TAXA_FRASCO_APC = 40.00;
const TELEFONE_WHATSAPP = "5528999005475";
const LINK_GRUPO_WHATSAPP = "https://chat.whatsapp.com/FgtK9hr0KW2COsJdWtnDR9?s=cl&p=i&mlu=4&ilr=4";

export default function App() {
  const [selectedPerfume, setSelectedPerfume] = useState(null);
  const [volumeDesejado, setVolumeDesejado] = useState(3);
  const [querAPC, setQuerAPC] = useState(false);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Mantém perfumes com APC disponível exibidos primeiro
  const perfumesOrdenados = useMemo(() => {
    return [...PERFUMES].sort((a, b) => {
      if (a.apcDisponivel === b.apcDisponivel) return 0;
      return a.apcDisponivel ? -1 : 1;
    });
  }, []);

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

  const totalPix = cart.reduce((acc, item) => acc + item.subtotal, 0);

  const handleFinalizarWhatsApp = () => {
    let texto = `Olá! Gostaria de finalizar meu pedido na *DRC PARFUMS*.\n\n`;
    texto += `*Meu pedido:*\n`;

    cart.forEach(item => {
      if (item.isAPC) {
        texto += `🥂 *APC — APRESENTAÇÃO COMPLETA*\n`;
        texto += `• *${item.marca} ${item.nome}* — ${item.ml} ml restantes\n`;
        texto += `  (Frasco original + Caixa oficial: + R$ ${TAXA_FRASCO_APC.toFixed(2)})\n`;
        texto += `  R$ ${item.subtotal.toFixed(2)}\n\n`;
      } else {
        texto += `🧴 *DECANT*\n`;
        texto += `• *${item.marca} ${item.nome}* — ${item.ml} ml\n`;
        texto += `  Frasco atomizador: R$ ${TAXA_FRASCO_DECANT.toFixed(2)}\n`;
        texto += `  R$ ${item.subtotal.toFixed(2)}\n\n`;
      }
    });

    texto += `💰 *Total no PIX:* R$ ${totalPix.toFixed(2)}\n`;
    texto += `💳 *Pagamento em cartão:* consultar taxa\n\n`;
    texto += `Pode confirmar a disponibilidade do volume para mim?`;

    const url = `https://wa.me/${TELEFONE_WHATSAPP}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F8F8F7] text-[#191919] font-sans antialiased pb-20 sm:pb-8">
      {/* Header Sticky */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#ECECE6] px-3.5 sm:px-6 py-2.5 flex items-center justify-between shadow-xs">
        <div className="leading-tight">
          <span className="text-[9px] tracking-[0.25em] font-semibold text-neutral-400 uppercase block">Alta Perfumaria</span>
          <h1 className="text-base sm:text-lg font-serif tracking-widest font-bold text-neutral-900">DRC PARFUMS</h1>
        </div>

        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative flex items-center gap-1.5 bg-neutral-900 text-white px-3 py-1.5 rounded-full text-xs font-medium tracking-wide shadow hover:bg-black transition-transform active:scale-95"
        >
          <ShoppingBag size={14} />
          <span className="font-bold">{cart.length}</span>
          {cart.length > 0 && (
            <span className="text-[10px] border-l border-neutral-700 pl-1.5 font-mono text-neutral-200">
              R$ {totalPix.toFixed(0)}
            </span>
          )}
        </button>
      </header>

      {/* Banner de Entrada no Grupo VIP — Otimizado para iPhone e Desktop */}
      <section className="max-w-4xl mx-auto px-2.5 sm:px-4 pt-3 sm:pt-5">
        <a 
          href={LINK_GRUPO_WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded-2xl overflow-hidden border border-[#E5E4DE] shadow-sm hover:shadow-md transition-all active:scale-[0.99] group bg-[#111] focus:outline-none"
        >
          {/* Banner Mobile (iPhone/Android): travado em max-h-[340px] e aspect equilibrado */}
          <div className="block sm:hidden w-full max-h-[340px] aspect-[4/5] overflow-hidden bg-[#181816]">
            <img 
              src="/banner-mobile.jfif" 
              alt="Grupo Exclusivo WhatsApp DRC Parfums" 
              className="w-full h-full object-cover object-center group-hover:scale-[1.01] transition-transform duration-300"
            />
          </div>

          {/* Banner Desktop/Tablet: widescreen elegante com max-h controlado */}
          <div className="hidden sm:block w-full max-h-[260px] md:max-h-[290px] aspect-[21/9] overflow-hidden bg-[#181816]">
            <img 
              src="/banner-desktop.jfif" 
              alt="Grupo Exclusivo WhatsApp DRC Parfums" 
              className="w-full h-full object-cover object-center group-hover:scale-[1.01] transition-transform duration-300"
            />
          </div>
        </a>
      </section>

      {/* Grid 2x2 no Celular */}
      <main className="max-w-4xl mx-auto px-2.5 sm:px-4 py-4 sm:py-6">
        <div className="mb-3.5 flex items-center justify-between px-1">
          <div>
            <span className="text-[10px] tracking-widest uppercase text-neutral-500 font-semibold block">Frascos Disponíveis</span>
            <h2 className="text-sm sm:text-base font-serif font-bold text-neutral-900">Curadoria Exclusiva de Decants</h2>
          </div>
          <span className="text-[10px] font-mono text-neutral-500 bg-neutral-200/60 px-2 py-0.5 rounded-full">
            {perfumesOrdenados.length} perfumes
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {perfumesOrdenados.map((perfume) => (
            <div 
              key={perfume.id} 
              onClick={() => handleOpenDossie(perfume)}
              className="bg-white border border-[#E7E7E0] rounded-xl p-2.5 sm:p-3.5 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all active:scale-[0.99] cursor-pointer"
            >
              {/* Imagem com Tag de APC e ML */}
              <div className="relative aspect-square mb-2 bg-[#FAFAF9] rounded-lg overflow-hidden flex items-center justify-center p-2 border border-neutral-100">
                <img 
                  src={perfume.imagem} 
                  alt={perfume.nome} 
                  className="object-contain w-full h-full drop-shadow-xs" 
                  loading="lazy"
                />
                <span className={`absolute top-1.5 left-1.5 text-[8px] sm:text-[9px] font-mono font-bold px-1.5 py-0.5 rounded shadow-xs ${
                  perfume.mlDisponiveis <= 15 ? 'bg-amber-500 text-white' : 'bg-neutral-900/85 text-white'
                }`}>
                  {perfume.mlDisponiveis} ml disp.
                </span>

                {perfume.apcDisponivel && (
                  <span className="absolute bottom-1.5 right-1.5 text-[8px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300 px-1 py-0.5 rounded flex items-center gap-0.5 shadow-xs">
                    <Crown size={9} className="text-amber-700" /> APC Disp.
                  </span>
                )}
              </div>

              {/* Informações */}
              <div>
                <span className="text-[8.5px] sm:text-[9.5px] tracking-wider font-semibold text-neutral-400 uppercase truncate block">
                  {perfume.marca}
                </span>
                <h3 className="font-serif text-xs sm:text-sm font-bold text-neutral-900 leading-snug line-clamp-1">
                  {perfume.nome}
                </h3>
                
                <div className="mt-1.5 pt-1.5 border-t border-dashed border-neutral-200 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs sm:text-sm font-extrabold text-neutral-900">
                      R$ {perfume.precoPorMl.toFixed(2)}
                    </span>
                    <span className="text-[9px] text-neutral-400 ml-0.5">/ml</span>
                  </div>
                  <span className="text-[9px] font-sans text-neutral-500 uppercase tracking-tighter">
                    {perfume.apcDisponivel ? 'Decant/APC' : 'Decant'}
                  </span>
                </div>
              </div>

              {/* Botão */}
              <button
                type="button"
                className="mt-2.5 w-full py-1.5 sm:py-2 px-2 bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-800 rounded-lg text-[11px] font-semibold tracking-wide transition-colors flex items-center justify-center gap-1"
              >
                <Plus size={12} />
                <span>Escolher ml</span>
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Modal / Bottom-Sheet Mobile */}
      {selectedPerfume && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl p-4 sm:p-5 max-h-[90vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="w-10 h-1 bg-neutral-300 rounded-full mx-auto mb-3 sm:hidden" />

            <div className="flex justify-between items-start">
              <div>
                <span className="text-[9px] tracking-widest uppercase font-semibold text-neutral-400">
                  {selectedPerfume.marca}
                </span>
                <h3 className="text-base sm:text-lg font-serif font-bold text-neutral-900">
                  {selectedPerfume.nome}
                </h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-sm font-bold text-neutral-900">
                    R$ {selectedPerfume.precoPorMl.toFixed(2)} <span className="text-[10px] font-normal text-neutral-500">/ ml</span>
                  </span>
                  <span className="text-[9px] font-mono text-amber-900 bg-amber-100 font-bold px-1.5 py-0.5 rounded">
                    Restam {selectedPerfume.mlDisponiveis} ml
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedPerfume(null)}
                className="p-1 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100"
              >
                <X size={18} />
              </button>
            </div>

            {/* Pirâmide Olfativa */}
            <div className="my-3 p-3 bg-neutral-50 border border-neutral-200/80 rounded-xl">
              <div className="flex justify-between items-center mb-1.5 pb-1 border-b border-neutral-200 text-[10px]">
                <span className="font-mono uppercase text-neutral-400">Pirâmide Olfativa</span>
                <span className="font-serif font-medium text-neutral-700">{selectedPerfume.familia}</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-[9.5px]">
                <div>
                  <span className="text-[8px] uppercase font-bold text-neutral-400 block">Saída</span>
                  <p className="text-neutral-700 leading-tight line-clamp-3">{selectedPerfume.saida}</p>
                </div>
                <div>
                  <span className="text-[8px] uppercase font-bold text-neutral-400 block">Coração</span>
                  <p className="text-neutral-700 leading-tight line-clamp-3">{selectedPerfume.coracao}</p>
                </div>
                <div>
                  <span className="text-[8px] uppercase font-bold text-neutral-400 block">Fundo</span>
                  <p className="text-neutral-700 leading-tight line-clamp-3">{selectedPerfume.fundo}</p>
                </div>
              </div>
            </div>

            {/* Controle de APC */}
            {selectedPerfume.apcDisponivel ? (
              <div 
                onClick={handleToggleAPC}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer mb-3 flex items-center justify-between ${
                  querAPC ? 'bg-amber-50 border-amber-400 text-amber-950' : 'bg-neutral-50 border-neutral-200 text-neutral-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                    querAPC ? 'bg-amber-600 border-amber-600 text-white' : 'bg-white border-neutral-300'
                  }`}>
                    {querAPC && <Check size={11} />}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold block flex items-center gap-1">
                      <Crown size={12} className="text-amber-600" /> Disputar APC (Apresentação Completa)
                    </span>
                    <span className="text-[9px] text-neutral-500">Frasco + Caixa Oficial (+ R$ {TAXA_FRASCO_APC.toFixed(2)})</span>
                  </div>
                </div>
                <span className="text-[9px] font-mono font-bold bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded">
                  {selectedPerfume.mlDisponiveis} ml
                </span>
              </div>
            ) : (
              <div className="p-2 rounded-xl border border-neutral-200 bg-neutral-50 mb-3 flex items-center justify-between text-neutral-400 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <Ban size={13} className="text-neutral-400" />
                  <span>Apresentação Completa (APC) Indisponível</span>
                </div>
                <span className="text-[9px] font-mono uppercase bg-neutral-200 text-neutral-600 px-1.5 py-0.5 rounded">
                  Retido
                </span>
              </div>
            )}

            {/* Seletor de Decant */}
            {!querAPC && (
              <div className="space-y-2.5">
                <div className="flex justify-between items-baseline">
                  <label className="text-[10px] uppercase tracking-wider font-semibold text-neutral-500">Volume do Decant</label>
                  <span className="text-[9.5px] text-neutral-400">Mínimo 3 ml</span>
                </div>

                <div className="grid grid-cols-4 gap-1.5">
                  {[3, 5, 10, 15].map((vol) => (
                    <button
                      key={vol}
                      disabled={vol > selectedPerfume.mlDisponiveis}
                      onClick={() => setVolumeDesejado(vol)}
                      className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                        volumeDesejado === vol 
                          ? 'bg-neutral-900 text-white border-neutral-900' 
                          : 'border-neutral-200 text-neutral-700 bg-white'
                      } disabled:opacity-30`}
                    >
                      {vol} ml
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between border border-neutral-300 rounded-xl p-1.5 bg-white">
                  <button 
                    onClick={handleDecrement}
                    disabled={volumeDesejado <= 3}
                    className="w-9 h-9 flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-100 disabled:opacity-30"
                  >
                    <Minus size={14} />
                  </button>
                  <div className="text-center">
                    <span className="text-xl font-serif font-bold text-neutral-900 leading-none">{volumeDesejado}</span>
                    <span className="text-[9px] font-mono uppercase text-neutral-400 block">ML</span>
                  </div>
                  <button 
                    onClick={handleIncrement}
                    disabled={volumeDesejado >= selectedPerfume.mlDisponiveis}
                    className="w-9 h-9 flex items-center justify-center rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-100 disabled:opacity-30"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <div className="p-2 bg-neutral-50 border border-neutral-200 rounded-lg flex items-center justify-between text-[10px]">
                  <div className="flex items-center gap-2">
                    <Check size={11} className="text-neutral-900 font-bold" />
                    <span className="text-neutral-700">Atomizador com vidro graduado (+ R$ {TAXA_FRASCO_DECANT.toFixed(2)})</span>
                  </div>
                  <span className="font-mono text-neutral-400 uppercase text-[9px]">Incluso</span>
                </div>
              </div>
            )}

            {/* Rodapé */}
            <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center justify-between gap-3">
              <div>
                <span className="text-[9px] font-mono text-neutral-400 uppercase block">Total</span>
                <span className="text-lg font-bold font-serif text-neutral-900">
                  R$ {((volumeDesejado * selectedPerfume.precoPorMl) + (querAPC ? TAXA_FRASCO_APC : TAXA_FRASCO_DECANT)).toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-neutral-900 text-white py-2.5 px-3 rounded-xl text-xs font-semibold uppercase tracking-wide hover:bg-black transition-colors flex items-center justify-center gap-1.5"
              >
                <span>{querAPC ? 'Disputar APC' : 'Adicionar Decant'}</span>
                <Plus size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Carrinho Lateral */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
          <div className="bg-white w-full max-w-sm h-full flex flex-col justify-between p-4 sm:p-5 shadow-2xl">
            <div>
              <div className="flex justify-between items-start pb-3 border-b border-neutral-200">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400">DRC Parfums</span>
                  <h3 className="text-base font-serif font-bold text-neutral-900">Seu Pedido</h3>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 text-neutral-400 hover:text-neutral-900"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="divide-y divide-neutral-100 max-h-[50vh] overflow-y-auto my-2 pr-1">
                {cart.length === 0 ? (
                  <p className="text-xs text-neutral-400 py-8 text-center">Nenhum item selecionado ainda.</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="py-2.5 flex justify-between items-center gap-2">
                      <div className="flex items-center gap-2">
                        <img src={item.imagem} alt={item.nome} className="w-10 h-10 object-contain rounded bg-white border border-neutral-200 p-0.5" />
                        <div>
                          <span className="text-[8px] font-bold text-neutral-400 uppercase block leading-tight">{item.marca}</span>
                          <h4 className="text-[11px] font-serif font-semibold text-neutral-900 leading-tight">{item.nome}</h4>
                          <span className="text-[10px] text-neutral-500 font-mono">
                            {item.ml} ml {item.isAPC ? '· APC (+R$40)' : '· Decant (+R$9)'}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold font-serif text-neutral-900 block">R$ {item.subtotal.toFixed(2)}</span>
                        <button 
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="text-neutral-400 hover:text-rose-600 mt-0.5"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {cart.length > 0 && (
              <div className="border-t border-neutral-200 pt-3 space-y-3">
                {/* Total no PIX */}
                <div className="flex justify-between items-center p-3 bg-emerald-50 text-emerald-950 rounded-xl border border-emerald-200 shadow-xs">
                  <div>
                    <span className="font-bold block text-xs">Total no PIX</span>
                    <span className="text-[10px] text-emerald-700">Chave e dados no WhatsApp</span>
                  </div>
                  <span className="text-lg font-bold font-serif text-emerald-900">
                    R$ {totalPix.toFixed(2)}
                  </span>
                </div>

                {/* Aviso sobre cartão */}
                <div className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-600 text-[11px]">
                  <CreditCard size={13} className="text-neutral-500" />
                  <span>Pagamento em cartão: <strong>consultar taxa</strong></span>
                </div>

                {/* Finalizar WhatsApp */}
                <button
                  onClick={handleFinalizarWhatsApp}
                  className="w-full bg-[#1FAF38] hover:bg-[#1C9631] text-white py-3 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md active:scale-98 transition-transform cursor-pointer"
                >
                  <span>Pedir pelo WhatsApp</span>
                  <ChevronRight size={15} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}