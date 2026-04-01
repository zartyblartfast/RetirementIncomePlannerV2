import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ReferenceLine,
} from 'recharts';
import type { YearRow } from '../../engine/types';

interface Props {
  years: YearRow[];
}

interface ChartRow {
  age: number;
  target_net: number;
  net_income: number;
  total_capital: number;
  guaranteed: number;
  pot_withdrawals: number;
}

function fmt(n: number): string {
  return '£' + Math.round(n).toLocaleString('en-GB');
}

export default function ProjectionChart({ years }: Props) {
  const data: ChartRow[] = years.map(yr => ({
    age: yr.age,
    target_net: Math.round(yr.target_net),
    net_income: Math.round(yr.net_income_achieved),
    total_capital: Math.round(yr.total_capital),
    guaranteed: Math.round(yr.guaranteed_total),
    pot_withdrawals: Math.round(yr.dc_withdrawal_gross + yr.tf_withdrawal),
  }));

  return (
    <div className="space-y-6">
      {/* Income chart */}
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Annual Income</h3>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="age" tick={{ fontSize: 11 }} label={{ value: 'Age', position: 'insideBottom', offset: -2, fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `£${(v / 1000).toFixed(0)}k`} />
            <Tooltip formatter={(v: number) => fmt(v)} labelFormatter={l => `Age ${l}`} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area type="monotone" dataKey="guaranteed" name="Guaranteed Income" stackId="1"
              fill="#f59e0b" stroke="#d97706" fillOpacity={0.7} />
            <Area type="monotone" dataKey="pot_withdrawals" name="Pot Withdrawals" stackId="1"
              fill="#3b82f6" stroke="#2563eb" fillOpacity={0.6} />
            <ReferenceLine y={0} stroke="#9ca3af" />
            {data.length > 0 && (
              <Area type="monotone" dataKey="target_net" name="Target Net"
                fill="none" stroke="#ef4444" strokeDasharray="5 3" fillOpacity={0} />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Capital chart */}
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Total Capital</h3>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="age" tick={{ fontSize: 11 }} label={{ value: 'Age', position: 'insideBottom', offset: -2, fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `£${(v / 1000).toFixed(0)}k`} />
            <Tooltip formatter={(v: number) => fmt(v)} labelFormatter={l => `Age ${l}`} />
            <Area type="monotone" dataKey="total_capital" name="Total Capital"
              fill="#10b981" stroke="#059669" fillOpacity={0.4} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
