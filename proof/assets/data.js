/* Numbers for the Proof site. Source and period for each value are in the comments. */
window.AMP_DATA = {
  asOf: '22–28 Sep 2026',
  dailySwaps: 24372,   // AmperOps: 170,606 swaps / 7 days
  kmPerSwap: 47.5,     // inferred: 950k km/day ÷ 20k swaps/day (ampersand.energy)
  stations: 70,        // AmperOps: 41 Rwanda + 29 Kenya public stations
  trendUnit: 'swaps per month',
  // Milestones from ampersand.energy, and Sep 2026 from AmperOps (7-day total × 30.4 ÷ 7).
  trend: [
    {x: '2022-12', label: 'Dec 2022', y: 80000},
    {x: '2023-06', label: 'Jun 2023', y: 115000},
    {x: '2026-09', label: 'Sep 2026', y: 740917}
  ]
};
