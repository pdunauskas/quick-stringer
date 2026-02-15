const state = {
  customers: [],
  rackets: [],
  inventory: [],
  customerStrings: [],
  jobs: [],
  settings: {
    currency: "USD",
    tensionUnit: "kg",
    language: "en",
    stringerName: ""
  },
  lastJobCustomerId: ""
};

const storageKey = "quick-stringer-data";
const onboardingKey = "quick-stringer-onboarding";
const schemaVersion = 7;
const appVersion = "1.1.2";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

let timerInterval = null;
let timerStart = null;
let jobSearchQuery = "";
const jobSortState = { key: "date", direction: "desc" };

const translations = {
  en: {
    app_title: "Quick Stringer",
    app_subtitle: "Simple shop manager for rackets, strings, and jobs.",
    tab_dashboard: "Dashboard",
    tab_settings: "Settings",
    tab_info: "Info",
    tab_customers: "Customers",
    tab_rackets: "Rackets",
    tab_inventory: "String Inventory",
    tab_jobs: "Stringing Jobs",
    tab_updates: "Updates",
    dashboard_today: "Today",
    dashboard_8weeks: "Past 8 Weeks",
    dashboard_jobs_month: "Jobs This Month",
    dashboard_revenue_month: "Revenue This Month",
    dashboard_inventory_items: "Inventory Items",
    dashboard_jobs_8weeks: "Jobs (Last 8 Weeks)",
    dashboard_revenue_8weeks: "Revenue (Last 8 Weeks)",
    dashboard_costs_8weeks: "String Costs (Last 8 Weeks)",
    dashboard_profit_8weeks: "Profit (Last 8 Weeks)",
    dashboard_avg_time: "Avg Stringing Time",
    dashboard_stats_title: "Statistics",
    dashboard_stats_subtitle: "Totals and inventory overview.",
    dashboard_total_length: "Total String Length Used",
    dashboard_total_customers: "Total Customers",
    dashboard_total_jobs: "Total Stringing Jobs",
    dashboard_total_time: "Total Time Spent",
    dashboard_total_profit: "Total Profit",
    dashboard_greeting: "Hello",
    dashboard_greeting: "Hello",
    dashboard_inventory_left: "Inventory Left",
    dashboard_no_inventory: "No inventory yet.",
    dashboard_quick_add: "Quick Add Job",
    dashboard_quick_add_desc: "Log a stringing job in under a minute.",
    cta_add_job: "Add Job",
    settings_title: "General Settings",
    settings_subtitle: "Customize your defaults for currency and tension units.",
    settings_language: "Language",
    settings_stringer_name: "Stringer Name",
    settings_stringer_name: "Stringer Name",
    settings_currency: "Currency",
    settings_tension_unit: "Tension Unit",
    settings_kg: "Kilograms (kg)",
    settings_lb: "Pounds (lb)",
    settings_save: "Save Settings",
    customers_title: "Customers",
    customers_subtitle: "Store customer details and notes.",
    customers_name: "Full Name",
    customers_phone: "Phone",
    customers_email: "Email",
    customers_notes: "Notes",
    customers_add: "Add Customer",
    customers_update: "Update Customer",
    customer_strings_title: "Customer Strings",
    customer_strings_subtitle: "Register strings that customers bring in.",
    customer_string_model: "String Model",
    customer_string_gauge: "Gauge",
    customer_string_color: "Color",
    customer_string_add: "Add String",
    customer_string_update: "Update String",
    rackets_title: "Rackets",
    rackets_subtitle: "Track rackets and link them to customers.",
    rackets_model: "Brand / Model",
    rackets_model_short: "Model",
    rackets_head: "Head Size",
    rackets_head_short: "Head",
    rackets_pattern: "Pattern",
    rackets_notes: "Notes",
    rackets_add: "Add Racket",
    rackets_update: "Update Racket",
    inventory_title: "String Inventory",
    inventory_subtitle: "Track your string reels, sets, and remaining length.",
    inventory_name: "Brand / String",
    inventory_string: "String",
    inventory_reel_id: "Reel ID",
    inventory_gauge: "Gauge",
    inventory_color: "Color",
    inventory_length: "Length (meters)",
    inventory_length_short: "Length (m)",
    inventory_initial_length: "Initial Length (meters)",
    inventory_length_left: "Length Left (meters)",
    inventory_initial_short: "Initial (m)",
    inventory_length_left_short: "Length Left (m)",
    inventory_total_cost: "Total Spool Cost",
    inventory_cost_per_m: "Cost / m",
    inventory_add: "Add Inventory",
    inventory_update: "Update Inventory",
    jobs_title: "Stringing Jobs",
    jobs_subtitle: "Log each stringing job and prices charged.",
    jobs_search_customer: "Search customer...",
    jobs_table_search: "Search customer or string...",
    jobs_search_string: "Search string...",
    jobs_search_customer_string: "Search customer string...",
    jobs_customer_string: "Customer String",
    jobs_customer_string_new: "New Customer String",
    jobs_customer_string_model: "String model",
    jobs_customer_string_gauge: "Gauge",
    jobs_customer_string_color: "Color",
    jobs_customer_string_new_btn: "New",
    jobs_racket: "Racket",
    jobs_string_source: "String Source",
    jobs_string_source_shop: "My String",
    jobs_string_source_customer: "Customer String",
    jobs_mains: "Mains",
    jobs_crosses: "Crosses",
    jobs_hybrid_toggle: "Hybrid stringing (enable crosses)",
    jobs_string_used: "String Used",
    jobs_date: "Date",
    jobs_tension: "Tension",
    jobs_length_used: "Length Used (meters)",
    jobs_labor_price: "Labor Price",
    jobs_labor_header: "Labor",
    jobs_string_price: "String Price",
    jobs_calc: "Calculate",
    jobs_time: "Time (mm:ss)",
    jobs_start: "Start Stringing",
    jobs_stop: "Stop Timer",
    jobs_finish: "Finish & Save",
    jobs_source: "Source",
    jobs_source_hybrid: "Hybrid",
    jobs_tension_header: "Tension",
    jobs_time_header: "Time",
    jobs_price: "Price",
    footer_saved: "Data is saved locally in your browser.",
    footer_export: "Export Data",
    footer_export_csv: "Export CSV",
    footer_import: "Import Data",
    footer_reset: "Reset All Data",
    import_success: "Import successful.",
    import_failed: "Import failed",
    import_version_same: "File schema version is",
    import_version_unknown: "File schema version unknown",
    import_migrated_from: "Migration applied from",
    import_migrated_to: "to",
    import_migrated: "Migrations applied.",
    info_title: "How This App Works",
    info_subtitle: "Simple, private, and fully in your browser.",
    info_step1_title: "1. You enter your data",
    info_step1_desc: "Customers, rackets, strings, and jobs are saved only in your browser.",
    info_step2_title: "2. The app calculates totals",
    info_step2_desc: "Revenue, costs, and timing are calculated locally on your device.",
    info_step3_title: "3. You export backups",
    info_step3_desc: "Export JSON or CSV ZIP regularly so you never lose data.",
    info_privacy_title: "Data Privacy",
    info_privacy_desc: "This webpage does not send or store your data on a server. Everything stays in your browser.",
    info_export_note: "Always export your data before exiting the page, otherwise you may lose it.",
    info_backup_title: "Backups",
    info_backup_desc: "There are two types of backups:",
    info_backup_export: "Export Data: use this to back up and later upload to continue working.",
    info_backup_csv: "Export CSV: extra export for third‑party apps, not importable back here.",
    updates_title: "Updates",
    updates_subtitle: "What’s new in Quick Stringer.",
    updates_post_title_112: "Hybrid-ready stringing workflow",
    updates_post_marketing_112:
      "Plan mains and crosses in one place, auto-calc costs per spool, and keep inventory accurate without extra math. This update trims admin time and helps you quote with confidence.",
    updates_post_new_112: "New",
    updates_post_changed_112: "Changed",
    updates_post_removed_112: "Removed",
    updates_post_new_list_112:
      "Hybrid toggle for separate mains/crosses||Cross-source tracking for each slot||Automatic string price from full spool cost",
    updates_post_changed_list_112:
      "Jobs now show mains/crosses detail in the list||Loss-making labor is highlighted when shop string costs exceed labor",
    updates_post_removed_list_112:
      "Single-string-only job flow; jobs now support two slots",
    onboarding_title: "Welcome to Quick Stringer",
    onboarding_subtitle: "Here’s the fastest way to start tracking your stringing work.",
    onboarding_step1_title: "1. Add Customers",
    onboarding_step1_desc: "Go to the Customers tab and store contact details.",
    onboarding_step2_title: "2. Add Rackets",
    onboarding_step2_desc: "Create rackets linked to each customer.",
    onboarding_step3_title: "3. Add String Inventory",
    onboarding_step3_desc: "Enter your spool length and total cost so pricing auto-calculates.",
    onboarding_step4_title: "4. Log Stringing Jobs",
    onboarding_step4_desc: "Select a customer, their racket, and the string used. The price button will calculate for you.",
    onboarding_step5_title: "5. Export Backups",
    onboarding_step5_desc: "Use Export in the footer to save a backup file anytime.",
    onboarding_note_title: "Important Note",
    onboarding_note_desc: "Always export your data before exiting the page so you never lose a backup.",
    onboarding_close: "Got it, let’s start",
    common_customer: "Customer",
    common_notes: "Notes",
    common_cancel: "Cancel Edit",
    common_edit: "Edit",
    common_delete: "Delete",
    common_select: "Select",
    common_unknown: "Unknown",
    common_customer_label: "Customer",
    common_shop: "Shop",
    common_customer_string: "Customer",
    alert_select_customer: "Please select a customer from the list.",
    alert_select_string: "Please select a string from inventory.",
    alert_select_customer_string: "Please select or enter a customer string.",
    confirm_reset: "Delete all stored data?",
    confirm_export: "Please export your data before leaving this page."
  },
  lt: {
    app_title: "Quick Stringer",
    app_subtitle: "Paprastas raketų, stygų ir darbų valdymas.",
    tab_dashboard: "Skydelis",
    tab_settings: "Nustatymai",
    tab_info: "Info",
    tab_customers: "Klientai",
    tab_rackets: "Raketės",
    tab_inventory: "Stygų inventorius",
    tab_jobs: "Stygavimo darbai",
    tab_updates: "Atnaujinimai",
    dashboard_today: "Šiandien",
    dashboard_8weeks: "Paskutinės 8 savaitės",
    dashboard_jobs_month: "Darbai šį mėn.",
    dashboard_revenue_month: "Pajamos šį mėn.",
    dashboard_inventory_items: "Inventoriaus įrašai",
    dashboard_jobs_8weeks: "Darbai (paskutinės 8 sav.)",
    dashboard_revenue_8weeks: "Pajamos (paskutinės 8 sav.)",
    dashboard_costs_8weeks: "Stygų kaštai (paskutinės 8 sav.)",
    dashboard_profit_8weeks: "Pelnas (paskutinės 8 sav.)",
    dashboard_avg_time: "Vid. stygavimo laikas",
    dashboard_stats_title: "Statistika",
    dashboard_stats_subtitle: "Suminiai rodikliai ir inventoriaus apžvalga.",
    dashboard_total_length: "Iš viso panaudotas stygų ilgis",
    dashboard_total_customers: "Iš viso klientų",
    dashboard_total_jobs: "Iš viso stygavimų",
    dashboard_total_time: "Iš viso sugaišta laiko",
    dashboard_total_profit: "Bendras pelnas",
    dashboard_greeting: "Sveiki",
    dashboard_inventory_left: "Likęs inventorius",
    dashboard_no_inventory: "Inventoriaus nėra.",
    dashboard_quick_add: "Greitas darbas",
    dashboard_quick_add_desc: "Užregistruokite stygavimą per minutę.",
    cta_add_job: "Pridėti darbą",
    settings_title: "Bendri nustatymai",
    settings_subtitle: "Nustatykite valiutą ir įtempimo vienetus.",
    settings_language: "Kalba",
    settings_stringer_name: "Stygavimo meistro vardas",
    settings_currency: "Valiuta",
    settings_tension_unit: "Įtempimo vienetas",
    settings_kg: "Kilogramai (kg)",
    settings_lb: "Svarai (lb)",
    settings_save: "Išsaugoti",
    customers_title: "Klientai",
    customers_subtitle: "Išsaugokite kontaktus ir pastabas.",
    customers_name: "Vardas",
    customers_phone: "Telefonas",
    customers_email: "El. paštas",
    customers_notes: "Pastabos",
    customers_add: "Pridėti klientą",
    customers_update: "Atnaujinti klientą",
    customer_strings_title: "Klientų stygos",
    customer_strings_subtitle: "Registruokite klientų atsineštas stygas.",
    customer_string_model: "Stygos modelis",
    customer_string_gauge: "Storis",
    customer_string_color: "Spalva",
    customer_string_add: "Pridėti stygą",
    customer_string_update: "Atnaujinti stygą",
    rackets_title: "Raketės",
    rackets_subtitle: "Sekite raketes ir priskirkite klientams.",
    rackets_model: "Markė / Modelis",
    rackets_model_short: "Modelis",
    rackets_head: "Galvos dydis",
    rackets_head_short: "Galva",
    rackets_pattern: "Raštas",
    rackets_notes: "Pastabos",
    rackets_add: "Pridėti raketę",
    rackets_update: "Atnaujinti raketę",
    inventory_title: "Stygų inventorius",
    inventory_subtitle: "Sekite rulonų likutį ir kainą.",
    inventory_name: "Markė / Styga",
    inventory_string: "Styga",
    inventory_reel_id: "Rulono ID",
    inventory_gauge: "Storis",
    inventory_color: "Spalva",
    inventory_length: "Ilgis (metrai)",
    inventory_length_short: "Ilgis (m)",
    inventory_initial_length: "Pradinis ilgis (metrai)",
    inventory_length_left: "Likęs ilgis (metrai)",
    inventory_initial_short: "Pradinis (m)",
    inventory_length_left_short: "Likęs (m)",
    inventory_total_cost: "Rulono kaina",
    inventory_cost_per_m: "Kaina / m",
    inventory_add: "Pridėti inventorių",
    inventory_update: "Atnaujinti inventorių",
    jobs_title: "Stygavimo darbai",
    jobs_subtitle: "Registruokite darbus ir kainas.",
    jobs_search_customer: "Ieškoti kliento...",
    jobs_table_search: "Ieškoti kliento ar stygos...",
    jobs_search_string: "Ieškoti stygos...",
    jobs_search_customer_string: "Ieškoti kliento stygos...",
    jobs_customer_string: "Kliento styga",
    jobs_customer_string_new: "Nauja kliento styga",
    jobs_customer_string_model: "Stygos modelis",
    jobs_customer_string_gauge: "Storis",
    jobs_customer_string_color: "Spalva",
    jobs_customer_string_new_btn: "Nauja",
    jobs_racket: "Raketė",
    jobs_string_source: "Stygos šaltinis",
    jobs_string_source_shop: "Mano styga",
    jobs_string_source_customer: "Kliento styga",
    jobs_mains: "Pagrindinės",
    jobs_crosses: "Skersinės",
    jobs_hybrid_toggle: "Hibridinis stygavimas (įjungti skersines)",
    jobs_string_used: "Naudota styga",
    jobs_date: "Data",
    jobs_tension: "Įtempimas",
    jobs_length_used: "Naudotas ilgis (metrai)",
    jobs_labor_price: "Darbo kaina",
    jobs_labor_header: "Darbas",
    jobs_string_price: "Stygos kaina",
    jobs_calc: "Skaičiuoti",
    jobs_time: "Laikas (mm:ss)",
    jobs_start: "Pradėti stygavimą",
    jobs_stop: "Sustabdyti laikmatį",
    jobs_finish: "Baigti ir išsaugoti",
    jobs_source: "Šaltinis",
    jobs_source_hybrid: "Hibridas",
    jobs_tension_header: "Įtempimas",
    jobs_time_header: "Laikas",
    jobs_price: "Kaina",
    footer_saved: "Duomenys saugomi naršyklėje.",
    footer_export: "Eksportuoti",
    footer_export_csv: "CSV eksportas",
    footer_import: "Importuoti",
    footer_reset: "Ištrinti viską",
    import_success: "Importas sėkmingas.",
    import_failed: "Importas nepavyko",
    import_version_same: "Failo schemos versija",
    import_version_unknown: "Failo schemos versija nežinoma",
    import_migrated_from: "Migracija atlikta iš",
    import_migrated_to: "į",
    import_migrated: "Migracijos pritaikytos.",
    info_title: "Kaip veikia ši programa",
    info_subtitle: "Paprasta, privatu ir tik naršyklėje.",
    info_step1_title: "1. Jūs įvedate duomenis",
    info_step1_desc: "Klientai, raketės, stygos ir darbai saugomi tik naršyklėje.",
    info_step2_title: "2. Programa skaičiuoja sumas",
    info_step2_desc: "Pajamos, kaštai ir laikas skaičiuojami jūsų įrenginyje.",
    info_step3_title: "3. Jūs eksportuojate kopijas",
    info_step3_desc: "Reguliariai eksportuokite JSON arba CSV ZIP.",
    info_privacy_title: "Duomenų privatumas",
    info_privacy_desc: "Ši svetainė nesiunčia ir nesaugo jūsų duomenų serveryje.",
    info_export_note: "Visada eksportuokite duomenis prieš išeidami, kitaip juos galite prarasti.",
    info_backup_title: "Atsarginės kopijos",
    info_backup_desc: "Yra du atsarginių kopijų tipai:",
    info_backup_export: "Eksportuoti duomenis: naudokite atsarginei kopijai ir vėliau įkelkite tęsti darbą.",
    info_backup_csv: "Eksportuoti CSV: papildoma išklotinė trečiųjų šalių programoms, jos neįmanoma importuoti.",
    updates_title: "Atnaujinimai",
    updates_subtitle: "Kas naujo „Quick Stringer“.",
    updates_post_title_112: "Hibridinio stygavimo eiga",
    updates_post_marketing_112:
      "Vienoje vietoje suplanuokite pagrindines ir skersines stygas, automatiškai skaičiuokite kainą pagal ritę ir palaikykite tikslų likutį be papildomo skaičiavimo.",
    updates_post_new_112: "Nauja",
    updates_post_changed_112: "Pakeista",
    updates_post_removed_112: "Pašalinta",
    updates_post_new_list_112:
      "Hibrido jungiklis atskiroms pagrindinėms/skersinėms||Kiekvieno lizdo šaltinio sekimas||Automatinis kainos skaičiavimas nuo pilnos ritės kainos",
    updates_post_changed_list_112:
      "Darbų sąrašas rodo pagrindines/skersines||Pažymimi atvejai, kai parduotuvės stygos kaina viršija darbo kainą",
    updates_post_removed_list_112:
      "Vienos stygos darbo eiga; dabar darbai palaiko du lizdus",
    onboarding_title: "Sveiki atvykę į Quick Stringer",
    onboarding_subtitle: "Greitas startas stygavimo darbams sekti.",
    onboarding_step1_title: "1. Pridėkite klientus",
    onboarding_step1_desc: "Eikite į Klientų skiltį ir įveskite kontaktus.",
    onboarding_step2_title: "2. Pridėkite raketes",
    onboarding_step2_desc: "Sukurkite raketes ir priskirkite klientams.",
    onboarding_step3_title: "3. Pridėkite stygas",
    onboarding_step3_desc: "Įveskite rulono ilgį ir kainą.",
    onboarding_step4_title: "4. Registruokite darbus",
    onboarding_step4_desc: "Pasirinkite klientą, raketę ir stygą.",
    onboarding_step5_title: "5. Eksportuokite",
    onboarding_step5_desc: "Naudokite eksportą atsarginėms kopijoms.",
    onboarding_note_title: "Svarbu",
    onboarding_note_desc: "Visada eksportuokite prieš išeidami.",
    onboarding_close: "Supratau, pradedam",
    common_customer: "Klientas",
    common_notes: "Pastabos",
    common_cancel: "Atšaukti",
    common_edit: "Redaguoti",
    common_delete: "Ištrinti",
    common_select: "Pasirinkti",
    common_unknown: "Nežinoma",
    common_customer_label: "Klientas",
    common_shop: "Dirbtuvės",
    common_customer_string: "Klientas",
    alert_select_customer: "Pasirinkite klientą iš sąrašo.",
    alert_select_string: "Pasirinkite stygą iš inventoriaus.",
    alert_select_customer_string: "Pasirinkite arba įveskite kliento stygą.",
    confirm_reset: "Ištrinti visus duomenis?",
    confirm_export: "Prieš išeinant eksportuokite duomenis."
  },
  de: {
    app_title: "Quick Stringer",
    app_subtitle: "Einfaches Management für Schläger, Saiten und Jobs.",
    tab_dashboard: "Übersicht",
    tab_settings: "Einstellungen",
    tab_info: "Info",
    tab_customers: "Kunden",
    tab_rackets: "Schläger",
    tab_inventory: "Saitenlager",
    tab_jobs: "Bespannungen",
    tab_updates: "Updates",
    dashboard_today: "Heute",
    dashboard_8weeks: "Letzte 8 Wochen",
    dashboard_jobs_month: "Jobs diesen Monat",
    dashboard_revenue_month: "Umsatz diesen Monat",
    dashboard_inventory_items: "Lagerartikel",
    dashboard_jobs_8weeks: "Jobs (letzte 8 Wochen)",
    dashboard_revenue_8weeks: "Umsatz (letzte 8 Wochen)",
    dashboard_costs_8weeks: "Saitenkosten (letzte 8 Wochen)",
    dashboard_profit_8weeks: "Gewinn (letzte 8 Wochen)",
    dashboard_avg_time: "Durchschn. Bespannzeit",
    dashboard_stats_title: "Statistik",
    dashboard_stats_subtitle: "Summen und Lagerübersicht.",
    dashboard_total_length: "Gesamte Saitenlänge genutzt",
    dashboard_total_customers: "Kunden gesamt",
    dashboard_total_jobs: "Bespannungen gesamt",
    dashboard_total_time: "Gesamtzeit",
    dashboard_total_profit: "Gesamtgewinn",
    dashboard_greeting: "Hallo",
    dashboard_inventory_left: "Restbestand",
    dashboard_no_inventory: "Noch kein Lagerbestand.",
    dashboard_quick_add: "Schnell hinzufügen",
    dashboard_quick_add_desc: "Job in unter einer Minute erfassen.",
    cta_add_job: "Job hinzufügen",
    settings_title: "Allgemeine Einstellungen",
    settings_subtitle: "Währung und Spannungseinheit festlegen.",
    settings_language: "Sprache",
    settings_stringer_name: "Bespanner Name",
    settings_currency: "Währung",
    settings_tension_unit: "Spannungseinheit",
    settings_kg: "Kilogramm (kg)",
    settings_lb: "Pfund (lb)",
    settings_save: "Einstellungen speichern",
    customers_title: "Kunden",
    customers_subtitle: "Kontakte und Notizen speichern.",
    customers_name: "Name",
    customers_phone: "Telefon",
    customers_email: "E-Mail",
    customers_notes: "Notizen",
    customers_add: "Kunden hinzufügen",
    customers_update: "Kunden aktualisieren",
    customer_strings_title: "Kundensaiten",
    customer_strings_subtitle: "Kundensaiten erfassen.",
    customer_string_model: "Saitenmodell",
    customer_string_gauge: "Stärke",
    customer_string_color: "Farbe",
    customer_string_add: "Saite hinzufügen",
    customer_string_update: "Saite aktualisieren",
    rackets_title: "Schläger",
    rackets_subtitle: "Schläger verwalten und Kunden zuordnen.",
    rackets_model: "Marke / Modell",
    rackets_model_short: "Modell",
    rackets_head: "Kopfgröße",
    rackets_head_short: "Kopf",
    rackets_pattern: "Muster",
    rackets_notes: "Notizen",
    rackets_add: "Schläger hinzufügen",
    rackets_update: "Schläger aktualisieren",
    inventory_title: "Saitenlager",
    inventory_subtitle: "Rollen, Sets und Restlängen verfolgen.",
    inventory_name: "Marke / Saite",
    inventory_string: "Saite",
    inventory_reel_id: "Rollen-ID",
    inventory_gauge: "Stärke",
    inventory_color: "Farbe",
    inventory_length: "Länge (Meter)",
    inventory_length_short: "Länge (m)",
    inventory_initial_length: "Anfangslänge (Meter)",
    inventory_length_left: "Restlänge (Meter)",
    inventory_initial_short: "Anfang (m)",
    inventory_length_left_short: "Rest (m)",
    inventory_total_cost: "Gesamtkosten Rolle",
    inventory_cost_per_m: "Kosten / m",
    inventory_add: "Lager hinzufügen",
    inventory_update: "Lager aktualisieren",
    jobs_title: "Bespannungen",
    jobs_subtitle: "Jobs und Preise erfassen.",
    jobs_search_customer: "Kunden suchen...",
    jobs_table_search: "Kunde oder Saite suchen...",
    jobs_search_string: "Saite suchen...",
    jobs_search_customer_string: "Kundensaite suchen...",
    jobs_customer_string: "Kundensaite",
    jobs_customer_string_new: "Neue Kundensaite",
    jobs_customer_string_model: "Saitenmodell",
    jobs_customer_string_gauge: "Stärke",
    jobs_customer_string_color: "Farbe",
    jobs_customer_string_new_btn: "Neu",
    jobs_racket: "Schläger",
    jobs_string_source: "Saitenquelle",
    jobs_string_source_shop: "Meine Saite",
    jobs_string_source_customer: "Kundensaite",
    jobs_mains: "Längssaiten",
    jobs_crosses: "Quersaiten",
    jobs_hybrid_toggle: "Hybridbespannung (Quersaiten aktivieren)",
    jobs_string_used: "Verwendete Saite",
    jobs_date: "Datum",
    jobs_tension: "Spannung",
    jobs_length_used: "Verwendete Länge (Meter)",
    jobs_labor_price: "Arbeitslohn",
    jobs_labor_header: "Arbeit",
    jobs_string_price: "Saitenpreis",
    jobs_calc: "Berechnen",
    jobs_time: "Zeit (mm:ss)",
    jobs_start: "Bespannung starten",
    jobs_stop: "Timer stoppen",
    jobs_finish: "Fertig & speichern",
    jobs_source: "Quelle",
    jobs_source_hybrid: "Hybrid",
    jobs_tension_header: "Spannung",
    jobs_time_header: "Zeit",
    jobs_price: "Preis",
    footer_saved: "Daten werden lokal im Browser gespeichert.",
    footer_export: "Daten exportieren",
    footer_export_csv: "CSV exportieren",
    footer_import: "Daten importieren",
    footer_reset: "Alle Daten löschen",
    import_success: "Import erfolgreich.",
    import_failed: "Import fehlgeschlagen",
    import_version_same: "Datei-Schema-Version ist",
    import_version_unknown: "Datei-Schema-Version unbekannt",
    import_migrated_from: "Migration von",
    import_migrated_to: "zu",
    import_migrated: "Migrationen angewendet.",
    info_title: "So funktioniert die App",
    info_subtitle: "Einfach, privat und nur im Browser.",
    info_step1_title: "1. Du gibst Daten ein",
    info_step1_desc: "Kunden, Schläger, Saiten und Jobs bleiben im Browser.",
    info_step2_title: "2. Die App berechnet Summen",
    info_step2_desc: "Umsatz, Kosten und Zeiten werden lokal berechnet.",
    info_step3_title: "3. Du exportierst Backups",
    info_step3_desc: "Exportiere regelmäßig JSON oder CSV-ZIP.",
    info_privacy_title: "Datenschutz",
    info_privacy_desc: "Diese Seite sendet oder speichert keine Daten auf einem Server.",
    info_export_note: "Bitte vor dem Verlassen exportieren, sonst gehen Daten verloren.",
    info_backup_title: "Backups",
    info_backup_desc: "Es gibt zwei Backup‑Arten:",
    info_backup_export: "Daten exportieren: für Backup und späteres Importieren.",
    info_backup_csv: "CSV exportieren: für Drittanbieter, nicht wieder importierbar.",
    updates_title: "Updates",
    updates_subtitle: "Was ist neu in Quick Stringer.",
    updates_post_title_112: "Hybrid‑fähiger Bespannungsablauf",
    updates_post_marketing_112:
      "Mains und Crosses an einem Ort planen, Kosten pro Rolle automatisch berechnen und den Bestand ohne Extra‑Rechnen sauber halten. Das spart Zeit und macht Angebote sicherer.",
    updates_post_new_112: "Neu",
    updates_post_changed_112: "Geändert",
    updates_post_removed_112: "Entfernt",
    updates_post_new_list_112:
      "Hybrid‑Schalter für getrennte Längs/Quer‑Saiten||Quellenverfolgung pro Slot||Automatische Preisberechnung aus dem Rollenpreis",
    updates_post_changed_list_112:
      "Jobs zeigen Mains/Crosses im Detail||Markierung, wenn Shop‑Saitenkosten den Arbeitslohn übersteigen",
    updates_post_removed_list_112:
      "Nur‑eine‑Saite‑Workflow; Jobs unterstützen jetzt zwei Slots",
    onboarding_title: "Willkommen bei Quick Stringer",
    onboarding_subtitle: "Schnellstart für deine Bespannungen.",
    onboarding_step1_title: "1. Kunden anlegen",
    onboarding_step1_desc: "Kundendaten im Kunden-Tab speichern.",
    onboarding_step2_title: "2. Schläger anlegen",
    onboarding_step2_desc: "Schläger mit Kunden verknüpfen.",
    onboarding_step3_title: "3. Saitenlager anlegen",
    onboarding_step3_desc: "Rollenlänge und Gesamtkosten eintragen.",
    onboarding_step4_title: "4. Jobs erfassen",
    onboarding_step4_desc: "Kunde, Schläger und Saite auswählen.",
    onboarding_step5_title: "5. Backups exportieren",
    onboarding_step5_desc: "Export für Sicherungen nutzen.",
    onboarding_note_title: "Wichtiger Hinweis",
    onboarding_note_desc: "Vor dem Verlassen immer exportieren.",
    onboarding_close: "Verstanden, los geht’s",
    common_customer: "Kunde",
    common_notes: "Notizen",
    common_cancel: "Abbrechen",
    common_edit: "Bearbeiten",
    common_delete: "Löschen",
    common_select: "Auswählen",
    common_unknown: "Unbekannt",
    common_customer_label: "Kunde",
    common_shop: "Shop",
    common_customer_string: "Kunde",
    alert_select_customer: "Bitte einen Kunden aus der Liste wählen.",
    alert_select_string: "Bitte eine Saite aus dem Lager wählen.",
    alert_select_customer_string: "Bitte Kundensaite auswählen oder eingeben.",
    confirm_reset: "Alle Daten löschen?",
    confirm_export: "Bitte vor dem Verlassen exportieren."
  },
  fr: {
    app_title: "Quick Stringer",
    app_subtitle: "Gestion simple des raquettes, cordages et travaux.",
    tab_dashboard: "Tableau",
    tab_settings: "Paramètres",
    tab_info: "Info",
    tab_customers: "Clients",
    tab_rackets: "Raquettes",
    tab_inventory: "Stock de cordage",
    tab_jobs: "Travaux de cordage",
    tab_updates: "Mises à jour",
    dashboard_today: "Aujourd’hui",
    dashboard_8weeks: "8 dernières semaines",
    dashboard_jobs_month: "Travaux ce mois",
    dashboard_revenue_month: "Revenus ce mois",
    dashboard_inventory_items: "Articles en stock",
    dashboard_jobs_8weeks: "Travaux (8 dernières semaines)",
    dashboard_revenue_8weeks: "Revenus (8 dernières semaines)",
    dashboard_costs_8weeks: "Coût des cordages (8 dernières semaines)",
    dashboard_profit_8weeks: "Profit (8 dernières semaines)",
    dashboard_avg_time: "Temps moyen",
    dashboard_stats_title: "Statistiques",
    dashboard_stats_subtitle: "Totaux et aperçu du stock.",
    dashboard_total_length: "Longueur totale utilisée",
    dashboard_total_customers: "Clients au total",
    dashboard_total_jobs: "Travaux de cordage",
    dashboard_total_time: "Temps total",
    dashboard_total_profit: "Profit total",
    dashboard_greeting: "Bonjour",
    dashboard_inventory_left: "Stock restant",
    dashboard_no_inventory: "Pas de stock.",
    dashboard_quick_add: "Ajout rapide",
    dashboard_quick_add_desc: "Enregistrez un travail en moins d’une minute.",
    cta_add_job: "Ajouter un travail",
    settings_title: "Paramètres généraux",
    settings_subtitle: "Définissez la devise et l’unité de tension.",
    settings_language: "Langue",
    settings_stringer_name: "Nom du cordeur",
    settings_currency: "Devise",
    settings_tension_unit: "Unité de tension",
    settings_kg: "Kilogrammes (kg)",
    settings_lb: "Livres (lb)",
    settings_save: "Enregistrer",
    customers_title: "Clients",
    customers_subtitle: "Conservez les contacts et notes.",
    customers_name: "Nom complet",
    customers_phone: "Téléphone",
    customers_email: "E-mail",
    customers_notes: "Notes",
    customers_add: "Ajouter un client",
    customers_update: "Mettre à jour le client",
    customer_strings_title: "Cordages clients",
    customer_strings_subtitle: "Enregistrez les cordages apportés par les clients.",
    customer_string_model: "Modèle de cordage",
    customer_string_gauge: "Jauge",
    customer_string_color: "Couleur",
    customer_string_add: "Ajouter un cordage",
    customer_string_update: "Mettre à jour le cordage",
    rackets_title: "Raquettes",
    rackets_subtitle: "Suivez les raquettes et liez-les aux clients.",
    rackets_model: "Marque / Modèle",
    rackets_model_short: "Modèle",
    rackets_head: "Taille du tamis",
    rackets_head_short: "Tamis",
    rackets_pattern: "Plan de cordage",
    rackets_notes: "Notes",
    rackets_add: "Ajouter une raquette",
    rackets_update: "Mettre à jour la raquette",
    inventory_title: "Stock de cordage",
    inventory_subtitle: "Suivez les bobines et longueurs restantes.",
    inventory_name: "Marque / Cordage",
    inventory_string: "Cordage",
    inventory_reel_id: "ID bobine",
    inventory_gauge: "Jauge",
    inventory_color: "Couleur",
    inventory_length: "Longueur (mètres)",
    inventory_length_short: "Longueur (m)",
    inventory_initial_length: "Longueur initiale (mètres)",
    inventory_length_left: "Longueur restante (mètres)",
    inventory_initial_short: "Initial (m)",
    inventory_length_left_short: "Restant (m)",
    inventory_total_cost: "Coût total bobine",
    inventory_cost_per_m: "Coût / m",
    inventory_add: "Ajouter au stock",
    inventory_update: "Mettre à jour le stock",
    jobs_title: "Travaux de cordage",
    jobs_subtitle: "Enregistrez les travaux et prix.",
    jobs_search_customer: "Rechercher un client...",
    jobs_table_search: "Rechercher client ou cordage...",
    jobs_search_string: "Rechercher un cordage...",
    jobs_search_customer_string: "Rechercher un cordage client...",
    jobs_customer_string: "Cordage client",
    jobs_customer_string_new: "Nouveau cordage client",
    jobs_customer_string_model: "Modèle de cordage",
    jobs_customer_string_gauge: "Jauge",
    jobs_customer_string_color: "Couleur",
    jobs_customer_string_new_btn: "Nouveau",
    jobs_racket: "Raquette",
    jobs_string_source: "Source du cordage",
    jobs_string_source_shop: "Mon cordage",
    jobs_string_source_customer: "Cordage client",
    jobs_mains: "Montants",
    jobs_crosses: "Travers",
    jobs_hybrid_toggle: "Montage hybride (activer les travers)",
    jobs_string_used: "Cordage utilisé",
    jobs_date: "Date",
    jobs_tension: "Tension",
    jobs_length_used: "Longueur utilisée (mètres)",
    jobs_labor_price: "Main-d’œuvre",
    jobs_labor_header: "Main-d’œuvre",
    jobs_string_price: "Prix du cordage",
    jobs_calc: "Calculer",
    jobs_time: "Temps (mm:ss)",
    jobs_start: "Démarrer",
    jobs_stop: "Arrêter le chrono",
    jobs_finish: "Terminer et enregistrer",
    jobs_source: "Source",
    jobs_source_hybrid: "Hybride",
    jobs_tension_header: "Tension",
    jobs_time_header: "Temps",
    jobs_price: "Prix",
    footer_saved: "Les données sont stockées localement.",
    footer_export: "Exporter",
    footer_export_csv: "Exporter CSV",
    footer_import: "Importer",
    footer_reset: "Tout réinitialiser",
    import_success: "Import réussi.",
    import_failed: "Import échoué",
    import_version_same: "La version du schéma est",
    import_version_unknown: "Version du schéma inconnue",
    import_migrated_from: "Migration de",
    import_migrated_to: "vers",
    import_migrated: "Migrations appliquées.",
    info_title: "Comment l’application fonctionne",
    info_subtitle: "Simple, privé et dans votre navigateur.",
    info_step1_title: "1. Vous saisissez vos données",
    info_step1_desc: "Clients, raquettes, cordages et travaux restent dans le navigateur.",
    info_step2_title: "2. L’app calcule les totaux",
    info_step2_desc: "Revenus, coûts et temps sont calculés localement.",
    info_step3_title: "3. Vous exportez des sauvegardes",
    info_step3_desc: "Exportez régulièrement en JSON ou CSV ZIP.",
    info_privacy_title: "Confidentialité",
    info_privacy_desc: "Cette page n’envoie ni ne stocke vos données sur un serveur.",
    info_export_note: "Exportez toujours avant de quitter.",
    info_backup_title: "Sauvegardes",
    info_backup_desc: "Il existe deux types de sauvegardes :",
    info_backup_export: "Exporter les données : sauvegarde à réimporter pour continuer.",
    info_backup_csv: "Exporter CSV : pour apps tierces, non réimportable ici.",
    updates_title: "Mises à jour",
    updates_subtitle: "Quoi de neuf dans Quick Stringer.",
    updates_post_title_112: "Flux de cordage hybride",
    updates_post_marketing_112:
      "Planifiez montants et travers en un seul endroit, calculez le coût par bobine automatiquement et gardez un stock juste sans recalcul. Moins d’administratif, devis plus sûrs.",
    updates_post_new_112: "Nouveau",
    updates_post_changed_112: "Modifié",
    updates_post_removed_112: "Supprimé",
    updates_post_new_list_112:
      "Bascule hybride pour montants/travers séparés||Suivi des sources par slot||Calcul automatique du prix depuis le coût de la bobine",
    updates_post_changed_list_112:
      "Les jobs affichent montants/travers||Signalement quand le coût des cordes magasin dépasse la main‑d’œuvre",
    updates_post_removed_list_112:
      "Flux “une seule corde” ; les jobs gèrent désormais deux slots",
    onboarding_title: "Bienvenue sur Quick Stringer",
    onboarding_subtitle: "Guide rapide pour commencer.",
    onboarding_step1_title: "1. Ajoutez des clients",
    onboarding_step1_desc: "Ajoutez les coordonnées dans l’onglet Clients.",
    onboarding_step2_title: "2. Ajoutez des raquettes",
    onboarding_step2_desc: "Créez des raquettes liées aux clients.",
    onboarding_step3_title: "3. Ajoutez du cordage",
    onboarding_step3_desc: "Saisissez longueur et coût total.",
    onboarding_step4_title: "4. Enregistrez les travaux",
    onboarding_step4_desc: "Sélectionnez client, raquette et cordage.",
    onboarding_step5_title: "5. Exportez",
    onboarding_step5_desc: "Utilisez Exporter pour les sauvegardes.",
    onboarding_note_title: "Note importante",
    onboarding_note_desc: "Exportez avant de quitter.",
    onboarding_close: "Compris, c’est parti",
    common_customer: "Client",
    common_notes: "Notes",
    common_cancel: "Annuler",
    common_edit: "Modifier",
    common_delete: "Supprimer",
    common_select: "Sélectionner",
    common_unknown: "Inconnu",
    common_customer_label: "Client",
    common_shop: "Atelier",
    common_customer_string: "Client",
    alert_select_customer: "Veuillez choisir un client dans la liste.",
    alert_select_string: "Veuillez choisir un cordage du stock.",
    alert_select_customer_string: "Veuillez choisir ou saisir un cordage client.",
    confirm_reset: "Supprimer toutes les données ?",
    confirm_export: "Veuillez exporter avant de quitter."
  },
  es: {
    app_title: "Quick Stringer",
    app_subtitle: "Gestión simple de raquetas, cordajes y trabajos.",
    tab_dashboard: "Panel",
    tab_settings: "Ajustes",
    tab_info: "Info",
    tab_customers: "Clientes",
    tab_rackets: "Raquetas",
    tab_inventory: "Inventario de cordaje",
    tab_jobs: "Trabajos de encordado",
    tab_updates: "Actualizaciones",
    dashboard_today: "Hoy",
    dashboard_8weeks: "Últimas 8 semanas",
    dashboard_jobs_month: "Trabajos del mes",
    dashboard_revenue_month: "Ingresos del mes",
    dashboard_inventory_items: "Artículos en inventario",
    dashboard_jobs_8weeks: "Trabajos (últimas 8 semanas)",
    dashboard_revenue_8weeks: "Ingresos (últimas 8 semanas)",
    dashboard_costs_8weeks: "Costes de cordaje (últimas 8 semanas)",
    dashboard_profit_8weeks: "Beneficio (últimas 8 semanas)",
    dashboard_avg_time: "Tiempo medio",
    dashboard_stats_title: "Estadísticas",
    dashboard_stats_subtitle: "Totales y resumen de inventario.",
    dashboard_total_length: "Longitud total utilizada",
    dashboard_total_customers: "Clientes totales",
    dashboard_total_jobs: "Trabajos totales",
    dashboard_total_time: "Tiempo total",
    dashboard_total_profit: "Beneficio total",
    dashboard_greeting: "Hola",
    dashboard_inventory_left: "Inventario restante",
    dashboard_no_inventory: "Aún no hay inventario.",
    dashboard_quick_add: "Agregar rápido",
    dashboard_quick_add_desc: "Registra un trabajo en menos de un minuto.",
    cta_add_job: "Agregar trabajo",
    settings_title: "Ajustes generales",
    settings_subtitle: "Configura moneda y unidad de tensión.",
    settings_language: "Idioma",
    settings_stringer_name: "Nombre del encordador",
    settings_currency: "Moneda",
    settings_tension_unit: "Unidad de tensión",
    settings_kg: "Kilogramos (kg)",
    settings_lb: "Libras (lb)",
    settings_save: "Guardar",
    customers_title: "Clientes",
    customers_subtitle: "Guarda contactos y notas.",
    customers_name: "Nombre completo",
    customers_phone: "Teléfono",
    customers_email: "Correo",
    customers_notes: "Notas",
    customers_add: "Agregar cliente",
    customers_update: "Actualizar cliente",
    customer_strings_title: "Cordajes de clientes",
    customer_strings_subtitle: "Registra cordajes aportados por clientes.",
    customer_string_model: "Modelo de cordaje",
    customer_string_gauge: "Calibre",
    customer_string_color: "Color",
    customer_string_add: "Agregar cordaje",
    customer_string_update: "Actualizar cordaje",
    rackets_title: "Raquetas",
    rackets_subtitle: "Gestiona raquetas y enlázalas con clientes.",
    rackets_model: "Marca / Modelo",
    rackets_model_short: "Modelo",
    rackets_head: "Tamaño de cabeza",
    rackets_head_short: "Cabeza",
    rackets_pattern: "Patrón",
    rackets_notes: "Notas",
    rackets_add: "Agregar raqueta",
    rackets_update: "Actualizar raqueta",
    inventory_title: "Inventario de cordaje",
    inventory_subtitle: "Sigue bobinas y longitud restante.",
    inventory_name: "Marca / Cordaje",
    inventory_string: "Cordaje",
    inventory_reel_id: "ID de bobina",
    inventory_gauge: "Calibre",
    inventory_color: "Color",
    inventory_length: "Longitud (metros)",
    inventory_length_short: "Longitud (m)",
    inventory_initial_length: "Longitud inicial (metros)",
    inventory_length_left: "Longitud restante (metros)",
    inventory_initial_short: "Inicial (m)",
    inventory_length_left_short: "Restante (m)",
    inventory_total_cost: "Costo total bobina",
    inventory_cost_per_m: "Costo / m",
    inventory_add: "Agregar inventario",
    inventory_update: "Actualizar inventario",
    jobs_title: "Trabajos de encordado",
    jobs_subtitle: "Registra trabajos y precios.",
    jobs_search_customer: "Buscar cliente...",
    jobs_table_search: "Buscar cliente o cordaje...",
    jobs_search_string: "Buscar cordaje...",
    jobs_search_customer_string: "Buscar cordaje del cliente...",
    jobs_customer_string: "Cordaje del cliente",
    jobs_customer_string_new: "Nuevo cordaje del cliente",
    jobs_customer_string_model: "Modelo de cordaje",
    jobs_customer_string_gauge: "Calibre",
    jobs_customer_string_color: "Color",
    jobs_customer_string_new_btn: "Nuevo",
    jobs_racket: "Raqueta",
    jobs_string_source: "Origen del cordaje",
    jobs_string_source_shop: "Mi cordaje",
    jobs_string_source_customer: "Cordaje del cliente",
    jobs_mains: "Verticales",
    jobs_crosses: "Horizontales",
    jobs_hybrid_toggle: "Encordado híbrido (activar horizontales)",
    jobs_string_used: "Cordaje usado",
    jobs_date: "Fecha",
    jobs_tension: "Tensión",
    jobs_length_used: "Longitud usada (metros)",
    jobs_labor_price: "Mano de obra",
    jobs_labor_header: "Mano de obra",
    jobs_string_price: "Precio de cordaje",
    jobs_calc: "Calcular",
    jobs_time: "Tiempo (mm:ss)",
    jobs_start: "Iniciar",
    jobs_stop: "Detener temporizador",
    jobs_finish: "Finalizar y guardar",
    jobs_source: "Origen",
    jobs_source_hybrid: "Híbrido",
    jobs_tension_header: "Tensión",
    jobs_time_header: "Tiempo",
    jobs_price: "Precio",
    footer_saved: "Los datos se guardan localmente.",
    footer_export: "Exportar",
    footer_export_csv: "Exportar CSV",
    footer_import: "Importar",
    footer_reset: "Borrar todo",
    import_success: "Importación exitosa.",
    import_failed: "Importación fallida",
    import_version_same: "La versión del esquema es",
    import_version_unknown: "Versión de esquema desconocida",
    import_migrated_from: "Migración de",
    import_migrated_to: "a",
    import_migrated: "Migraciones aplicadas.",
    info_title: "Cómo funciona la app",
    info_subtitle: "Simple, privada y en tu navegador.",
    info_step1_title: "1. Introduces tus datos",
    info_step1_desc: "Clientes, raquetas, cordajes y trabajos quedan en el navegador.",
    info_step2_title: "2. La app calcula totales",
    info_step2_desc: "Ingresos, costes y tiempos se calculan localmente.",
    info_step3_title: "3. Exportas copias",
    info_step3_desc: "Exporta regularmente JSON o CSV ZIP.",
    info_privacy_title: "Privacidad",
    info_privacy_desc: "Esta página no envía ni guarda datos en un servidor.",
    info_export_note: "Exporta siempre antes de salir.",
    info_backup_title: "Copias de seguridad",
    info_backup_desc: "Hay dos tipos de copias:",
    info_backup_export: "Exportar datos: para respaldo e importar después.",
    info_backup_csv: "Exportar CSV: para terceros, no se puede importar aquí.",
    updates_title: "Actualizaciones",
    updates_subtitle: "Novedades en Quick Stringer.",
    updates_post_title_112: "Flujo de encordado híbrido",
    updates_post_marketing_112:
      "Planifica verticales y horizontales en un solo lugar, calcula el coste por bobina automáticamente y mantén el inventario exacto sin cálculos extra.",
    updates_post_new_112: "Nuevo",
    updates_post_changed_112: "Cambiado",
    updates_post_removed_112: "Eliminado",
    updates_post_new_list_112:
      "Selector híbrido para verticales/horizontales||Seguimiento de fuente por tramo||Precio automático desde el coste de la bobina",
    updates_post_changed_list_112:
      "Los trabajos muestran detalle de verticales/horizontales||Se marca cuando el coste de cuerda supera la mano de obra",
    updates_post_removed_list_112:
      "Flujo de un solo cordaje; ahora los trabajos admiten dos ranuras",
    onboarding_title: "Bienvenido a Quick Stringer",
    onboarding_subtitle: "Guía rápida para empezar.",
    onboarding_step1_title: "1. Agrega clientes",
    onboarding_step1_desc: "Ve a Clientes y guarda contactos.",
    onboarding_step2_title: "2. Agrega raquetas",
    onboarding_step2_desc: "Crea raquetas para cada cliente.",
    onboarding_step3_title: "3. Agrega cordaje",
    onboarding_step3_desc: "Ingresa longitud y costo total.",
    onboarding_step4_title: "4. Registra trabajos",
    onboarding_step4_desc: "Selecciona cliente, raqueta y cordaje.",
    onboarding_step5_title: "5. Exporta",
    onboarding_step5_desc: "Usa Exportar para backups.",
    onboarding_note_title: "Nota importante",
    onboarding_note_desc: "Exporta antes de salir.",
    onboarding_close: "Listo, empecemos",
    common_customer: "Cliente",
    common_notes: "Notas",
    common_cancel: "Cancelar",
    common_edit: "Editar",
    common_delete: "Eliminar",
    common_select: "Seleccionar",
    common_unknown: "Desconocido",
    common_customer_label: "Cliente",
    common_shop: "Taller",
    common_customer_string: "Cliente",
    alert_select_customer: "Selecciona un cliente de la lista.",
    alert_select_string: "Selecciona un cordaje del inventario.",
    alert_select_customer_string: "Selecciona o ingresa un cordaje del cliente.",
    confirm_reset: "¿Borrar todos los datos?",
    confirm_export: "Exporta antes de salir."
  }
};

