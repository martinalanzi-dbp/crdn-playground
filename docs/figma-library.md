# Solar for CRDN: Figma library and component keys

Companion to `DESIGN.md`. Source: Figma file "Solar for CRDN", key `cTaHUBjUqP4Qxd630YA0Vs`. Component keys are carried over from v2.0 and were not re-verified one by one; names, sizes and states that were verified are recorded in `DESIGN.md` Components.

## 9. Component library — Solar for CRDN (Figma)

Source file: `Solar for CRDN`, file key `cTaHUBjUqP4Qxd630YA0Vs`. Components below are published; import them by key (`importComponentSetByKeyAsync` for sets, `importComponentByKeyAsync` for single components). Keys were read from the file on Nov 5, 2026.

Note: the generic **Solar** library is also attached to some CRDN files and has components with the same names but **different keys**. Use the Solar for CRDN keys below.

### 9.1 App shell and navigation

| Component | Type | Key | Variants | Main properties |
|---|---|---|---|---|
| Desktop Navigation | set | `c7889a25ebf209f19c3547fe33afc76c6e1155be` | Role = HO, PMD, Administrator, Legal, Franchise Development, Finance, OPS and Sales, IT Support, Marketing, Franchise | — (1440×64) |
| Responsive Navigation | set | `8f6f03634c0fcb21e7b7a0e934e2d65caa8736c0` | Status = Open/Closed; Device = Mobile/Tablet | — |
| Menu Link | set | `569f5cdae5620a8c1b280b56d78b4294b5aee7a5` | Status = Default/Pressed/Active | Link Name, Icon |
| Breadcrumbs | comp | `de628a966686f2e352dc838f66949c58f3791037` | — | Link 1–7 (booleans) |
| Base Header | set | `f67058f9794a04dd1dbb760b982a312396826f23` | Type = Jobs List/Selected Job/QMD | Header, Description, Show Primary/Secondary Button, Show Status, Show Avatar |
| Job Header | set | `4b6a75709b77f0dae9ad639a43e2effe0679c2d2` | Type = Jobs | Show Breadcrumbs, Show Tabs |
| Tab Underline | set | `1b838ebeb3ebbf9704f76644b75f937b691279f5` | Selection = #1–#10 | — |
| Tab | set | `198e5d1d6c409c0186ce4ac66bbf6b6fdde4da04` | Active = No/Yes; Size = SM/MD | Text, Show Badge |
| Tab Pill | set | `878b3f6efca8e1dba49334c16ab89e6acc618edb` | Status = Inactive/Active/Tertiary; Size = SM/MD | Text |
| Tab Group | set | `ce2a5f74d12691d4c303b5f85e53a641697c9a9d` | # = 1–6 | — |
| Menu Inline | set | `37c76d2f04658aadf0ab8ec8dc8c89ff98e62b28` | Collapsed = False/True | — |
| Navigation/Tertiary | comp | `821db44cbb1b158168dc548264dfe53d3825531f` | — | — |
| Menu sidebar (legacy) | set | `2aac9b93743a9fa05b5d49fb663f59b26b7c2941` | Type = Collapsed/Default/Collapsed with arrow | Do not use for new screens |

### 9.2 Actions

| Component | Type | Key | Variants | Main properties |
|---|---|---|---|---|
| Button | set | `3300550b0d6e6c7fad3e9e09f502401d7d4c4403` | Type = Primary/Secondary/Destructive/Success/Ghost; Size = SM/MD; Status = Default/Hover/Focus/Disable/Loading; Icon = Trailing + Leading / Trailing <- / Leading -> / Icon Button / None | Label Text, Show Label |
| Combo Button | set | `90ee98883b4734c26dc4a2776cafc2178fdc904d` | Status = Default/Hover/Open/Focus/Disable; Size = SM/MD; Type = Primary/Secondary White | Label Text, Left Icon, Right Icon |
| Links | set | `c12bf8e573ad528a51188815c3c8cabb5aaeb75f` | Type = Default/Success/Error/Warning/Info; State = Default/Hover/Disabled; Size = SM/MD/LG | Link text, Left/Right Icon |

A second, older `Button` set exists (`af5a88fb3d4aa97a9014f233e00d4297874dc866`, State only). Do not use it.

