// Raw data for all countries
// Regions: 'Nordic', 'Europe', 'North America', 'South America', 'Africa', 'Asia', 'Oceania'

const rawCountries = [
    // --- Nordic (Difficulty 1) ---
    { name: 'Sverige', capital: 'Stockholm', region: 'Nordic', fact: 'Sverige har en befolkning på över 10 miljoner.', iso: 'SE' },
    { name: 'Norge', capital: 'Oslo', region: 'Nordic', fact: 'Norge är inte med i EU.', iso: 'NO' },
    { name: 'Finland', capital: 'Helsingfors', region: 'Nordic', fact: 'Finland har två officiella språk: finska och svenska.', iso: 'FI' },
    { name: 'Danmark', capital: 'Köpenhamn', region: 'Nordic', fact: 'Danmark är det minsta landet i Norden (exklusive självstyrande områden).', iso: 'DK' },
    { name: 'Island', capital: 'Reykjavik', region: 'Nordic', fact: 'Island har inga tåg.', iso: 'IS' },

    // --- Europe (Difficulty 2) ---
    { name: 'Albanien', capital: 'Tirana', region: 'Europe', fact: 'Albanien ligger vid Adriatiska havet.', iso: 'AL' },
    { name: 'Andorra', capital: 'Andorra la Vella', region: 'Europe', fact: 'Andorra ligger i Pyrenéerna mellan Spanien och Frankrike.', iso: 'AD' },
    { name: 'Belgien', capital: 'Bryssel', region: 'Europe', fact: 'Bryssel är säte för EU-kommissionen.', iso: 'BE' },
    { name: 'Bosnien och Hercegovina', capital: 'Sarajevo', region: 'Europe', fact: 'Sarajevo var värd för vinter-OS 1984.', iso: 'BA' },
    { name: 'Bulgarien', capital: 'Sofia', region: 'Europe', fact: 'Bulgarien är känt för sin rosenolja.', iso: 'BG' },
    { name: 'Cypern', capital: 'Nicosia', region: 'Europe', fact: 'Cypern är en ö i östra Medelhavet.', iso: 'CY' },
    { name: 'Estland', capital: 'Tallinn', region: 'Europe', fact: 'Tallinns gamla stad är ett världsarv.', iso: 'EE' },
    { name: 'Frankrike', capital: 'Paris', region: 'Europe', fact: 'Frankrike är världens mest besökta land av turister.', iso: 'FR' },
    { name: 'Grekland', capital: 'Aten', region: 'Europe', fact: 'Aten anses vara demokratins vagga.', iso: 'GR' },
    { name: 'Irland', capital: 'Dublin', region: 'Europe', fact: 'Irland kallas ofta för "Den gröna ön".', iso: 'IE' },
    { name: 'Italien', capital: 'Rom', region: 'Europe', fact: 'Rom har varit huvudstad i både Romarriket och dagens Italien.', iso: 'IT' },
    { name: 'Kroatien', capital: 'Zagreb', region: 'Europe', fact: 'Kroatien har en lång kust mot Adriatiska havet.', iso: 'HR' },
    { name: 'Lettland', capital: 'Riga', region: 'Europe', fact: 'Riga är den största staden i Baltikum.', iso: 'LV' },
    { name: 'Liechtenstein', capital: 'Vaduz', region: 'Europe', fact: 'Liechtenstein är ett av världens minsta länder.', iso: 'LI' },
    { name: 'Litauen', capital: 'Vilnius', region: 'Europe', fact: 'Litauen var det första landet som bröt sig loss från Sovjetunionen.', iso: 'LT' },
    { name: 'Luxemburg', capital: 'Luxemburg', region: 'Europe', fact: 'Luxemburg är det enda storhertigdömet i världen.', iso: 'LU' },
    { name: 'Malta', capital: 'Valletta', region: 'Europe', fact: 'Malta ligger mitt i Medelhavet.', iso: 'MT' },
    { name: 'Moldavien', capital: 'Chisinau', region: 'Europe', fact: 'Moldavien är känt för sina vingårdar.', iso: 'MD' },
    { name: 'Monaco', capital: 'Monaco', region: 'Europe', fact: 'Monaco är världens näst minsta land.', iso: 'MC' },
    { name: 'Montenegro', capital: 'Podgorica', region: 'Europe', fact: 'Namnet betyder "Svarta berget".', iso: 'ME' },
    { name: 'Nederländerna', capital: 'Amsterdam', region: 'Europe', fact: 'Nederländerna är känt för sina kanaler och tulpaner.', iso: 'NL' },
    { name: 'Nordmakedonien', capital: 'Skopje', region: 'Europe', fact: 'Landet bytte namn från Makedonien 2019.', iso: 'MK' },
    { name: 'Polen', capital: 'Warszawa', region: 'Europe', fact: 'Warszawa återuppbyggdes nästan helt efter andra världskriget.', iso: 'PL' },
    { name: 'Portugal', capital: 'Lissabon', region: 'Europe', fact: 'Lissabon är en av Europas äldsta städer.', iso: 'PT' },
    { name: 'Rumänien', capital: 'Bukarest', region: 'Europe', fact: 'Parlamentspalatset i Bukarest är en av världens största byggnader.', iso: 'RO' },
    { name: 'Ryssland', capital: 'Moskva', region: 'Europe', fact: 'Ryssland är världens till ytan största land.', iso: 'RU' },
    { name: 'San Marino', capital: 'San Marino', region: 'Europe', fact: 'San Marino är världens äldsta republik.', iso: 'SM' },
    { name: 'Schweiz', capital: 'Bern', region: 'Europe', fact: 'Schweiz är känt för sin neutralitet.', iso: 'CH' },
    { name: 'Serbien', capital: 'Belgrad', region: 'Europe', fact: 'Belgrad ligger där floderna Sava och Donau möts.', iso: 'RS' },
    { name: 'Slovakien', capital: 'Bratislava', region: 'Europe', fact: 'Bratislava är den enda huvudstaden som gränsar till två andra länder.', iso: 'SK' },
    { name: 'Slovenien', capital: 'Ljubljana', region: 'Europe', fact: 'Slovenien är känt för sina grottor och berg.', iso: 'SI' },
    { name: 'Spanien', capital: 'Madrid', region: 'Europe', fact: 'Spanien har världens näst flest världsarv.', iso: 'ES' },
    { name: 'Storbritannien', capital: 'London', region: 'Europe', fact: 'London har världens äldsta tunnelbana.', iso: 'GB' },
    { name: 'Tjeckien', capital: 'Prag', region: 'Europe', fact: 'Prag kallas "De hundra spirornas stad".' },
    { name: 'Tyskland', capital: 'Berlin', region: 'Europe', fact: 'Berlin är nio gånger större än Paris till ytan.', iso: 'DE' },
    { name: 'Ukraina', capital: 'Kiev', region: 'Europe', fact: 'Ukraina är Europas till ytan näst största land.', iso: 'UA' },
    { name: 'Ungern', capital: 'Budapest', region: 'Europe', fact: 'Budapest består av de två städerna Buda och Pest.', iso: 'HU' },
    { name: 'Vatikanstaten', capital: 'Vatikanstaten', region: 'Europe', fact: 'Vatikanstaten är världens minsta land.', iso: 'VA' },
    { name: 'Vitryssland', capital: 'Minsk', region: 'Europe', fact: 'Vitryssland kallas ibland Belarus.', iso: 'BY' },
    { name: 'Österrike', capital: 'Wien', region: 'Europe', fact: 'Wien är känt för sin klassiska musik och sina kaféer.', iso: 'AT' },

    // --- North America (Difficulty 2) ---
    { name: 'USA', capital: 'Washington D.C.', region: 'North America', fact: 'USA består av 50 delstater.', iso: 'US' },
    { name: 'Kanada', capital: 'Ottawa', region: 'North America', fact: 'Kanada har världens längsta kustlinje.', iso: 'CA' },
    { name: 'Mexiko', capital: 'Mexico City', region: 'North America', fact: 'Mexico City är byggd på en gammal sjöbotten.', iso: 'MX' },
    { name: 'Kuba', capital: 'Havanna', region: 'North America', fact: 'Kuba är den största ön i Karibien.', iso: 'CU' },
    { name: 'Jamaica', capital: 'Kingston', region: 'North America', fact: 'Jamaica är känt för reggaemusik.', iso: 'JM' },
    { name: 'Costa Rica', capital: 'San José', region: 'North America', fact: 'Costa Rica har ingen armé.', iso: 'CR' },
    { name: 'Panama', capital: 'Panama City', region: 'North America', fact: 'Panamakanalen förbinder Atlanten och Stilla havet.', iso: 'PA' },

    // --- South America (Difficulty 3) ---
    { name: 'Argentina', capital: 'Buenos Aires', region: 'South America', fact: 'Argentina är känt för tango och biffkött.', iso: 'AR' },
    { name: 'Bolivia', capital: 'Sucre', region: 'South America', fact: 'Bolivia har två huvudstäder: Sucre och La Paz.', iso: 'BO' },
    { name: 'Brasilien', capital: 'Brasília', region: 'South America', fact: 'Amazonas regnskog ligger till stor del i Brasilien.', iso: 'BR' },
    { name: 'Chile', capital: 'Santiago', region: 'South America', fact: 'Chile är världens längsta land sett till formen.', iso: 'CL' },
    { name: 'Colombia', capital: 'Bogotá', region: 'South America', fact: 'Colombia är känt för sitt kaffe.', iso: 'CO' },
    { name: 'Ecuador', capital: 'Quito', region: 'South America', fact: 'Ecuador är uppkallat efter ekvatorn.', iso: 'EC' },
    { name: 'Peru', capital: 'Lima', region: 'South America', fact: 'Machu Picchu ligger i Peru.', iso: 'PE' },
    { name: 'Uruguay', capital: 'Montevideo', region: 'South America', fact: 'Uruguay var värd för det första fotbolls-VM:et 1930.', iso: 'UY' },
    { name: 'Venezuela', capital: 'Caracas', region: 'South America', fact: 'Venezuela har världens största oljereserver.', iso: 'VE' },

    // --- Asia (Difficulty 3) ---
    { name: 'Afghanistan', capital: 'Kabul', region: 'Asia', fact: 'Afghanistan är ett bergigt land i Centralasien.', iso: 'AF' },
    { name: 'Bangladesh', capital: 'Dhaka', region: 'Asia', fact: 'Bangladesh är ett av världens mest tättbefolkade länder.', iso: 'BD' },
    { name: 'Kina', capital: 'Peking', region: 'Asia', fact: 'Kina är världens folkrikaste land (eller strax efter Indien).', iso: 'CN' },
    { name: 'Indien', capital: 'New Delhi', region: 'Asia', fact: 'Taj Mahal ligger i Indien.', iso: 'IN' },
    { name: 'Indonesien', capital: 'Jakarta', region: 'Asia', fact: 'Indonesien består av över 17 000 öar.', iso: 'ID' },
    { name: 'Iran', capital: 'Teheran', region: 'Asia', fact: 'Iran kallades tidigare för Persien.', iso: 'IR' },
    { name: 'Irak', capital: 'Bagdad', region: 'Asia', fact: 'Bagdad var en gång världens största stad.', iso: 'IQ' },
    { name: 'Israel', capital: 'Jerusalem', region: 'Asia', fact: 'Döda havet ligger mellan Israel och Jordanien.', iso: 'IL' },
    { name: 'Japan', capital: 'Tokyo', region: 'Asia', fact: 'Japan består av fyra huvudöar.', iso: 'JP' },
    { name: 'Sydkorea', capital: 'Seoul', region: 'Asia', fact: 'Sydkorea är känt för K-pop och teknik.', iso: 'KR' },
    { name: 'Nordkorea', capital: 'Pyongyang', region: 'Asia', fact: 'Nordkorea är ett av världens mest slutna länder.', iso: 'KP' },
    { name: 'Malaysia', capital: 'Kuala Lumpur', region: 'Asia', fact: 'Petronas Towers i Kuala Lumpur var en gång världens högsta byggnader.', iso: 'MY' },
    { name: 'Mongoliet', capital: 'Ulan Bator', region: 'Asia', fact: 'Mongoliet är världens mest glesbefolkade land.', iso: 'MN' },
    { name: 'Nepal', capital: 'Katmandu', region: 'Asia', fact: 'Mount Everest ligger på gränsen mellan Nepal och Kina.', iso: 'NP' },
    { name: 'Pakistan', capital: 'Islamabad', region: 'Asia', fact: 'Pakistan har världens näst högsta berg, K2.', iso: 'PK' },
    { name: 'Filippinerna', capital: 'Manila', region: 'Asia', fact: 'Filippinerna består av över 7 000 öar.', iso: 'PH' },
    { name: 'Saudiarabien', capital: 'Riyadh', region: 'Asia', fact: 'Mecka ligger i Saudiarabien.', iso: 'SA' },
    { name: 'Singapore', capital: 'Singapore', region: 'Asia', fact: 'Singapore är både ett land och en stad.', iso: 'SG' },
    { name: 'Thailand', capital: 'Bangkok', region: 'Asia', fact: 'Thailand är det enda landet i Sydostasien som aldrig koloniserats av européer.', iso: 'TH' },
    { name: 'Turkiet', capital: 'Ankara', region: 'Asia', fact: 'Istanbul ligger i både Europa och Asien.', iso: 'TR' },
    { name: 'Vietnam', capital: 'Hanoi', region: 'Asia', fact: 'Vietnam är en stor exportör av kaffe.', iso: 'VN' },

    // --- Africa (Difficulty 3) ---
    { name: 'Algeriet', capital: 'Alger', region: 'Africa', fact: 'Algeriet är Afrikas till ytan största land.', iso: 'DZ' },
    { name: 'Egypten', capital: 'Kairo', region: 'Africa', fact: 'Nilen rinner genom Egypten.', iso: 'EG' },
    { name: 'Etiopien', capital: 'Addis Abeba', region: 'Africa', fact: 'Kaffet anses härstamma från Etiopien.', iso: 'ET' },
    { name: 'Kenya', capital: 'Nairobi', region: 'Africa', fact: 'Kenya är känt för sina safarier och löpare.', iso: 'KE' },
    { name: 'Marocko', capital: 'Rabat', region: 'Africa', fact: 'Marocko ligger bara några mil från Spanien.', iso: 'MA' },
    { name: 'Nigeria', capital: 'Abuja', region: 'Africa', fact: 'Nigeria är Afrikas folkrikaste land.', iso: 'NG' },
    { name: 'Sydafrika', capital: 'Pretoria', region: 'Africa', fact: 'Sydafrika har tre huvudstäder (Pretoria, Kapstaden, Bloemfontein).', iso: 'ZA' },
    { name: 'Tanzania', capital: 'Dodoma', region: 'Africa', fact: 'Kilimanjaro ligger i Tanzania.', iso: 'TZ' },
    { name: 'Tunisien', capital: 'Tunis', region: 'Africa', fact: 'Karthago låg i nuvarande Tunisien.', iso: 'TN' },
    { name: 'Uganda', capital: 'Kampala', region: 'Africa', fact: 'Uganda kallas "Afrikas pärla".', iso: 'UG' },

    // --- Oceania (Difficulty 3) ---
    { name: 'Australien', capital: 'Canberra', region: 'Oceania', fact: 'Australien är både ett land och en kontinent.', iso: 'AU' },
    { name: 'Nya Zeeland', capital: 'Wellington', region: 'Oceania', fact: 'Sagan om Ringen spelades in på Nya Zeeland.', iso: 'NZ' },
    { name: 'Fiji', capital: 'Suva', region: 'Oceania', fact: 'Fiji består av över 300 öar.', iso: 'FJ' },
];

