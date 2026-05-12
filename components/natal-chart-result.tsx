import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NatalChartResultProps {
  chartData: {
    ascendant?: { sign: string; degree: number };
    mc?: { sign: string; degree: number };
    planets?: Array<{ name: string; sign: string; degree: number; house: number }>;
    houses?: Array<{ number: number; sign: string; degree: number }>;
  };
  userName: string;
}

export default function NatalChartResult({ chartData, userName }: NatalChartResultProps) {
  if (!chartData) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header avec Nom */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-white uppercase">
          {userName}
        </h1>
        <div className="h-1 w-20 bg-amber-500 mx-auto rounded-full" />
      </div>

      {/* Points Cardinaux (Ascendant & MC) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-sm font-medium text-slate-400 uppercase tracking-wider">
              Ascendant
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <h2 className="text-3xl font-serif text-white">
              {chartData.ascendant?.sign} {chartData.ascendant?.degree?.toFixed(1)}°
            </h2>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-sm font-medium text-slate-400 uppercase tracking-wider">
              Milieu du Ciel
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <h2 className="text-3xl font-serif text-white">
              {chartData.mc?.sign} {chartData.mc?.degree?.toFixed(1)}°
            </h2>
          </CardContent>
        </Card>
      </div>

      {/* Positions Planétaires */}
      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-slate-400 text-sm uppercase">Positions Planétaires</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {chartData.planets?.map((planet) => (
              <div key={planet.name} className="flex justify-between items-center py-2 border-b border-slate-800 last:border-0">
                <span className="text-slate-300 font-medium">{planet.name}</span>
                <span className="text-amber-500 font-serif">
                  {planet.sign} {planet.degree.toFixed(1)}°
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}