### 9.3 Forms and selection

| Component | Type | Key | Variants | Main properties |
|---|---|---|---|---|
| Input | set | `6fd0a0dd7fd3036dab70318a5401eb2a060cd556` | Size = SM/MD; Status = Default/Hover/Active/Filled/Focus/Disable/Error/Typing | Label Text, Value Text, Hint Text, Hint Icon, Hint Content, Required, Left/Right Icon, Show value, Show Tooltip |
| Dropdown | set | `3b23bfc3babbd04816e64edc7617f1486acf7248` | Size = SM/MD; Status = Default/Hover/Active/Filled/Focus/Error/Disabled; Type = Base/Prefix | Label Text, Value Text, Hint Text, Required, Left/Right Icon, Clear Icon, Phone Extension |
| Dropdown Menu | set | `1ca43b7e97d7e630b05a332d04207cb9cf0fea5b` | Type = List/Checkbox/Icon; Size = SM/MD | Item 1–10 (booleans) |
| Dropdown Item | set | `c7d41f024656b3ca77d592108d0f12e0657c02da` | Type = Default/List/Checkbox/Icon; Size = SM/MD; Status = Default/Hover/Selected | Label Text, Left/Right Icon |
| Search | set | `fc5309e1485a67839622471f7901da4bbf2406b2` | State = Default/Focused/Filled/Disabled/Hovered | Show Closer Icon |
| Text Area | set | `1161985f84a89e77ecfd7a50d1837be8b2db49d9` | Status = 8 states; Size = SM/MD/LG/XL | Label Text, Placeholder Text, Character Count (+Text), Hint, Required |
| Controls | set | `1ad7eef4179a6081c67ad0bdd89cd991591024c4` | Type = Toggle/Radio Button/Checkbox; State = Unselected/Selected; Status = Default/Hover/Focus/Disabled | — |
| Checkbox with label | set | `c07101f618483c84a574a81bffe3bc6977a0deef` | State = Normal/Hover/Focus/Selected | Label, Description, Show Description |
| Radio Button with label | set | `c85576c48cb1ab6ce18ff45cea75179c870e87be` | State = Normal/Hover/Focus/Selected | Label, Description, Show Description |
| Date Picker | set | `f6bdf0aac83b4fb188057872426eef09e74a342d` | Type = Simple/Double | Show Input |
| Day | set | `ae22fe67926506639976de67e9ab20d72b50e4e5` | Position, Type (Enabled/Range/Disabled/Selected/Not Available) | Label text |
| Drag & Drop | set | `f0fb923750d09435fbd7e61599c527ff86fb8d13` | State = Default/Disabled/Hover | Show max files |
| File upload | set | `b8f8c82079be2192760e6a015e7698c8fcaa0c98` | Error; State = Uploading/Error/Success; Mode | File name text |
| Uploads | set | `a1d1d8eac058554437756740d5f21cc3ca1ffe68` | State = Default/Limit Reached | Show uploads 1–4 |

A second `Radio Button with label` set exists (`2faa242c821f94da34a8ebafb5434e8e3d5aaca2`); prefer the first.

### 9.4 Status, labels and feedback

| Component | Type | Key | Variants | Main properties |
|---|---|---|---|---|
| Badge | set | `fa1986d36edcff69111e23a0588ff731d6611203` | Style = Accent; Size = SM/MD; Type = Neutral/Error/Info/Primary/Success/Warning | Text, Left/Right Icon |
| Filter Pills | set | `1f7537b075f2e4771071d6cb97f1ddc8d77c218f` | Size = SM/MD | Text, Left/Right Icon |
| Status Pills | set | `589fa1223722ad31fa9bf168a67a55f7f92cb6a9` | Status = Default/Focus/Hover/Loading/Disable; Size = MD/SM/XS; Type = Active/Canceled/Closed/Payment Applied/Draft/Inactive | Show Chevron |
| Pill Dropdown | comp | `279d178a04fd5f2d7f7d7980996d7eef9026fe4b` | — | Show Active/Payment/Closed/Canceled/Draft/Inactive |
| Alerts | set | `70315feb3a5238b82dbaf62f60a068dabf8f69d0` | Type = Alert/Toast; State = Error/Info/Neutral/Success/Warning | Change label, Change description, Show description, Icon, Border, Close Button, Primary/Secondary Button, Actions |
| Tooltip | set | `0fa8da6e3c2e9b29f7a00fe5dee3df43cc94c373` | Size = SM/XS | Label, Show Learn more link |
| Spinner | set | `a09383b78b1fba3fcf098afda12df173dd762915` | Variant = 4 rotations; Size = 16/20/24/32/40px | — |
| Empty state | set | `652130874932342b01e24907de7c7f950c8d33c8` | Empty = Empty state/Error/Favorite/Lost connection/No message/Notification/Result/Success | Text, Show Primary Button |
| Avatar | set | `48dfc3ca678be6386aacb3d1e3687a9f38b4b186` | Type = Initials/Image/Logo; Size = 24–64; Placeholder icon | — |
| Avatar group | set | `f07be44b5645a1e6a02af7ffc9547ad0bce0c9c5` | — | — |