// Helper to get difficulty from region
const getDifficulty = (region) => {
    if (region === 'Nordic' || region === 'Europe') return 1;
    if (region === 'North America' || region === 'South America') return 2;
    return 3;
};

// Helper to get random items from array excluding specific ones
const getRandomOptions = (array, correctItem, count, key) => {
    const options = [correctItem[key]];
    const pool = array.filter(item => item[key] !== correctItem[key]);

    // Try to get from same region first for better distractors
    let regionPool = pool.filter(item => item.region === correctItem.region);

    // If not enough in region, take from anywhere
    if (regionPool.length < count) regionPool = pool;

    while (options.length < count + 1) {
        if (regionPool.length === 0) break; // Should not happen with large data
        const randomIndex = Math.floor(Math.random() * regionPool.length);
        const randomItem = regionPool[randomIndex];
        if (!options.includes(randomItem[key])) {
            options.push(randomItem[key]);
        }
        // Remove to avoid picking again? Not strictly necessary if we check includes, but good for perf
    }
    return options.sort(() => 0.5 - Math.random());
};

// Generate Questions
const generateQuestions = () => {
    const generatedCountries = [];
    const generatedCapitals = [];
    const generatedMapQuestions = [];

    rawCountries.forEach((country, index) => {
        const difficulty = getDifficulty(country.region);

        // 1. Country Question: "Vilket land har huvudstaden X?"
        generatedCountries.push({
            id: `gen_c_${index}`,
            name: country.name,
            question: `Vilket land har huvudstaden ${country.capital}?`,
            options: getRandomOptions(rawCountries, country, 3, 'name'),
            answer: country.name,
            fact: country.fact,
            difficulty: difficulty,
            region: country.region
        });

        // 2. Capital Question: "Vad heter huvudstaden i X?"
        generatedCapitals.push({
            id: `gen_cap_${index}`,
            country: country.name,
            question: `Vad heter huvudstaden i ${country.name}?`,
            options: getRandomOptions(rawCountries, country, 3, 'capital'),
            answer: country.capital,
            fact: country.fact,
            difficulty: difficulty,
            region: country.region
        });

        // 3. Map Question: "Vilket land är markerat på kartan?"
        generatedMapQuestions.push({
            id: `gen_map_${index}`,
            name: country.name,
            question: 'Vilket land är markerat på kartan?',
            options: getRandomOptions(rawCountries, country, 3, 'name'),
            answer: country.name,
            fact: country.fact,
            difficulty: difficulty,
            region: country.region,
            type: 'map',
            iso: country.iso
        });
    });

    return { generatedCountries, generatedCapitals, generatedMapQuestions };
};

