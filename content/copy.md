# Ampersand website copy

Edit the text under each `### key` line. Do not change the keys: they link the text to the page.

- `**text**` shows the text in Surge Yellow (in headlines and buttons).
- `_text_` makes a small unit after a big number, for example `6 _min_` or `15.5 _kg_`.
- `[text](link)` makes a link.
- `{name}` shows a number from the Numbers section, for example `{daily-swaps}`. Change a number
  there once and every page updates.
- Plain inline HTML also works for special cases.
- To publish: commit this file. The site build writes the copy into the pages
  (`node tools/copy.mjs apply`). Changes to layout, images or new sections still need the code.


## Numbers · used on many pages

<!-- Use them in the text as {name}. The live feed also reads daily-swaps and stations. -->

### num.charged
96%

### num.bikes
11,000

### num.daily-swaps
24,000

### num.stations
70


## Shared · header and footer (every page)

### shared.nav-network
Network

### shared.nav-batteries
Batteries

### shared.nav-technology
Technology

### shared.nav-vehicles
Vehicles

### shared.nav-investors
Investors

### shared.nav-contact
Work with us

### shared.mockbar
Mockup · Proof site, station-signage design. The "Network now" numbers are simulated.

### shared.mockbar-review
Internal review — comment on the page

### shared.header-button
Work with us

### shared.nav-home
Home

### shared.live-title
Network now

### shared.live-note
Simulated feed · based on {asOf}

### shared.live-today
Swaps today

### shared.live-hour
Swaps this hour

### shared.live-charged-number
{charged}

### shared.live-charged
Batteries out fully charged

### shared.live-stations
Stations in service

### shared.path-investors-kicker
Investors

### shared.path-investors
Already profitable

### shared.path-fleets-kicker
Fleets

### shared.path-fleets
Electrify a fleet

### shared.path-oems-kicker
OEMs

### shared.path-oems
Power your bike

### shared.path-sites-kicker
Sites

### shared.path-sites
Host a station

### shared.footer-tagline
Keep on Moving.

### shared.footer-kinyarwanda
Komeza Ugende

### shared.footer-swahili
Zidi Kusonga

### shared.footer-kigali-title
Kigali

### shared.footer-kigali
KK 6 Av, Road to MAGERWA<br>Hotline 1011

### shared.footer-nairobi-title
Nairobi

### shared.footer-nairobi
Old Mombasa Road, Gate 2<br>Warehouse 11 & 12

### shared.footer-contact-title
Contact

### shared.footer-contact
info@ampersand.solar<br>OEM@ampersand.solar

### shared.footer-people-title
People