function t(key) {
  const lang = state.settings?.language || "en";
  return translations[lang]?.[key] || translations.en[key] || key;
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    el.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    el.setAttribute("placeholder", t(key));
  });

  document.querySelectorAll("option[data-i18n]").forEach((opt) => {
    opt.textContent = t(opt.dataset.i18n);
  });

  const tensionLabel = $("#tensionUnitLabel");
  if (tensionLabel) {
    tensionLabel.textContent = state.settings?.tensionUnit || "kg";
  }

  const cancelButtons = [
    $("#customerCancelBtn"),
    $("#racketCancelBtn"),
    $("#inventoryCancelBtn"),
    $("#jobCancelBtn")
  ];
  cancelButtons.forEach((btn) => {
    if (btn) btn.textContent = t("common_cancel");
  });

  updateDynamicButtonLabels();
  renderGreeting();
  renderUpdates();
}

function updateDynamicButtonLabels() {
  const customerEditing = Boolean($('input[name="customerId"]').value);
  const racketEditing = Boolean($('input[name="racketId"]').value);
  const inventoryEditing = Boolean($('input[name="inventoryId"]').value);
  const customerStringEditing = Boolean($('input[name="customerStringId"]').value);

  const customerBtn = $("#customerSubmitBtn");
  if (customerBtn) {
    customerBtn.textContent = customerEditing ? t("customers_update") : t("customers_add");
  }

  const racketBtn = $("#racketSubmitBtn");
  if (racketBtn) {
    racketBtn.textContent = racketEditing ? t("rackets_update") : t("rackets_add");
  }

  const inventoryBtn = $("#inventorySubmitBtn");
  if (inventoryBtn) {
    inventoryBtn.textContent = inventoryEditing ? t("inventory_update") : t("inventory_add");
  }

  const jobBtn = $("#jobSubmitBtn");
  if (jobBtn) {
    jobBtn.textContent = t("jobs_finish");
  }

  const customerStringBtn = $("#customerStringSubmitBtn");
  if (customerStringBtn) {
    customerStringBtn.textContent = customerStringEditing ? t("customer_string_update") : t("customer_string_add");
  }
}

