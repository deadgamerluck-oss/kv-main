/** Accurate headquarters location and service reach; no hidden city-keyword lists. */
export const headquarters = {
  '@type': 'EducationalOrganization',
  name: 'Kshitij Vivan',
  foundingDate: '2011',
  telephone: '+91-9137440042',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '302 A Wing, Ganesh Plaza, near Navrangpura Bus Stand, C.G. Road',
    addressLocality: 'Ahmedabad',
    addressRegion: 'Gujarat',
    postalCode: '380009',
    addressCountry: 'IN',
  },
  location: { '@type': 'Place', name: 'Ahmedabad headquarters', geo: { '@type': 'GeoCoordinates', latitude: 23.0353704, longitude: 72.5631439 } },
  areaServed: 'Worldwide',
};

export const headquartersMeta = [
  { name: 'geo.region', content: 'IN-GJ' },
  { name: 'geo.placename', content: 'Ahmedabad' },
  { name: 'geo.position', content: '23.0353704;72.5631439' },
  { name: 'ICBM', content: '23.0353704, 72.5631439' },
];