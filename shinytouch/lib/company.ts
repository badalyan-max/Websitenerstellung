/**
 * ShinyTouch Gebäudereinigung - Company Data
 * Zentrale Firmendaten für Schema-Markup und Content
 */

export const COMPANY_DATA = {
  name: 'ShinyTouch Gebäudereinigung e.K.',
  shortName: 'ShinyTouch',
  legalForm: 'e.K.',

  url: 'https://www.shinytouchgebaeudereinigung.de',

  address: {
    street: 'Paul-Keller-Ring 41',
    city: 'Bamberg',
    zip: '96052',
    country: 'DE',
    region: 'Bayern',
  },

  contact: {
    phone: '+49 951 97433700',
    phoneDisplay: '0951 97433700',
    email: 'info@shinytouchgebaeudereinigung.de',
  },

  geo: {
    lat: 49.9119993,
    lng: 10.9134918,
  },

  hours: {
    weekdays: '08:00-18:00',
    saturday: '08:00-16:00',
    sunday: 'Geschlossen',
    display: {
      weekdays: 'Mo-Fr: 08:00-18:00',
      saturday: 'Sa: 08:00-16:00',
      sunday: 'So: Geschlossen',
    },
  },

  social: {
    provenExpert: 'https://www.provenexpert.com/de-de/shinytouch-gebaeudereinigung-bamberg/',
    linkedin: 'https://de.linkedin.com/company/shinytouch-gebaeudereinigung-e-k',
    google: 'https://www.google.de/maps/place/ShinyTouch+Geb%C3%A4udereinigung/@49.9119993,10.9134918,21',
  },

  rating: {
    value: 5.0,
    count: 8,
    source: 'ProvenExpert',
  },

  // USPs für Marketing
  usps: [
    '30-Tage-Zufriedenheitsgarantie',
    'Deutschlandweiter Service',
    'Feste Ansprechpartner',
    'Modernste Reinigungstechnik',
    'Regelmäßige Qualitätskontrollen',
  ],

  // Zertifizierungen/Auszeichnungen
  certifications: [
    'Eingetragener Kaufmann (e.K.)',
  ],
}

export type CompanyData = typeof COMPANY_DATA