function renderGreeting() {
  const greeting = $("#stringerGreeting");
  if (!greeting) return;
  const name = state.settings?.stringerName || "";
  if (name) {
    greeting.textContent = `${t("dashboard_greeting")} ${name}`;
  } else {
    greeting.textContent = t("dashboard_greeting");
  }
}

function renderVersion() {
  const el = $("#appVersion");
  if (!el) return;
  el.textContent = `v${appVersion} · schema ${schemaVersion}`;
}

function splitUpdateList(key) {
  return t(key)
    .split("||")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getUpdates() {
  return [
    {
      date: "2026-02-15",
      version: appVersion,
      titleKey: "updates_post_title_112",
      marketingKey: "updates_post_marketing_112",
      newKey: "updates_post_new_112",
      changedKey: "updates_post_changed_112",
      removedKey: "updates_post_removed_112",
      newListKey: "updates_post_new_list_112",
      changedListKey: "updates_post_changed_list_112",
      removedListKey: "updates_post_removed_list_112"
    }
  ];
}

function renderUpdates() {
  const container = $("#updatesList");
  if (!container) return;
  const updates = getUpdates();
  container.innerHTML = updates
    .map((item) => {
      const newItems = splitUpdateList(item.newListKey);
      const changedItems = splitUpdateList(item.changedListKey);
      const removedItems = splitUpdateList(item.removedListKey);
      return `
        <article class="update-card">
          <div class="update-meta">
            <span>${item.date}</span>
            <span>${item.version}</span>
          </div>
          <h3 class="update-title">${t(item.titleKey)}</h3>
          <p class="update-text">${t(item.marketingKey)}</p>
          <div class="update-columns">
            <div>
              <h4>${t(item.newKey)}</h4>
              <ul>${newItems.map((entry) => `<li>${entry}</li>`).join("")}</ul>
            </div>
            <div>
              <h4>${t(item.changedKey)}</h4>
              <ul>${changedItems.map((entry) => `<li>${entry}</li>`).join("")}</ul>
            </div>
            <div>
              <h4>${t(item.removedKey)}</h4>
              <ul>${removedItems.map((entry) => `<li>${entry}</li>`).join("")}</ul>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function buildImportMessage(fromVersion, toVersion) {
  if (Number.isNaN(fromVersion) || fromVersion <= 0) {
    return `${t("import_success")} ${t("import_version_unknown")} → ${toVersion}. ${t("import_migrated")}`;
  }
  if (fromVersion === toVersion) {
    return `${t("import_success")} ${t("import_version_same")} ${toVersion}.`;
  }
  return `${t("import_success")} ${t("import_migrated_from")} ${fromVersion} ${t("import_migrated_to")} ${toVersion}.`;
}

function showToast(message, type = "") {
  const toast = $("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.remove("hidden", "success", "error");
  if (type) toast.classList.add(type);
  clearTimeout(showToast._timer);
}

function loadState() {
  const saved = localStorage.getItem(storageKey);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      const migrated = migrateData(parsed);
      Object.assign(state, migrated);
      if (!state.settings) {
        state.settings = { currency: "USD", tensionUnit: "kg", language: "en", stringerName: "" };
      }
    } catch (err) {
      console.warn("Failed to load saved data", err);
    }
  }
}

function saveState() {
  const payload = withSchema(state);
  localStorage.setItem(storageKey, JSON.stringify(payload));
}

function createId(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`;
}

function formatMoney(value) {
  const amount = Number(value || 0);
  const currency = state.settings?.currency || "USD";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency
  }).format(amount);
}

function renderOptions() {
  const customerOptions = state.customers
    .map((customer) => `<option value="${customer.id}">${customer.name}</option>`)
    .join("");

  $$('select[name="customerId"]').forEach((select) => {
    select.innerHTML = `<option value="" disabled selected>${t("common_select")}</option>${customerOptions}`;
  });

  const currentRacketId = $('select[name="racketId"]')?.value || "";
  updateRacketOptionsForCustomer($('input[name="customerId"]').value, currentRacketId);

  const customerStringCustomerSelect = $('#customerStringForm select[name="customerId"]');
  if (customerStringCustomerSelect) {
    customerStringCustomerSelect.innerHTML = `<option value="" disabled selected>${t("common_select")}</option>${customerOptions}`;
  }

  const customerList = $("#customerList");
  if (customerList) {
    customerList.innerHTML = state.customers
      .map((customer) => {
        const label = formatCustomerLabel(customer);
        return `<option value="${label}" data-id="${customer.id}"></option>`;
      })
      .join("");
  }

  refreshInventoryList("Main");
  refreshInventoryList("Cross");
  refreshCustomerStringList("Main");
  refreshCustomerStringList("Cross");
}

function refreshCustomerStringList(slot) {
  const customerStringList = $(`#customerStringList${slot}`);
  if (!customerStringList) return;
  const customerId = $('input[name="customerId"]').value;
  const pool = customerId
    ? state.customerStrings.filter((item) => item.customerId === customerId)
    : state.customerStrings;
  const options = pool
    .map((item) => {
      const label = formatCustomerStringLabel(item);
      return `<option value="${label}" data-id="${item.id}"></option>`;
    })
    .join("");
  customerStringList.innerHTML = options;
}

function refreshInventoryList(slot) {
  const inventoryList = $(`#inventoryList${slot}`);
  if (!inventoryList) return;
  inventoryList.innerHTML = state.inventory
    .map((item) => {
      const label = formatInventoryLabel(item);
      return `<option value="${label}" data-id="${item.id}"></option>`;
    })
    .join("");
}

function updateRacketOptionsForCustomer(customerId, selectedId = "") {
  const rackets = customerId
    ? state.rackets.filter((racket) => racket.customerId === customerId)
    : [];
  const racketOptions = rackets
    .map((racket) => `<option value="${racket.id}">${racket.model}</option>`)
    .join("");
  const racketSelect = $('select[name="racketId"]');
  if (!racketSelect) return;
  racketSelect.innerHTML = `<option value="" disabled selected>${t("common_select")}</option>${racketOptions}`;
  if (selectedId && rackets.some((r) => r.id === selectedId)) {
    racketSelect.value = selectedId;
  } else if (selectedId) {
    const fallback = document.createElement("option");
    fallback.value = selectedId;
    fallback.textContent = t("common_unknown");
    racketSelect.appendChild(fallback);
    racketSelect.value = selectedId;
  }
}

function formatCustomerLabel(customer) {
  const phone = customer.phone ? ` · ${customer.phone}` : "";
  return `${customer.name}${phone}`;
}

function formatInventoryLabel(item) {
  const gauge = item.gauge ? ` ${item.gauge}` : "";
  const reel = item.reelId ? ` · ${item.reelId}` : "";
  const length = ` (${Number(item.lengthLeft || 0).toFixed(1)}m)`;
  return `${item.name}${gauge}${reel}${length}`;
}

function formatCustomerStringLabel(item) {
  const gauge = item.gauge ? ` ${item.gauge}` : "";
  const color = item.color ? ` · ${item.color}` : "";
  return `${item.model}${gauge}${color}`;
}

function normalizeJobSlots(job) {
  if (job?.mains || job?.crosses) {
    return {
      mains: job.mains || null,
      crosses: job.crosses || null
    };
  }
  return {
    mains: {
      source: job.stringSource,
      inventoryId: job.inventoryId,
      customerStringId: job.customerStringId,
      lengthUsed: job.lengthUsed
    },
    crosses: null
  };
}

function isSlotActive(slot) {
  if (!slot) return false;
  return Number(slot.lengthUsed || 0) > 0;
}

function formatJobStringPart(slot, label) {
  if (!slot) return "";
  if (!isSlotActive(slot)) return "";
  if (slot.source === "shop") {
    const item = state.inventory.find((i) => i.id === slot.inventoryId);
    const name = item ? `${item.name} ${item.gauge || ""}`.trim() : t("common_unknown");
    return `${label}: ${name}`;
  }
  if (slot.source === "customer") {
    const item = state.customerStrings.find((i) => i.id === slot.customerStringId);
    const name = item ? formatCustomerStringLabel(item) : t("jobs_string_source_customer");
    return `${label}: ${name}`;
  }
  return "";
}

function getJobSources(job) {
  const slots = normalizeJobSlots(job);
  const sources = [];
  if (slots.mains?.source && isSlotActive(slots.mains)) sources.push(slots.mains.source);
  if (slots.crosses?.source && isSlotActive(slots.crosses)) sources.push(slots.crosses.source);
  return Array.from(new Set(sources));
}

function syncCustomerFromInput() {
  const input = $('input[name="customerSearch"]');
  const hidden = $('input[name="customerId"]');
  if (!input || !hidden) return;
  hidden.value = resolveCustomerId(input.value);
  updateRacketOptionsForCustomer(hidden.value);
  $('select[name="racketId"]').value = "";
}

function resolveCustomerId(value) {
  const inputValue = (value || "").trim();
  if (!inputValue) return "";
  const options = Array.from($("#customerList").options || []);
  const match = options.find((opt) => opt.value === inputValue);
  if (match) return match.dataset.id || "";
  const normalized = inputValue.toLowerCase();
  const byName = state.customers.filter((c) =>
    c.name.trim().toLowerCase() === normalized
  );
  if (byName.length === 1) return byName[0].id;
  const byStartsWith = state.customers.filter((c) =>
    c.name.trim().toLowerCase().startsWith(normalized)
  );
  if (byStartsWith.length === 1) return byStartsWith[0].id;
  return "";
}

function syncInventoryFromInput(slot) {
  const input = $(`input[name="inventorySearch${slot}"]`);
  const hidden = $(`input[name="inventoryId${slot}"]`);
  if (!input || !hidden) return;
  hidden.value = resolveInventoryId(input.value, slot);
}

function resolveInventoryId(value, slot) {
  const inputValue = (value || "").trim();
  if (!inputValue) return "";
  const options = Array.from($(`#inventoryList${slot}`)?.options || []);
  const match = options.find((opt) => opt.value === inputValue);
  if (match) return match.dataset.id || "";
  const normalized = inputValue.toLowerCase();
  const byLabel = state.inventory.filter(
    (item) => formatInventoryLabel(item).toLowerCase() === normalized
  );
  if (byLabel.length === 1) return byLabel[0].id;
  const byName = state.inventory.filter(
    (item) => item.name.trim().toLowerCase() === normalized
  );
  if (byName.length === 1) return byName[0].id;
  return "";
}

function syncCustomerStringFromInput(slot) {
  const input = $(`input[name="customerStringSearch${slot}"]`);
  const hidden = $(`input[name="customerStringId${slot}"]`);
  if (!input || !hidden) return;
  hidden.value = resolveCustomerStringId(input.value, slot);
}

function resolveCustomerStringId(value, slot) {
  const inputValue = (value || "").trim();
  if (!inputValue) return "";
  const options = Array.from($(`#customerStringList${slot}`)?.options || []);
  const match = options.find((opt) => opt.value === inputValue);
  if (match) return match.dataset.id || "";
  const normalized = inputValue.toLowerCase();
  const customerId = $('input[name="customerId"]').value;
  const pool = state.customerStrings.filter((s) => s.customerId === customerId);
  const byLabel = pool.filter(
    (s) => formatCustomerStringLabel(s).toLowerCase() === normalized
  );
  if (byLabel.length === 1) return byLabel[0].id;
  const byModel = pool.filter(
    (s) => (s.model || "").trim().toLowerCase() === normalized
  );
  if (byModel.length === 1) return byModel[0].id;
  return "";
}

function maybeApplyLastTension() {
  const customerId = $('input[name="customerId"]').value;
  const racketId = $('#jobForm select[name="racketId"]').value;
  const stringSourceMain = $('#jobForm select[name="stringSourceMain"]').value;
  const stringSourceCross = $('#jobForm select[name="stringSourceCross"]').value;
  const inventoryIdMain = $('input[name="inventoryIdMain"]').value || null;
  const inventoryIdCross = $('input[name="inventoryIdCross"]').value || null;
  const customerStringIdMain = $('input[name="customerStringIdMain"]').value || null;
  const customerStringIdCross = $('input[name="customerStringIdCross"]').value || null;
  const tensionInput = $('input[name="tension"]');
  const laborInput = $('input[name="laborPrice"]');
  if (!customerId || !racketId || !tensionInput) return;

  const lastJob = findLastMatchingJob({
    customerId,
    racketId,
    mains: {
      source: stringSourceMain,
      inventoryId: inventoryIdMain,
      customerStringId: customerStringIdMain
    },
    crosses: {
      source: stringSourceCross,
      inventoryId: inventoryIdCross,
      customerStringId: customerStringIdCross
    }
  });
  if (lastJob && lastJob.tension) {
    tensionInput.value = lastJob.tension;
  }
  if (lastJob && laborInput && lastJob.laborPrice != null) {
    laborInput.value = lastJob.laborPrice;
  }
}

function findLastMatchingJob({ customerId, racketId, mains, crosses }) {
  for (let i = state.jobs.length - 1; i >= 0; i -= 1) {
    const job = state.jobs[i];
    if (job.customerId !== customerId) continue;
    if (job.racketId !== racketId) continue;
    const slots = normalizeJobSlots(job);
    if (!matchSlot(slots.mains, mains)) continue;
    if (!matchSlot(slots.crosses, crosses)) continue;
    if (job.tension) return job;
  }
  return null;
}

function matchSlot(jobSlot, querySlot) {
  if (!querySlot) return true;
  if (!jobSlot) {
    return !querySlot.inventoryId && !querySlot.customerStringId;
  }
  if (!jobSlot) return true;
  if (querySlot.source && jobSlot.source !== querySlot.source) return false;
  if (querySlot.source === "shop" && (jobSlot.inventoryId || null) !== (querySlot.inventoryId || null)) return false;
  if (querySlot.source === "customer" && (jobSlot.customerStringId || null) !== (querySlot.customerStringId || null)) return false;
  return true;
}

function renderCustomers() {
  const table = $("#customerTable");
  table.innerHTML = state.customers
    .map((customer) => {
      return `
        <tr>
          <td>${customer.name}</td>
          <td>${customer.phone || "-"}</td>
          <td>${customer.email || "-"}</td>
          <td>${customer.notes || "-"}</td>
          <td>
            <button class="action-btn" data-edit="customer" data-id="${customer.id}">${t("common_edit")}</button>
            <button class="action-btn" data-delete="customer" data-id="${customer.id}">${t("common_delete")}</button>
          </td>
        </tr>
      `;
    })
    .join("");
}

function renderCustomerStrings() {
  const table = $("#customerStringTable");
  if (!table) return;
  table.innerHTML = state.customerStrings
    .map((item) => {
      const customer = state.customers.find((c) => c.id === item.customerId);
      return `
        <tr>
          <td>${customer ? customer.name : t("common_unknown")}</td>
          <td>${item.model}</td>
          <td>${item.gauge || "-"}</td>
          <td>${item.color || "-"}</td>
          <td>
            <button class="action-btn" data-edit="customerString" data-id="${item.id}">${t("common_edit")}</button>
            <button class="action-btn" data-delete="customerString" data-id="${item.id}">${t("common_delete")}</button>
          </td>
        </tr>
      `;
    })
    .join("");
}

function renderRackets() {
  const table = $("#racketTable");
  table.innerHTML = state.rackets
    .map((racket) => {
      const customer = state.customers.find((c) => c.id === racket.customerId);
      return `
        <tr>
          <td>${customer ? customer.name : t("common_unknown")}</td>
          <td>${racket.model}</td>
          <td>${racket.headSize || "-"}</td>
          <td>${racket.pattern || "-"}</td>
          <td>${racket.notes || "-"}</td>
          <td>
            <button class="action-btn" data-edit="racket" data-id="${racket.id}">${t("common_edit")}</button>
            <button class="action-btn" data-delete="racket" data-id="${racket.id}">${t("common_delete")}</button>
          </td>
        </tr>
      `;
    })
    .join("");
}

function renderInventory() {
  const table = $("#inventoryTable");
  table.innerHTML = state.inventory
    .map((item) => {
      const baseLength = Number(item.initialLength || item.lengthLeft || 0);
      const perMeter = baseLength > 0 && item.costTotal ? item.costTotal / baseLength : null;
      return `
        <tr>
          <td>${item.name}</td>
          <td>${item.reelId || "-"}</td>
          <td>${item.gauge || "-"}</td>
          <td>${item.color || "-"}</td>
          <td>${Number(item.initialLength || 0).toFixed(1)}</td>
          <td>${Number(item.lengthLeft || 0).toFixed(1)}</td>
          <td>${item.costTotal ? formatMoney(item.costTotal) : "-"}</td>
          <td>${perMeter ? formatMoney(perMeter) : "-"}</td>
          <td>
            <button class="action-btn" data-edit="inventory" data-id="${item.id}">${t("common_edit")}</button>
            <button class="action-btn" data-delete="inventory" data-id="${item.id}">${t("common_delete")}</button>
          </td>
        </tr>
      `;
    })
    .join("");
}

function parseTensionValue(value) {
  if (!value) return 0;
  const first = String(value).split("/")[0];
  const numeric = Number(first.replace(/[^0-9.]/g, ""));
  return Number.isNaN(numeric) ? 0 : numeric;
}

function compareSortValues(a, b) {
  if (typeof a === "number" && typeof b === "number") {
    return a - b;
  }
  return String(a || "").localeCompare(String(b || ""), undefined, { numeric: true, sensitivity: "base" });
}

function updateJobSortIndicators() {
  $$("#jobTableList .sort-btn").forEach((btn) => {
    const key = btn.dataset.sort;
    const isActive = key === jobSortState.key;
    btn.classList.toggle("active", isActive);
    btn.classList.toggle("asc", isActive && jobSortState.direction === "asc");
    btn.classList.toggle("desc", isActive && jobSortState.direction === "desc");
    const th = btn.closest("th");
    if (th) {
      th.setAttribute("aria-sort", isActive ? (jobSortState.direction === "asc" ? "ascending" : "descending") : "none");
    }
  });
}

function setJobSort(key) {
  if (!key) return;
  if (jobSortState.key === key) {
    jobSortState.direction = jobSortState.direction === "asc" ? "desc" : "asc";
  } else {
    jobSortState.key = key;
    jobSortState.direction = key === "date" ? "desc" : "asc";
  }
  renderJobs();
}

function renderJobs() {
  const table = $("#jobTable");
  const unit = state.settings?.tensionUnit || "kg";
  const normalizedQuery = jobSearchQuery.trim().toLowerCase();
  const rows = state.jobs.map((job) => {
    const customer = state.customers.find((c) => c.id === job.customerId);
    const racket = state.rackets.find((r) => r.id === job.racketId);
    const customerName = customer ? customer.name : t("common_unknown");
    const racketModel = racket ? racket.model : t("common_unknown");
    const slots = normalizeJobSlots(job);
    const mainsLabel = formatJobStringPart(slots.mains, "M");
    const crossesLabel = formatJobStringPart(slots.crosses, "C");
    const stringLabel = [mainsLabel, crossesLabel].filter(Boolean).join(" / ") || "-";
    const sources = getJobSources(job);
    const sourceLabel = sources.length > 1
      ? t("jobs_source_hybrid")
      : sources[0] === "shop"
        ? t("common_shop")
        : sources[0] === "customer"
          ? t("common_customer_string")
          : "-";
    return {
      job,
      customerName,
      racketModel,
      stringLabel,
      sourceLabel,
      dateValue: job.date ? new Date(job.date).getTime() : 0,
      tensionValue: parseTensionValue(job.tension),
      laborValue: Number(job.laborPrice || 0),
      timeValue: Number(job.durationSeconds || 0),
      priceValue: Number(job.totalPrice || 0)
    };
  });

  const filteredRows = normalizedQuery
    ? rows.filter((row) => {
        const searchTarget = `${row.customerName} ${row.stringLabel}`.toLowerCase();
        return searchTarget.includes(normalizedQuery);
      })
    : rows;

  const sortedRows = filteredRows.sort((a, b) => {
    const direction = jobSortState.direction === "asc" ? 1 : -1;
    const sortKey = jobSortState.key;
    const aValue = sortKey === "date"
      ? a.dateValue
      : sortKey === "customer"
        ? a.customerName
        : sortKey === "racket"
          ? a.racketModel
          : sortKey === "string"
            ? a.stringLabel
            : sortKey === "source"
              ? a.sourceLabel
              : sortKey === "tension"
                ? a.tensionValue
                : sortKey === "labor"
                  ? a.laborValue
                  : sortKey === "time"
                    ? a.timeValue
                    : sortKey === "price"
                      ? a.priceValue
                      : a.dateValue;
    const bValue = sortKey === "date"
      ? b.dateValue
      : sortKey === "customer"
        ? b.customerName
        : sortKey === "racket"
          ? b.racketModel
          : sortKey === "string"
            ? b.stringLabel
            : sortKey === "source"
              ? b.sourceLabel
              : sortKey === "tension"
                ? b.tensionValue
                : sortKey === "labor"
                  ? b.laborValue
                  : sortKey === "time"
                    ? b.timeValue
                    : sortKey === "price"
                      ? b.priceValue
                      : b.dateValue;
    return compareSortValues(aValue, bValue) * direction;
  });

  table.innerHTML = sortedRows
    .map((row) => {
      const job = row.job;
      const laborAlert = getJobSources(job).includes("shop") && Number(job.stringPrice || 0) > Number(job.laborPrice || 0);
      return `
        <tr>
          <td>${job.date}</td>
          <td>${row.customerName}</td>
          <td>${row.racketModel}</td>
          <td>${row.stringLabel}</td>
          <td>${row.sourceLabel}</td>
          <td>${job.tension ? `${job.tension} ${unit}` : "-"}</td>
          <td><span class="${laborAlert ? "alert" : ""}">${formatMoney(job.laborPrice)}</span></td>
          <td>${formatDuration(job.durationSeconds)}</td>
          <td>${formatMoney(job.totalPrice)}</td>
          <td>
            <button class="action-btn" data-edit="job" data-id="${job.id}">${t("common_edit")}</button>
            <button class="action-btn" data-delete="job" data-id="${job.id}">${t("common_delete")}</button>
          </td>
        </tr>
      `;
    })
    .join("");
  updateJobSortIndicators();
}

function renderDashboard() {
  const now = new Date();
  const cutoff = new Date(now.getTime() - 8 * 7 * 24 * 60 * 60 * 1000);

  const jobsLast8Weeks = state.jobs.filter((job) => {
    const date = new Date(job.date);
    return date >= cutoff && date <= now;
  });

  const laborRevenue = jobsLast8Weeks.reduce((sum, job) => sum + Number(job.laborPrice || 0), 0);
  const stringCosts = jobsLast8Weeks.reduce((sum, job) => sum + Number(job.stringPrice || 0), 0);
  const profit = laborRevenue - stringCosts;
  const totalSeconds = jobsLast8Weeks.reduce((sum, job) => sum + Number(job.durationSeconds || 0), 0);
  const avgSeconds = jobsLast8Weeks.length ? Math.round(totalSeconds / jobsLast8Weeks.length) : 0;

  $("#kpiJobs").textContent = jobsLast8Weeks.length;
  $("#kpiRevenue").textContent = formatMoney(laborRevenue);
  $("#kpiCosts").textContent = formatMoney(stringCosts);
  $("#kpiProfit").textContent = formatMoney(profit);
  $("#kpiAvgTime").textContent = formatDuration(avgSeconds);

  const totalLength = state.jobs.reduce((sum, job) => {
    const slots = normalizeJobSlots(job);
    const main = Number(slots.mains?.lengthUsed || 0);
    const cross = Number(slots.crosses?.lengthUsed || 0);
    return sum + main + cross;
  }, 0);
  const totalTimeAll = state.jobs.reduce((sum, job) => sum + Number(job.durationSeconds || 0), 0);
  const totalLabor = state.jobs.reduce((sum, job) => sum + Number(job.laborPrice || 0), 0);
  const totalStringCosts = state.jobs.reduce((sum, job) => sum + Number(job.stringPrice || 0), 0);
  const totalProfit = totalLabor - totalStringCosts;
  $("#kpiTotalLength").textContent = `${totalLength.toFixed(1)} m`;
  $("#kpiTotalCustomers").textContent = state.customers.length;
  $("#kpiTotalJobs").textContent = state.jobs.length;
  $("#kpiTotalTime").textContent = formatDurationLong(totalTimeAll);
  $("#kpiTotalProfit").textContent = formatMoney(totalProfit);

  renderInventoryBars();
}

function renderInventoryBars() {
  const container = $("#inventoryBars");
  if (!container) return;
  if (!state.inventory.length) {
    container.innerHTML = `<p class="muted">${t("dashboard_no_inventory")}</p>`;
    return;
  }

  const rows = state.inventory.map((item) => {
    const initial = Number(item.initialLength || 0);
    const left = Number(item.lengthLeft || 0);
    const percent = initial > 0 ? Math.round((left / initial) * 100) : 0;
    const label = `${item.name}${item.reelId ? ` · ${item.reelId}` : ""}`;
    return `
      <div class="bar-row">
        <div class="bar-label">
          <span>${label}</span>
          <span>${left.toFixed(1)} m</span>
        </div>
        <div class="bar-track">
          <div class="bar-fill" style="width: ${percent}%"></div>
        </div>
      </div>
    `;
  }).join("");

  container.innerHTML = `<div class="bar-list">${rows}</div>`;
}

function applySettings() {
  const unit = state.settings?.tensionUnit || "kg";
  const label = $("#tensionUnitLabel");
  if (label) {
    label.textContent = unit;
  }
  const tensionInput = $('input[name="tension"]');
  if (tensionInput) {
    tensionInput.placeholder = unit === "kg" ? "24/23" : "52/50";
  }
  const settingsForm = $("#settingsForm");
  if (settingsForm) {
    settingsForm.currency.value = state.settings?.currency || "USD";
    settingsForm.tensionUnit.value = unit;
    settingsForm.language.value = state.settings?.language || "en";
    settingsForm.stringerName.value = state.settings?.stringerName || "";
  }
  renderGreeting();
  renderVersion();
}

function renderAll() {
  renderOptions();
  renderCustomers();
  renderCustomerStrings();
  renderRackets();
  renderInventory();
  renderJobs();
  renderUpdates();
  renderDashboard();
  applySettings();
  applyTranslations();
  renderVersion();
  saveState();
}

function handleCustomerSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const data = Object.fromEntries(new FormData(form));
  const editingId = data.customerId || null;
  const payload = {
    name: data.name,
    phone: data.phone,
    email: data.email,
    notes: data.notes
  };

  if (editingId) {
    const existing = state.customers.find((item) => item.id === editingId);
    if (existing) {
      Object.assign(existing, payload);
    }
  } else {
    state.customers.push({
      id: createId("cust"),
      ...payload
    });
  }

  resetCustomerForm();
  renderAll();
}

function handleCustomerStringSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const data = Object.fromEntries(new FormData(form));
  const editingId = data.customerStringId || null;
  const payload = {
    customerId: data.customerId,
    model: data.model,
    gauge: data.gauge,
    color: data.color
  };

  if (editingId) {
    const existing = state.customerStrings.find((item) => item.id === editingId);
    if (existing) {
      Object.assign(existing, payload);
    }
  } else {
    state.customerStrings.push({
      id: createId("cstr"),
      ...payload
    });
  }

  resetCustomerStringForm();
  renderAll();
}

function handleRacketSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const data = Object.fromEntries(new FormData(form));
  const editingId = data.racketId || null;
  const payload = {
    customerId: data.customerId,
    model: data.model,
    headSize: data.headSize,
    pattern: data.pattern,
    notes: data.notes
  };

  if (editingId) {
    const existing = state.rackets.find((item) => item.id === editingId);
    if (existing) {
      Object.assign(existing, payload);
    }
  } else {
    state.rackets.push({
      id: createId("racket"),
      ...payload
    });
  }

  resetRacketForm();
  renderAll();
}

function handleInventorySubmit(event) {
  event.preventDefault();
  const form = event.target;
  const data = Object.fromEntries(new FormData(form));
  const editingId = data.inventoryId || null;
  const initialLength = Number(data.initialLength || 0);
  const lengthLeft = data.lengthLeft === "" ? initialLength : Number(data.lengthLeft || 0);
  const payload = {
    name: data.name,
    reelId: data.reelId,
    gauge: data.gauge,
    color: data.color,
    initialLength,
    lengthLeft,
    costTotal: data.costTotal ? Number(data.costTotal) : null
  };

  if (editingId) {
    const existing = state.inventory.find((item) => item.id === editingId);
    if (existing) {
      Object.assign(existing, payload);
    }
  } else {
    state.inventory.push({
      id: createId("inv"),
      ...payload
    });
  }

  resetInventoryForm();
  renderAll();
}

