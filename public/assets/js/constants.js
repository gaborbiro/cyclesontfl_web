const DEBUG = window.location.hostname === 'localhost'

const Folded = "Folded cycles";
const Bakerloo = "Bakerloo";
const Central = "Central";
const Circle = "Circle";
const District = "District";
const DLR = "DLR";
const Elizabeth = "Elizabeth";
const HammersmithCity = "Hammersmith & City";
const Jubilee = "Jubilee";
const Metropolitan = "Metropolitan";
const Northern = "Northern";
const Overground = "Overground";
const Piccadilly = "Piccadilly";
const Victoria = "Victoria";
const WaterlooCity = "Waterloo & City";
const BusTram = "Bus and Tram"
const NationalRail = "National Rail"
const River = "River"
const EmiratedAir = "Emirates Air Line"
const Coaches = "Coaches"

const LineColors = new Map([
    [Folded, { backgroundColor: "#FFFFFF", textColor: "#000000" }],
    [Bakerloo, { backgroundColor: "#B36305", textColor: "#ffffff" }],
    [Central, { backgroundColor: "#E32017", textColor: "#ffffff" }],
    [Circle, { backgroundColor: "#FFD300", textColor: "#ffffff" }],
    [District, { backgroundColor: "#00782A", textColor: "#ffffff" }],
    [DLR, { backgroundColor: "#00A4A7", textColor: "#ffffff" }],
    [Elizabeth, { backgroundColor: "#9364CD", textColor: "#ffffff" }],
    [HammersmithCity, { backgroundColor: "#F3A9BB", textColor: "#ffffff" }],
    [Jubilee, { backgroundColor: "#A0A5A9", textColor: "#ffffff" }],
    [Metropolitan, { backgroundColor: "#9B0056", textColor: "#ffffff" }],
    [Northern, { backgroundColor: "#000000", textColor: "#ffffff" }],
    [Overground, { backgroundColor: "#EE7C0E", textColor: "#ffffff" }],
    [Piccadilly, { backgroundColor: "#003688", textColor: "#ffffff" }],
    [Victoria, { backgroundColor: "#0098D4", textColor: "#ffffff" }],
    [WaterlooCity, { backgroundColor: "#95CDBA", textColor: "#ffffff" }],
    [BusTram, { backgroundColor: "#FFFFFF", textColor: "#000000" }],
    [NationalRail, { backgroundColor: "#FFFFFF", textColor: "#000000" }],
    [River, { backgroundColor: "#FFFFFF", textColor: "#000000" }],
    [EmiratedAir, { backgroundColor: "#FFFFFF", textColor: "#000000" }],
    [Coaches, { backgroundColor: "#FFFFFF", textColor: "#000000" }],
]);