const { generatedCountries, generatedCapitals, generatedMapQuestions } = generateQuestions();

// Export combined lists
// We keep the manually curated landscapes as they are unique
export const landscapes = [
    // Difficulty 1 (Level 1-2)
    { id: 'l1', name: 'Skåne', question: 'Vilket landskap ligger längst söderut i Sverige?', options: ['Skåne', 'Blekinge', 'Halland', 'Småland'], answer: 'Skåne', fact: 'Skåne är känt för sina bördiga jordar och milda klimat. Det var danskt fram till 1658.', difficulty: 1 },
    { id: 'l2', name: 'Lappland', question: 'Vilket är Sveriges största landskap?', options: ['Jämtland', 'Norrbotten', 'Lappland', 'Västerbotten'], answer: 'Lappland', fact: 'Lappland täcker ungefär en fjärdedel av Sveriges yta och är känt för sin vilda natur och midnattssol.', difficulty: 1 },
    { id: 'l3', name: 'Gotland', question: 'Vilket landskap är en ö i Östersjön?', options: ['Öland', 'Gotland', 'Södermanland', 'Uppland'], answer: 'Gotland', fact: 'Gotland är Sveriges största ö och är känd för sina raukar och den medeltida staden Visby.', difficulty: 1 },
    { id: 'l6', name: 'Öland', question: 'Vilket landskap är Sveriges minsta?', options: ['Öland', 'Blekinge', 'Gotland', 'Närke'], answer: 'Öland', fact: 'Öland är Sveriges minsta landskap till ytan, men det är långt och smalt. Det är känt för sina väderkvarnar.', difficulty: 1 },
    { id: 'l7', name: 'Dalarna', question: 'Vilket landskap är känt för dalahästar?', options: ['Värmland', 'Dalarna', 'Hälsingland', 'Gästrikland'], answer: 'Dalarna', fact: 'Dalahästen är en av Sveriges mest kända symboler och tillverkas traditionellt i Nusnäs i Dalarna.', difficulty: 1 },

    // Difficulty 2 (Level 3-5)
    { id: 'l4', name: 'Dalarna', question: 'Var ligger sjön Siljan?', options: ['Värmland', 'Dalarna', 'Hälsingland', 'Gästrikland'], answer: 'Dalarna', fact: 'Siljan är en krater som bildades av en meteorit för 377 miljoner år sedan.', difficulty: 2 },
    { id: 'l5', name: 'Västergötland', question: 'I vilket landskap ligger större delen av Göteborg?', options: ['Bohuslän', 'Västergötland', 'Halland', 'Dalsland'], answer: 'Västergötland', fact: 'Göteborg ligger i både Västergötland och Bohuslän, men centrum ligger i Västergötland.', difficulty: 2 },
    { id: 'l8', name: 'Småland', question: 'Vilket landskap förknippas med Astrid Lindgren?', options: ['Skåne', 'Småland', 'Östergötland', 'Västergötland'], answer: 'Småland', fact: 'Astrid Lindgren växte upp i Vimmerby i Småland, och många av hennes böcker utspelar sig där.', difficulty: 2 },
    { id: 'l9', name: 'Bohuslän', question: 'Vilket landskap är känt för sina salta bad och klippor på västkusten?', options: ['Halland', 'Bohuslän', 'Dalsland', 'Värmland'], answer: 'Bohuslän', fact: 'Bohuslän är känt för sin vackra skärgård och fisketradition.', difficulty: 2 },
    { id: 'l10', name: 'Jämtland', question: 'I vilket landskap ligger Åre?', options: ['Härjedalen', 'Jämtland', 'Dalarna', 'Lappland'], answer: 'Jämtland', fact: 'Åre är en av Sveriges mest kända skidorter och ligger vid foten av Åreskutan.', difficulty: 2 },

    // Difficulty 3 (Level 6+)
    { id: 'l11', name: 'Härjedalen', question: 'Vilket är Sveriges högst belägna landskap?', options: ['Jämtland', 'Lappland', 'Härjedalen', 'Dalarna'], answer: 'Härjedalen', fact: 'Härjedalen är Sveriges minsta landskap befolkningsmässigt och har en hög medelhöjd över havet.', difficulty: 3 },
    { id: 'l12', name: 'Dalsland', question: 'Vilket landskap kallas ofta för "Ett Sverige i miniatyr"?', options: ['Dalsland', 'Värmland', 'Södermanland', 'Västmanland'], answer: 'Dalsland', fact: 'Dalsland kallas så för att det har nästan alla svenska naturtyper inom ett litet område.', difficulty: 3 },
    { id: 'l13', name: 'Medelpad', question: 'Vilket landskap ligger Sundsvall i?', options: ['Ångermanland', 'Medelpad', 'Hälsingland', 'Västerbotten'], answer: 'Medelpad', fact: 'Sundsvall är den största tätorten i Medelpad och är känd som "Stenstaden".', difficulty: 3 },
    { id: 'l14', name: 'Uppland', question: 'Vilket landskapsvapen föreställer ett riksäpple?', options: ['Södermanland', 'Uppland', 'Västmanland', 'Närke'], answer: 'Uppland', fact: 'Riksäpplet symboliserar makten och Uppland har historiskt varit ett maktcentrum i Sverige.', difficulty: 3 },
    { id: 'l15', name: 'Blekinge', question: 'Vilket landskap kallas för "Sveriges trädgård"?', options: ['Skåne', 'Blekinge', 'Halland', 'Småland'], answer: 'Blekinge', fact: 'Blekinge kallas så på grund av sin lummiga natur och många ekar.', difficulty: 3 },
];

export const countries = generatedCountries;
export const capitals = generatedCapitals;
export const mapQuestions = generatedMapQuestions;