function handleJobSubmit(event) {
  event.preventDefault();
  const form = event.target;
  $('input[name="customerSearch"]').blur();
  const data = Object.fromEntries(new FormData(form));
  const editingId = data.jobId || null;
  const durationSeconds = Number(data.durationSeconds || 0);
  const customerId = resolveCustomerId(data.customerSearch);
  syncInventoryFromInput("Main");
  syncInventoryFromInput("Cross");
  syncCustomerStringFromInput("Main");
  syncCustomerStringFromInput("Cross");
  const inventoryIdMain = $('input[name="inventoryIdMain"]').value || null;
  const inventoryIdCross = $('input[name="inventoryIdCross"]').value || null;
  const lengthUsedMain = Number(data.lengthUsedMain || 0);
  const lengthUsedCross = Number(data.lengthUsedCross || 0);
  const requireMain = lengthUsedMain > 0;
  const requireCross = lengthUsedCross > 0;

  if (!customerId) {
    console.warn("Customer match failed:", {
      typed: data.customerSearch,
      listValues: Array.from($("#customerList").options || []).map((o) => o.value)
    });
    alert(t("alert_select_customer"));
    return;
  }
  if (data.stringSourceMain === "shop" && requireMain && !inventoryIdMain) {
    alert(t("alert_select_string"));
    return;
  }
  if (data.stringSourceCross === "shop" && requireCross && !inventoryIdCross) {
    alert(t("alert_select_string"));
    return;
  }

  let customerStringIdMain = null;
  if (data.stringSourceMain === "customer" && requireMain) {
    customerStringIdMain = resolveOrCreateCustomerString("Main", data, customerId);
    if (!customerStringIdMain) return;
  }
  let customerStringIdCross = null;
  if (data.stringSourceCross === "customer" && requireCross) {
    customerStringIdCross = resolveOrCreateCustomerString("Cross", data, customerId);
    if (!customerStringIdCross) return;
  }

  const laborPrice = Number(data.laborPrice || 0);
  let stringPrice = Number(data.stringPrice || 0);
  const mainCost = data.stringSourceMain === "shop"
    ? computeShopStringCost(inventoryIdMain, lengthUsedMain)
    : 0;
  const crossCost = data.stringSourceCross === "shop"
    ? computeShopStringCost(inventoryIdCross, lengthUsedCross)
    : 0;
  stringPrice = Number((mainCost + crossCost).toFixed(2));
  const totalPrice = laborPrice + stringPrice;

  if (editingId) {
    const existing = state.jobs.find((job) => job.id === editingId);
    if (existing) {
      adjustInventoryForJobChange(existing, {
        mains: {
          source: data.stringSourceMain,
          inventoryId: inventoryIdMain,
          lengthUsed: lengthUsedMain
        },
        crosses: {
          source: data.stringSourceCross,
          inventoryId: inventoryIdCross,
          lengthUsed: lengthUsedCross
        }
      });
      Object.assign(existing, {
        customerId,
        racketId: data.racketId,
        date: data.date,
        tension: data.tension,
        mains: {
          source: data.stringSourceMain,
          inventoryId: inventoryIdMain,
          customerStringId: customerStringIdMain,
          lengthUsed: lengthUsedMain
        },
        crosses: {
          source: data.stringSourceCross,
          inventoryId: inventoryIdCross,
          customerStringId: customerStringIdCross,
          lengthUsed: lengthUsedCross
        },
        laborPrice,
        stringPrice,
        totalPrice,
        notes: data.notes,
        durationSeconds
      });
    }
  } else {
    applyInventoryUsage([
      { source: data.stringSourceMain, inventoryId: inventoryIdMain, lengthUsed: lengthUsedMain },
      { source: data.stringSourceCross, inventoryId: inventoryIdCross, lengthUsed: lengthUsedCross }
    ], -1);
    state.jobs.push({
      id: createId("job"),
      customerId,
      racketId: data.racketId,
      date: data.date,
      tension: data.tension,
      mains: {
        source: data.stringSourceMain,
        inventoryId: inventoryIdMain,
        customerStringId: customerStringIdMain,
        lengthUsed: lengthUsedMain
      },
      crosses: {
        source: data.stringSourceCross,
        inventoryId: inventoryIdCross,
        customerStringId: customerStringIdCross,
        lengthUsed: lengthUsedCross
      },
      laborPrice,
      stringPrice,
      totalPrice,
      notes: data.notes,
        durationSeconds
    });
  }

  stopStringingTimer();
  resetJobForm();
  renderAll();
}

