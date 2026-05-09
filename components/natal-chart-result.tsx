import React from 'react';
import { Sun, Moon, Star, Compass, Home } from 'lucide-react';

export default function CarteNataleResult({ chartData, onReset }) {
  if (!chartData) return null;

  return (
    <div className="min-h-screen bg-[#0e0b1a] text-white p-4 md:p-8 font-sans">
      {/* 1. Header Premium (Inspiration image_9f48db) */}
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-[#1a162e] border border-amber-900/30 rounded-xl p-6 text-center">
          <h1 className="text-3xl font-serif text-amber-400 uppercase tracking-widest">
            {chartData.name || "Votre Carte Natale"}
          </h1>
          <p className="text-gray-400 mt-2 italic">Analyse du ciel au moment de votre naissance</p>
        </div>

        {/* 2. Cartes Ascendant & MC (Manquantes dans la V1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#1a162e] border border-amber-900/20 rounded-xl p-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase text-amber-500 font-bold">Ascendant</p>
              <h2 className="text-2xl font-serif">{chartData.ascendant?.sign || "Calcul en cours..."}</h2>
            </div>
            <Compass className="text-amber-400 w-10 h-10 opacity-50" />
          </div>
          <div className="bg-[#1a162e] border border-amber-900/20 rounded-xl p-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase text-amber-500 font-bold">Milieu du Ciel (MC)</p>
              <h2 className="text-2xl font-serif">{chartData.mc?.sign || "Calcul en cours..."}</h2>
            </div>
            <Star className="text-amber-400 w-10 h-10 opacity-50" />
          </div>
        </div>

        {/* 3. Portrait en Clair (La dimension pédagogique) */}
        <div className="bg-[#1a162e]/50 border border-amber-900/10 rounded-xl p-6">
          <h3 className="text-xl font-serif text-amber-400 mb-4">Votre Portrait en Clair</h3>
          <p className="text-gray-300 leading-relaxed italic">
            "Votre Soleil en {chartData.planets?.[0]?.sign} suggère une personnalité profonde..."
          </p>
          <p className="text-xs text-gray-500 mt-4">* Cette analyse simplifiée aide à comprendre votre thème sans jargon technique.</p>
        </div>

        {/* 4. Grille des Maisons (Structure image_9f48db) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="bg-[#1a162e] border border-white/5 p-3 rounded-lg text-center">
              <p className="text-[10px] text-gray-500 uppercase">Maison {i + 1}</p>
              <p className="text-sm font-semibold">{chartData.houses?.[i]?.sign || "---"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
