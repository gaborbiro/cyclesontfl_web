const DEBUG = window.location.hostname === 'localhost'

const Bakerloo = "bakerloo";
const Central = "central";
const Circle = "circle";
const District = "district";
const DLR = "dlr";
const Elizabeth = "elizabeth";
const HammersmithCity = "hammersmith-city";
const Jubilee = "jubilee";
const Metropolitan = "metropolitan";
const Northern = "northern";
const Overground = "london-overground";
const Piccadilly = "piccadilly";
const Victoria = "victoria";
const WaterlooCity = "waterloo-city";

const LineInfo = new Map([
    [Bakerloo, { backgroundColor: "#B36305", textColor: "#ffffff", name: "Bakerloo" }],
    [Central, { backgroundColor: "#E32017", textColor: "#ffffff", name: "Central" }],
    [Circle, { backgroundColor: "#FFD300", textColor: "#ffffff", name: "Circle" }],
    [District, { backgroundColor: "#00782A", textColor: "#ffffff", name: "District" }],
    [DLR, { backgroundColor: "#00A4A7", textColor: "#ffffff", name: "DLR" }],
    [Elizabeth, { backgroundColor: "#9364CD", textColor: "#ffffff", name: "Elizabeth" }],
    [HammersmithCity, { backgroundColor: "#F3A9BB", textColor: "#ffffff", name: "Hammersmith & City" }],
    [Jubilee, { backgroundColor: "#A0A5A9", textColor: "#ffffff", name: "Jubilee" }],
    [Metropolitan, { backgroundColor: "#9B0056", textColor: "#ffffff", name: "Metropolitan" }],
    [Northern, { backgroundColor: "#000000", textColor: "#ffffff", name: "Northern" }],
    [Overground, { backgroundColor: "#EE7C0E", textColor: "#ffffff", name: "Overground" }],
    [Piccadilly, { backgroundColor: "#003688", textColor: "#ffffff", name: "Piccadilly" }],
    [Victoria, { backgroundColor: "#0098D4", textColor: "#ffffff", name: "Victoria" }],
    [WaterlooCity, { backgroundColor: "#95CDBA", textColor: "#ffffff", name: "Waterloo & City" }],
]);