### 9.5 Containers, overlays and data

| Component | Type | Key | Variants | Main properties |
|---|---|---|---|---|
| Section/Header | comp | `c04831d9686c7f81e4394fc34b09faaca21cfda7` | — | Header, Show Button 1, Show Button 2 |
| Section/Base | comp | `bbeb6d00a748af7961f925e2c32ede00d1adad83` | — | — |
| Section/Content | set | `585a41f516154e6e90c19bd4bcdb15502edf1f3f` | Type = Job Details/Base; State = many job sections | — |
| Modal | set | `70c883992aa0e49b205928a2382509d5d2f7302b` | Type = Default/Destructive/Success | Show Secondary Button |
| Modal Content | set | `7a08e41af18543be3441ef94e96366f92af618de` | Property 1 = Base/Content | Title, Subtitle, Description 1/2 (+ text), Items List |
| Side Panel/Base | set | `3fa8220075716b0cb61f63cffcd5e5769b254370` | Type = Based | Show Footer, Show Tabs |
| SidePanel/Header | set | `fa705b34e737085c1b37dc947646d1fc589b1d1d` | Type = Default | Header, Show Icon, Show Avatar |
| SidePanel/Footer | set | `2f0ccad2e52165b5d0f10fc27ef4639204f627d2` | Type = Default | Show Primary Button, Show Ghost Button |
| Table Cell | set | `753ceccf4918aab5314e130fa221cca27ad96cfd` | Place = Header/Content; Action = None/Checkbox/Radio button; State = Default/Disabled/Active; Type = Default/Text/Link/Avatar+Link/Badge/Icon/Text+Badge/Pill | Text, Change text header, Icon, Link, Avatar |
| Table/Base | set | `553aca94b574755ec44c773f95df1c2ed8b737c7` | Type = Empty | Show Header, Show Pagination, Show Filters |
| Table/Header | set | `665aacd03cae781df23df60f8feeca96b1c81cba` | Job List = Default; State = Default/Base | — |
| Table/Header/Buttons | set | `0abd6cce130c3493919e89a0aa49cab802503293` | State = Default/Hover; Job Status = Default/Date/Search/Filters | — |
| Table/Filters | set | `3c97de6d974b22e8ba51f5dd1d46e0a03a1e90a8` | Type = Populated/Bas | Filter 1–8 |
| Table/Content | set | `6445dc51020251578739ae5b8f54c0ec2e5b6001` | Type = Job List; State = Populated/Loading/No Results/Base/Empty State | — |
| Pagination | set | `02a94443e00acb845bc702b6e0f85083aa38b9f5` | Type = Button group | — |
| Pagination/Items | set | `b8de116f8b9ae2199ff2cd9930bccba29214549f` | State; Type; Orientation | Change text |
| Item (list row) | set | `cd4ee365d2a9b4bdac86d28ecd76145eca655f9c` | Type = Badge/Link/Text/Date/Pill | Text, Label, Show Button |
| KPI Card | set | `904c85bad9f6c77c9da86ed28573fa7ba717359f` | Status (11); Type = Default/Pressed; Name = TIP/QMD/C&A | Text |
| Step (wizard) | set | `0f553d5721ce6e06b5525833f9bc006802355505` | Property 1 = Default/Variant2/Variant3 | Step Name |

