const RuleFolded = "folded cycles";
const RuleBakerloo = Bakerloo;
const RuleCentral = Central;
const RuleCircle = Circle;
const RuleDistrict = District;
const RuleDLR = DLR;
const RuleElizabeth = Elizabeth;
const RuleHammersmithCity = HammersmithCity;
const RuleJubilee = Jubilee;
const RuleMetropolitan = Metropolitan;
const RuleNorthern = Northern;
const RuleOverground = Overground;
const RulePiccadilly = Piccadilly;
const RuleVictoria = Victoria;
const RuleWaterlooCity = WaterlooCity;
const RuleBusTram = "bus tram"
const RuleNationalRail = "national rail"
const RuleRiver = "river"
const RuleEmiratedAir = "emirates air line"
const RuleCoaches = "coaches"

const RuleEntryInfo = new Map([
    [RuleFolded, { backgroundColor: "#FFFFFF", textColor: "#000000", name: "Folded cycles" }],
    [RuleBakerloo, LineInfo.get(RuleBakerloo)],
    [RuleCentral, LineInfo.get(RuleCentral)],
    [RuleCircle, LineInfo.get(RuleCircle)],
    [RuleDistrict, LineInfo.get(RuleDistrict)],
    [RuleDLR, LineInfo.get(RuleDLR)],
    [RuleElizabeth, LineInfo.get(RuleElizabeth)],
    [RuleHammersmithCity, LineInfo.get(RuleHammersmithCity)],
    [RuleJubilee, LineInfo.get(RuleJubilee)],
    [RuleMetropolitan, LineInfo.get(RuleMetropolitan)],
    [RuleNorthern, LineInfo.get(RuleNorthern)],
    [RuleOverground, LineInfo.get(RuleOverground)],
    [RulePiccadilly, LineInfo.get(RulePiccadilly)],
    [RuleVictoria, LineInfo.get(RuleVictoria)],
    [RuleWaterlooCity, LineInfo.get(RuleWaterlooCity)],
    [RuleBusTram, { backgroundColor: "#FFFFFF", textColor: "#000000", name: "Bus and Tram" }],
    [RuleNationalRail, { backgroundColor: "#FFFFFF", textColor: "#000000", name: "National Rail" }],
    [RuleRiver, { backgroundColor: "#FFFFFF", textColor: "#000000", name: "River" }],
    [RuleEmiratedAir, { backgroundColor: "#FFFFFF", textColor: "#000000", name: "Emirates Air Line" }],
    [RuleCoaches, { backgroundColor: "#FFFFFF", textColor: "#000000", name: "Coaches" }],
]);

const AllowedFolded = "You can take folded cycles anywhere, at any time on all transport services. However, on buses the driver can decide not to let you travel if it's too busy.";
const AllowedAnywhere = "Allowed anywhere";
const NotAllowed = "Not allowed";
const NotAllowedEver = "Never allowed";
const AllowedNationalRail = "Use <a target='_blank' href='http://plusbike.nationalrail.co.uk/'>PlusBike</a> to find out where you can take cycles on National Rail services.";
const AllowedRiver = "Most <a target='_blank' href='https://tfl.gov.uk/modes/river/'>river services</a> allow non-folded cycles but you should check with them before you travel.";
const AllowedEmiratesAir = "You can take a non-folded cycle at any time.";
const AllowedCoaches = "You need to check with the <a target='_blank' href='https://tfl.gov.uk/modes/coaches/coach-companies'>coach company</a> to see if you can take a non-folded cycle.";
const AllowedBakerloo = "Between Queen's Park and Harrow & Wealdstone";
const AllowedCentral = "Between Leyton, Epping and Newbury Park (via Hainault only)\nBetween White City, Ealing Broadway and West Ruislip";
const AllowedJubilee = "Between Stratford and Canning Town\nBetween Finchley Road and Stanmore";
const AllowedNorthern = "Between Golders Green and Hendon Central\nBetween Colindale and Edgware\nBetween East Finchley, Mill Hill East and High Barnet";
const AllowedPiccadilly = "Between Oakwood and Cockfosters\nBetween Barons Court, Hounslow West and Uxbridge";
const PartiallyAllowedElizabeth = "From west: until Royal Oak\nTo west: from Paddington\nFrom east: until Bethnal Green\nTo east: from Liverpool Street\n\nNote: until the Elizabeth Line fully opens (Spring 2023), the times are actually slightly <a target='_blank' href='https://lcc.org.uk/news/new-connections-for-cycles-on-trains/'>different</a>";
const PartiallyAllowedOverground = "From Liverpool Street station going towards Chingford, Enfield Town or Cheshunt.\nComing from Chingford, Enfield Town or Cheshunt until Bethnal Green.";

const pastMidnight_0000_0730 = "00:00-07:30";
const morningPeak_0730_0930 = "07:30-09:30";
const daytime_0930_1600 = "09:30-16:00";
const eveningPeak_1600_1900 = "16:00-19:00";
const nighttime_1900_2400 = "19:00-00:00";