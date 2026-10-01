/* 3D product models for the Proof site.
   MK2 pack: the real CAD (MK2A001A01 MK2 Battery pack v37, exterior parts only), 322 × 291 × 128 mm,
   loaded from assets/models/mk2.gltf.json (glTF with embedded data, so any static host serves it). Made with tools/step_to_web.py and gltfpack. If the file cannot
   load, a simple hand-built pack is used instead.
   Hand-built, to scale from the specifications:
   HM1 pack 350 × 363 × 287 mm (Hardware product portfolio, Aug 2026), shaped from the HM1.9 render
   12-slot cabinet 1500 × 600 × 1825 mm, 3 × 4 slots, 10.1" screen (Swap station specifications)
   Needs three.js r128 (global THREE). Usage: ampModel(element, 'mk2' | 'compare' | 'cabinet'). */
(function () {
  'use strict';
  // Our approved logo files (assets/brand), embedded so the canvas texture never taints.
  var MARK = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwMCIgaGVpZ2h0PSIxMjA1IiB2aWV3Qm94PSIwIDAgMTAwMCAxMjA1IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNNjcxLjU4IDMzLjkzODFMNTYyLjY0NiA0NDAuMjU0QzU1NS4yODMgNDY3LjY2IDUzMC40MzggNDg2Ljc1NCA1MDEuOTk2IDQ4Ni43NTRIMjYuOTEyOEMwLjY2Mjg3NyA0ODYuNzU0IC0xMC4wMTcgNDUyLjk0NiAxMS41MTEzIDQzNy44OTVMNjMwLjIxIDQuOTU5NjlDNjUwLjc4MyAtOS40MTcyMSA2NzguMDQ1IDkuNjc3MTEgNjcxLjU4IDMzLjg4MlYzMy45MzgxWiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTE0MS4xMjggMTE3MS4wNkwyODQuNjg4IDYzNS42OTFDMjkyLjMzMiA2MDcuMTA2IDMxOC4yNDUgNTg3LjI4MSAzNDcuODY3IDU4Ny4yODFIOTczLjA4NkM5OTkuMzM2IDU4Ny4yODEgMTAxMC4wMiA2MjEuMDg5IDk4OC40ODggNjM2LjE0TDE4Mi40OTkgMTIwMC4wNEMxNjEuOTI2IDEyMTQuNDIgMTM0LjY2NCAxMTk1LjMyIDE0MS4xMjggMTE3MS4xMlYxMTcxLjA2WiIgZmlsbD0iYmxhY2siLz4KPC9zdmc+Cg==';
  var LOGO = { black: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwMCIgaGVpZ2h0PSI1ODAiIHZpZXdCb3g9IjAgMCAyNTAwIDU4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzUyOV8xMDIxKSI+CjxwYXRoIGQ9Ik0zMjMuMDY4IDE2LjI5NTlMMjcwLjY4IDIxMS44ODZDMjY3LjE0IDIyNS4wOCAyNTUuMTY4IDIzNC4yNTUgMjQxLjQ5MiAyMzQuMjU1SDEyLjkzMjdDMC4zMDUzNjYgMjM0LjI1NSAtNC44NTA0NCAyMTguMDAzIDUuNTA0ODcgMjEwLjc1MUwzMDMuMTQ0IDIuNDAzMTJDMzEzLjAxOCAtNC40OTk1NiAzMjYuMTcgNC42NzQ4OSAzMjMuMDI0IDE2LjMzOTZMMzIzLjA2OCAxNi4yOTU5WiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTY3Ljg5OTYgNTYzLjcwNUwxMzYuOTM1IDMwNS45OUMxNDAuNjA1IDI5Mi4yMjkgMTUzLjEwMiAyODIuNjYxIDE2Ny4zMDIgMjgyLjY2MUg0NjguMDQzQzQ4MC42NyAyODIuNjYxIDQ4NS44MjYgMjk4LjkxMyA0NzUuNDcxIDMwNi4xNjVMODcuNzggNTc3LjU5OEM3Ny45MDUzIDU4NC41MDEgNjQuNzUzNyA1NzUuMzI2IDY3Ljg5OTYgNTYzLjY2MVY1NjMuNzA1WiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTcyMi43NzIgNDMyLjE1OVYzODEuNTY5SDY3NC42NjZMNjU3LjM2MyA0MzIuMTU5SDU5My41NzFMNzA1LjYwMSAxNDcuODM5SDc3Ni4xMjJMNzg2LjMwMiA0MzIuMTU5SDcyMi43MjlINzIyLjc3MlpNNzIzLjk5NiAzMzUuNTY2TDcyNC44MjYgMjQwLjIzOUg3MjMuOTk2TDY5MC45NjQgMzM1LjU2Nkg3MjMuOTk2WiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTk2Ni45MzMgNDMyLjE1OUw5OTQuMDIzIDI4MC4zODhIOTkxLjkyNkw5NDguMzIgMzgxLjU2OUg5MTMuNjI3TDkwNS43NjIgMjgwLjM4OEg5MDMuNjY1TDg3Ni41NzUgNDMyLjE1OUg4MjEuMzkxTDg3MS4zNzYgMTQ3LjgzOUg5MzMuNDJMOTQ1LjQ4IDI5Mi45MjZIOTQ3LjE0TDEwMTAuODQgMTQ3LjgzOUgxMDczLjMzTDEwMjIuOSA0MzIuMTU5SDk2Ni44NDZIOTY2LjkzM1oiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGQ9Ik0xMDc4LjY1IDQzMi4xNTlMMTEyOC42NCAxNDcuODM5SDEyMDIuMzVDMTI1MC44NSAxNDcuODM5IDEyNzguMDIgMTY3LjQ5OCAxMjc4LjAyIDIxOC40ODJDMTI3OC4wMiAyNzguNjg0IDEyNDQuNTYgMzI5LjI3NSAxMTgxLjQyIDMyOS4yNzVIMTE2MC41M0wxMTQyLjE4IDQzMi4xMTZIMTA3OC42NVY0MzIuMTU5Wk0xMTgyLjY5IDI3Ni42MzFDMTIwNi4xMSAyNzYuNjMxIDEyMTMuMjMgMjQ1LjI2MyAxMjEzLjIzIDIyNC43NzNDMTIxMy4yMyAyMDguMDQxIDEyMDYuMTEgMjAxLjM1NiAxMTkzLjE3IDIwMS4zNTZIMTE4Mi43M0wxMTcwLjE5IDI3Ni42MzFIMTE4Mi43M0gxMTgyLjY5WiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTEyNzkuNzggNDMyLjE1OUwxMzI5LjMzIDE0Ny44MzlIMTQ2Ni4wOUwxNDU1Ljc3IDIwNC43MkgxMzgzLjc3TDEzNzQuMTEgMjYxLjE2NUgxNDM2Ljc3TDE0MjYuODkgMzE2LjM0M0gxMzY0LjU0TDEzNTQuMDYgMzc1LjcxNUgxNDI2LjM3TDE0MTYuMDYgNDMyLjE1OUgxMjc5Ljc4WiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTE1NDYuNTIgMzI0LjI5NEwxNTI3LjM0IDQzMi4xNTlIMTQ2My43N0wxNTEzLjc1IDE0Ny44MzlIMTU4OS4xMkMxNjM0LjcgMTQ3LjgzOSAxNjYzLjU4IDE2NS40MDEgMTY2My41OCAyMTYuNDI5QzE2NjMuNTggMjU3LjQwOCAxNjQ3LjY3IDI5MC40MzYgMTYyMC41IDMwOC44MjlMMTYzNC43OCA0MzIuMTU5SDE1NzEuNDdMMTU2Mi44MiAzMjQuMjk0SDE1NDYuNTJaTTE1NjcuODQgMjAxLjM1NkwxNTU1LjcgMjcyLjg3NEgxNTY5LjUxQzE1OTEuNjYgMjcyLjg3NCAxNTk4LjM0IDI0NC44NyAxNTk4LjM0IDIyMy4xMTNDMTU5OC4zNCAyMDguNDc4IDE1OTIuMDUgMjAxLjM1NiAxNTc5LjEyIDIwMS4zNTZIMTU2Ny44NFoiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGQ9Ik0xNzM2LjA3IDM1MC4yMDJDMTczNC40MSAzNjcuNzY0IDE3MzguNTYgMzgxLjU3IDE3NTIuOCAzODEuNTdDMTc3MC44IDM4MS41NyAxNzc3Ljg4IDM2MC4yNSAxNzc3Ljg4IDM0NS4xNzhDMTc3Ny44OCAzMzAuMTA1IDE3NzQuMTIgMzIzLjAyOCAxNzU5LjA1IDMxNi43MzdMMTc0OC42MSAzMTIuNTQzQzE3MTMuNDggMjk4LjczNyAxNzAyLjYgMjgzLjI3MiAxNzAyLjYgMjQ1LjY1N0MxNzAyLjYgMTk1Ljg5NiAxNzI5LjM0IDE0My42NDYgMTc5Mi41MiAxNDMuNjQ2QzE4MzQuNzcgMTQzLjY0NiAxODY1LjcxIDE2Ni4yMzIgMTg2Mi43OCAyMTcuNjUzTDE4NjIuNiAyMjEuODlMMTgwNS4wMiAyMjcuMjY0VjIyMy41MDdDMTgwNS41IDIwNy4yMTEgMTgwMC45MSAxOTguNDMgMTc4OC4zNyAxOTguNDNDMTc3My4yOSAxOTguNDMgMTc2NS43OCAyMTUuOTkzIDE3NjUuNzggMjI5Ljc5OEMxNzY1Ljc4IDI0My42MDMgMTc2OC43MSAyNTAuMjg4IDE3ODMuMzQgMjU2LjE0MkwxNzkzLjc5IDI2MC4zMzZDMTgyNy4yNiAyNzMuNzA0IDE4NDIuMjkgMjg3LjUxIDE4NDIuMjkgMzMwLjE0OUMxODQyLjI5IDM4NS4zMjcgMTgwNy45OSA0MzYuMzU0IDE3NDcuMzggNDM2LjM1NEMxNzAwLjU0IDQzNi4zNTQgMTY3MS4yNyA0MDQuNTkzIDE2NzUuNDYgMzU2LjkzTDE2NzUuODYgMzUyLjY5MkwxNzM2LjQ2IDM0Ni40ODhMMTczNi4xMSAzNTAuMjQ1TDE3MzYuMDcgMzUwLjIwMloiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGQ9Ik0yMDc5LjE0IDQzMi4xNTlMMjEyOS4xMyAxNDcuODM5SDIxOTUuMzNMMjIwOS45MiAzMTAuNDg5SDIyMTIuMDJMMjI0MS4yIDE0Ny44MzlIMjI5Ni44MkwyMjQ2LjQgNDMyLjE1OUgyMTgwLjY0TDIxNjUuMTggMjY5LjUxSDIxNjMuMDhMMjEzMy44OSA0MzIuMTU5SDIwNzkuMTRaIiBmaWxsPSJibGFjayIvPgo8cGF0aCBkPSJNMjMwMS44OSA0MzIuMTU5TDIzNTEuODggMTQ3LjgzOUgyNDI4LjA4QzI0NjkuOSAxNDcuODM5IDI1MDAgMTY3LjA2MiAyNTAwIDIxMi42MjhDMjUwMCAyNDYuNDg2IDI0ODEuMTcgMzU1LjE4MSAyNDY2LjUzIDM4NS4zMjZDMjQ1MS4wNiA0MTYuMjU3IDI0MjUuMTUgNDMyLjE1OSAyMzgyLjkgNDMyLjE1OUgyMzAxLjg5Wk0yMzg3LjEgMzc1LjcxNUMyMzk3Ljk4IDM3NS43MTUgMjQwNC42NiAzNzEuNTIxIDI0MDkuMjUgMzYxLjUxNkMyNDE1LjkzIDM0Ny4zMTggMjQzMy41IDI0NC44NyAyNDMzLjUgMjIyLjcyQzI0MzMuNSAyMTEuMDEyIDI0MjYuODEgMjA0LjcyIDI0MTUuNSAyMDQuNzJIMjQwNS40OUwyMzc1Ljc4IDM3NS43MTVIMjM4Ny4xWiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTE5ODAuNDggNDMyLjE1OVYzODEuNTY5SDE5MzIuMzhMMTkxNS4wNyA0MzIuMTU5SDE4NTEuMjhMMTk2My4zMSAxNDcuODM5SDIwMzMuODNMMjA0NC4wMSA0MzIuMTU5SDE5ODAuNDRIMTk4MC40OFpNMTk4MS43NSAzMzUuNTY2TDE5ODIuNTggMjQwLjIzOUgxOTgxLjc1TDE5NDguNzIgMzM1LjU2NkgxOTgxLjc1WiIgZmlsbD0iYmxhY2siLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF81MjlfMTAyMSI+CjxyZWN0IHdpZHRoPSIyNTAwIiBoZWlnaHQ9IjU4MCIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K', yellow: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwMCIgaGVpZ2h0PSI1ODAiIHZpZXdCb3g9IjAgMCAyNTAwIDU4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzUyOV8xMDIxKSI+CjxwYXRoIGQ9Ik0zMjMuMDY4IDE2LjI5NTlMMjcwLjY4IDIxMS44ODZDMjY3LjE0IDIyNS4wOCAyNTUuMTY4IDIzNC4yNTUgMjQxLjQ5MiAyMzQuMjU1SDEyLjkzMjdDMC4zMDUzNjYgMjM0LjI1NSAtNC44NTA0NCAyMTguMDAzIDUuNTA0ODcgMjEwLjc1MUwzMDMuMTQ0IDIuNDAzMTJDMzEzLjAxOCAtNC40OTk1NiAzMjYuMTcgNC42NzQ4OSAzMjMuMDI0IDE2LjMzOTZMMzIzLjA2OCAxNi4yOTU5WiIgZmlsbD0iI0ZDREMwNCIvPgo8cGF0aCBkPSJNNjcuODk5NiA1NjMuNzA1TDEzNi45MzUgMzA1Ljk5QzE0MC42MDUgMjkyLjIyOSAxNTMuMTAyIDI4Mi42NjEgMTY3LjMwMiAyODIuNjYxSDQ2OC4wNDNDNDgwLjY3IDI4Mi42NjEgNDg1LjgyNiAyOTguOTEzIDQ3NS40NzEgMzA2LjE2NUw4Ny43OCA1NzcuNTk4Qzc3LjkwNTMgNTg0LjUwMSA2NC43NTM3IDU3NS4zMjYgNjcuODk5NiA1NjMuNjYxVjU2My43MDVaIiBmaWxsPSIjRkNEQzA0Ii8+CjxwYXRoIGQ9Ik03MjIuNzcyIDQzMi4xNTlWMzgxLjU2OUg2NzQuNjY2TDY1Ny4zNjMgNDMyLjE1OUg1OTMuNTcxTDcwNS42MDEgMTQ3LjgzOUg3NzYuMTIyTDc4Ni4zMDIgNDMyLjE1OUg3MjIuNzI5SDcyMi43NzJaTTcyMy45OTYgMzM1LjU2Nkw3MjQuODI2IDI0MC4yMzlINzIzLjk5Nkw2OTAuOTY0IDMzNS41NjZINzIzLjk5NloiIGZpbGw9IiNGQ0RDMDQiLz4KPHBhdGggZD0iTTk2Ni45MzMgNDMyLjE1OUw5OTQuMDIzIDI4MC4zODhIOTkxLjkyNkw5NDguMzIgMzgxLjU2OUg5MTMuNjI3TDkwNS43NjIgMjgwLjM4OEg5MDMuNjY1TDg3Ni41NzUgNDMyLjE1OUg4MjEuMzkxTDg3MS4zNzYgMTQ3LjgzOUg5MzMuNDJMOTQ1LjQ4IDI5Mi45MjZIOTQ3LjE0TDEwMTAuODQgMTQ3LjgzOUgxMDczLjMzTDEwMjIuOSA0MzIuMTU5SDk2Ni44NDZIOTY2LjkzM1oiIGZpbGw9IiNGQ0RDMDQiLz4KPHBhdGggZD0iTTEwNzguNjUgNDMyLjE1OUwxMTI4LjY0IDE0Ny44MzlIMTIwMi4zNUMxMjUwLjg1IDE0Ny44MzkgMTI3OC4wMiAxNjcuNDk4IDEyNzguMDIgMjE4LjQ4MkMxMjc4LjAyIDI3OC42ODQgMTI0NC41NiAzMjkuMjc1IDExODEuNDIgMzI5LjI3NUgxMTYwLjUzTDExNDIuMTggNDMyLjExNkgxMDc4LjY1VjQzMi4xNTlaTTExODIuNjkgMjc2LjYzMUMxMjA2LjExIDI3Ni42MzEgMTIxMy4yMyAyNDUuMjYzIDEyMTMuMjMgMjI0Ljc3M0MxMjEzLjIzIDIwOC4wNDEgMTIwNi4xMSAyMDEuMzU2IDExOTMuMTcgMjAxLjM1NkgxMTgyLjczTDExNzAuMTkgMjc2LjYzMUgxMTgyLjczSDExODIuNjlaIiBmaWxsPSIjRkNEQzA0Ii8+CjxwYXRoIGQ9Ik0xMjc5Ljc4IDQzMi4xNTlMMTMyOS4zMyAxNDcuODM5SDE0NjYuMDlMMTQ1NS43NyAyMDQuNzJIMTM4My43N0wxMzc0LjExIDI2MS4xNjVIMTQzNi43N0wxNDI2Ljg5IDMxNi4zNDNIMTM2NC41NEwxMzU0LjA2IDM3NS43MTVIMTQyNi4zN0wxNDE2LjA2IDQzMi4xNTlIMTI3OS43OFoiIGZpbGw9IiNGQ0RDMDQiLz4KPHBhdGggZD0iTTE1NDYuNTIgMzI0LjI5NEwxNTI3LjM0IDQzMi4xNTlIMTQ2My43N0wxNTEzLjc1IDE0Ny44MzlIMTU4OS4xMkMxNjM0LjcgMTQ3LjgzOSAxNjYzLjU4IDE2NS40MDEgMTY2My41OCAyMTYuNDI5QzE2NjMuNTggMjU3LjQwOCAxNjQ3LjY3IDI5MC40MzYgMTYyMC41IDMwOC44MjlMMTYzNC43OCA0MzIuMTU5SDE1NzEuNDdMMTU2Mi44MiAzMjQuMjk0SDE1NDYuNTJaTTE1NjcuODQgMjAxLjM1NkwxNTU1LjcgMjcyLjg3NEgxNTY5LjUxQzE1OTEuNjYgMjcyLjg3NCAxNTk4LjM0IDI0NC44NyAxNTk4LjM0IDIyMy4xMTNDMTU5OC4zNCAyMDguNDc4IDE1OTIuMDUgMjAxLjM1NiAxNTc5LjEyIDIwMS4zNTZIMTU2Ny44NFoiIGZpbGw9IiNGQ0RDMDQiLz4KPHBhdGggZD0iTTE3MzYuMDcgMzUwLjIwMkMxNzM0LjQxIDM2Ny43NjQgMTczOC41NiAzODEuNTcgMTc1Mi44IDM4MS41N0MxNzcwLjggMzgxLjU3IDE3NzcuODggMzYwLjI1IDE3NzcuODggMzQ1LjE3OEMxNzc3Ljg4IDMzMC4xMDUgMTc3NC4xMiAzMjMuMDI4IDE3NTkuMDUgMzE2LjczN0wxNzQ4LjYxIDMxMi41NDNDMTcxMy40OCAyOTguNzM3IDE3MDIuNiAyODMuMjcyIDE3MDIuNiAyNDUuNjU3QzE3MDIuNiAxOTUuODk2IDE3MjkuMzQgMTQzLjY0NiAxNzkyLjUyIDE0My42NDZDMTgzNC43NyAxNDMuNjQ2IDE4NjUuNzEgMTY2LjIzMiAxODYyLjc4IDIxNy42NTNMMTg2Mi42IDIyMS44OUwxODA1LjAyIDIyNy4yNjRWMjIzLjUwN0MxODA1LjUgMjA3LjIxMSAxODAwLjkxIDE5OC40MyAxNzg4LjM3IDE5OC40M0MxNzczLjI5IDE5OC40MyAxNzY1Ljc4IDIxNS45OTMgMTc2NS43OCAyMjkuNzk4QzE3NjUuNzggMjQzLjYwMyAxNzY4LjcxIDI1MC4yODggMTc4My4zNCAyNTYuMTQyTDE3OTMuNzkgMjYwLjMzNkMxODI3LjI2IDI3My43MDQgMTg0Mi4yOSAyODcuNTEgMTg0Mi4yOSAzMzAuMTQ5QzE4NDIuMjkgMzg1LjMyNyAxODA3Ljk5IDQzNi4zNTQgMTc0Ny4zOCA0MzYuMzU0QzE3MDAuNTQgNDM2LjM1NCAxNjcxLjI3IDQwNC41OTMgMTY3NS40NiAzNTYuOTNMMTY3NS44NiAzNTIuNjkyTDE3MzYuNDYgMzQ2LjQ4OEwxNzM2LjExIDM1MC4yNDVMMTczNi4wNyAzNTAuMjAyWiIgZmlsbD0iI0ZDREMwNCIvPgo8cGF0aCBkPSJNMjA3OS4xNCA0MzIuMTU5TDIxMjkuMTMgMTQ3LjgzOUgyMTk1LjMzTDIyMDkuOTIgMzEwLjQ4OUgyMjEyLjAyTDIyNDEuMiAxNDcuODM5SDIyOTYuODJMMjI0Ni40IDQzMi4xNTlIMjE4MC42NEwyMTY1LjE4IDI2OS41MUgyMTYzLjA4TDIxMzMuODkgNDMyLjE1OUgyMDc5LjE0WiIgZmlsbD0iI0ZDREMwNCIvPgo8cGF0aCBkPSJNMjMwMS44OSA0MzIuMTU5TDIzNTEuODggMTQ3LjgzOUgyNDI4LjA4QzI0NjkuOSAxNDcuODM5IDI1MDAgMTY3LjA2MiAyNTAwIDIxMi42MjhDMjUwMCAyNDYuNDg2IDI0ODEuMTcgMzU1LjE4MSAyNDY2LjUzIDM4NS4zMjZDMjQ1MS4wNiA0MTYuMjU3IDI0MjUuMTUgNDMyLjE1OSAyMzgyLjkgNDMyLjE1OUgyMzAxLjg5Wk0yMzg3LjEgMzc1LjcxNUMyMzk3Ljk4IDM3NS43MTUgMjQwNC42NiAzNzEuNTIxIDI0MDkuMjUgMzYxLjUxNkMyNDE1LjkzIDM0Ny4zMTggMjQzMy41IDI0NC44NyAyNDMzLjUgMjIyLjcyQzI0MzMuNSAyMTEuMDEyIDI0MjYuODEgMjA0LjcyIDI0MTUuNSAyMDQuNzJIMjQwNS40OUwyMzc1Ljc4IDM3NS43MTVIMjM4Ny4xWiIgZmlsbD0iI0ZDREMwNCIvPgo8cGF0aCBkPSJNMTk4MC40OCA0MzIuMTU5VjM4MS41NjlIMTkzMi4zOEwxOTE1LjA3IDQzMi4xNTlIMTg1MS4yOEwxOTYzLjMxIDE0Ny44MzlIMjAzMy44M0wyMDQ0LjAxIDQzMi4xNTlIMTk4MC40NEgxOTgwLjQ4Wk0xOTgxLjc1IDMzNS41NjZMMTk4Mi41OCAyNDAuMjM5SDE5ODEuNzVMMTk0OC43MiAzMzUuNTY2SDE5ODEuNzVaIiBmaWxsPSIjRkNEQzA0Ii8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfNTI5XzEwMjEiPgo8cmVjdCB3aWR0aD0iMjUwMCIgaGVpZ2h0PSI1ODAiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==' };
  var C = { surge: 0xFCDC04, black: 0x141414, ink: 0x0A0A0A, grey: 0x5C5C5E, alloy: 0x9E9E9E, green: 0x44BC9D, glass: 0x10161A };

  function roundedBox(w, h, d, r) {
    r = Math.min(r, w / 2, h / 2);
    var s = new THREE.Shape(), x = -w / 2 + r, y = -h / 2 + r, iw = w - 2 * r, ih = h - 2 * r;
    s.moveTo(x, y - r);
    s.lineTo(x + iw, y - r); s.quadraticCurveTo(x + iw + r, y - r, x + iw + r, y);
    s.lineTo(x + iw + r, y + ih); s.quadraticCurveTo(x + iw + r, y + ih + r, x + iw, y + ih + r);
    s.lineTo(x, y + ih + r); s.quadraticCurveTo(x - r, y + ih + r, x - r, y + ih);
    s.lineTo(x - r, y); s.quadraticCurveTo(x - r, y - r, x, y - r);
    var b = Math.min(r * 0.6, d * 0.2);
    var g = new THREE.ExtrudeGeometry(s, { depth: d - 2 * b, bevelEnabled: true, bevelThickness: b, bevelSize: b * 0.6, bevelSegments: 3, curveSegments: 6 });
    g.translate(0, 0, -(d - 2 * b) / 2);
    return g;
  }
  // Brand hex values are sRGB; the renderer works in linear light.
  function lin(hex) { return new THREE.Color(hex).convertSRGBToLinear(); }
  function mat(color, rough, metal, extra) {
    var m = new THREE.MeshStandardMaterial({ color: lin(color), roughness: rough, metalness: metal || 0 });
    if (extra) for (var k in extra) m[k] = extra[k];
    return m;
  }
  function mesh(geo, material, parent, x, y, z) {
    var m = new THREE.Mesh(geo, material); m.position.set(x || 0, y || 0, z || 0);
    m.castShadow = true; m.receiveShadow = true; if (parent) parent.add(m); return m;
  }
  // Texture from one of our SVG logo files (never redrawn by hand).
  function logoTexture(src, bg, onload) {
    var cv = document.createElement('canvas'); cv.width = 1024; cv.height = 256;
    var ctx = cv.getContext('2d'); if (bg) { ctx.fillStyle = bg; ctx.fillRect(0, 0, cv.width, cv.height); }
    var tex = new THREE.CanvasTexture(cv); tex.encoding = THREE.sRGBEncoding; tex.anisotropy = 4;
    var img = new Image();
    img.onload = function () { var h = 150, w = h * 2500 / 580; ctx.drawImage(img, (cv.width - w) / 2, (cv.height - h) / 2, w, h); tex.needsUpdate = true; if (onload) onload(); };
    img.src = src;
    return tex;
  }

  // ---- Fallback MK2 pack (used only if the model file cannot load): 322 wide, 291 tall, 128 deep (mm → m) ----
  function mk2Pack(logoTex) {
    var g = new THREE.Group(), W = 0.322, H = 0.291, D = 0.128;
    mesh(roundedBox(W, H, D, 0.018), mat(C.surge, 0.45, 0.05), g, 0, H / 2, 0); // yellow enclosure, as on the portfolio slide
    // black end caps with ribs
    var cap = mat(C.black, 0.55, 0.1);
    mesh(roundedBox(W + 0.004, 0.034, D + 0.004, 0.012), cap, g, 0, H - 0.017, 0);
    mesh(roundedBox(W + 0.004, 0.03, D + 0.004, 0.012), cap, g, 0, 0.015, 0);
    // yellow checker-plate side panels on both faces
    var alu = mat(0xF2D104, 0.42, 0.3);
    mesh(new THREE.BoxGeometry(W * 0.96, H * 0.88, 0.003), alu, g, 0, H * 0.47, D / 2 + 0.0015);
    mesh(new THREE.BoxGeometry(W * 0.96, H * 0.88, 0.003), alu, g, 0, H * 0.47, -D / 2 - 0.0015);
    // carry handle on top
    var hs = new THREE.Shape(); hs.moveTo(-0.07, 0); hs.lineTo(-0.07, 0.034); hs.quadraticCurveTo(-0.07, 0.05, -0.052, 0.05); hs.lineTo(0.052, 0.05); hs.quadraticCurveTo(0.07, 0.05, 0.07, 0.034); hs.lineTo(0.07, 0); hs.lineTo(0.056, 0); hs.lineTo(0.056, 0.03); hs.quadraticCurveTo(0.056, 0.036, 0.05, 0.036); hs.lineTo(-0.05, 0.036); hs.quadraticCurveTo(-0.056, 0.036, -0.056, 0.03); hs.lineTo(-0.056, 0); hs.lineTo(-0.07, 0);
    var hg = new THREE.ExtrudeGeometry(hs, { depth: 0.03, bevelEnabled: true, bevelThickness: 0.004, bevelSize: 0.003, bevelSegments: 2 });
    hg.translate(0, 0, -0.015); mesh(hg, cap, g, 0, H, 0);
    // main power connector on the top face, left of the handle (as in the CAD)
    mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.03, 24), mat(0x222222, 0.5, 0.05), g, -0.115, H + 0.012, -0.035);
    return g;
  }
  // ---- HM1 pack: 350 wide, 363 tall, 287 deep ----
  function hm1Pack() {
    // Shape from the HM1.9 render (0004-03 Battery Welded): welded yellow box, lid seam near the top,
    // black round cap, chrome handle and latch on the side, connector plate, small front flap, feet. No logo.
    var g = new THREE.Group(), W = 0.35, H = 0.363, D = 0.287;
    var yellow = mat(C.surge, 0.5, 0.05), dark = mat(0x111111, 0.6, 0.05), chrome = mat(0xD8D8D8, 0.25, 0.95);
    mesh(roundedBox(W, H * 0.93, D, 0.006), yellow, g, 0, H * 0.465, 0);
    mesh(roundedBox(W + 0.004, H * 0.065, D + 0.004, 0.006), mat(0xF2D104, 0.5, 0.05), g, 0, H * 0.965, 0); // lid
    var cap = mesh(new THREE.CylinderGeometry(0.04, 0.042, 0.032, 40), dark, g, 0.07, H + 0.016, 0.02);
    for (var r = 0; r < 12; r++) { // ribs on the cap
      var rb = mesh(new THREE.BoxGeometry(0.006, 0.026, 0.006), dark, g, 0.07 + Math.cos(r / 12 * 6.283) * 0.042, H + 0.016, 0.02 + Math.sin(r / 12 * 6.283) * 0.042);
      rb.rotation.y = -r / 12 * 6.283;
    }
    // side (+x): chrome U-handle near the top, toggle latch near the bottom, connector plate and port
    var hx = W / 2 + 0.013;
    mesh(new THREE.BoxGeometry(0.01, 0.012, 0.12), chrome, g, hx, H * 0.8, 0.02);
    mesh(new THREE.BoxGeometry(0.026, 0.012, 0.01), chrome, g, W / 2 + 0.007, H * 0.8, -0.04);
    mesh(new THREE.BoxGeometry(0.026, 0.012, 0.01), chrome, g, W / 2 + 0.007, H * 0.8, 0.08);
    mesh(new THREE.BoxGeometry(0.004, 0.05, 0.05), mat(0xBFC2C5, 0.35, 0.8), g, W / 2 + 0.002, H * 0.8, D / 2 - 0.04);
    mesh(new THREE.BoxGeometry(0.014, 0.1, 0.022), chrome, g, W / 2 + 0.007, H * 0.24, D / 2 - 0.05);
    mesh(new THREE.BoxGeometry(0.01, 0.03, 0.03), chrome, g, W / 2 + 0.005, H * 0.15, D / 2 - 0.05);
    var port = mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.01, 20), dark, g, W / 2 + 0.004, H * 0.62, D / 2 - 0.045);
    port.rotation.z = Math.PI / 2;
    // front (+z): small raised flap
    mesh(roundedBox(0.075, 0.062, 0.008, 0.004), yellow, g, -W / 2 + 0.07, H * 0.3, D / 2 + 0.004);
    // screw heads along the lid and edges
    [[-0.15, 0.93], [0.15, 0.93], [-0.15, 0.6], [0.15, 0.6], [-0.15, 0.2], [0.15, 0.2]].forEach(function (p) {
      var sc = mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.003, 12), dark, g, p[0], H * p[1], D / 2 + 0.0015); sc.rotation.x = Math.PI / 2;
    });
    // small feet at the corners
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (c) {
      var ft = mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.014, 16), mat(0xEDEDED, 0.5), g, c[0] * (W / 2 - 0.02), 0.007, c[1] * (D / 2 - 0.02));
    });
    g.children.forEach(function (m) { m.position.y += 0.014; }); // stand on the feet
    return g;
  }
  // ---- 12-slot cabinet: 1500 wide, 1825 tall (with castors), 600 deep ----
  function screenTexture() {
    var cv = document.createElement('canvas'); cv.width = 512; cv.height = 320;
    var x = cv.getContext('2d');
    x.fillStyle = '#0B0F12'; x.fillRect(0, 0, 512, 320);
    x.fillStyle = '#FCDC04'; x.fillRect(0, 0, 512, 44);
    x.fillStyle = '#000'; x.font = '700 24px "Instrument Sans", Arial, sans-serif'; x.fillText('Scan to swap', 18, 30);
    x.fillStyle = '#F6F5EC'; x.font = '400 18px "Instrument Sans", Arial, sans-serif'; x.fillText('Slot 7 is open. Insert your battery.', 18, 76);
    for (var r = 0; r < 3; r++) for (var c = 0; c < 4; c++) {
      var n = r * 4 + c + 1; x.fillStyle = n === 7 ? '#44BC9D' : '#FCDC04';
      x.fillRect(18 + c * 62, 100 + r * 62, 54, 54);
      x.fillStyle = '#000'; x.font = '700 18px Arial, sans-serif'; x.fillText(String(n), 38 + c * 62, 134 + r * 62);
    }
    x.fillStyle = '#F6F5EC'; x.fillRect(300, 100, 180, 180); x.fillStyle = '#000';
    for (var i = 0; i < 9; i++) for (var j = 0; j < 9; j++) if ((i * 7 + j * 3 + i * j) % 3 === 0) x.fillRect(312 + i * 17, 112 + j * 17, 15, 15);
    var t = new THREE.CanvasTexture(cv); t.encoding = THREE.sRGBEncoding; return t;
  }
  function cabinet(logoTexY, makePack, real) {
    var g = new THREE.Group(), W = 1.5, H = 1.825, D = 0.6, castor = 0.1;
    var body = mat(C.black, 0.62, 0.15), frame = mat(0x222222, 0.5, 0.3), yellow = mat(C.surge, 0.45, 0.05);
    var top = H - 0.33, bottom = castor + 0.08;
    // open frame: back, sides, header, plinth (the slots stay visible)
    mesh(new THREE.BoxGeometry(W, H - castor, 0.03), mat(0x080808, 0.9), g, 0, castor + (H - castor) / 2, -D / 2 + 0.015);
    mesh(new THREE.BoxGeometry(0.035, H - castor, D), body, g, -W / 2 + 0.0175, castor + (H - castor) / 2, 0);
    mesh(new THREE.BoxGeometry(0.035, H - castor, D), body, g, W / 2 - 0.0175, castor + (H - castor) / 2, 0);
    mesh(roundedBox(W, H - top, D, 0.03), body, g, 0, top + (H - top) / 2, 0);
    mesh(new THREE.BoxGeometry(W, bottom - castor, D), body, g, 0, castor + (bottom - castor) / 2, 0);
    // header panel with our logo file, and the 10.1" screen
    var head = new THREE.Mesh(new THREE.PlaneGeometry(W * 0.62, W * 0.62 / 4), new THREE.MeshStandardMaterial({ map: logoTexY, roughness: 0.6 }));
    head.position.set(-W * 0.14, H - 0.16, D / 2 + 0.004); g.add(head);
    mesh(new THREE.BoxGeometry(0.26, 0.17, 0.02), frame, g, W * 0.33, H - 0.16, D / 2 + 0.005);
    var scr = new THREE.Mesh(new THREE.PlaneGeometry(0.222, 0.139), new THREE.MeshStandardMaterial({ map: screenTexture(), emissive: 0xffffff, emissiveMap: screenTexture(), emissiveIntensity: 0.55, roughness: 0.2 }));
    scr.position.set(W * 0.33, H - 0.16, D / 2 + 0.0162); g.add(scr);
    mesh(new THREE.BoxGeometry(W - 0.04, 0.012, 0.01), yellow, g, 0, H - 0.29, D / 2 + 0.003);
    // 3 rows × 4 columns of slot doors
    var cols = 4, rows = 3, gw = (W - 0.12) / cols, gh = (top - bottom) / rows;
    for (var vc = 0; vc <= cols; vc++) mesh(new THREE.BoxGeometry(0.03, top - bottom, D - 0.03), body, g, -W / 2 + 0.06 + gw * vc, (top + bottom) / 2, 0.015);
    for (var hr = 1; hr < rows; hr++) mesh(new THREE.BoxGeometry(W - 0.06, 0.03, D - 0.03), body, g, 0, top - gh * hr, 0.015);
    var ps = real ? 0.95 : 0.9, packH = (real ? 0.296 : 0.322) * ps;
    for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) {
      var n = r * cols + c + 1, cx = -W / 2 + 0.06 + gw * (c + 0.5), cy = top - gh * (r + 0.5);
      var open = n === 7;
      // recess and a pack inside
      if (n !== 7) {
        var inside = makePack(); inside.scale.set(ps, ps, ps); inside.rotation.y = 0;
        inside.position.set(cx, cy - packH / 2, D / 2 - 0.12); g.add(inside);
      }
      // door: yellow frame + dark window, hinged on the left
      var door = new THREE.Group(); door.position.set(cx - (gw - 0.04) / 2, cy, D / 2 + 0.012);
      var dw = gw - 0.04, dh = gh - 0.04;
      var fr = [[dw, 0.03, 0, dh / 2 - 0.015], [dw, 0.03, 0, -dh / 2 + 0.015], [0.03, dh, -dw / 2 + 0.015, 0], [0.03, dh, dw / 2 - 0.015, 0]];
      fr.forEach(function (f) { mesh(new THREE.BoxGeometry(f[0], f[1], 0.018), yellow, door, dw / 2 + f[2], f[3], 0); });
      var win = new THREE.Mesh(new THREE.PlaneGeometry(dw - 0.06, dh - 0.06), new THREE.MeshStandardMaterial({ color: lin(C.glass), roughness: 0.08, metalness: 0.1, transparent: true, opacity: 0.55 }));
      win.position.set(dw / 2, 0, 0.004); door.add(win);
      var led = new THREE.Mesh(new THREE.CircleGeometry(0.009, 16), new THREE.MeshStandardMaterial({ color: lin(open ? C.surge : C.green), emissive: lin(open ? C.surge : C.green), emissiveIntensity: 1 }));
      led.position.set(dw - 0.03, dh / 2 - 0.03, 0.011); door.add(led);
      if (open) door.rotation.y = -1.25;
      g.add(door);
    }
    // castors with brakes
    [[-W / 2 + 0.1, D / 2 - 0.1], [W / 2 - 0.1, D / 2 - 0.1], [-W / 2 + 0.1, -D / 2 + 0.1], [W / 2 - 0.1, -D / 2 + 0.1]].forEach(function (p) {
      mesh(new THREE.BoxGeometry(0.08, 0.03, 0.08), frame, g, p[0], castor - 0.015, p[1]);
      var wh = mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.03, 20), mat(0x111111, 0.8), g, p[0], 0.035, p[1]); wh.rotation.x = Math.PI / 2;
    });
    // a battery half out of the open slot, to show the swap
    var out = makePack(); out.scale.set(ps, ps, ps);
    var c7 = -W / 2 + 0.06 + gw * 2.5, r7 = top - gh * 1.5; out.position.set(c7, r7 - packH / 2, D / 2 + 0.07); out.rotation.y = -0.15; g.add(out);
    return g;
  }

  // ---- Real MK2 from CAD ----
  var LIBS = ['https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js',
    'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/libs/meshopt_decoder.js',
    'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/environments/RoomEnvironment.js'];
  var MK2_URL = 'assets/models/mk2.gltf.json', mk2Promise = null;
  function addScript(src) {
    return new Promise(function (ok, fail) { var s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = fail; document.head.appendChild(s); });
  }
  // The CAD stores one colour per part. Give each one its real finish, as on the Hardware Product Portfolio slide.
  function cadMaterial(m) {
    var c = m.color || new THREE.Color(1, 1, 1), k = [c.r, c.g, c.b].map(function (v) { return Math.round(v * 255); }).join(',');
    var f = {
      '0,0,0': [0xF7D304, 0.5, 0.05],      // enclosure, Surge Yellow (portfolio slide; the CAD has a default black)
      '2,2,2': [0x1a1a1a, 0.45, 0.0],      // handle and vent cover, black plastic
      '233,233,235': [0xE6C400, 0.5, 0.2],  // side panels, yellow-coated aluminium checker plate (portfolio slide)
      '133,133,133': [0x8C8F92, 0.35, 0.9],  // swap-system rocker and plate, steel
      '90,90,90': [0xA6A9AC, 0.3, 0.9],    // stainless screws
      '255,255,255': [0x151515, 0.5, 0.05], // power connector and cap, black (portfolio slide; no colour in the CAD)
      '229,152,51': [0xB8862F, 0.35, 0.8], // brass inserts
      '212,212,212': [0xD4D4D4, 0.7, 0.0]  // vent membrane
    }[k] || [c.getHex(), 0.5, 0.1];
    return mat(f[0], f[1], f[2]);
  }
  function markDecal(onload) {
    var cv = document.createElement('canvas'); cv.width = 500; cv.height = 603;
    var tex = new THREE.CanvasTexture(cv); tex.encoding = THREE.sRGBEncoding; tex.anisotropy = 4;
    var img = new Image();
    img.onload = function () { var x = cv.getContext('2d'); x.globalAlpha = 0.85; x.drawImage(img, 0, 0, 500, 603); tex.needsUpdate = true; if (onload) onload(); };
    img.src = MARK;
    return new THREE.MeshStandardMaterial({ map: tex, transparent: true, roughness: 0.5, polygonOffset: true, polygonOffsetFactor: -2 });
  }
  function loadMK2() {
    if (mk2Promise) return mk2Promise;
    mk2Promise = LIBS.reduce(function (p, u) { return p.then(function () { return addScript(u); }); }, Promise.resolve())
      .then(function () {
        return new Promise(function (ok, fail) {
          var L = new THREE.GLTFLoader(); L.setMeshoptDecoder(window.MeshoptDecoder);
          L.load(MK2_URL, function (g) {
            g.scene.traverse(function (o) { if (o.isMesh) { o.material = cadMaterial(o.material); o.userData.cad = true; o.castShadow = true; o.receiveShadow = true; } });
            ok(g.scene);
          }, undefined, fail);
        });
      });
    return mk2Promise;
  }

  window.ampModel = function (box, type) {
    if (!window.THREE) return;
    var test = document.createElement('canvas');
    if (!(test.getContext('webgl') || test.getContext('experimental-webgl'))) return;
    loadMK2().then(function (real) { build(box, type, real); }, function () { build(box, type, null); });
  };

  function build(box, type, real) {
    var poster = box.querySelector('img'); var w = box.clientWidth, h = box.clientHeight || Math.round(w * 0.75);
    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1)); renderer.setSize(w, h);
    renderer.outputEncoding = THREE.sRGBEncoding; renderer.toneMapping = THREE.NoToneMapping;
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    var scene = new THREE.Scene();
    var cam = new THREE.PerspectiveCamera(30, w / h, 0.01, 50);
    scene.add(new THREE.HemisphereLight(0xffffff, 0xd8d4c4, 0.9));
    var key = new THREE.DirectionalLight(0xffffff, 1.15); key.position.set(2, 4, 3); key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048); key.shadow.radius = 4; key.shadow.bias = -0.0005; scene.add(key);
    var rim = new THREE.DirectionalLight(0xfff4c2, 0.45); rim.position.set(-3, 2, -2); scene.add(rim);
    var ground = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), new THREE.ShadowMaterial({ opacity: 0.18 }));
    ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);

    var rerender = function () { renderer.render(scene, cam); };
    var black = logoTexture(LOGO.black, null, rerender);
    var yellowOnBlack = logoTexture(LOGO.yellow, '#141414', rerender);
    var root = new THREE.Group(); scene.add(root);
    var target, dist;
    // reflections for the CAD metals only, so the hand-built parts keep their colours
    var env = real && THREE.RoomEnvironment ? new THREE.PMREMGenerator(renderer).fromScene(new THREE.RoomEnvironment(), 0.04).texture : null;
    var mark = real ? markDecal(rerender) : null;
    var pack = !real ? function () { return mk2Pack(black); } : function () {
      var o = real.clone();
      // Ampersand mark on both side panels (panel faces at z = ±64.2 mm; mark 52 × 63 mm, right of centre)
      var f = new THREE.Mesh(new THREE.PlaneGeometry(0.052, 0.063), mark); f.position.set(0.035, 0.14, 0.0652); o.add(f);
      var bk = f.clone(); bk.rotation.y = Math.PI; bk.position.set(-0.035, 0.14, -0.0652); o.add(bk);
      // full reflections on metal parts, weak reflections on painted and plastic parts
      if (env) o.traverse(function (m) { if (m.userData.cad) { m.material = m.material.clone(); m.material.envMap = env; m.material.envMapIntensity = m.material.metalness > 0.5 ? 0.9 : 0.3; } });
      return o;
    };
    if (type === 'cabinet') {
      root.add(cabinet(yellowOnBlack, pack, !!real)); target = new THREE.Vector3(0, 0.88, 0); dist = 4.3;
      key.shadow.camera.left = -2; key.shadow.camera.right = 2; key.shadow.camera.top = 3; key.shadow.camera.bottom = -1;
    } else if (type === 'compare') {
      // the two MK2 packs side by side (2 × 128 mm wide, 322 mm long) take about the floor space of one HM1 (350 × 287 mm)
      var a = pack(); a.rotation.y = Math.PI / 2; a.position.set(-0.3, 0, 0); root.add(a);
      var b = pack(); b.rotation.y = Math.PI / 2; b.position.set(-0.155, 0, 0); root.add(b);
      var hm = hm1Pack(); hm.rotation.y = -Math.PI / 2; hm.position.x = 0.2; root.add(hm); // handle side and front flap face the camera
      target = new THREE.Vector3(-0.04, 0.16, 0); dist = 1.6;
      key.shadow.camera.left = -1; key.shadow.camera.right = 1; key.shadow.camera.top = 1; key.shadow.camera.bottom = -1;
    } else {
      var p1 = pack(); p1.position.set(-0.07, 0, 0.09); root.add(p1);
      var p2 = pack(); p2.position.set(0.17, 0, -0.12); p2.rotation.y = -0.35; root.add(p2);
      target = new THREE.Vector3(0.05, 0.14, 0); dist = 1.3;
      key.shadow.camera.left = -1; key.shadow.camera.right = 1; key.shadow.camera.top = 1; key.shadow.camera.bottom = -1;
    }
    key.shadow.camera.near = 0.5; key.shadow.camera.far = 12; key.shadow.camera.updateProjectionMatrix();
    var yaw = type === 'cabinet' ? -0.45 : -0.6, pitch = 0.22;
    function place() {
      cam.position.set(target.x + dist * Math.sin(yaw) * Math.cos(pitch), target.y + dist * Math.sin(pitch), target.z + dist * Math.cos(yaw) * Math.cos(pitch));
      cam.lookAt(target); rerender();
    }
    place();
    renderer.domElement.setAttribute('aria-label', box.getAttribute('data-label') || '3D model');
    renderer.domElement.setAttribute('role', 'img');
    box.appendChild(renderer.domElement); if (poster) poster.hidden = true;

    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var dragging = false, lx = 0, ly = 0, touched = false;
    renderer.domElement.style.touchAction = 'pan-y';
    renderer.domElement.addEventListener('pointerdown', function (e) { dragging = true; touched = true; lx = e.clientX; ly = e.clientY; renderer.domElement.setPointerCapture(e.pointerId); });
    renderer.domElement.addEventListener('pointermove', function (e) {
      if (!dragging) return; yaw -= (e.clientX - lx) * 0.008; pitch = Math.max(0.02, Math.min(0.9, pitch + (e.clientY - ly) * 0.004)); lx = e.clientX; ly = e.clientY; place();
    });
    renderer.domElement.addEventListener('pointerup', function () { dragging = false; });
    if (!reduce) {
      var last = performance.now();
      (function spin(t) { if (!touched && t - last > 32) { yaw += 0.004; place(); last = t; } requestAnimationFrame(spin); })(last);
    }
    window.addEventListener('resize', function () { var nw = box.clientWidth, nh = box.clientHeight || Math.round(nw * 0.75); renderer.setSize(nw, nh); cam.aspect = nw / nh; cam.updateProjectionMatrix(); place(); });
  }
})();
