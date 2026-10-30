/* Sobha Sanctuary — unit layouts, from the official Sobha Realty brochures.
   The Woods Abode: Building B, levels 04–12 (areas in sq.ft.).
   The Greens and The Grove: villa plans; areas only where the brochure states them.
   Images live in assets/floorplans/<id>.jpg, <id>-blur.jpg and, for The Woods, <id>-key.jpg. */
(function () {
  function w(id, beds, type, features, suite, balcony, total, views) {
    return { id: id, group: 'woods-' + beds, project: 'The Woods', beds: beds, type: type, features: features, key: true,
      areas: [['Suite', suite], ['Balcony', balcony], ['Total Saleable', total]], total: total, views: views };
  }
  function units(prefix, floors, stacks) {
    var out = [];
    floors.forEach(function (f) { stacks.forEach(function (s) { out.push(prefix + f + s); }); });
    return out;
  }
  var LOW = [4, 5, 6], HIGH = [7, 8, 9, 10, 11, 12], ALL = LOW.concat(HIGH);
  function lowHigh(lowView, highView, stacks) {
    return [{ view: lowView, units: units('B', LOW, stacks) }, { view: highView, units: units('B', HIGH, stacks) }];
  }

  window.SS_UNITS = [
    w('woods-1br-a', 1, 'Type A', 'Open living with kitchen / dining, bedroom, bathroom, utility and balcony', '494.17', '52.20', '546.38', lowHigh('Amenities, Community', 'Community', ['03'])),
    w('woods-1br-a-v1', 1, 'Type A · Variant 1', 'Open living with kitchen / dining, bedroom, bathroom, utility and balcony', '494.28', '52.20', '546.48', lowHigh('Amenities, Community', 'Community', ['18'])),
    w('woods-1br-a-v2', 1, 'Type A · Variant 2', 'Open living with kitchen / dining, bedroom, bathroom, utility and balcony', '490.94', '48.76', '539.70', lowHigh('Amenities, Community', 'Community', ['04'])),
    w('woods-1br-a-v3', 1, 'Type A · Variant 3', 'Open living with kitchen / dining, bedroom, bathroom, utility and balcony', '490.94', '48.76', '539.70', lowHigh('Amenities, Community', 'Community', ['17'])),
    w('woods-1br-a-v4', 1, 'Type A · Variant 4', 'Open living with kitchen / dining, bedroom, bathroom, utility and balcony', '490.30 - 493.31', '49.51', '539.81 - 542.82', lowHigh('Amenities, Community', 'Community', ['06', '08'])),
    w('woods-1br-a-v5', 1, 'Type A · Variant 5', 'Open living with kitchen / dining, bedroom, bathroom, utility and balcony', '490.30 - 490.40', '49.51', '539.81 - 539.92', lowHigh('Amenities, Community', 'Community', ['13', '15'])),
    w('woods-1br-b', 1, 'Type B', 'Two balconies and park views', '492.34 - 492.77', '97.74 - 98.38', '590.51 - 590.72', lowHigh('Amenities, Community, Park', 'Community, Park', ['09'])),
    w('woods-2br-a', 2, 'Type A', 'Two bathrooms, separate kitchen and dining, utility and a long balcony', '863.48 - 868.00', '95.69 - 100.21', '963.69', lowHigh('Amenities, Community, Park, Villa Community', 'Community, Park, Villa Community', ['01'])),
    w('woods-2br-a-v1', 2, 'Type A · Variant 1', 'Two bathrooms, separate kitchen and dining, utility and a long balcony', '865.20 - 868.00', '95.69 - 98.38', '963.59 - 963.69', lowHigh('Amenities, Community, Park, Villa Community', 'Community, Park, Villa Community', ['02'])),
    w('woods-2br-a-v2', 2, 'Type A · Variant 2', 'Two bathrooms, separate kitchen and dining, utility and a long balcony', '865.31', '95.69', '961.00', [{ view: 'Community, Park', units: units('B', ALL, ['10']) }]),
    w('woods-2br-a-v3', 2, 'Type A · Variant 3', 'Two bathrooms, separate kitchen and dining, utility and a long balcony', '864.99', '95.69', '960.68', [{ view: 'Community, Park', units: units('B', ALL, ['11']) }]),
    w('woods-2br-b-v2', 2, 'Type B · Variant 2', 'Two bathrooms, kitchen with separate dining, utility and balcony', '803.10 - 803.20', '60.39 - 60.49', '863.48 - 863.70', lowHigh('Amenities, Community', 'Community', ['05', '07'])),
    w('woods-2br-b-v3', 2, 'Type B · Variant 3', 'Two bathrooms, kitchen with separate dining, utility and balcony', '803.10 - 803.20', '60.39 - 60.49', '863.59 - 863.70', lowHigh('Amenities, Community', 'Community', ['14', '16'])),
    w('woods-2br-d', 2, 'Type D', 'Two bathrooms, kitchen with separate dining, utility and balcony', '775.11 - 775.54', '51.02 - 51.56', '826.56 - 826.67', lowHigh('Amenities, Community, Park', 'Community, Park', ['12'])),

    { id: 'greens-4br-a', group: 'greens-4', project: 'The Greens', beds: 4, type: 'Garden Villa · Type A', features: 'Ground-floor bedroom, 2-car garage, open living and dining, master suite with walk-in closet and balcony, roof access' },
    { id: 'greens-4br-b', group: 'greens-4', project: 'The Greens', beds: 4, type: 'Garden Villa · Type B', features: 'Ground-floor bedroom, 2-car garage, open living and dining, master suite with walk-in closet and balcony, roof access' },
    { id: 'greens-4br-b-v1', group: 'greens-4', project: 'The Greens', beds: 4, type: 'Garden Villa · Type B Variant 1', features: 'Ground-floor bedroom, 2-car garage, open living and dining, master suite with walk-in closet and balcony, roof access' },
    { id: 'greens-4br-c', group: 'greens-4', project: 'The Greens', beds: 4, type: 'Garden Villa · Type C', features: 'Ground-floor bedroom, 2-car garage, open living and dining, master suite with walk-in closet and balcony, roof access' },
    { id: 'greens-4br-d', group: 'greens-4', project: 'The Greens', beds: 4, type: 'Garden Villa · Type D', features: 'Ground-floor bedroom, 2-car garage, open living and dining, master suite with walk-in closet and balcony, roof access' },
    { id: 'greens-4br-d-v1', group: 'greens-4', project: 'The Greens', beds: 4, type: 'Garden Villa · Type D Variant 1', features: 'Ground-floor bedroom, 2-car garage, open living and dining, master suite with walk-in closet and balcony, roof access' },
    { id: 'greens-5br-a', group: 'greens-5', project: 'The Greens', beds: 5, type: 'Courtyard Villa · Type A', features: 'Private lift, garden, terraces and 2-car garage' },
    { id: 'greens-5br-a-v1', group: 'greens-5', project: 'The Greens', beds: 5, type: 'Courtyard Villa · Type A Variant 1', features: 'Private lift, garden, terraces and 2-car garage' },

    { id: 'grove-4br-a', group: 'grove-4', project: 'The Grove', beds: 4, type: 'Estate Villa · with Study', features: 'Private pool, guest bedroom and maid’s room on the ground floor, study, family lounge and master suite with walk-in closet' },
    { id: 'grove-4br-b', group: 'grove-4', project: 'The Grove', beds: 4, type: 'Estate Villa · Type B', features: 'Private pool, guest bedroom and maid’s room on the ground floor, family lounge, master suite with walk-in closet and balconies',
      areas: [['Plot', '4,938.59 - 5,658.05'], ['Saleable Area', '5,002.31']], total: '5,002.31' },
    { id: 'grove-4br-c', group: 'grove-4', project: 'The Grove', beds: 4, type: 'Estate Villa · Type C', features: 'Private pool, guest bedroom and maid’s room on the ground floor, open terrace, master suite with walk-in closet',
      areas: [['Plot', '4,955.17 - 6,092.37'], ['Saleable Area', '4,980.25']], total: '4,980.25' },
    { id: 'grove-5br-b', group: 'grove-5', project: 'The Grove', beds: 5, type: 'Estate Villa · Type B', features: 'Private pool, guest bedroom and maid’s room on the ground floor, bar, open terraces and master suite with walk-in closet',
      areas: [['Plot', '5,812.51'], ['Saleable Area', '5,813.80']], total: '5,813.80' }
  ];
})();
