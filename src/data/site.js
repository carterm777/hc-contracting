/* Content constants. Every string that appears in the client brief is used
   verbatim; labels the brief leaves unwritten are written here in its voice. */

export const BIZ = {
  name: 'HC Contracting',
  legal: 'He Creates Contracting',
  city: 'Edmonton',
  region: 'Alberta',
  since: 2010,
  phoneDisplay: '(780) 555-0163',
  tel: 'tel:+17805550163',
  sms: 'sms:+17805550163',
  email: 'contact@hccontracting.com',
  address: 'Edmonton, AB, Canada',
}

export const SERVICE_LINKS = [
  'Residential Wiring',
  'Commercial Electrical',
  'Outdoor & Landscape Lighting',
  'Mobile Electrical Service Calls',
  'Panel Upgrades & Replacements',
  'Breaker & Fuse Repairs',
  'Lighting Installation',
  'Electrical Troubleshooting',
  'Renovation Wiring',
  'Outlet & Switch Repair',
  'Ceiling Fan Installation',
  'Electrical Safety Inspections',
]

export const AREA_LINKS = [
  'Edmonton',
  'Sherwood Park',
  'St. Albert',
  'Spruce Grove',
  'Stony Plain',
  'Leduc',
  'Fort Saskatchewan',
  'Beaumont',
  'Devon',
  'Morinville',
]

/* Relative positions on the coverage diagram, roughly true to the metro's real
   geography with Edmonton at the hub. x/y are percentages of the plot box. */
export const AREA_NODES = [
  { name: 'Edmonton', x: 50, y: 52, hub: true },
  { name: 'St. Albert', x: 36, y: 30 },
  { name: 'Morinville', x: 31, y: 12 },
  { name: 'Fort Saskatchewan', x: 76, y: 25 },
  { name: 'Sherwood Park', x: 71, y: 52 },
  { name: 'Spruce Grove', x: 17, y: 51 },
  { name: 'Stony Plain', x: 8, y: 60 },
  { name: 'Beaumont', x: 60, y: 78 },
  { name: 'Leduc', x: 45, y: 88 },
  { name: 'Devon', x: 24, y: 80 },
]

export const REVIEWS = [
  {
    name: 'Aaron K.',
    initial: 'A',
    focus: 'Outdoor lighting',
    quote:
      'Had an outdoor lighting system installed for a backyard reno. Clean work and it’s held up through two winters so far.',
  },
  {
    name: 'Nicole F.',
    initial: 'N',
    focus: 'Commercial panel',
    quote:
      'Called about a commercial panel issue at our shop. Someone showed up same week and had it sorted fast.',
  },
  {
    name: 'Colin S.',
    initial: 'C',
    focus: 'Straight pricing',
    quote:
      'Straight talk from the first phone call, no runaround about what the job would really cost.',
  },
  {
    name: 'Tanya R.',
    initial: 'T',
    focus: 'Rental property',
    quote:
      'Mobile service call for a rental property. They coordinated directly with our tenant, which saved us a full day off work.',
  },
  {
    name: 'Marcus L.',
    initial: 'M',
    focus: 'Repeat customer',
    quote:
      'Been using them for years now. Every job gets the same no-nonsense attention, big or small.',
  },
]

export const WHY = [
  {
    n: '01',
    icon: 'Wrench',
    title: 'Fixed Fast, Explained Plainly',
    body: 'The problem gets named clearly and the fix gets handled without a runaround, every time.',
  },
  {
    n: '02',
    icon: 'Truck',
    title: 'Real Mobile Service',
    body: 'Service calls come to your home, rental property, or job site, so the work fits your schedule instead of the other way around.',
  },
  {
    n: '03',
    icon: 'Award',
    title: 'Over A Decade In Edmonton',
    body: 'This isn’t a business that started last year. The crew has been doing residential and commercial electrical work in this city since 2010.',
  },
  {
    n: '04',
    icon: 'ShieldCheck',
    title: 'Licensed And Accountable',
    body: 'Every job is covered from the first call to the final test, with a crew that stands behind its own work.',
  },
]

export const SERVICES = [
  {
    title: 'Mobile Electrical Service Calls',
    body: 'On-site service for homes, rental properties, and job sites, coordinated directly with whoever’s on location.',
    img: '/images/vans-morning.webp',
    alt: 'Two white service vans parked on a snowy Alberta street at sunrise while a crew loads equipment.',
    featured: true,
  },
  {
    title: 'Residential Wiring',
    body: 'Full home wiring, panel work, and troubleshooting for houses across Edmonton and the surrounding area.',
    img: '/images/troubleshooting-hero.webp',
    alt: 'Electrician kneeling at a baseboard outlet testing it with a multimeter, flashlight on the floor beside him.',
  },
  {
    title: 'Commercial Electrical',
    body: 'Wiring, maintenance, and repairs for shops, offices, and commercial spaces that need work done without disrupting business.',
    img: '/images/commercial-lift.webp',
    alt: 'Two workers on a scissor lift installing linear ceiling lighting in an open commercial space.',
  },
  {
    title: 'Outdoor & Landscape Lighting',
    body: 'Exterior lighting built to handle Alberta winters, from a single fixture to a full backyard or storefront lighting plan.',
    img: '/images/landscape-lighting.webp',
    alt: 'Large house at night with its facade and surrounding landscape fully lit by exterior fixtures.',
  },
  {
    title: 'Panel Upgrades',
    body: 'Older panels and fuse boxes replaced with equipment sized for how a property draws power today.',
    img: '/images/panel-upgrade-hero.webp',
    alt: 'Gloved hands testing a modern breaker panel with a screwdriver probe, copper busbars visible.',
  },
  {
    title: 'Renovation Wiring',
    body: 'Electrical work for kitchen, basement, and full home renovations, coordinated around the rest of the trades on site.',
    img: '/images/rewire-rough-in.webp',
    alt: 'New electrical device boxes mounted on a bare stud wall with cables dropped, plastic sheeting behind.',
  },
]

export const FAQS = [
  {
    q: 'Do You Come To Rental Properties For Service Calls?',
    a: 'Yes. Mobile service calls are a regular part of the business, and we coordinate directly with tenants or property managers so an owner doesn’t have to be on-site.',
  },
  {
    q: 'How Long Have You Been Working In Edmonton?',
    a: 'Since 2010. Residential and commercial electrical work across the city has been the core of the business the whole time.',
  },
  {
    q: 'Do You Handle Both Residential And Commercial Jobs?',
    a: 'Yes, along with outdoor and landscape lighting and mobile service calls. Most weeks include a mix of all four.',
  },
  {
    q: 'Are You Licensed And Insured?',
    a: 'Yes. Every job is handled by licensed, insured electricians, so you’re covered from the first call to the final test.',
  },
  {
    q: 'Do You Offer Free Estimates?',
    a: 'Yes. We’ll look at the job and give you a straightforward number before any work begins.',
  },
  {
    q: 'What Kind Of Outdoor Lighting Work Do You Do?',
    a: 'Everything from a single exterior fixture to a full landscape or storefront lighting plan, built to hold up through Alberta winters.',
  },
]

export const REASSURANCE = 'No cost, no obligation, and we never share your information.'
