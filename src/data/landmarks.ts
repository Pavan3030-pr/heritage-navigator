export type Landmark = {
  id: string;
  name: string;
  category: string;
  location: string;
  shortDescription: string;
  image: string;
  overview: string;
  significance: string;
  facts: string[];
  timeline: { year: string; event: string }[];
  related: string[];
};

export const landmarks: Landmark[] = [
  {
    id: "victoria-memorial",
    name: "Victoria Memorial",
    category: "Monument",
    location: "Maidan, Kolkata",
    shortDescription: "A majestic marble museum built in memory of Queen Victoria, blending British and Mughal architecture.",
    image: "https://images.unsplash.com/photo-1558431382-27e303142255?w=1200&q=80",
    overview:
      "The Victoria Memorial is a large marble building in Central Kolkata, built between 1906 and 1921. Dedicated to the memory of Queen Victoria, it now serves as a museum and a tourism destination.",
    significance:
      "It stands as one of India's most beautiful Indo-Saracenic structures, symbolising the colonial era and housing a remarkable collection of Raj-era memorabilia.",
    facts: [
      "Built with white Makrana marble, the same used for the Taj Mahal.",
      "Houses over 28,000 artefacts including rare paintings and manuscripts.",
      "The bronze Angel of Victory atop the dome rotates with the wind.",
    ],
    timeline: [
      { year: "1901", event: "Lord Curzon proposes the memorial." },
      { year: "1906", event: "Foundation stone laid by Prince of Wales." },
      { year: "1921", event: "Officially inaugurated." },
      { year: "2001", event: "Centenary celebrations begin." },
    ],
    related: ["st-pauls-cathedral", "town-hall", "fort-william"],
  },
  {
    id: "howrah-bridge",
    name: "Howrah Bridge",
    category: "Bridge",
    location: "Hooghly River, Kolkata",
    shortDescription: "An iconic cantilever bridge over the Hooghly, the lifeline connecting Howrah and Kolkata.",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1200&q=80",
    overview:
      "Commissioned in 1943, Howrah Bridge is a balanced cantilever bridge built without nuts and bolts, instead riveted as a single steel structure.",
    significance:
      "One of the busiest cantilever bridges in the world, it carries over 100,000 vehicles and 150,000 pedestrians daily, embodying Kolkata's industrial spirit.",
    facts: [
      "Built without a single nut or bolt — fully riveted.",
      "Renamed Rabindra Setu in 1965 after Rabindranath Tagore.",
      "Used 26,500 tons of steel, mostly from Tata Steel.",
    ],
    timeline: [
      { year: "1862", event: "First pontoon bridge proposed." },
      { year: "1936", event: "Construction begins." },
      { year: "1943", event: "Bridge opens to traffic." },
      { year: "1965", event: "Renamed Rabindra Setu." },
    ],
    related: ["prinsep-ghat", "fort-william"],
  },
  {
    id: "indian-museum",
    name: "Indian Museum",
    category: "Museum",
    location: "Park Street, Kolkata",
    shortDescription: "The oldest and largest museum in India, holding rare antiques, armour, fossils and Mughal paintings.",
    image: "https://images.unsplash.com/photo-1565060169187-5284a3a47bff?w=1200&q=80",
    overview:
      "Founded in 1814, the Indian Museum is the ninth oldest museum in the world and houses an extensive collection of artefacts spanning natural history, art, and archaeology.",
    significance:
      "A cradle of Indian museology, it preserves over a million objects including the ashes of the Buddha and rare Egyptian mummies.",
    facts: [
      "Founded by the Asiatic Society in 1814.",
      "Spread across 6 sections and 35 galleries.",
      "Holds a 4,000-year-old Egyptian mummy.",
    ],
    timeline: [
      { year: "1784", event: "Asiatic Society founded." },
      { year: "1814", event: "Museum established." },
      { year: "1878", event: "Current building opens." },
      { year: "2014", event: "Bicentenary year celebrations." },
    ],
    related: ["victoria-memorial", "town-hall"],
  },
  {
    id: "marble-palace",
    name: "Marble Palace",
    category: "Heritage Home",
    location: "Muktaram Babu Street",
    shortDescription: "A 19th-century mansion known for its marble walls, classical art and exotic curios.",
    image: "https://images.unsplash.com/photo-1577985043696-8bd54d9f093f?w=1200&q=80",
    overview:
      "Built in 1835 by Raja Rajendra Mullick, Marble Palace is a stunning neoclassical mansion famed for its sprawling marble interiors and rare collection of European sculpture and paintings.",
    significance:
      "A living museum where descendants of the original family still reside, offering a rare glimpse into the opulent life of Bengal's 19th-century zamindars.",
    facts: [
      "Built from 126 varieties of marble.",
      "Houses original works of Rubens and Reynolds.",
      "Hosts India's first private zoo on its grounds.",
    ],
    timeline: [
      { year: "1835", event: "Construction completed." },
      { year: "1854", event: "First private zoo opens." },
      { year: "1984", event: "Declared a heritage building." },
    ],
    related: ["indian-museum", "town-hall"],
  },
  {
    id: "dakshineswar-temple",
    name: "Dakshineswar Temple",
    category: "Temple",
    location: "Dakshineswar, Kolkata",
    shortDescription: "A revered Kali temple on the banks of the Hooghly, associated with Sri Ramakrishna Paramahamsa.",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=1200&q=80",
    overview:
      "Built in 1855 by Rani Rashmoni, this nine-spired temple is dedicated to Goddess Kali and is one of Bengal's most important pilgrimage sites.",
    significance:
      "Sri Ramakrishna Paramahamsa served here as priest, transforming it into a beacon of spiritual revival in 19th-century India.",
    facts: [
      "Built in the traditional Bengali Navaratna style.",
      "Site of Ramakrishna's divine visions.",
      "Connected to Belur Math by river ferry.",
    ],
    timeline: [
      { year: "1847", event: "Rani Rashmoni begins construction." },
      { year: "1855", event: "Temple consecrated." },
      { year: "1886", event: "Ramakrishna attains samadhi." },
    ],
    related: ["belur-math"],
  },
  {
    id: "belur-math",
    name: "Belur Math",
    category: "Temple",
    location: "Belur, Howrah",
    shortDescription: "Headquarters of the Ramakrishna Mission, where Hindu, Christian and Islamic architecture unite.",
    image: "https://images.unsplash.com/photo-1582662175585-3e15a3a64c50?w=1200&q=80",
    overview:
      "Founded by Swami Vivekananda in 1898, Belur Math is the world headquarters of the Ramakrishna Mission and embodies universal harmony.",
    significance:
      "Its main temple symbolises unity of religions, drawing from Hindu, Buddhist, Christian, and Islamic architectural elements.",
    facts: [
      "Spans 40 acres along the Hooghly.",
      "Architecture blends temple, mosque and church motifs.",
      "Hosts thousands of monks and devotees daily.",
    ],
    timeline: [
      { year: "1898", event: "Land acquired by Vivekananda." },
      { year: "1938", event: "Main temple inaugurated." },
    ],
    related: ["dakshineswar-temple"],
  },
  {
    id: "fort-william",
    name: "Fort William",
    category: "Fort",
    location: "Maidan, Kolkata",
    shortDescription: "An 18th-century star-shaped fort that anchored British power in Bengal.",
    image: "https://images.unsplash.com/photo-1599723546389-9c98c5b1bce8?w=1200&q=80",
    overview:
      "Named after King William III, the present fort was completed in 1781 after the original was lost in the Siege of Calcutta. Today it serves as the Eastern Command HQ of the Indian Army.",
    significance:
      "A formidable example of military architecture and the birthplace of modern Kolkata, surrounded by the verdant Maidan.",
    facts: [
      "Designed in an irregular octagonal star shape.",
      "Could shelter 10,000 troops during sieges.",
      "Inspired the founding of New Calcutta.",
    ],
    timeline: [
      { year: "1696", event: "Original fort begun." },
      { year: "1756", event: "Siege of Calcutta." },
      { year: "1781", event: "New fort completed." },
    ],
    related: ["victoria-memorial", "prinsep-ghat"],
  },
  {
    id: "st-pauls-cathedral",
    name: "St. Paul's Cathedral",
    category: "Cathedral",
    location: "Cathedral Road",
    shortDescription: "The first Anglican cathedral in the East, a Gothic Revival landmark of Kolkata.",
    image: "https://images.unsplash.com/photo-1606146485050-7e9c39e26e6f?w=1200&q=80",
    overview:
      "Consecrated in 1847, St. Paul's Cathedral is one of the largest cathedrals in Kolkata and a fine example of Indo-Gothic architecture.",
    significance:
      "It served as the seat of the Bishop of Calcutta and remains a centre of Christian heritage in Eastern India.",
    facts: [
      "Spire rebuilt after the 1934 earthquake.",
      "Stained glass by Sir Edward Burne-Jones.",
      "Houses memorials to British soldiers and missionaries.",
    ],
    timeline: [
      { year: "1839", event: "Foundation stone laid." },
      { year: "1847", event: "Cathedral consecrated." },
      { year: "1934", event: "Damaged by Bihar earthquake." },
    ],
    related: ["victoria-memorial"],
  },
  {
    id: "town-hall",
    name: "Town Hall",
    category: "Civic Heritage",
    location: "Esplanade, Kolkata",
    shortDescription: "A neo-classical Roman Doric building that has hosted Kolkata's civic life since 1813.",
    image: "https://images.unsplash.com/photo-1581352169322-39f59f9bcaab?w=1200&q=80",
    overview:
      "Built in 1813 by Colonel John Garstin, the Town Hall is a stately Roman Doric structure that today hosts the Kolkata Panorama museum.",
    significance:
      "A symbol of civic pride and the cultural conscience of the city, it has witnessed key historical events of the Bengal Renaissance.",
    facts: [
      "Funded through a public lottery.",
      "Restored in 1998 with original Doric columns intact.",
      "Houses the Kolkata Panorama interactive museum.",
    ],
    timeline: [
      { year: "1813", event: "Inaugurated by Lord Minto." },
      { year: "1867", event: "Renovated after structural damage." },
      { year: "1998", event: "Restored as a heritage museum." },
    ],
    related: ["indian-museum", "marble-palace"],
  },
  {
    id: "prinsep-ghat",
    name: "Prinsep Ghat",
    category: "Riverside",
    location: "Hooghly Riverfront",
    shortDescription: "A picturesque Palladian porch on the riverside, glowing under the Vidyasagar Setu.",
    image: "https://images.unsplash.com/photo-1581791534046-6d5cad07a48d?w=1200&q=80",
    overview:
      "Built in 1843 in memory of James Prinsep, the ghat features a Greek and Gothic style Palladian porch, and is a beloved evening retreat for Kolkatans.",
    significance:
      "A serene heritage promenade celebrating Prinsep's contribution to decoding ancient Brahmi and Kharosthi scripts.",
    facts: [
      "Designed by W. Fitzgerald.",
      "Restored in 2001 by the Indian Navy.",
      "Most photographed sunset spot in Kolkata.",
    ],
    timeline: [
      { year: "1841", event: "James Prinsep passes away." },
      { year: "1843", event: "Memorial porch built." },
      { year: "2001", event: "Heritage restoration completed." },
    ],
    related: ["howrah-bridge", "fort-william"],
  },
];

export const categories = ["All", "Monument", "Bridge", "Museum", "Heritage Home", "Temple", "Fort", "Cathedral", "Civic Heritage", "Riverside"];

export const getLandmark = (id: string) => landmarks.find((l) => l.id === id);
