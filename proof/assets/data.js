/* Numbers for the Proof site. Each value has its source and period. Update before launch. */
window.AMP_DATA = {
  asOf: '22–28 Sep 2026',
  dailySwaps: 24372,   // AmperOps: 170,606 swaps / 7 days
  kmPerSwap: 54,       // Metabase cycles_v2: 52–58 km average per discharge cycle, 22–28 Sep 2026
  stations: 70,        // AmperOps: 41 Rwanda + 29 Kenya public stations
  // Share of daily swaps by hour, Kigali time. Shape from Metabase swaps_v2 (peak about 18:00 local), smoothed.
  hourly: [0.6,0.4,0.3,0.3,0.5,1.5,3.5,5.0,5.4,5.4,5.3,5.3,5.4,5.4,5.5,5.7,5.9,6.1,6.2,5.9,5.3,4.8,4.6,2.2],
  trendUnit: 'swaps',
  // Metabase swaps_v2, monthly totals, Rwanda + Kenya, UTC months. Sep 2026 left out (partial month).
  trend: [
    {x: '2023-01', label: 'Jan 2023', y: 83645},
    {x: '2023-02', label: 'Feb 2023', y: 77736},
    {x: '2023-03', label: 'Mar 2023', y: 86091},
    {x: '2023-04', label: 'Apr 2023', y: 84738},
    {x: '2023-05', label: 'May 2023', y: 99444},
    {x: '2023-06', label: 'Jun 2023', y: 108228},
    {x: '2023-07', label: 'Jul 2023', y: 120504},
    {x: '2023-08', label: 'Aug 2023', y: 130997},
    {x: '2023-09', label: 'Sep 2023', y: 126132},
    {x: '2023-10', label: 'Oct 2023', y: 135939},
    {x: '2023-11', label: 'Nov 2023', y: 143143},
    {x: '2023-12', label: 'Dec 2023', y: 175622},
    {x: '2024-01', label: 'Jan 2024', y: 191356},
    {x: '2024-02', label: 'Feb 2024', y: 194154},
    {x: '2024-03', label: 'Mar 2024', y: 230599},
    {x: '2024-04', label: 'Apr 2024', y: 232452},
    {x: '2024-05', label: 'May 2024', y: 263532},
    {x: '2024-06', label: 'Jun 2024', y: 289953},
    {x: '2024-07', label: 'Jul 2024', y: 337660},
    {x: '2024-08', label: 'Aug 2024', y: 369055},
    {x: '2024-09', label: 'Sep 2024', y: 385099},
    {x: '2024-10', label: 'Oct 2024', y: 429877},
    {x: '2024-11', label: 'Nov 2024', y: 439348},
    {x: '2024-12', label: 'Dec 2024', y: 507031},
    {x: '2025-01', label: 'Jan 2025', y: 517376},
    {x: '2025-02', label: 'Feb 2025', y: 495708},
    {x: '2025-03', label: 'Mar 2025', y: 547084},
    {x: '2025-04', label: 'Apr 2025', y: 514357},
    {x: '2025-05', label: 'May 2025', y: 544476},
    {x: '2025-06', label: 'Jun 2025', y: 532568},
    {x: '2025-07', label: 'Jul 2025', y: 555891},
    {x: '2025-08', label: 'Aug 2025', y: 551711},
    {x: '2025-09', label: 'Sep 2025', y: 525001},
    {x: '2025-10', label: 'Oct 2025', y: 531626},
    {x: '2025-11', label: 'Nov 2025', y: 530797},
    {x: '2025-12', label: 'Dec 2025', y: 590985},
    {x: '2026-01', label: 'Jan 2026', y: 604506},
    {x: '2026-02', label: 'Feb 2026', y: 550112},
    {x: '2026-03', label: 'Mar 2026', y: 633126},
    {x: '2026-04', label: 'Apr 2026', y: 631547},
    {x: '2026-05', label: 'May 2026', y: 702301},
    {x: '2026-06', label: 'Jun 2026', y: 713089},
    {x: '2026-07', label: 'Jul 2026', y: 764526},
    {x: '2026-08', label: 'Aug 2026', y: 774874}
  ],
  // Metabase cycles_v2, average km per discharge cycle, cycles started 22–28 Sep 2026.
  kmByModel: [
    {label: 'AMP 02 · Rwanda', value: 58.1, group: 'rw'},
    {label: 'AMP 01 · Kenya', value: 55.0, group: 'ke'},
    {label: 'AMP 01 · Rwanda', value: 52.4, group: 'rw'},
    {label: 'AMP 02 · Kenya', value: 52.4, group: 'ke'}
  ]
};