function adjustInventoryForJobChange(oldJob, newJob) {
  applyInventoryUsage(getShopUsages(oldJob), 1);
  applyInventoryUsage(getShopUsages(newJob), -1);
}

function getShopUsages(job) {
  const usages = [];
  if (job?.mains || job?.crosses) {
    if (job.mains?.source === "shop" && job.mains.inventoryId) {
      usages.push({ inventoryId: job.mains.inventoryId, lengthUsed: job.mains.lengthUsed });
    }
    if (job.crosses?.source === "shop" && job.crosses.inventoryId) {
      usages.push({ inventoryId: job.crosses.inventoryId, lengthUsed: job.crosses.lengthUsed });
    }
    return usages;
  }
  if (job?.stringSource === "shop" && job?.inventoryId) {
    usages.push({ inventoryId: job.inventoryId, lengthUsed: job.lengthUsed });
  }
  return usages;
}

function applyInventoryUsage(usages, direction) {
  usages.forEach((usage) => {
    if (usage.source && usage.source !== "shop") return;
    const item = state.inventory.find((inv) => inv.id === usage.inventoryId);
    if (!item) return;
    const delta = Number(usage.lengthUsed || 0) * direction;
    item.lengthLeft = Math.max(0, Number(item.lengthLeft || 0) + delta);
  });
}

function computeShopStringCost(inventoryId, lengthUsed) {
  const item = state.inventory.find((inv) => inv.id === inventoryId);
  const baseLength = Number(item?.initialLength || item?.lengthLeft || 0);
  if (!item || baseLength <= 0 || !item.costTotal) return 0;
  const perMeter = item.costTotal / baseLength;
  return perMeter * Number(lengthUsed || 0);
}

function resolveOrCreateCustomerString(slot, data, customerId) {
  const searchValue = data[`customerStringSearch${slot}`];
  let id = resolveCustomerStringId(searchValue, slot);
  if (id) return id;
  if (data[`stringSource${slot}`] !== "customer") return null;
  const model = (data[`customerStringModel${slot}`] || "").trim();
  if (!model) {
    alert(t("alert_select_customer_string"));
    return null;
  }
  const newString = {
    id: createId("cstr"),
    customerId,
    model,
    gauge: data[`customerStringGauge${slot}`] || "",
    color: data[`customerStringColor${slot}`] || ""
  };
  state.customerStrings.push(newString);
  return newString.id;
}

function resetJobForm() {
  const form = $("#jobForm");
  form.reset();
  $('input[name="lengthUsedMain"]').value = 6.0;
  $('input[name="lengthUsedCross"]').value = 0;
  $('input[name="date"]').value = new Date().toISOString().slice(0, 10);
  $('input[name="jobId"]').value = "";
  $('input[name="durationSeconds"]').value = "";
  $('input[name="customerId"]').value = "";
  $('input[name="inventoryIdMain"]').value = "";
  $('input[name="inventoryIdCross"]').value = "";
  $('input[name="customerStringIdMain"]').value = "";
  $('input[name="customerStringIdCross"]').value = "";
  $('input[name="customerSearch"]').value = "";
  $('input[name="inventorySearchMain"]').value = "";
  $('input[name="inventorySearchCross"]').value = "";
  $('input[name="customerStringSearchMain"]').value = "";
  $('input[name="customerStringSearchCross"]').value = "";
  $('input[name="customerStringModelMain"]').value = "";
  $('input[name="customerStringGaugeMain"]').value = "";
  $('input[name="customerStringColorMain"]').value = "";
  $('input[name="customerStringModelCross"]').value = "";
  $('input[name="customerStringGaugeCross"]').value = "";
  $('input[name="customerStringColorCross"]').value = "";
  $("#newCustomerStringFieldsMain").classList.add("hidden");
  $("#newCustomerStringFieldsCross").classList.add("hidden");
  state.lastJobCustomerId = "";
  $('input[name="durationDisplay"]').value = "00:00";
  stopStringingTimer();
  setTimerDisplay(0);
  setStringSourceUI("Main", $('select[name="stringSourceMain"]').value);
  setStringSourceUI("Cross", $('select[name="stringSourceCross"]').value);
  setHybridUI(false);
  $("#jobCancelBtn").style.display = "none";
  updateDynamicButtonLabels();
}

function resetInventoryForm() {
  const form = $("#inventoryForm");
  form.reset();
  $('input[name="inventoryId"]').value = "";
  $("#inventoryCancelBtn").style.display = "none";
  updateDynamicButtonLabels();
}

