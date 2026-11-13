/* Sobha News & Offers — newest first.
   Each item: date (YYYY-MM-DD), tag (Offer · Launch · Price Update · Event · Update), project,
   title, body (paragraphs), optional terms, image (path inside /news/; add fit: 'contain' to show a floor plan whole), optional video (mp4; image is its poster), link {label, href} or links [..],
   and ends (ISO time, Dubai): the item disappears automatically after it (add noCountdown: true to hide the timer). For an event, add
   countdownTo (its start), countdownLabel ("Starts in") and liveLabel ("Happening now"). */
window.ESPOUSAL_NEWS = [
  {
    date: '2026-11-13',
    tag: 'Offer',
    project: 'Sobha Central',
    title: 'A greener way to live. A greater way to own. — 30/70 and a 100% DLD waiver at Sobha Central',
    body: [
      'From 12 to 19 November 2026, Sobha Realty is offering a 30/70 payment plan at Sobha Central on Sheikh Zayed Road: 30% during construction and 70% upon completion.',
      'On top of that, the 4% Dubai Land Department (DLD) registration fee is waived 100%. On a 1 bedroom home starting from AED 1.78 Million, that is a saving of about AED 71,000 (≈ ₹16 Lakh*). Units are limited — speak to our team to reserve yours within the window.'
    ],
    terms: [
      'Apartment units are included in this offer. Retail units are not part of this offer.',
      'Unit must be booked / PR approved with a 2% booking amount within the offer period.',
      'Not applicable on cancel & swap / downgrade / re-book / upgrade cases of a previous period.',
      'Sobha Realty reserves the right to modify the offer at any time. T&C apply.',
      '*Indian rupee figure is approximate — please check the current exchange rate.'
    ],
    image: 'img/2026-11-13-sobha-central-30-70-dld.jpg',
    links: [{ label: 'View Sobha Central', href: '/sobhacentral/#payment-plan' }],
    ends: '2026-11-19T23:59:59+04:00'
  },
  {
    date: '2026-11-10',
    tag: 'Offer',
    project: 'Sobha Central',
    title: 'A prime address. A standout way to own — 20/80 at Sobha Central',
    body: [
      'For four days only, from 10 to 13 November 2026, Sobha Realty is offering a 20/80 payment plan at Sobha Central on Sheikh Zayed Road: 20% on booking and the remaining 80% upon completion.',
      'One bedroom residences start from AED 1.78 Million. The offer runs at the Events Hall, Sobha Sales Office — speak to our team to reserve your unit within the window.'
    ],
    terms: [
      'Unit must be booked / PR approved with a 2% booking amount within the offer period.',
      'Retail units are part of this offer.',
      'Not applicable on cancel & swap / re-book / upgrade cases of a previous period.',
      'Sobha Realty reserves the right to modify the offer at any time. T&C apply.'
    ],
    image: 'img/2026-11-10-sobha-central-20-80.jpg',
    links: [{ label: 'View Sobha Central', href: '/sobhacentral/#payment-plan' }],
    ends: '2026-11-13T23:59:59+04:00'
  },
  {
    date: '2026-11-10',
    tag: 'Offer',
    project: 'Sobha Sanctuary · Villas',
    title: 'A greener way of living — 20/80 on Sobha Sanctuary villas',
    body: [
      'From 10 to 13 November 2026, Sobha Realty is offering a 20/80 payment plan — 20% on booking, 80% upon completion — on the Estate Villas, Garden Villas and Courtyard Villas at Sobha Sanctuary.',
      'The offer runs at the Events Hall, Sobha Sales Office. Units are limited; ask our team which villas are available.'
    ],
    terms: [
      'Unit must be booked / PR approved with a 2% booking amount within the offer period.',
      'Offer not applicable on Sobha Sanctuary Apartments.',
      'Not applicable on cancel & swap / re-book / upgrade cases of a previous period.',
      'Sobha Realty reserves the right to modify the offer at any time. T&C apply.'
    ],
    image: 'img/2026-11-10-sobha-sanctuary-villas-20-80.jpg',
    links: [{ label: 'View Sanctuary Villas', href: '/sobha-sanctuary/#projects' }],
    ends: '2026-11-13T23:59:59+04:00'
  },
  {
    date: '2026-11-10',
    tag: 'Update',
    project: 'Sobha Realty · 2 Bedroom',
    title: 'Coming soon: a high-floor 2 bedroom facing the lagoons and the skyline — around AED 2.4 Million',
    body: [
      'A Sobha Realty 2 bedroom apartment is coming up for sale soon at around AED 2.4 Million (≈ ₹5.5 Cr*), with handover in December 2027.',
      'Type C, Variant 1: about 911 sq.ft. in total (791 sq.ft. suite + 119 sq.ft. balcony). Two bedrooms, two bathrooms, a separate kitchen, an open living and dining room and two balconies. It sits on the high levels (49, 55, 59 and 69) and looks over the lagoons and the community, towards the Downtown and Dubai skylines.',
      'Buy a home of AED 2 million or more and our team takes care of your 10-year UAE Golden Visa application (final approval is issued by the UAE authorities).',
      'Units like this go quickly. Register your interest now and we will share the details the moment it is released.'
    ],
    terms: [
      'As announced to Sobha Realty channel partners; price is indicative and subject to availability and change without notice.',
      'Sizes are as per the developer floor plan and are approximate.',
      '*Indian rupee figure is approximate — please check the current exchange rate.'
    ],
    image: 'img/2026-11-10-sobha-2br-lagoon-skyline.jpg',
    fit: 'contain',
    links: [{ label: 'Register Your Interest', href: '#talk' }],
    ends: '2026-12-01T23:59:59+04:00',
    noCountdown: true
  },
  {
    date: '2026-11-08',
    tag: 'Update',
    project: 'Espousal',
    title: 'Happy Diwali from Team Espousal',
    body: [
      'Wishing you and your family a very Happy Diwali. May the festival of lights fill your home with joy, good health and prosperity — and bring bright new beginnings in the year ahead.',
      'Thank you for your trust. If a new home in Dubai is part of your plans for the year ahead, our team is here to help whenever you are ready.'
    ],
    links: [{ label: 'Explore Sobha Projects', href: '/#projects' }],
    ends: '2026-11-08T23:59:59+05:30',
    noCountdown: true
  },
  {
    date: '2026-11-05',
    tag: 'Update',
    project: 'Sobha Realty · Luxury villa',
    title: 'For sale: a signature Sobha villa — AED 25 Million',
    body: [
      'A newly shared Sobha Realty villa is available for sale at AED 25 Million (≈ ₹57 Cr*).',
      'Take the video tour: a striking three-level modern façade, a double-height living room with designer lighting, a private swimming pool, a fully fitted kitchen with island, a study, a large master suite with a stone-clad bathroom and a rooftop terrace with city views.',
      'Buy a home of AED 2 million or more and our team takes care of your 10-year UAE Golden Visa application (final approval is issued by the UAE authorities).',
      'For the floor plan, size, location and a private viewing, speak to our team.'
    ],
    terms: [
      'As announced to Sobha Realty channel partners; subject to availability and change without notice.',
      '*Indian rupee figure is approximate — please check the current exchange rate.'
    ],
    video: 'video/2026-11-05-sobha-villa-25m.mp4',
    image: 'img/2026-11-05-sobha-villa-25m.jpg',
    links: [{ label: 'Request a Private Viewing', href: '#talk' }],
    ends: '2026-11-26T23:59:59+04:00',
    noCountdown: true
  },
  {
    date: '2026-11-05',
    tag: 'Price Update',
    project: 'Sobha Realty · Available now',
    title: 'Selected Sobha homes available now — 1 to 4 bedrooms from AED 1.59 Million',
    body: [
      'A fresh list of available Sobha Realty homes has just come in — from one bedroom apartments to a four bedroom residence at Sobha One:',
      '1 BR from AED 1.59M (≈ ₹3.6 Cr*) · 1.5 BR AED 1.81M · 2 BR from AED 2.37M (≈ ₹5.4 Cr*) · 2.5 BR AED 3.59M · 3 BR AED 4.47M · 4 BR at Sobha One AED 5.05M — the best value per sq.ft. on the list.',
      'Buy a home of AED 2 million or more and our team takes care of your 10-year UAE Golden Visa application (final approval is issued by the UAE authorities).',
      'Units are limited. Ask our team for the full list with unit numbers, sizes, floor plans and the payment schedule.'
    ],
    terms: [
      'Prices as per the latest availability list; subject to availability and change without notice.',
      '*Indian rupee figures are approximate — please check the current exchange rate.'
    ],
    links: [{ label: 'Get the Full Unit List', href: '#talk' }],
    ends: '2026-11-19T23:59:59+04:00',
    noCountdown: true
  },
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