### shared.footer-people
media@ampersand.solar<br>[Careers](https://ampersand-energy.breezy.hr/)

### shared.footer-legal
© 2026 Ampersand. Mockup for internal review. 3D models are approximate.


## Home page · proof/index.html

### home.title
Ampersand · Proof


<!-- Home · hero -->

### home.hero.kicker-1
Africa's first and longest-running e-moto swap network

### home.hero.h1-1
Powering the **movement** of people and cities.

### home.hero.lede-1
We build the batteries, the swap network and the software behind more than {bikes} electric motorcycles in East Africa.

### home.hero.button-1
See the numbers

### home.hero.button-2
Explore the network

### home.hero.big-1
{daily-swaps}

### home.hero.text-1
battery swaps, every day


<!-- Home · band -->

### home.band.number-1
{bikes}+

### home.band.label-1
bikes on the road

### home.band.number-2
6 _min_

### home.band.label-2
arrival to departure

### home.band.number-3
{charged}

### home.band.label-3
of batteries out fully charged · 99% above 90%

### home.band.number-4
+40%

### home.band.label-4
rider take-home pay


<!-- Home · swap -->

### home.swap.giant-1
6<span class="gu">min</span>

### home.swap.kicker-1
The swap network

### home.swap.h2-1
Six minutes, then back to work.

### home.swap.lede-1
Riders do not wait for a charge. They swap an empty battery for a full one and leave six minutes after they arrive. For a rider, time not waiting is income.

### home.swap.bar-1
Arrive, queue, hand over

### home.swap.bar-2
Swap · 2 min

### home.swap.big-1
{stations}

### home.swap.text-1
stations in Rwanda and Kenya

### home.swap.big-2
{charged}

### home.swap.text-2
of batteries leave fully charged, and 99% leave above 90%

### home.swap.big-3
80%

### home.swap.text-3
brand preference among riders

### home.swap.button-1
The network


<!-- Home · mk2 -->

### home.mk2.flag-1
MK2 battery

### home.mk2.big-1
15.5<span class="u hl">kg</span>

### home.mk2.h2-1
Two packs per bike. One hand to swap.

### home.mk2.lede-1
Each MK2 pack weighs 15.5 kg, so one hand is enough to swap it, and either pack swaps alone. Our BMS and telematics are built in.

### home.mk2.big-2
5 years

### home.mk2.text-1
first life · industry norm 1–2 years

### home.mk2.big-3
2,500

### home.mk2.text-2
cycles, first life

### home.mk2.big-4
IP67

### home.mk2.text-3
sealed pack

### home.mk2.big-5
1 m

### home.mk2.text-4
drop test passed

### home.mk2.button-1
The MK2 battery

### home.mk2.tag-1
BMS in-house

### home.mk2.tag-2
VCTU in-house

### home.mk2.tag-3
Humidity sensing

### home.mk2.tag-4
Crash detection

### home.mk2.tag-5
Bluetooth LE

### home.mk2.tag-6
4G · GPS


<!-- Home · products -->

### home.products.kicker-1
Products

### home.products.h2-1
One battery standard. Six ways in.

### home.products.text-1
Energy first. Every vehicle runs on the same batteries and the same stations.

### home.products.big-1
{stations}

### home.products.b-1
Swap network

### home.products.big-2
12

### home.products.b-2
Automated cabinet slots

### home.products.note-1
Rolling out in 2026

### home.products.big-3
5 yrs

### home.products.b-3
MK2 batteries

### home.products.note-2
Battery first life. Industry norm: 1–2 years.

### home.products.big-4
In-house

### home.products.b-4
BMS and VCTU

### home.products.big-5
7 yrs

### home.products.b-5
AmperOps

### home.products.note-3
Of telemetry from every bike, battery and station.

### home.products.big-6
Open

### home.products.b-6
E-motos

### home.products.note-4
Alpha and partner bikes on one network


<!-- Home · riders -->

### home.riders.kicker-1
Riders

### home.riders.big-1
+40%

### home.riders.text-1
more take-home pay than on petrol

### home.riders.big-2
$103

### home.riders.text-2
a month on petrol

### home.riders.big-3
$173

### home.riders.text-3
a month with Ampersand

### home.riders.text-4
“I can save extra money I would have used on fuel. I don’t waste time at the garage anymore.”

### home.riders.cite-1
Etienne, rider


<!-- Home · open -->

### home.open.h2-1
Premium bikes, open network.

### home.open.lede-1
Our Alpha is the best-selling e-motorcycle in its markets. Now other makers' bikes run on our batteries and stations too. Their riders join {daily-swaps} swaps a day from day one.

### home.open.button-1
Build on our network


## Network page · proof/network.html

### network.title
Ampersand · Network


<!-- Network · hero -->

### network.hero.kicker-1
Energy · Swap network

### network.hero.h1-1
Six minutes, then **back to work.**

### network.hero.lede-1
Riders do not wait for a charge. They arrive with an empty battery and leave with a full one, six minutes later on average. For a rider, not waiting means more income.

### network.hero.button-1
The new cabinet

### network.hero.button-2
Host a station

### network.hero.big-1
2 _min_

### network.hero.text-1
to swap a battery


<!-- Network · band -->

### network.band.number-1
{daily-swaps}

### network.band.label-1
battery swaps a day

### network.band.number-2
{stations}

### network.band.label-2
stations in Rwanda and Kenya

### network.band.number-3
{charged}

### network.band.label-3
of batteries out fully charged · 99% above 90%

### network.band.number-4
80%

### network.band.label-4
brand preference among riders


<!-- Network · swap -->

### network.swap.giant-1
6<span class="gu">min</span>

### network.swap.kicker-1
How a swap works

### network.swap.h2-1
Three steps. No charging wait.

### network.swap.bar-1
Arrive, queue, hand over

### network.swap.bar-2
Swap · 2 min

### network.swap.item-1
The rider arrives. The attendant scans the empty battery.

### network.swap.item-2
The rider pays and takes a full battery.

### network.swap.item-3
The empty battery goes on charge for the next rider.

### network.swap.text-1
High-power charging at every station keeps batteries ready at peak times.


<!-- Network · cabinets -->

### network.cabinets.flag-1
New · Automated swap cabinet

### network.cabinets.big-1
12<span class="u hl"> slots</span>

### network.cabinets.h2-1
A station that fits on any site.

### network.cabinets.lede-1
Our self-service cabinet holds 12 MK2 packs. The rider scans the QR code with the app, a slot opens, and no attendant is needed. Built to our specification by a manufacturing partner. The first cabinets passed factory tests in August 2026 and roll out this year.

### network.cabinets.big-2
QR

### network.cabinets.text-1
scan with the app to open a slot

### network.cabinets.big-3
<3 s

### network.cabinets.text-2
fire suppression in each slot

### network.cabinets.big-4
Pack ID

### network.cabinets.text-3
reads and charges every MK2 pack

### network.cabinets.big-5
Camera

### network.cabinets.text-4
and NFC card reader on every cabinet


<!-- Network · m-cabinet -->

### network.m-cabinet.text-1
Drag to rotate


<!-- Network · cabinets -->

### network.cabinets.caption-1
Pilot cabinet at factory acceptance, August 2026: a charged MK2 pack in slot 2.


<!-- Network · host -->

### network.host.kicker-1
Grow the network with us

### network.host.h2-1
Host a station or run a franchise.

### network.host.text-1
We grow with partners: site hosts, energy partners and station franchisees.

### network.host.h3-1
Swap cabinet

### network.host.text-2
Self-service, for markets, side roads and fleet depots.

### network.host.h3-2
Standard station

### network.host.text-3
Staffed, on main moto-taxi routes.

### network.host.text-7
Photo to come

### network.host.b-2
Mega station

### network.host.h3-3
Mega station

### network.host.text-4
Our flagship format, for the busiest routes.

### network.host.big-1
+1

### network.host.h3-4
Your site

### network.host.text-5
Have a site on a busy route, or want to run a franchise? Tell us.

### network.host.button-1
Contact us


## Batteries page · proof/batteries.html

### batteries.title
Ampersand · Batteries


<!-- Batteries · hero -->

### batteries.hero.kicker-1
Energy · MK2 battery

### batteries.hero.h1-1
A battery built to last **five years.**

### batteries.hero.lede-1
Most swap batteries last one to two years. Ours are designed for a five-year first life. Our own cell selection, pack design and BMS give us full control of charge speed and health, so each pack keeps earning for longer.

### batteries.hero.button-1
Meet the MK2

### batteries.hero.button-2
Spec sheet

### batteries.hero.big-1
−65%

### batteries.hero.text-1
pack weight, MK2 against our first pack


<!-- Batteries · band -->

### batteries.band.number-1
5 _yrs_

### batteries.band.label-1
designed first life · norm 1–2 years

### batteries.band.number-2
2,500

### batteries.band.label-2
cycles, first life

### batteries.band.number-3
IP67

### batteries.band.label-3
MK2 pack

### batteries.band.number-4
1 _m_

### batteries.band.label-4
MK2 drop test passed


<!-- Batteries · mk2 -->

### batteries.mk2.flag-1
MK2 · new generation

### batteries.mk2.big-1
15.5<span class="u hl">kg</span>

### batteries.mk2.h2-1
Two light packs. One-handed swaps.

### batteries.mk2.lede-1
Two packs per bike, connected in parallel. Either pack can be swapped alone. The Ampersand BMS and the VCTU are built in.

### batteries.mk2.big-2
3.67 kWh

### batteries.mk2.text-1
per bike, 2 packs

### batteries.mk2.big-3
IP67

### batteries.mk2.text-2
sealed pack

### batteries.mk2.big-4
1 m

### batteries.mk2.text-3
drop test passed

### batteries.mk2.big-5
Humidity

### batteries.mk2.text-4
sensing inside the pack

### batteries.mk2.button-1
From HM1 to MK2


<!-- Batteries · m-mk2 -->

### batteries.m-mk2.text-1
Drag to rotate


<!-- Batteries · mk2 -->

### batteries.mk2.note-1
MK2 pack from the CAD (v37): 322 × 291 × 128 mm. Outside parts only.


<!-- Batteries · tests -->

### batteries.tests.kicker-1
Safety and durability

### batteries.tests.big-1
75,000 _km_

### batteries.tests.lede-1
The MK2 vibration test equals about five years of riding. The MK2 is UN38.3 certified and tested to ISO 18243.

### batteries.tests.text-1
Passed

### batteries.tests.big-2
Vibration

### batteries.tests.text-2
Passed

### batteries.tests.big-3
Water immersion · IP67

### batteries.tests.text-3
Passed

### batteries.tests.big-4
Drop · 1 m

### batteries.tests.text-4
Passed

### batteries.tests.big-5
Shock · thermal shock

### batteries.tests.text-5
Passed

### batteries.tests.big-6
Short circuit

### batteries.tests.text-6
Certified

### batteries.tests.big-7
UN38.3


<!-- Batteries · evolution -->

### batteries.weight.kicker-1
How we got here · HM1 to MK2

### batteries.weight.big-1
−65%

### batteries.weight.lede-1
Our first pack, the HM1, built the network: one 44 kg pack per bike. Seven years of fleet data went into its successor. The MK2 uses two 15.5 kg packs, and each one is a one-handed lift.

### batteries.weight.text-1
HM1 · first generation

### batteries.weight.big-2
44 kg

### batteries.weight.text-2
MK2 · current

### batteries.weight.big-3
15.5 kg

### batteries.weight.note-1
Bars drawn to scale.


<!-- Batteries · m-compare -->

### batteries.m-compare.text-1
Drag to rotate


<!-- Batteries · evolution -->

### batteries.weight.note-2
To scale: the two MK2 packs that replace one HM1 pack. MK2 from the CAD; HM1 approximate.


<!-- Batteries · spec -->

### batteries.spec.kicker-1
Spec sheet

### batteries.spec.h2-1
The MK2 at a glance.

### batteries.spec.text-1
Every generation works with the stations already on the network. A larger pack, AMP XL, is in development.

### batteries.spec.cell-2
MK2

### batteries.spec.cell-3
Packs per bike

### batteries.spec.cell-5
2, in parallel. Either pack swaps alone.

### batteries.spec.cell-6
Weight per pack

### batteries.spec.cell-8
15.5 kg

### batteries.spec.cell-9
Energy

### batteries.spec.cell-11
3.67 kWh per bike

### batteries.spec.cell-12
Chemistry

### batteries.spec.cell-14
LFP

### batteries.spec.cell-15
Designed first life

### batteries.spec.cell-16
5 years · 2,500 cycles

### batteries.spec.cell-17
Protection

### batteries.spec.cell-19
IP67 · 1 m drop tested

### batteries.spec.cell-20
BMS and telematics

### batteries.spec.cell-21
Ampersand BMS and VCTU, designed in-house

### batteries.spec.cell-22
Certification

### batteries.spec.cell-23
UN38.3

### batteries.spec.button-1
See the technology


## Technology page · proof/technology.html

### technology.title
Ampersand · Technology


<!-- Technology · hero -->

### technology.hero.kicker-1
Technology

### technology.hero.h1-1
Built <span class="hl nw">in-house.</span>

### technology.hero.big-1
One system, from the cell to the city.

### technology.hero.lede-1
We design our own battery management system (BMS), our own vehicle control and telematics unit (VCTU), and AmperOps, the software that runs it all. Our swap cabinets are built to our specification.


<!-- Technology · amperops -->

### technology.amperops.flag-1
Software · AmperOps

### technology.amperops.h2-1
One system runs the network.

### technology.amperops.text-1
AmperOps connects every rider, station, partner, technician and manager to the same live data. Each new rider and partner adds data that makes the network cheaper to build and run.

### technology.amperops.b-1
Every MK2 pack

### technology.amperops.text-2
BMS and VCTU data

### technology.amperops.b-2
Every bike

### technology.amperops.text-3
GPS, 4G and crash alerts

### technology.amperops.b-3
Every station

### technology.amperops.text-4
Chargers, stock and cabinets

### technology.amperops.b-4
{daily-swaps} swaps a day

### technology.amperops.text-5
Each swap is a record

### technology.amperops.big-1
AmperOps

### technology.amperops.text-6
7 years of fleet data. One live picture of the network.

### technology.amperops.big-2
Riders

### technology.amperops.b-5
Driver app

### technology.amperops.text-7
Live battery data over Bluetooth LE, swap history and payments.

### technology.amperops.big-3
Stations

### technology.amperops.b-6
Attendants and cabinets

### technology.amperops.text-8
Stock, queues and charging at every station and in every slot.

### technology.amperops.big-4
Partners

### technology.amperops.b-7
Fleets, OEMs and financiers

### technology.amperops.text-9
Fleet reports, crash alerts, pack location and remote immobilisation.

### technology.amperops.big-5
Maintenance

### technology.amperops.b-8
Field and workshop teams

### technology.amperops.text-10
Battery health and predictive maintenance, before a pack fails.

### technology.amperops.big-6
Management

### technology.amperops.b-9
Network planning

### technology.amperops.text-11
Where to build stations, how to charge each battery and how to set prices.

### technology.amperops.text-12
<span aria-hidden="true">↻</span> More riders and partners give more data. More data makes each station and each battery work harder.


<!-- Technology · stack -->

### technology.stack.kicker-1
The stack

### technology.stack.h2-1
What we build.

### technology.stack.text-1
<i></i>Designed by Ampersand

### technology.stack.text-2
<i class="g"></i>Selected by Ampersand

### technology.stack.big-1
AmperOps

### technology.stack.text-3
Platform for every battery, station and bike: battery health, remote control, network planning.

### technology.stack.big-2
VCTU

### technology.stack.text-4
Vehicle control and telematics inside the pack: 4G, GPS, humidity, temperature and motion.

### technology.stack.big-3
BMS

### technology.stack.text-5
The Ampersand BMS controls charge speed and battery health, cell by cell.

### technology.stack.big-4
Packs

### technology.stack.text-6
MK2 pack design: two 15.5 kg packs per bike, designed by our engineers.

### technology.stack.big-5
Cabinets

### technology.stack.text-7
Automated 12-slot swap cabinet for MK2, built to our specification by a manufacturing partner. Rolling out in 2026.

### technology.stack.big-6
Cells

### technology.stack.text-8
LFP cells, selected by us for long life and safety.


<!-- Technology · vctu -->

### technology.vctu.giant-1
8

### technology.vctu.text-1
sensors and radios in one Ampersand unit, mounted inside the pack.

### technology.vctu.kicker-1
VCTU · vehicle control and telematics

### technology.vctu.h2-1
Our own telematics, inside every pack.

### technology.vctu.big-1
4G / GSM

### technology.vctu.text-2
Live pack data while the bike rides

### technology.vctu.big-2
GPS

### technology.vctu.text-3
Location of every pack

### technology.vctu.big-3
Humidity

### technology.vctu.text-4
Finds moisture in the pack early

### technology.vctu.big-4
Temperature

### technology.vctu.text-5
Pack and cell temperatures

### technology.vctu.big-5
Crash detection

### technology.vctu.text-6
Accelerometer detects crashes, accidents and drops

### technology.vctu.big-6
Bluetooth LE

### technology.vctu.text-7
On the pack: live battery data in the driver app

### technology.vctu.big-7
CAN bus

### technology.vctu.text-8
Links the BMS, bike and charger

### technology.vctu.big-8
Local logs

### technology.vctu.text-9
Keeps data when the signal drops


<!-- Technology · bms -->

### technology.bms.kicker-1
BMS · Ampersand BMS

### technology.bms.big-1
5 _years_

### technology.bms.lede-1
first life for our packs. The industry norm is one to two years.

### technology.bms.h2-1
An industry-leading BMS keeps every pack healthy.

### technology.bms.lede-2
Our electronics team designed the Ampersand BMS. It runs in every pack on our network. We control every limit and every firmware release.

### technology.bms.item-1
Charge and discharge limits set from live pack data

### technology.bms.item-2
Cell balancing and full protection

### technology.bms.item-3
State of charge and state of health

### technology.bms.item-4
Over-the-air updates


<!-- Technology · bankable-link -->

### technology.bankable-link.kicker-1
For financiers

### technology.bankable-link.h2-1
Every feature protects the asset.

### technology.bankable-link.lede-1
Cell-level BMS, crash detection, Bluetooth LE, GPS and remote control. See how each one makes our battery the most bankable asset in its sector.

### technology.bankable-link.button-1
For financiers

### technology.bankable-link.button-2
Safety and durability tests


## Vehicles page · proof/vehicles.html

### vehicles.title
Ampersand · Vehicles


<!-- Vehicles · hero -->

### vehicles.hero.kicker-1
Vehicles · Africa's first open swap network

### vehicles.hero.h1-1
Premium bikes, **open network.**

### vehicles.hero.lede-1
We design, assemble and sell the best-selling e-motorcycle in our markets, the Alpha. Now we open our swap network to other vehicle makers, so riders get more bikes and more prices to choose from.

### vehicles.hero.button-1
For fleets

### vehicles.hero.button-2
For vehicle makers

### vehicles.hero.big-1
{bikes}+

### vehicles.hero.text-1
bikes on the road


<!-- Vehicles · band -->

### vehicles.band.number-1
#1

### vehicles.band.label-1
best-selling e-motorcycle in its markets

### vehicles.band.number-2
230 _kg_

### vehicles.band.label-2
payload

### vehicles.band.number-3
70–80 _km_

### vehicles.band.label-3
range per swap

### vehicles.band.number-4
+15°

### vehicles.band.label-4
climbing ability


<!-- Vehicles · lineup -->

### vehicles.lineup.kicker-1
The line-up

### vehicles.lineup.h2-1
Built for commercial riders.

### vehicles.lineup.cell-1
Alpha

### vehicles.lineup.cell-2
Wylex D4000

### vehicles.lineup.cell-3
Maker

### vehicles.lineup.cell-4
Ampersand

### vehicles.lineup.cell-5
Wylex, Powered by Ampersand

### vehicles.lineup.cell-6
Top speed

### vehicles.lineup.cell-7
85 km/h

### vehicles.lineup.cell-8
90 km/h

### vehicles.lineup.cell-9
Power

### vehicles.lineup.cell-10
4.5 kW nominal

### vehicles.lineup.cell-11
8 kW peak

### vehicles.lineup.cell-12
Torque

### vehicles.lineup.cell-13
>220 Nm

### vehicles.lineup.cell-14
>260 Nm

### vehicles.lineup.cell-15
Payload

### vehicles.lineup.cell-16
230 kg

### vehicles.lineup.cell-17
230 kg

### vehicles.lineup.cell-18
Range per swap

### vehicles.lineup.cell-19
70–80 km

### vehicles.lineup.cell-20
70–80 km

### vehicles.lineup.cell-21
Climb

### vehicles.lineup.cell-22
+15°

### vehicles.lineup.cell-23
+15°

### vehicles.lineup.note-1
The Alpha MK2 runs on the new MK2 battery: two 15.5 kg packs.

### vehicles.lineup.caption-2
Alpha

### vehicles.lineup.text-1
Photo to come

### vehicles.lineup.b-1
Wylex D4000

### vehicles.lineup.caption-3
Wylex D4000

### vehicles.lineup.badge-1
For review · partner approval needed before go-live

### vehicles.lineup.quote-1
“Ampersand Alpha is the best performing vehicle in our portfolio.”

### vehicles.lineup.caption-1
[Name, role] · Jali Finance, asset finance partner


<!-- Vehicles · fleets -->

### vehicles.fleets.kicker-1
For fleets

### vehicles.fleets.big-1
+40%

### vehicles.fleets.lede-1
take-home pay for riders compared with petrol. Lower energy and maintenance costs, and less downtime.

### vehicles.fleets.h2-1
Electrify a fleet in one contract.

### vehicles.fleets.lede-2
We supply the vehicles, the energy and access to AmperOps. Your riders swap at {stations} stations and you see every vehicle and battery.

### vehicles.fleets.item-1
Moto-taxi, delivery and logistics fleets

### vehicles.fleets.item-2
Rescue teams in every city

### vehicles.fleets.item-3
Maintenance and aftercare

### vehicles.fleets.item-4
Partner reports in AmperOps

### vehicles.fleets.button-1
Get a fleet quote


<!-- Vehicles · oem -->

### vehicles.oem.h2-1
Your vehicle. Our energy network.

### vehicles.oem.lede-1
A partner's bike joins <b class="hl">{daily-swaps} swaps a day</b> from day one.

### vehicles.oem.item-1
Share your vehicle platform with our engineering team.

### vehicles.oem.item-2
Integrate the MK2 battery. We validate the vehicle with you.

### vehicles.oem.item-3
Launch with co-branding and access to all {stations} stations.

### vehicles.oem.button-1
Apply as an OEM


## Investors page · proof/investors.html

### investors.title
Ampersand · Investors


<!-- Investors · hero -->

### investors.hero.kicker-1
Investors

### investors.hero.h1-1
Already at scale. **Already profitable.**

### investors.hero.lede-1
Africa's commercial motorcycles burn $25 billion of fuel a year, and electric bikes are taking over. We built the swap network that riders already trust. It runs {daily-swaps} swaps a day.

### investors.hero.button-1
Why we win

### investors.hero.button-2
The asset

### investors.hero.big-1
$25B

### investors.hero.text-1
commercial 2W fuel spend in Africa


<!-- Investors · band -->

### investors.band.number-1
49%

### investors.band.label-1
electric 2W/3W growth a year, 2024–2030

### investors.band.number-2
{bikes}+

### investors.band.label-2
Ampersand bikes on the road

### investors.band.number-3
{daily-swaps}

### investors.band.label-3
battery swaps a day

### investors.band.number-4
7 _yrs_

### investors.band.label-4
of fleet telemetry


<!-- Investors · why -->

### investors.why.kicker-1
Why Ampersand

### investors.why.h2-1
Four reasons we win.

### investors.why.big-1
6 _min_

### investors.why.h3-1
Africa's first and longest-running swap network

### investors.why.text-1
Six minutes from arrival to departure, and {charged} of batteries leave fully charged.

### investors.why.big-2
5 _yrs_

### investors.why.h3-2
The most bankable battery asset

### investors.why.text-2
A five-year first life, against an industry norm of one to two years. Crash detection, Bluetooth LE and remote control protect every pack. [How](#bankable)

### investors.why.big-3
Open

### investors.why.h3-3
A bike-agnostic network

### investors.why.text-3
Partner bikes join our network. Battery revenue stays with Ampersand.

### investors.why.big-4
Light

### investors.why.h3-4
Capital-light growth

### investors.why.text-4
Partners sell and service bikes. Franchisees run stations. We build the energy network.

### investors.why.note-1
Market figures: Ampersand analysis of McKinsey & Co., UN Environment Programme, Shell Foundation and industry research.


<!-- Investors · bankable -->

### investors.bankable.kicker-1
For financiers

### investors.bankable.h2-1
Every feature protects the asset.

### investors.bankable.text-1
We designed the BMS, the VCTU and AmperOps together. Each part adds life, safety or control to the battery.

### investors.bankable.big-1
Cell-level BMS

### investors.bankable.what-1
Sets charge and discharge limits for each cell from live pack data.

### investors.bankable.gives-1
5-year first life. The industry norm is 1–2 years.

### investors.bankable.big-2
Humidity and heat sensing

### investors.bankable.what-2
Finds moisture and high temperatures inside the pack early.

### investors.bankable.gives-2
Faults are found before they cause damage.

### investors.bankable.big-3
Crash detection

### investors.bankable.what-3
The VCTU accelerometer detects crashes, accidents and drops, and reports each event to the fleet owner.

### investors.bankable.gives-3
Fleet owners get an alert and a clear record of every impact.

### investors.bankable.big-4
Bluetooth LE

### investors.bankable.what-4
The pack talks to the driver app and the swap station, also without a mobile signal.

### investors.bankable.gives-4
Riders see their battery in real time, and every swap and pack check is recorded at the pack.

### investors.bankable.big-5
GPS and 4G

### investors.bankable.what-5
Each pack reports its location and condition while the bike rides.

### investors.bankable.gives-5
Lost and stolen packs are found.

### investors.bankable.big-6
Remote control

### investors.bankable.what-6
From AmperOps we update, limit or immobilise a pack, over the air.

### investors.bankable.gives-6
The asset stays under our control, wherever it is.

### investors.bankable.h2-2
The most bankable battery asset in its sector.

### investors.bankable.lede-1
Longer life, fewer losses and full control of every pack. Seven years of fleet data went into each feature. No off-the-shelf swap battery has this combination, and our asset finance partners see the result in their own portfolios.

### investors.bankable.big-7
2.5–5×

### investors.bankable.text-2
the first life of a typical swap battery

### investors.bankable.big-8
2,500

### investors.bankable.text-3
cycles, first life

### investors.bankable.big-9
Remote

### investors.bankable.text-4
health, control and immobilisation

### investors.bankable.kicker-2
What our financing partners see

### investors.bankable.badge-1
For review · partner approval needed before go-live

### investors.bankable.quote-1
“Ampersand Alpha is the best performing vehicle in our portfolio.”

### investors.bankable.caption-1
[Name, role] · Jali Finance, asset finance partner

### investors.bankable.badge-2
Placeholder · AFP testimonial and data to come

### investors.bankable.big-10
[ – ]

### investors.bankable.metric-1
[portfolio result, for example packs recovered]

### investors.bankable.quote-2
“[Partner quote: how remote control and tracking protect our assets.]”

### investors.bankable.caption-2
[Name, role] · [Asset finance partner]


<!-- Investors · impact -->

### investors.impact.kicker-1
Impact

### investors.impact.big-1
+40%

### investors.impact.lede-1
take-home pay for an Ampersand rider: $173 a month, against $103 on petrol.

### investors.impact.kicker-2
Track record

### investors.impact.big-2
2019

### investors.impact.text-1
Africa's first commercial e-moto swap network opens in Kigali

### investors.impact.big-3
2022

### investors.impact.text-2
Series production and Kenya launch

### investors.impact.big-4
2025

### investors.impact.text-3
MK2 platform, 65% lighter packs

### investors.impact.big-5
2026

### investors.impact.text-4
{bikes}+ bikes, cabinets rolling out

### investors.impact.note-1
Backed by Acumen, British International Investment, DFC, Shell Foundation, TotalEnergies, UK aid, USAID, Rwanda Green Fund and others.


<!-- Investors · introductions -->

### investors.introductions.kicker-1
Investor relations

### investors.introductions.h2-1
The network is built. The model works.

### investors.introductions.lede-1
The question is no longer whether electric motorcycles win in Africa. It is how fast. Ampersand does not offer investments on this website: we meet new investors only through introductions from our investors and partners.

### investors.introductions.big-1
By introduction only.


## Work with us page · proof/contact.html

### contact.title
Ampersand · Work with us


<!-- Work with us · hero -->

### contact.hero.kicker-1
Work with us

### contact.hero.h1-1
Build on the **network.**

### contact.hero.lede-1
Fleets, vehicle makers, site hosts and franchisees grow with us. Tell us what you need and the right team will reply.


<!-- Work with us · request -->

### contact.request.kicker-1
Get in touch

### contact.request.h2-1
Tell us about your plan.

### contact.request.item-1
Send the form. It takes one minute.

### contact.request.item-2
The right team contacts you.

### contact.request.item-3
We plan the vehicles, energy and stations with you.

### contact.request.note-1
Media: media@ampersand.solar · Vehicle makers: OEM@ampersand.solar

### contact.request.text-1
Name

### contact.request.text-2
Organisation

### contact.request.text-3
Work email

### contact.request.text-4
I am

### contact.request.option-1
A fleet operator

### contact.request.option-2
A vehicle maker (OEM)

### contact.request.option-3
A site host or franchisee

### contact.request.option-4
Media

### contact.request.option-5
Other

### contact.request.button-1
Send


<!-- Work with us · request-ok -->

### contact.request-ok.text-1
Message received. This is a mockup: the form does not send data.