function resetCustomerStringForm() {
  const form = $("#customerStringForm");
  if (!form) return;
  form.reset();
  $('input[name="customerStringId"]').value = "";
  $("#customerStringCancelBtn").style.display = "none";
  updateDynamicButtonLabels();
}

function populateCustomerStringForm(item) {
  const form = $("#customerStringForm");
  if (!form) return;
  form.customerId.value = item.customerId;
  form.model.value = item.model;
  form.gauge.value = item.gauge || "";
  form.color.value = item.color || "";
  form.customerStringId.value = item.id;
  $("#customerStringCancelBtn").style.display = "inline-flex";
  updateDynamicButtonLabels();
}
function populateInventoryForm(item) {
  const form = $("#inventoryForm");
  form.name.value = item.name;
  form.reelId.value = item.reelId || "";
  form.gauge.value = item.gauge || "";
  form.color.value = item.color || "";
  form.initialLength.value = item.initialLength ?? item.lengthLeft ?? 0;
  form.lengthLeft.value = item.lengthLeft ?? item.initialLength ?? 0;
  form.costTotal.value = item.costTotal ?? "";
  form.inventoryId.value = item.id;
  $("#inventoryCancelBtn").style.display = "inline-flex";
  updateDynamicButtonLabels();
}

function resetCustomerForm() {
  const form = $("#customerForm");
  form.reset();
  $('input[name="customerId"]').value = "";
  $("#customerCancelBtn").style.display = "none";
  updateDynamicButtonLabels();
}

function populateCustomerForm(customer) {
  const form = $("#customerForm");
  form.name.value = customer.name;
  form.phone.value = customer.phone || "";
  form.email.value = customer.email || "";
  form.notes.value = customer.notes || "";
  form.customerId.value = customer.id;
  $("#customerCancelBtn").style.display = "inline-flex";
  updateDynamicButtonLabels();
}

function resetRacketForm() {
  const form = $("#racketForm");
  form.reset();
  $('input[name="racketId"]').value = "";
  $("#racketCancelBtn").style.display = "none";
  updateDynamicButtonLabels();
}

function populateRacketForm(racket) {
  const form = $("#racketForm");
  renderOptions();
  form.customerId.value = racket.customerId;
  form.model.value = racket.model;
  form.headSize.value = racket.headSize || "";
  form.pattern.value = racket.pattern || "";
  form.notes.value = racket.notes || "";
  form.racketId.value = racket.id;
  $("#racketCancelBtn").style.display = "inline-flex";
  updateDynamicButtonLabels();
}

function populateJobForm(job) {
  const form = $("#jobForm");
  stopStringingTimer();
  form.customerId.value = job.customerId;
  const customer = state.customers.find((c) => c.id === job.customerId);
  form.customerSearch.value = customer ? formatCustomerLabel(customer) : "";
  state.lastJobCustomerId = job.customerId;
  renderOptions();
  updateRacketOptionsForCustomer(job.customerId, job.racketId);
  form.racketId.value = job.racketId;
  form.date.value = job.date;
  form.tension.value = job.tension || "";
  const slots = normalizeJobSlots(job);
  form.stringSourceMain.value = slots.mains?.source || "shop";
  form.stringSourceCross.value = slots.crosses?.source || "shop";
  setStringSourceUI("Main", form.stringSourceMain.value);
  setStringSourceUI("Cross", form.stringSourceCross.value);
  const hybridEnabled = Number(slots.crosses?.lengthUsed || 0) > 0;
  setHybridUI(hybridEnabled);
  form.inventoryIdMain.value = slots.mains?.inventoryId || "";
  form.inventoryIdCross.value = slots.crosses?.inventoryId || "";
  form.customerStringIdMain.value = slots.mains?.customerStringId || "";
  form.customerStringIdCross.value = slots.crosses?.customerStringId || "";
  form.lengthUsedMain.value = slots.mains?.lengthUsed || 0;
  form.lengthUsedCross.value = slots.crosses?.lengthUsed || 0;
  form.laborPrice.value = job.laborPrice || 0;
  form.stringPrice.value = job.stringPrice || 0;
  form.notes.value = job.notes || "";
  form.jobId.value = job.id;
  form.durationSeconds.value = job.durationSeconds || 0;
  form.durationDisplay.value = formatDuration(job.durationSeconds || 0);
  setTimerDisplay(job.durationSeconds || 0);
  const inventoryItemMain = state.inventory.find((i) => i.id === slots.mains?.inventoryId);
  form.inventorySearchMain.value = inventoryItemMain ? formatInventoryLabel(inventoryItemMain) : "";
  const inventoryItemCross = state.inventory.find((i) => i.id === slots.crosses?.inventoryId);
  form.inventorySearchCross.value = inventoryItemCross ? formatInventoryLabel(inventoryItemCross) : "";
  const customerStringItemMain = state.customerStrings.find((i) => i.id === slots.mains?.customerStringId);
  form.customerStringSearchMain.value = customerStringItemMain ? formatCustomerStringLabel(customerStringItemMain) : "";
  const customerStringItemCross = state.customerStrings.find((i) => i.id === slots.crosses?.customerStringId);
  form.customerStringSearchCross.value = customerStringItemCross ? formatCustomerStringLabel(customerStringItemCross) : "";
  $("#jobCancelBtn").style.display = "inline-flex";
  updateDynamicButtonLabels();

  $('input[name="stringPrice"]').disabled = false;
  updateRacketOptionsForCustomer(job.customerId, job.racketId);
}

function handleSettingsSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const data = Object.fromEntries(new FormData(form));
  state.settings = {
    currency: data.currency || "USD",
    tensionUnit: data.tensionUnit || "kg",
    language: data.language || "en",
    stringerName: data.stringerName || ""
  };
  renderAll();
}

function handleDelete(event) {
  const button = event.target.closest("[data-delete]");
  if (!button) return;
  const type = button.dataset.delete;
  const id = button.dataset.id;

  if (type === "customer") {
    state.customers = state.customers.filter((item) => item.id !== id);
  }
  if (type === "racket") {
    state.rackets = state.rackets.filter((item) => item.id !== id);
  }
  if (type === "inventory") {
    state.inventory = state.inventory.filter((item) => item.id !== id);
  }
  if (type === "job") {
    const job = state.jobs.find((item) => item.id === id);
    if (job) {
      applyInventoryUsage(getShopUsages(job), 1);
    }
    state.jobs = state.jobs.filter((item) => item.id !== id);
  }
  if (type === "customerString") {
    state.customerStrings = state.customerStrings.filter((item) => item.id !== id);
  }

  renderAll();
}

function handleEdit(event) {
  const button = event.target.closest("[data-edit]");
  if (!button) return;
  const type = button.dataset.edit;
  const id = button.dataset.id;
  if (type === "customer") {
    const customer = state.customers.find((item) => item.id === id);
    if (!customer) return;
    $(`.tab[data-tab="customers"]`).click();
    populateCustomerForm(customer);
  }
  if (type === "racket") {
    const racket = state.rackets.find((item) => item.id === id);
    if (!racket) return;
    $(`.tab[data-tab="rackets"]`).click();
    populateRacketForm(racket);
  }
  if (type === "job") {
    const job = state.jobs.find((item) => item.id === id);
    if (!job) return;
    $(`.tab[data-tab="jobs"]`).click();
    populateJobForm(job);
  }
  if (type === "inventory") {
    const item = state.inventory.find((inv) => inv.id === id);
    if (!item) return;
    $(`.tab[data-tab="inventory"]`).click();
    populateInventoryForm(item);
  }
  if (type === "customerString") {
    const item = state.customerStrings.find((str) => str.id === id);
    if (!item) return;
    $(`.tab[data-tab="customers"]`).click();
    populateCustomerStringForm(item);
  }
}

function handleTabClick(event) {
  const button = event.target.closest(".tab");
  if (!button) return;
  const tabId = button.dataset.tab;
  $$(".tab").forEach((tab) => tab.classList.toggle("active", tab === button));
  $$(".panel").forEach((panel) => panel.classList.toggle("active", panel.id === tabId));
  const toast = $("#toast");
  if (toast) toast.classList.add("hidden");
}

function handleQuickNav(event) {
  const button = event.target.closest("[data-tab-target]");
  if (!button) return;
  const tabId = button.dataset.tabTarget;
  $(`.tab[data-tab="${tabId}"]`).click();
}

