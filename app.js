const state = {
  customers: [],
  rackets: [],
  inventory: [],
  customerStrings: [],
  jobs: [],
  settings: {
    currency: "USD",
    tensionUnit: "kg",
    language: "en"
  }
};

const storageKey = "quick-stringer-data";
const onboardingKey = "quick-stringer-onboarding";
const schemaVersion = 4;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

let timerInterval = null;
let timerStart = null;

const translations = {
  en: {
    app_title: "Quick Stringer",
    app_subtitle: "Simple shop manager for rackets, strings, and jobs.",
    tab_dashboard: "Dashboard",
    tab_settings: "Settings",
    tab_customers: "Customers",
    tab_rackets: "Rackets",
    tab_inventory: "String Inventory",
    tab_jobs: "Stringing Jobs",
    dashboard_today: "Today",
    dashboard_jobs_month: "Jobs This Month",
    dashboard_revenue_month: "Revenue This Month",
    dashboard_inventory_items: "Inventory Items",
    dashboard_jobs_8weeks: "Jobs (Last 8 Weeks)",
    dashboard_revenue_8weeks: "Revenue (Last 8 Weeks)",
    dashboard_avg_time: "Avg Stringing Time",
    dashboard_quick_add: "Quick Add Job",
    dashboard_quick_add_desc: "Log a stringing job in under a minute.",
    cta_add_job: "Add Job",
    settings_title: "General Settings",
    settings_subtitle: "Customize your defaults for currency and tension units.",
    settings_language: "Language",
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
    inventory_total_cost: "Total Spool Cost",
    inventory_cost_per_m: "Cost / m",
    inventory_add: "Add Inventory",
    inventory_update: "Update Inventory",
    jobs_title: "Stringing Jobs",
    jobs_subtitle: "Log each stringing job and prices charged.",
    jobs_search_customer: "Search customer...",
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
    jobs_string_used: "String Used",
    jobs_date: "Date",
    jobs_tension: "Tension",
    jobs_length_used: "Length Used (meters)",
    jobs_labor_price: "Labor Price",
    jobs_string_price: "String Price",
    jobs_calc: "Calculate",
    jobs_time: "Time (mm:ss)",
    jobs_start: "Start Stringing",
    jobs_stop: "Stop Timer",
    jobs_finish: "Finish & Save",
    jobs_source: "Source",
    jobs_tension_header: "Tension",
    jobs_time_header: "Time",
    jobs_price: "Price",
    footer_saved: "Data is saved locally in your browser.",
    footer_export: "Export Data",
    footer_export_csv: "Export CSV",
    footer_import: "Import Data",
    footer_reset: "Reset All Data",
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
    tab_customers: "Klientai",
    tab_rackets: "Raketės",
    tab_inventory: "Stygų inventorius",
    tab_jobs: "Stygavimo darbai",
    dashboard_today: "Šiandien",
    dashboard_jobs_month: "Darbai šį mėn.",
    dashboard_revenue_month: "Pajamos šį mėn.",
    dashboard_inventory_items: "Inventoriaus įrašai",
    dashboard_jobs_8weeks: "Darbai (paskutinės 8 sav.)",
    dashboard_revenue_8weeks: "Pajamos (paskutinės 8 sav.)",
    dashboard_avg_time: "Vid. stygavimo laikas",
    dashboard_quick_add: "Greitas darbas",
    dashboard_quick_add_desc: "Užregistruokite stygavimą per minutę.",
    cta_add_job: "Pridėti darbą",
    settings_title: "Bendri nustatymai",
    settings_subtitle: "Nustatykite valiutą ir įtempimo vienetus.",
    settings_language: "Kalba",
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
    inventory_total_cost: "Rulono kaina",
    inventory_cost_per_m: "Kaina / m",
    inventory_add: "Pridėti inventorių",
    inventory_update: "Atnaujinti inventorių",
    jobs_title: "Stygavimo darbai",
    jobs_subtitle: "Registruokite darbus ir kainas.",
    jobs_search_customer: "Ieškoti kliento...",
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
    jobs_string_used: "Naudota styga",
    jobs_date: "Data",
    jobs_tension: "Įtempimas",
    jobs_length_used: "Naudotas ilgis (metrai)",
    jobs_labor_price: "Darbo kaina",
    jobs_string_price: "Stygos kaina",
    jobs_calc: "Skaičiuoti",
    jobs_time: "Laikas (mm:ss)",
    jobs_start: "Pradėti stygavimą",
    jobs_stop: "Sustabdyti laikmatį",
    jobs_finish: "Baigti ir išsaugoti",
    jobs_source: "Šaltinis",
    jobs_tension_header: "Įtempimas",
    jobs_time_header: "Laikas",
    jobs_price: "Kaina",
    footer_saved: "Duomenys saugomi naršyklėje.",
    footer_export: "Eksportuoti",
    footer_export_csv: "CSV eksportas",
    footer_import: "Importuoti",
    footer_reset: "Ištrinti viską",
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
    tab_customers: "Kunden",
    tab_rackets: "Schläger",
    tab_inventory: "Saitenlager",
    tab_jobs: "Bespannungen",
    dashboard_today: "Heute",
    dashboard_jobs_month: "Jobs diesen Monat",
    dashboard_revenue_month: "Umsatz diesen Monat",
    dashboard_inventory_items: "Lagerartikel",
    dashboard_jobs_8weeks: "Jobs (letzte 8 Wochen)",
    dashboard_revenue_8weeks: "Umsatz (letzte 8 Wochen)",
    dashboard_avg_time: "Durchschn. Bespannzeit",
    dashboard_quick_add: "Schnell hinzufügen",
    dashboard_quick_add_desc: "Job in unter einer Minute erfassen.",
    cta_add_job: "Job hinzufügen",
    settings_title: "Allgemeine Einstellungen",
    settings_subtitle: "Währung und Spannungseinheit festlegen.",
    settings_language: "Sprache",
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
    inventory_total_cost: "Gesamtkosten Rolle",
    inventory_cost_per_m: "Kosten / m",
    inventory_add: "Lager hinzufügen",
    inventory_update: "Lager aktualisieren",
    jobs_title: "Bespannungen",
    jobs_subtitle: "Jobs und Preise erfassen.",
    jobs_search_customer: "Kunden suchen...",
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
    jobs_string_used: "Verwendete Saite",
    jobs_date: "Datum",
    jobs_tension: "Spannung",
    jobs_length_used: "Verwendete Länge (Meter)",
    jobs_labor_price: "Arbeitslohn",
    jobs_string_price: "Saitenpreis",
    jobs_calc: "Berechnen",
    jobs_time: "Zeit (mm:ss)",
    jobs_start: "Bespannung starten",
    jobs_stop: "Timer stoppen",
    jobs_finish: "Fertig & speichern",
    jobs_source: "Quelle",
    jobs_tension_header: "Spannung",
    jobs_time_header: "Zeit",
    jobs_price: "Preis",
    footer_saved: "Daten werden lokal im Browser gespeichert.",
    footer_export: "Daten exportieren",
    footer_export_csv: "CSV exportieren",
    footer_import: "Daten importieren",
    footer_reset: "Alle Daten löschen",
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
    tab_customers: "Clients",
    tab_rackets: "Raquettes",
    tab_inventory: "Stock de cordage",
    tab_jobs: "Travaux de cordage",
    dashboard_today: "Aujourd’hui",
    dashboard_jobs_month: "Travaux ce mois",
    dashboard_revenue_month: "Revenus ce mois",
    dashboard_inventory_items: "Articles en stock",
    dashboard_jobs_8weeks: "Travaux (8 dernières semaines)",
    dashboard_revenue_8weeks: "Revenus (8 dernières semaines)",
    dashboard_avg_time: "Temps moyen",
    dashboard_quick_add: "Ajout rapide",
    dashboard_quick_add_desc: "Enregistrez un travail en moins d’une minute.",
    cta_add_job: "Ajouter un travail",
    settings_title: "Paramètres généraux",
    settings_subtitle: "Définissez la devise et l’unité de tension.",
    settings_language: "Langue",
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
    inventory_total_cost: "Coût total bobine",
    inventory_cost_per_m: "Coût / m",
    inventory_add: "Ajouter au stock",
    inventory_update: "Mettre à jour le stock",
    jobs_title: "Travaux de cordage",
    jobs_subtitle: "Enregistrez les travaux et prix.",
    jobs_search_customer: "Rechercher un client...",
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
    jobs_string_used: "Cordage utilisé",
    jobs_date: "Date",
    jobs_tension: "Tension",
    jobs_length_used: "Longueur utilisée (mètres)",
    jobs_labor_price: "Main-d’œuvre",
    jobs_string_price: "Prix du cordage",
    jobs_calc: "Calculer",
    jobs_time: "Temps (mm:ss)",
    jobs_start: "Démarrer",
    jobs_stop: "Arrêter le chrono",
    jobs_finish: "Terminer et enregistrer",
    jobs_source: "Source",
    jobs_tension_header: "Tension",
    jobs_time_header: "Temps",
    jobs_price: "Prix",
    footer_saved: "Les données sont stockées localement.",
    footer_export: "Exporter",
    footer_export_csv: "Exporter CSV",
    footer_import: "Importer",
    footer_reset: "Tout réinitialiser",
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
    tab_customers: "Clientes",
    tab_rackets: "Raquetas",
    tab_inventory: "Inventario de cordaje",
    tab_jobs: "Trabajos de encordado",
    dashboard_today: "Hoy",
    dashboard_jobs_month: "Trabajos del mes",
    dashboard_revenue_month: "Ingresos del mes",
    dashboard_inventory_items: "Artículos en inventario",
    dashboard_jobs_8weeks: "Trabajos (últimas 8 semanas)",
    dashboard_revenue_8weeks: "Ingresos (últimas 8 semanas)",
    dashboard_avg_time: "Tiempo medio",
    dashboard_quick_add: "Agregar rápido",
    dashboard_quick_add_desc: "Registra un trabajo en menos de un minuto.",
    cta_add_job: "Agregar trabajo",
    settings_title: "Ajustes generales",
    settings_subtitle: "Configura moneda y unidad de tensión.",
    settings_language: "Idioma",
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
    inventory_total_cost: "Costo total bobina",
    inventory_cost_per_m: "Costo / m",
    inventory_add: "Agregar inventario",
    inventory_update: "Actualizar inventario",
    jobs_title: "Trabajos de encordado",
    jobs_subtitle: "Registra trabajos y precios.",
    jobs_search_customer: "Buscar cliente...",
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
    jobs_string_used: "Cordaje usado",
    jobs_date: "Fecha",
    jobs_tension: "Tensión",
    jobs_length_used: "Longitud usada (metros)",
    jobs_labor_price: "Mano de obra",
    jobs_string_price: "Precio de cordaje",
    jobs_calc: "Calcular",
    jobs_time: "Tiempo (mm:ss)",
    jobs_start: "Iniciar",
    jobs_stop: "Detener temporizador",
    jobs_finish: "Finalizar y guardar",
    jobs_source: "Origen",
    jobs_tension_header: "Tensión",
    jobs_time_header: "Tiempo",
    jobs_price: "Precio",
    footer_saved: "Los datos se guardan localmente.",
    footer_export: "Exportar",
    footer_export_csv: "Exportar CSV",
    footer_import: "Importar",
    footer_reset: "Borrar todo",
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

function loadState() {
  const saved = localStorage.getItem(storageKey);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      const migrated = migrateData(parsed);
      Object.assign(state, migrated);
      if (!state.settings) {
        state.settings = { currency: "USD", tensionUnit: "kg", language: "en" };
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

  updateRacketOptionsForCustomer($('input[name="customerId"]').value);

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

  const inventoryOptions = state.inventory
    .map((item) => {
      const perMeter = item.length > 0 && item.costTotal ? item.costTotal / item.length : null;
      const costLabel = perMeter ? ` · ${formatMoney(perMeter)}/m` : "";
      return `<option value="${item.id}">${item.name} ${item.gauge || ""} (${item.length.toFixed(1)}m${costLabel})</option>`;
    })
    .join("");

  const inventoryList = $("#inventoryList");
  if (inventoryList) {
    inventoryList.innerHTML = state.inventory
      .map((item) => {
        const label = formatInventoryLabel(item);
        return `<option value="${label}" data-id="${item.id}"></option>`;
      })
      .join("");
  }

  const customerStringList = $("#customerStringList");
  if (customerStringList) {
    const customerId = $('input[name="customerId"]').value;
    const options = state.customerStrings
      .filter((item) => item.customerId === customerId)
      .map((item) => {
        const label = formatCustomerStringLabel(item);
        return `<option value="${label}" data-id="${item.id}"></option>`;
      })
      .join("");
    customerStringList.innerHTML = options;
  }
}

function updateRacketOptionsForCustomer(customerId) {
  const rackets = customerId
    ? state.rackets.filter((racket) => racket.customerId === customerId)
    : [];
  const racketOptions = rackets
    .map((racket) => `<option value="${racket.id}">${racket.model}</option>`)
    .join("");
  const racketSelect = $('select[name="racketId"]');
  if (!racketSelect) return;
  racketSelect.innerHTML = `<option value="" disabled selected>${t("common_select")}</option>${racketOptions}`;
}

function formatCustomerLabel(customer) {
  const phone = customer.phone ? ` · ${customer.phone}` : "";
  return `${customer.name}${phone}`;
}

function formatInventoryLabel(item) {
  const gauge = item.gauge ? ` ${item.gauge}` : "";
  const reel = item.reelId ? ` · ${item.reelId}` : "";
  const length = ` (${item.length.toFixed(1)}m)`;
  return `${item.name}${gauge}${reel}${length}`;
}

function formatCustomerStringLabel(item) {
  const gauge = item.gauge ? ` ${item.gauge}` : "";
  const color = item.color ? ` · ${item.color}` : "";
  return `${item.model}${gauge}${color}`;
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

function syncInventoryFromInput() {
  const input = $('input[name="inventorySearch"]');
  const hidden = $('input[name="inventoryId"]');
  if (!input || !hidden) return;
  const match = Array.from($("#inventoryList").options || []).find(
    (opt) => opt.value === input.value
  );
  if (match) {
    hidden.value = match.dataset.id || "";
    return;
  }
  const normalized = input.value.trim().toLowerCase();
  if (!normalized) {
    hidden.value = "";
    return;
  }
  const byName = state.inventory.filter((item) =>
    item.name.trim().toLowerCase() === normalized
  );
  hidden.value = byName.length === 1 ? byName[0].id : "";
}

function syncCustomerStringFromInput() {
  const input = $('input[name="customerStringSearch"]');
  const hidden = $('input[name="customerStringId"]');
  if (!input || !hidden) return;
  const match = Array.from($("#customerStringList").options || []).find(
    (opt) => opt.value === input.value
  );
  hidden.value = match ? match.dataset.id : "";
}

function maybeApplyLastTension() {
  const customerId = $('input[name="customerId"]').value;
  const racketId = $('#jobForm select[name="racketId"]').value;
  const stringSource = $('#jobForm select[name="stringSource"]').value;
  const inventoryId = $('input[name="inventoryId"]').value || null;
  const customerStringId = $('input[name="customerStringId"]').value || null;
  const tensionInput = $('input[name="tension"]');
  const laborInput = $('input[name="laborPrice"]');
  if (!customerId || !racketId || !tensionInput) return;

  const lastJob = findLastMatchingJob({
    customerId,
    racketId,
    stringSource,
    inventoryId,
    customerStringId
  });
  if (lastJob && lastJob.tension) {
    tensionInput.value = lastJob.tension;
  }
  if (lastJob && laborInput && lastJob.laborPrice != null) {
    laborInput.value = lastJob.laborPrice;
  }
}

function findLastMatchingJob({ customerId, racketId, stringSource, inventoryId, customerStringId }) {
  for (let i = state.jobs.length - 1; i >= 0; i -= 1) {
    const job = state.jobs[i];
    if (job.customerId !== customerId) continue;
    if (job.racketId !== racketId) continue;
    if (job.stringSource !== stringSource) continue;
    if (stringSource === "shop") {
      if ((job.inventoryId || null) !== inventoryId) continue;
    }
    if (stringSource === "customer") {
      if ((job.customerStringId || null) !== customerStringId) continue;
    }
    if (job.tension) return job;
  }
  return null;
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
      const perMeter = item.length > 0 && item.costTotal ? item.costTotal / item.length : null;
      return `
        <tr>
          <td>${item.name}</td>
          <td>${item.reelId || "-"}</td>
          <td>${item.gauge || "-"}</td>
          <td>${item.color || "-"}</td>
          <td>${item.length.toFixed(1)}</td>
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

function renderJobs() {
  const table = $("#jobTable");
  const unit = state.settings?.tensionUnit || "kg";
  table.innerHTML = state.jobs
    .map((job) => {
      const customer = state.customers.find((c) => c.id === job.customerId);
      const racket = state.rackets.find((r) => r.id === job.racketId);
      const stringItem = state.inventory.find((i) => i.id === job.inventoryId);
      const customerStringItem = state.customerStrings.find((i) => i.id === job.customerStringId);
      const stringLabel = job.stringSource === "customer"
        ? customerStringItem
          ? formatCustomerStringLabel(customerStringItem)
          : t("jobs_string_source_customer")
        : stringItem
          ? `${stringItem.name} ${stringItem.gauge || ""}`
          : "-";
      return `
        <tr>
          <td>${job.date}</td>
          <td>${customer ? customer.name : t("common_unknown")}</td>
          <td>${racket ? racket.model : t("common_unknown")}</td>
          <td>${stringLabel}</td>
          <td>${job.stringSource === "customer" ? t("common_customer_string") : t("common_shop")}</td>
          <td>${job.tension ? `${job.tension} ${unit}` : "-"}</td>
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
}

function renderDashboard() {
  const now = new Date();
  const cutoff = new Date(now.getTime() - 8 * 7 * 24 * 60 * 60 * 1000);

  const jobsLast8Weeks = state.jobs.filter((job) => {
    const date = new Date(job.date);
    return date >= cutoff && date <= now;
  });

  const revenue = jobsLast8Weeks.reduce((sum, job) => sum + Number(job.totalPrice || 0), 0);
  const totalSeconds = jobsLast8Weeks.reduce((sum, job) => sum + Number(job.durationSeconds || 0), 0);
  const avgSeconds = jobsLast8Weeks.length ? Math.round(totalSeconds / jobsLast8Weeks.length) : 0;

  $("#kpiJobs").textContent = jobsLast8Weeks.length;
  $("#kpiRevenue").textContent = formatMoney(revenue);
  $("#kpiAvgTime").textContent = formatDuration(avgSeconds);
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
  }
}

function renderAll() {
  renderOptions();
  renderCustomers();
  renderCustomerStrings();
  renderRackets();
  renderInventory();
  renderJobs();
  renderDashboard();
  applySettings();
  applyTranslations();
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
  const payload = {
    name: data.name,
    reelId: data.reelId,
    gauge: data.gauge,
    color: data.color,
    length: Number(data.length || 0),
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
  const lengthUsed = Number(data.lengthUsed || 0);
  const editingId = data.jobId || null;
  const durationSeconds = Number(data.durationSeconds || 0);
  const customerId = resolveCustomerId(data.customerSearch);
  syncInventoryFromInput();
  syncCustomerStringFromInput();
  const inventoryId = $('input[name="inventoryId"]').value || null;

  if (!customerId) {
    console.warn("Customer match failed:", {
      typed: data.customerSearch,
      listValues: Array.from($("#customerList").options || []).map((o) => o.value)
    });
    alert(t("alert_select_customer"));
    return;
  }
  if (data.stringSource === "shop" && !inventoryId) {
    alert(t("alert_select_string"));
    return;
  }
  let customerStringId = data.customerStringId || null;
  if (data.stringSource === "customer" && !customerStringId) {
    const model = data.customerStringModel?.trim();
    if (model) {
      const newString = {
        id: createId("cstr"),
        customerId,
        model,
        gauge: data.customerStringGauge || "",
        color: data.customerStringColor || ""
      };
      state.customerStrings.push(newString);
      customerStringId = newString.id;
    } else {
      alert(t("alert_select_customer_string"));
      return;
    }
  }

  const laborPrice = Number(data.laborPrice || 0);
  let stringPrice = Number(data.stringPrice || 0);
  if (data.stringSource === "shop" && inventoryId) {
    const item = state.inventory.find((inv) => inv.id === inventoryId);
    if (item && item.length > 0 && item.costTotal) {
      const perMeter = item.costTotal / item.length;
      stringPrice = Number((perMeter * lengthUsed).toFixed(2));
    }
  }
  const totalPrice = laborPrice + stringPrice;

  if (editingId) {
    const existing = state.jobs.find((job) => job.id === editingId);
    if (existing) {
      adjustInventoryForJobChange(existing, {
        stringSource: data.stringSource,
        inventoryId: data.inventoryId || null,
        lengthUsed
      });
      Object.assign(existing, {
        customerId: data.customerId,
        racketId: data.racketId,
        date: data.date,
        tension: data.tension,
        stringSource: data.stringSource,
        inventoryId,
        customerStringId,
        lengthUsed,
        laborPrice,
        stringPrice,
        totalPrice,
        notes: data.notes,
        durationSeconds
      });
    }
  } else {
    if (data.stringSource === "shop" && inventoryId) {
      const item = state.inventory.find((inv) => inv.id === inventoryId);
      if (item) {
        item.length = Math.max(0, item.length - lengthUsed);
      }
    }
    state.jobs.push({
      id: createId("job"),
      customerId,
      racketId: data.racketId,
      date: data.date,
      tension: data.tension,
      stringSource: data.stringSource,
      inventoryId,
      customerStringId,
      lengthUsed,
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
  if (oldJob.stringSource === "shop" && oldJob.inventoryId) {
    const oldItem = state.inventory.find((inv) => inv.id === oldJob.inventoryId);
    if (oldItem) {
      oldItem.length = oldItem.length + Number(oldJob.lengthUsed || 0);
    }
  }
  if (newJob.stringSource === "shop" && newJob.inventoryId) {
    const newItem = state.inventory.find((inv) => inv.id === newJob.inventoryId);
    if (newItem) {
      newItem.length = Math.max(0, newItem.length - Number(newJob.lengthUsed || 0));
    }
  }
}

function resetJobForm() {
  const form = $("#jobForm");
  form.reset();
  $('input[name="lengthUsed"]').value = 12.2;
  $('input[name="date"]').value = new Date().toISOString().slice(0, 10);
  $('input[name="jobId"]').value = "";
  $('input[name="durationSeconds"]').value = "";
  $('input[name="customerId"]').value = "";
  $('input[name="inventoryId"]').value = "";
  $('input[name="customerStringId"]').value = "";
  $('input[name="customerSearch"]').value = "";
  $('input[name="inventorySearch"]').value = "";
  $('input[name="customerStringSearch"]').value = "";
  $('input[name="customerStringModel"]').value = "";
  $('input[name="customerStringGauge"]').value = "";
  $('input[name="customerStringColor"]').value = "";
  $("#newCustomerStringFields").classList.add("hidden");
  $('input[name="durationDisplay"]').value = "00:00";
  stopStringingTimer();
  setTimerDisplay(0);
  setStringSourceUI($('select[name="stringSource"]').value);
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
  form.length.value = item.length ?? 0;
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
  renderOptions();
  form.customerId.value = job.customerId;
  updateRacketOptionsForCustomer(job.customerId);
  form.racketId.value = job.racketId;
  form.date.value = job.date;
  form.tension.value = job.tension || "";
  form.stringSource.value = job.stringSource;
  setStringSourceUI(job.stringSource);
  form.inventoryId.value = job.inventoryId || "";
  form.customerStringId.value = job.customerStringId || "";
  form.lengthUsed.value = job.lengthUsed || 0;
  form.laborPrice.value = job.laborPrice || 0;
  form.stringPrice.value = job.stringPrice || 0;
  form.notes.value = job.notes || "";
  form.jobId.value = job.id;
  form.durationSeconds.value = job.durationSeconds || 0;
  form.durationDisplay.value = formatDuration(job.durationSeconds || 0);
  setTimerDisplay(job.durationSeconds || 0);
  const customer = state.customers.find((c) => c.id === job.customerId);
  form.customerSearch.value = customer ? formatCustomerLabel(customer) : "";
  const inventoryItem = state.inventory.find((i) => i.id === job.inventoryId);
  form.inventorySearch.value = inventoryItem ? formatInventoryLabel(inventoryItem) : "";
  const customerStringItem = state.customerStrings.find((i) => i.id === job.customerStringId);
  form.customerStringSearch.value = customerStringItem ? formatCustomerStringLabel(customerStringItem) : "";
  $("#jobCancelBtn").style.display = "inline-flex";
  updateDynamicButtonLabels();

  const isShop = job.stringSource === "shop";
  $('input[name="inventorySearch"]').disabled = !isShop;
  $('input[name="stringPrice"]').disabled = !isShop;
}

function handleSettingsSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const data = Object.fromEntries(new FormData(form));
  state.settings = {
    currency: data.currency || "USD",
    tensionUnit: data.tensionUnit || "kg",
    language: data.language || "en"
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
        ["id", "name", "reelId", "gauge", "color", "length", "costTotal"],
        ...state.inventory.map((i) => [i.id, i.name, i.reelId, i.gauge, i.color, i.length, i.costTotal])
      ]
    },
    {
      name: `quick-stringer-jobs-${timestamp}.csv`,
      rows: [
        [
          "id",
          "customerId",
          "racketId",
          "inventoryId",
          "customerStringId",
          "date",
          "tension",
          "stringSource",
          "lengthUsed",
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
          j.inventoryId,
          j.customerStringId,
          j.date,
          j.tension,
          j.stringSource,
          j.lengthUsed,
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
      const migrated = migrateData(imported);
      Object.assign(state, migrated);
      renderAll();
    } catch (err) {
      alert("Import failed. Please choose a valid backup file.");
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

  $('select[name="stringSource"]').addEventListener("change", (event) => {
    setStringSourceUI(event.target.value);
    maybeApplyLastTension();
  });

  $('input[name="inventorySearch"]').addEventListener("change", () => {
    syncInventoryFromInput();
    calculateStringPrice();
    maybeApplyLastTension();
  });

  $('input[name="customerStringSearch"]').addEventListener("change", () => {
    syncCustomerStringFromInput();
    maybeApplyLastTension();
  });

  $('input[name="customerStringSearch"]').addEventListener("input", () => {
    syncCustomerStringFromInput();
  });

  $('input[name="customerSearch"]').addEventListener("change", () => {
    syncCustomerFromInput();
    const customerId = $('input[name="customerId"]').value;
    updateRacketOptionsForCustomer(customerId);
    $('select[name="racketId"]').value = "";
    renderOptions();
    $('input[name="customerStringSearch"]').value = "";
    $('input[name="customerStringId"]').value = "";
  });

  $('input[name="customerSearch"]').addEventListener("input", () => {
    syncCustomerFromInput();
    const customerId = $('input[name="customerId"]').value;
    updateRacketOptionsForCustomer(customerId);
  });

  $('input[name="lengthUsed"]').addEventListener("input", () => {
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

  setStringSourceUI($('select[name="stringSource"]').value);
  const newStringFields = $("#newCustomerStringFields");
  if (newStringFields) {
    newStringFields.classList.add("hidden");
  }
  const newStringBtn = $("#newCustomerStringBtn");
  if (newStringBtn) {
    newStringBtn.addEventListener("click", () => {
      if (!newStringFields) return;
      newStringFields.classList.toggle("hidden");
      if (!newStringFields.classList.contains("hidden")) {
        $('input[name="customerStringSearch"]').value = "";
        $('input[name="customerStringId"]').value = "";
      }
    });
  }
  maybeApplyLastTension();

  $("#settingsForm").addEventListener("change", (event) => {
    const isSelect = event.target.matches("select");
    if (!isSelect) return;
    const formData = Object.fromEntries(new FormData($("#settingsForm")));
    state.settings = {
      currency: formData.currency || "USD",
      tensionUnit: formData.tensionUnit || "kg",
      language: formData.language || "en"
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

  migrated.schemaVersion = schemaVersion;
  migrated.settings = migrated.settings || { currency: "USD", tensionUnit: "kg", language: "en" };
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
  if (!seen) {
    onboarding.classList.remove("hidden");
  }
  onboardingClose.addEventListener("click", () => {
    localStorage.setItem(onboardingKey, "seen");
    onboarding.classList.add("hidden");
  });
}

function calculateStringPrice() {
  const inventoryId = $('input[name="inventoryId"]').value;
  const lengthUsed = Number($('input[name="lengthUsed"]').value || 0);
  const item = state.inventory.find((inv) => inv.id === inventoryId);
  if (!item || item.length <= 0 || !item.costTotal) return;
  const perMeter = item.costTotal / item.length;
  $('input[name="stringPrice"]').value = (perMeter * lengthUsed).toFixed(2);
}

function setStringSourceUI(value) {
  const isShop = value === "shop";
  const inventoryLabel = $("#inventoryStringLabel");
  const customerLabel = $("#customerStringLabel");
  const newCustomerLabel = $("#newCustomerStringLabel");
  const newStringFields = $("#newCustomerStringFields");

  if (inventoryLabel) inventoryLabel.classList.toggle("hidden", !isShop);
  if (customerLabel) customerLabel.classList.toggle("hidden", isShop);
  if (newCustomerLabel) newCustomerLabel.classList.toggle("hidden", isShop);

  $('input[name="inventorySearch"]').disabled = !isShop;
  $('input[name="stringPrice"]').disabled = !isShop;
  $('input[name="customerStringSearch"]').disabled = isShop;

  const newStringInputs = $$('.stacked-inputs input');
  newStringInputs.forEach((input) => {
    input.disabled = isShop;
  });

  if (!isShop) {
    $('input[name="inventorySearch"]').value = "";
    $('input[name="inventoryId"]').value = "";
  } else {
    $('input[name="customerStringSearch"]').value = "";
    $('input[name="customerStringId"]').value = "";
    if (newStringFields) newStringFields.classList.add("hidden");
  }
}

function formatDuration(seconds) {
  const total = Number(seconds || 0);
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
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