### 9.6 Domain components (RestorNet-specific)

Use these when the screen covers the matching domain area instead of rebuilding them.

- **Assignments:** Assignment Section – Banner `9479a7dd4a313cfc1cd17fc1e8f892cefd8a6833`, – General `d313fe73412f0dfdb707771a6937f8c31e8eedc8`, – Taxes and Discounts `9fab411d4eac7dd9545f1352b6ba02ddaee76902`, – Item Summary `7e15bd33eafba3d0938f6f1364a80a9f2f9392c7`, – Estimates `6a1d07703ad370a335e9f0832a995c2f141950b0`, – Delivery `e5ffb5fbcc19d85b4a0dd28a50c2fa1cecaef553`, – Billing Summary `610a14bb223ae4a1565b31ed094629482a9fee95`, Program Requirements Steps `cc5b856858feaeff8c447eac4f599821c409da6c`.
- **Communication:** Activity Header `2b3c896076c98093c0ed23f9f663fd4ec6d78fb1`, Note `959bdd8ebed51feb87fe0fa3a33f6abd90cc0d04`, Log Sections `eae100a61666403bcf306a6260e027a5ec6a48c0`.
- **Items:** Add Item `c1c923593f36dd1470d49c411df9eccdb6d92b64`, Item Notes `be68f88ea41af88718ab36ca6c0da730bbf63913`, Folder `27c6e95a40371a34a3e9e848ea1202857ee28ab3`, Folders Menu `faa73189b1148e8406cdda1399a3c53bab227d45`, Card/Items `d0ed040bddd94a419836b6c7f264808cb06d1b95`.
- **Rooms and photos:** Card/Room `9b547d9a26a9b5727f3659781383581d00122b6e`, Card/Pictures `f781e663d14a323c17ed3e57e8bd045cdc636072`, Card/Pin `63a3392021ed74d1eaff59d9266126388ae34970`, Photos Header `37fe34a3c96eef6581c870e05334168b51225cf0`, Photos Accordion `8cd879d8da9994db2110cf6b6ba4949405fe5c58`, Photos Selected `f404f04c1655f11b97a952705a09e0584c39840a`, Photo `16e4ba481d325ce0a2cd7d2f945d80fd34830840`, Photo Folder `39cb3bf1b9b200bb5497b50c17760381fecfba7e`, Section Divider `3b0178d385f4a09a5c38502e7f72752b669017a6`.
- **Side panel content:** Job Creation `e1d54bc598d4b0d40d855f2432738c6220fe0baa`, Job List `3b643e0543dbc8335f6b955d32946c0596ff0498`, Add Estimate `31849ec03325b2e5cc40a431919dc74307f9823c`, Room `6a2bb20929daf7aabd58559252c6972c0a12382c`, Room/Edit Images `39987a9bbae00c6e13cee455b44bdd3290055622`, Selected Job `853632ca81dfdc0ac90dd7aa8e91e7d86bc6df41`, Item Search `b7bfa49e86691e8e2500fc3218fa7b6ff0098c06`.
- **Uploads:** Card/Upload/Edit `901186cc35c6e8147e33c856cc18a6b23e056d70`.
- **Brand:** Logo `a3a45c164568d177978fd96853ae76ad2fbba94b` (Style = White/Black/Brand; Size = SM/MD/LG/XL), Isotype `76347ad6bb8e6af2b945aa3a2197722852b09717`.

### 9.7 Icons

The `Icons` page has 230 icon components named `Category / Name` (Arrows, Charts, Development, Devices, Finance, Maps & Travel, People, Time & Date, and more). Search the library by name (for example "Arrows / Chevron-double", "Time & Date / Calendar") and place the instance; only import a raw SVG when no icon in the set fits.

### 9.8 Gaps found so far (local components were needed)

For the Advanced find & export screens these needs had no library match and were built locally on the CRDN ‒ Franchises "Aixle" page:
- Query field box (condition field/operator/value select with Area prefix, Default/Error/Disabled).
- Column chip (draggable selected column, Default/Missing).
- Saved query list item (Default/Selected, optional tag).

Check `Dropdown` (Type=Prefix), `Dropdown Item` and `Item` before building similar elements again.