function handleExport() {
  const data = JSON.stringify(withSchema(state), null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `quick-stringer-backup-${Date.now()}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function handleExportCsv() {
  const timestamp = Date.now();
  const files = [
    {
      name: `quick-stringer-customers-${timestamp}.csv`,
      rows: [
        ["id", "name", "phone", "email", "notes"],
        ...state.customers.map((c) => [c.id, c.name, c.phone, c.email, c.notes])
      ]
    },
    {
      name: `quick-stringer-rackets-${timestamp}.csv`,
      rows: [
        ["id", "customerId", "model", "headSize", "pattern", "notes"],
        ...state.rackets.map((r) => [r.id, r.customerId, r.model, r.headSize, r.pattern, r.notes])
      ]
    },
    {
      name: `quick-stringer-customer-strings-${timestamp}.csv`,
      rows: [
        ["id", "customerId", "model", "gauge", "color"],
        ...state.customerStrings.map((s) => [s.id, s.customerId, s.model, s.gauge, s.color])
      ]
    },
    {
      name: `quick-stringer-inventory-${timestamp}.csv`,
      rows: [
        ["id", "name", "reelId", "gauge", "color", "initialLength", "lengthLeft", "costTotal"],
        ...state.inventory.map((i) => [
          i.id,
          i.name,
          i.reelId,
          i.gauge,
          i.color,
          i.initialLength,
          i.lengthLeft,
          i.costTotal
        ])
      ]
    },
    {
      name: `quick-stringer-jobs-${timestamp}.csv`,
      rows: [
        [
          "id",
          "customerId",
          "racketId",
          "date",
          "tension",
          "mainsSource",
          "mainsInventoryId",
          "mainsCustomerStringId",
          "mainsLengthUsed",
          "crossesSource",
          "crossesInventoryId",
          "crossesCustomerStringId",
          "crossesLengthUsed",
          "laborPrice",
          "stringPrice",
          "totalPrice",
          "durationSeconds",
          "notes"
        ],
        ...state.jobs.map((j) => [
          j.id,
          j.customerId,
          j.racketId,
          j.date,
          j.tension,
          j.mains?.source || j.stringSource,
          j.mains?.inventoryId || j.inventoryId,
          j.mains?.customerStringId || j.customerStringId,
          j.mains?.lengthUsed || j.lengthUsed,
          j.crosses?.source || "",
          j.crosses?.inventoryId || "",
          j.crosses?.customerStringId || "",
          j.crosses?.lengthUsed || "",
          j.laborPrice,
          j.stringPrice,
          j.totalPrice,
          j.durationSeconds,
          j.notes
        ])
      ]
    }
  ];

  const csvFiles = files.map((file) => ({
    name: file.name,
    data: csvRowsToBytes(file.rows)
  }));

  const zipBlob = createZip(csvFiles);
  const url = URL.createObjectURL(zipBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `quick-stringer-csv-${timestamp}.zip`;
  link.click();
  URL.revokeObjectURL(url);
}

function csvRowsToBytes(rows) {
  const content = rows.map((row) => row.map(csvValue).join(",")).join("\n");
  return new TextEncoder().encode(content);
}

function createZip(files) {
  const encoder = new TextEncoder();
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  files.forEach((file) => {
    const nameBytes = encoder.encode(file.name);
    const data = file.data;
    const crc = crc32(data);

    const localHeader = new Uint8Array(30);
    const localView = new DataView(localHeader.buffer);
    localView.setUint32(0, 0x04034b50, true);
    localView.setUint16(4, 20, true);
    localView.setUint16(6, 0, true);
    localView.setUint16(8, 0, true);
    localView.setUint16(10, 0, true);
    localView.setUint16(12, 0, true);
    localView.setUint32(14, crc, true);
    localView.setUint32(18, data.length, true);
    localView.setUint32(22, data.length, true);
    localView.setUint16(26, nameBytes.length, true);
    localView.setUint16(28, 0, true);

    localParts.push(localHeader, nameBytes, data);

    const centralHeader = new Uint8Array(46);
    const centralView = new DataView(centralHeader.buffer);
    centralView.setUint32(0, 0x02014b50, true);
    centralView.setUint16(4, 20, true);
    centralView.setUint16(6, 20, true);
    centralView.setUint16(8, 0, true);
    centralView.setUint16(10, 0, true);
    centralView.setUint16(12, 0, true);
    centralView.setUint16(14, 0, true);
    centralView.setUint32(16, crc, true);
    centralView.setUint32(20, data.length, true);
    centralView.setUint32(24, data.length, true);
    centralView.setUint16(28, nameBytes.length, true);
    centralView.setUint16(30, 0, true);
    centralView.setUint16(32, 0, true);
    centralView.setUint16(34, 0, true);
    centralView.setUint16(36, 0, true);
    centralView.setUint32(38, 0, true);
    centralView.setUint32(42, offset, true);

    centralParts.push(centralHeader, nameBytes);

    offset += localHeader.length + nameBytes.length + data.length;
  });

  const centralSize = centralParts.reduce((sum, part) => sum + part.length, 0);
  const endHeader = new Uint8Array(22);
  const endView = new DataView(endHeader.buffer);
  endView.setUint32(0, 0x06054b50, true);
  endView.setUint16(4, 0, true);
  endView.setUint16(6, 0, true);
  endView.setUint16(8, files.length, true);
  endView.setUint16(10, files.length, true);
  endView.setUint32(12, centralSize, true);
  endView.setUint32(16, offset, true);
  endView.setUint16(20, 0, true);

  return new Blob([...localParts, ...centralParts, endHeader], { type: "application/zip" });
}

function crc32(bytes) {
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i += 1) {
    crc ^= bytes[i];
    for (let j = 0; j < 8; j += 1) {
      const mask = -(crc & 1);
      crc = (crc >>> 1) ^ (0xedb88320 & mask);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function csvValue(value) {
  if (value === null || value === undefined) return "\"\"";
  const text = String(value).replace(/\"/g, "'");
  return `"${text}"`;
}

function handleImport(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      const importedVersion = Number(imported.schemaVersion || 0);
      const migrated = migrateData(imported);
      Object.assign(state, migrated);
      renderAll();
      const message = buildImportMessage(importedVersion, schemaVersion);
      showToast(message, "success");
    } catch (err) {
      showToast(`${t("import_failed")}: ${err.message}`, "error");
    }
  };
  reader.readAsText(file);
  event.target.value = "";
}

function handleReset() {
  if (!confirm(t("confirm_reset"))) return;
  state.customers = [];
  state.rackets = [];
  state.inventory = [];
  state.jobs = [];
  renderAll();
}

function setupForms() {
  $("#settingsForm").addEventListener("submit", handleSettingsSubmit);
  $("#customerForm").addEventListener("submit", handleCustomerSubmit);
  $("#racketForm").addEventListener("submit", handleRacketSubmit);
  $("#inventoryForm").addEventListener("submit", handleInventorySubmit);
  const customerStringForm = $("#customerStringForm");
  if (customerStringForm) {
    customerStringForm.addEventListener("submit", handleCustomerStringSubmit);
  }
  $("#jobForm").addEventListener("submit", handleJobSubmit);
  document.body.addEventListener("click", handleDelete);
  document.body.addEventListener("click", handleEdit);
  document.body.addEventListener("click", handleTabClick);
  document.body.addEventListener("click", handleQuickNav);

  $("#exportBtn").addEventListener("click", handleExport);
  $("#exportCsvBtn").addEventListener("click", handleExportCsv);
  $("#importBtn").addEventListener("click", () => $("#importFile").click());
  $("#importFile").addEventListener("change", handleImport);
  $("#resetBtn").addEventListener("click", handleReset);
  $("#jobCancelBtn").addEventListener("click", resetJobForm);
  const jobSearchInput = $("#jobSearchInput");
  if (jobSearchInput) {
    jobSearchInput.addEventListener("input", (event) => {
      jobSearchQuery = event.target.value || "";
      renderJobs();
    });
  }
  $$("#jobTableList .sort-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      setJobSort(btn.dataset.sort);
    });
  });
  const startButton = $("#startStringingBtn");
  if (startButton) {
    startButton.addEventListener("click", toggleStringingTimer);
  }
  $("#inventoryCancelBtn").addEventListener("click", resetInventoryForm);
  $("#customerCancelBtn").addEventListener("click", resetCustomerForm);
  $("#racketCancelBtn").addEventListener("click", resetRacketForm);
  const customerStringCancel = $("#customerStringCancelBtn");
  if (customerStringCancel) {
    customerStringCancel.addEventListener("click", resetCustomerStringForm);
  }

  const today = new Date().toISOString().slice(0, 10);
  $('input[name="date"]').value = today;

  const hybridToggle = $("#hybridEnabled");
  if (hybridToggle) {
    hybridToggle.addEventListener("change", (event) => {
      setHybridUI(event.target.checked);
      maybeApplyLastTension();
    });
  }

  $('select[name="stringSourceMain"]').addEventListener("change", (event) => {
    setStringSourceUI("Main", event.target.value);
    maybeApplyLastTension();
  });
  $('select[name="stringSourceCross"]').addEventListener("change", (event) => {
    setStringSourceUI("Cross", event.target.value);
    maybeApplyLastTension();
  });

  $('input[name="inventorySearchMain"]').addEventListener("change", () => {
    syncInventoryFromInput("Main");
    calculateStringPrice();
    maybeApplyLastTension();
  });
  $('input[name="inventorySearchCross"]').addEventListener("change", () => {
    syncInventoryFromInput("Cross");
    calculateStringPrice();
    maybeApplyLastTension();
  });

  $('input[name="customerStringSearchMain"]').addEventListener("change", () => {
    syncCustomerStringFromInput("Main");
    maybeApplyLastTension();
  });
  $('input[name="customerStringSearchCross"]').addEventListener("change", () => {
    syncCustomerStringFromInput("Cross");
    maybeApplyLastTension();
  });

  $('input[name="customerStringSearchMain"]').addEventListener("input", () => {
    syncCustomerStringFromInput("Main");
  });
  $('input[name="customerStringSearchCross"]').addEventListener("input", () => {
    syncCustomerStringFromInput("Cross");
  });

  $('input[name="customerSearch"]').addEventListener("change", () => {
    syncCustomerFromInput();
    const customerId = $('input[name="customerId"]').value;
    if (customerId !== state.lastJobCustomerId) {
      updateRacketOptionsForCustomer(customerId);
      $('select[name="racketId"]').value = "";
      state.lastJobCustomerId = customerId;
    }
    renderOptions();
    refreshCustomerStringList("Main");
    refreshCustomerStringList("Cross");
    $('input[name="customerStringSearchMain"]').value = "";
    $('input[name="customerStringSearchCross"]').value = "";
    $('input[name="customerStringIdMain"]').value = "";
    $('input[name="customerStringIdCross"]').value = "";
  });

  $('input[name="customerSearch"]').addEventListener("input", () => {
    syncCustomerFromInput();
    const customerId = $('input[name="customerId"]').value;
    if (customerId !== state.lastJobCustomerId) {
      updateRacketOptionsForCustomer(customerId);
      state.lastJobCustomerId = customerId;
    }
    refreshCustomerStringList("Main");
    refreshCustomerStringList("Cross");
  });

  $('input[name="lengthUsedMain"]').addEventListener("input", () => {
    calculateStringPrice();
  });
  $('input[name="lengthUsedCross"]').addEventListener("input", () => {
    calculateStringPrice();
  });

  $("#calcStringPriceBtn").addEventListener("click", calculateStringPrice);
  $('input[name="durationDisplay"]').addEventListener("change", (event) => {
    const seconds = parseDuration(event.target.value);
    $('input[name="durationSeconds"]').value = String(seconds);
    setTimerDisplay(seconds);
    event.target.value = formatDuration(seconds);
  });

  const jobRacketSelect = $('#jobForm select[name="racketId"]');
  if (jobRacketSelect) {
    jobRacketSelect.addEventListener("change", () => {
      maybeApplyLastTension();
    });
  }

  setStringSourceUI("Main", $('select[name="stringSourceMain"]').value);
  setStringSourceUI("Cross", $('select[name="stringSourceCross"]').value);
  setHybridUI(false);
  const newStringFieldsMain = $("#newCustomerStringFieldsMain");
  if (newStringFieldsMain) {
    newStringFieldsMain.classList.add("hidden");
  }
  const newStringFieldsCross = $("#newCustomerStringFieldsCross");
  if (newStringFieldsCross) {
    newStringFieldsCross.classList.add("hidden");
  }
  const newStringBtnMain = $("#newCustomerStringBtnMain");
  if (newStringBtnMain) {
    newStringBtnMain.addEventListener("click", () => {
      if (!newStringFieldsMain) return;
      newStringFieldsMain.classList.toggle("hidden");
      if (!newStringFieldsMain.classList.contains("hidden")) {
        $('input[name="customerStringSearchMain"]').value = "";
        $('input[name="customerStringIdMain"]').value = "";
      }
    });
  }
  const newStringBtnCross = $("#newCustomerStringBtnCross");
  if (newStringBtnCross) {
    newStringBtnCross.addEventListener("click", () => {
      if (!newStringFieldsCross) return;
      newStringFieldsCross.classList.toggle("hidden");
      if (!newStringFieldsCross.classList.contains("hidden")) {
        $('input[name="customerStringSearchCross"]').value = "";
        $('input[name="customerStringIdCross"]').value = "";
      }
    });
  }
  maybeApplyLastTension();

  $("#settingsForm").addEventListener("change", (event) => {
    const isSelect = event.target.matches("select");
    const isInput = event.target.matches("input");
    if (!isSelect && !isInput) return;
    const formData = Object.fromEntries(new FormData($("#settingsForm")));
    state.settings = {
      currency: formData.currency || "USD",
      tensionUnit: formData.tensionUnit || "kg",
      language: formData.language || "en",
      stringerName: formData.stringerName || ""
    };
    applySettings();
    applyTranslations();
    saveState();
    renderDashboard();
    renderJobs();
    renderInventory();
  });

  resetJobForm();
  resetInventoryForm();
  resetCustomerForm();
  resetRacketForm();
  resetCustomerStringForm();
}

loadState();
setupForms();
renderAll();

function withSchema(data) {
  return {
    schemaVersion,
    ...data
  };
}

function migrateData(data) {
  if (!data || typeof data !== "object") return state;
  const version = Number(data.schemaVersion || 0);
  let migrated = { ...data };

  if (version < 1) {
    migrated.inventory = (migrated.inventory || []).map((item) => ({
      ...item,
      costTotal: item.costTotal ?? item.cost ?? null
    }));
  }

  if (version < 2) {
    migrated.settings = migrated.settings || {};
    migrated.settings.language = migrated.settings.language || "en";
  }

  if (version < 3) {
    migrated.customerStrings = migrated.customerStrings || [];
    migrated.jobs = (migrated.jobs || []).map((job) => ({
      ...job,
      customerStringId: job.customerStringId ?? null
    }));
  }

  if (version < 4) {
    migrated.inventory = (migrated.inventory || []).map((item) => ({
      ...item,
      reelId: item.reelId ?? ""
    }));
  }

  if (version < 5) {
    migrated.inventory = (migrated.inventory || []).map((item) => ({
      ...item,
      initialLength: item.initialLength ?? item.length ?? item.lengthLeft ?? 0,
      lengthLeft: item.lengthLeft ?? item.length ?? item.initialLength ?? 0
    }));
  }

  if (version < 6) {
    migrated.settings = migrated.settings || {};
    migrated.settings.stringerName = migrated.settings.stringerName || "";
  }

  if (version < 7) {
    migrated.jobs = (migrated.jobs || []).map((job) => {
      if (job.mains || job.crosses) return job;
      return {
        ...job,
        mains: {
          source: job.stringSource || "shop",
          inventoryId: job.inventoryId || null,
          customerStringId: job.customerStringId || null,
          lengthUsed: job.lengthUsed || 0
        },
        crosses: null
      };
    });
  }

  migrated.settings = migrated.settings || {};
  migrated.settings.stringerName = migrated.settings.stringerName || "";

  migrated.schemaVersion = schemaVersion;
  migrated.settings = migrated.settings || { currency: "USD", tensionUnit: "kg", language: "en", stringerName: "" };
  migrated.customers = migrated.customers || [];
  migrated.rackets = migrated.rackets || [];
  migrated.inventory = migrated.inventory || [];
  migrated.customerStrings = migrated.customerStrings || [];
  migrated.jobs = migrated.jobs || [];
  return migrated;
}

const onboarding = $("#onboarding");
const onboardingClose = $("#onboardingClose");
if (onboarding && onboardingClose) {
  const seen = localStorage.getItem(onboardingKey) === "seen";
  const onboardingLanguage = $("#onboardingLanguage");
  if (onboardingLanguage) {
    onboardingLanguage.value = state.settings?.language || "en";
    onboardingLanguage.addEventListener("change", (event) => {
      state.settings.language = event.target.value || "en";
      applySettings();
      applyTranslations();
      saveState();
    });
  }
  if (!seen) {
    onboarding.classList.remove("hidden");
  }
  onboardingClose.addEventListener("click", () => {
    localStorage.setItem(onboardingKey, "seen");
    onboarding.classList.add("hidden");
  });
}

function calculateStringPrice() {
  const inventoryIdMain = $('input[name="inventoryIdMain"]').value;
  const inventoryIdCross = $('input[name="inventoryIdCross"]').value;
  const lengthMain = Number($('input[name="lengthUsedMain"]').value || 0);
  const lengthCross = Number($('input[name="lengthUsedCross"]').value || 0);
  const mainCost = computeShopStringCost(inventoryIdMain, lengthMain);
  const crossCost = computeShopStringCost(inventoryIdCross, lengthCross);
  $('input[name="stringPrice"]').value = (mainCost + crossCost).toFixed(2);
}

function setStringSourceUI(slot, value) {
  const isShop = value === "shop";
  const inventoryLabel = $(`#inventoryStringLabel${slot}`);
  const customerLabel = $(`#customerStringLabel${slot}`);
  const newCustomerLabel = $(`#newCustomerStringLabel${slot}`);
  const newStringFields = $(`#newCustomerStringFields${slot}`);

  if (inventoryLabel) inventoryLabel.classList.toggle("hidden", !isShop);
  if (customerLabel) customerLabel.classList.toggle("hidden", isShop);
  if (newCustomerLabel) newCustomerLabel.classList.toggle("hidden", isShop);

  const inventorySearch = $(`input[name="inventorySearch${slot}"]`);
  const customerSearch = $(`input[name="customerStringSearch${slot}"]`);
  if (inventorySearch) inventorySearch.disabled = !isShop;
  if (customerSearch) customerSearch.disabled = isShop;

  const newStringInputs = document.querySelectorAll(`#newCustomerStringFields${slot} input`);
  newStringInputs.forEach((input) => {
    input.disabled = isShop;
  });

  if (!isShop) {
    if (inventorySearch) inventorySearch.value = "";
    $(`input[name="inventoryId${slot}"]`).value = "";
  } else {
    if (customerSearch) customerSearch.value = "";
    $(`input[name="customerStringId${slot}"]`).value = "";
    if (newStringFields) newStringFields.classList.add("hidden");
  }
}

function setHybridUI(enabled) {
  const checkbox = $("#hybridEnabled");
  const crossesSection = $("#crossesSection");
  if (checkbox) checkbox.checked = !!enabled;
  if (crossesSection) crossesSection.classList.toggle("hidden", !enabled);
  if (!enabled) {
    $('input[name="lengthUsedCross"]').value = 0;
    $('input[name="inventoryIdCross"]').value = "";
    $('input[name="customerStringIdCross"]').value = "";
    $('input[name="inventorySearchCross"]').value = "";
    $('input[name="customerStringSearchCross"]').value = "";
    $('input[name="customerStringModelCross"]').value = "";
    $('input[name="customerStringGaugeCross"]').value = "";
    $('input[name="customerStringColorCross"]').value = "";
    $("#newCustomerStringFieldsCross")?.classList.add("hidden");
  }
  calculateStringPrice();
}

function formatDuration(seconds) {
  const total = Number(seconds || 0);
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function formatDurationLong(seconds) {
  const total = Number(seconds || 0);
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  if (days > 0) return `${days}d ${hours}h`;
  return `${hours}h`;
}

function setTimerDisplay(seconds) {
  const timer = $("#stringingTimer");
  if (!timer) return;
  const total = Number(seconds || 0);
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  timer.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  const durationInput = $('input[name="durationDisplay"]');
  if (durationInput) {
    durationInput.value = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }
}

function setTimerState(isRunning) {
  const button = $("#startStringingBtn");
  if (button) {
    button.textContent = isRunning ? t("jobs_stop") : t("jobs_start");
  }
}

function toggleStringingTimer() {
  if (timerInterval) {
    stopStringingTimer();
    return;
  }
  const form = $("#jobForm");
  const durationInput = $('input[name="durationSeconds"]');
  if (!form || !durationInput) return;
  const existingSeconds = Number(durationInput.value || 0);
  timerStart = Date.now() - existingSeconds * 1000;
  timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - timerStart) / 1000);
    durationInput.value = String(elapsed);
    setTimerDisplay(elapsed);
  }, 1000);
  setTimerState(true);
}

function stopStringingTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    timerStart = null;
  }
  setTimerState(false);
}

function parseDuration(value) {
  if (!value) return 0;
  const trimmed = value.trim();
  if (trimmed.includes(":")) {
    const [mins, secs] = trimmed.split(":");
    const m = Number(mins || 0);
    const s = Number(secs || 0);
    if (Number.isNaN(m) || Number.isNaN(s)) return 0;
    return Math.max(0, Math.floor(m) * 60 + Math.floor(s));
  }
  const numeric = Number(trimmed);
  if (Number.isNaN(numeric)) return 0;
  return Math.max(0, Math.floor(numeric));
}

window.addEventListener("beforeunload", (event) => {
  const message = t("confirm_export");
  event.preventDefault();
  event.returnValue = message;
  return message;
});
