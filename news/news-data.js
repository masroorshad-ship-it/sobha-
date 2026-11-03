/* Sobha News & Offers — newest first.
   Each item: date (YYYY-MM-DD), tag (Offer · Launch · Price Update · Event · Update), project,
   title, body (paragraphs), optional terms, image (path inside /news/), link {label, href} or links [..],
   and ends (ISO time, Dubai): the item disappears automatically after it. For an event, add
   countdownTo (its start), countdownLabel ("Starts in") and liveLabel ("Happening now"). */
window.ESPOUSAL_NEWS = [
  {
    date: '2026-11-03',
    tag: 'Event',
    project: 'Sobha Realty',
    title: 'An evening of traditional live music at the Sobha Sales Gallery',
    body: [
      'Let the celebrations begin on a harmonious note. Sobha Realty welcomes guests to an enchanting evening of soulful melodies and timeless Indian musical traditions, setting the tone for a beautiful season of festivities.',
      'Tuesday, 3 November 2026 · 6:00 – 7:00 PM (Dubai time) · Sobha Sales Gallery, Dubai.',
      'In Dubai this evening? Join us for music and celebration — and a private walkthrough of Sobha Central and Sobha Sanctuary with our team.'
    ],
    image: 'img/2026-11-03-sobha-live-music-evening.jpg',
    links: [{ label: 'Plan a Visit With Us', href: '#talk' }],
    countdownTo: '2026-11-03T18:00:00+04:00',
    countdownLabel: 'Starts in',
    liveLabel: 'Happening now — until 7:00 PM',
    ends: '2026-11-03T19:00:00+04:00'
  },
  {
    date: '2026-10-31',
    tag: 'Offer',
    project: 'Selected Sobha projects',
    title: 'An exclusive window: 100% DLD waiver + 30/70 payment plan',
    body: [
      'From 30 October to 1 November 2026, Sobha Realty is offering a 100% DLD (registration) fee waiver together with a 30/70 payment plan — 30% during construction and 70% on completion — on selected projects:',
      'Courtyard, Garden & Estate Villas at Sobha Sanctuary · Sobha Central · Sobha SeaHaven · Sobha Skyscape · Sobha Skyvue · Sobha Elwood · Sobha Siniya Island Villas.',
      'At Sobha Central, The Greens villas at Sobha Sanctuary, Skyscape and Skyvue, the 30% can be paid as 20% now and 10% after 15 months — nothing in between.',
      'The offer runs at the Events Hall, Sobha Sales Office, until Sunday 1 November. Units are limited; speak to our team to check eligible units.'
    ],
    terms: [
      'The unit must be booked / PR approved with a 2% booking amount within the offer period.',
      'Not applicable on Sobha Sanctuary Apartments or Sobha Siniya Island Apartments.',
      'Retail units are not part of this offer.',
      'Not applicable on cancel & swap / re-book / upgrade cases of a previous period.',
      'Sobha Realty reserves the right to modify the offer at any time.'
    ],
    links: [
      { label: 'Sobha Central', href: '/sobhacentral/#payment-plan' },
      { label: 'Sobha Sanctuary Villas', href: '/sobha-sanctuary/#projects' }
    ],
    ends: '2026-11-01T23:59:59+04:00'
  },
  {
    date: '2026-10-30',
    tag: 'Offer',
    project: 'Sobha Central',
    title: '100% DLD waiver + 30/70 payment plan at Sobha Central',
    body: [
      'For three days only, from 30 October to 1 November 2026, Sobha Realty is offering a 100% DLD fee waiver together with a 30/70 payment plan — 30% during construction and 70% on completion — at Sobha Central on Sheikh Zayed Road.',
      'The offer runs at the Events Hall, Sobha Sales Office. One bedroom residences start from AED 1.78 Million.'
    ],
    terms: [
      'Retail units are not part of this offer.',
      'The unit must be booked / PR approved with a 2% booking amount within the offer period.',
      'Not applicable on cancel & swap / re-book / upgrade cases of a previous period.',
      'Sobha Realty reserves the right to modify the offer at any time.'
    ],
    image: 'img/2026-10-30-sobha-central-offer.jpg',
    link: { label: 'View Sobha Central', href: '/sobhacentral/#payment-plan' },
    ends: '2026-11-01T23:59:59+04:00'
  }
];
