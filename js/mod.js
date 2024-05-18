let modInfo = {
	name: "The GeomeTree Dash",
	id: "geometrycologne",
	author: "nobody",
	pointsName: "progress",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "2.2",
	name: "geometry dash",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v2.2</h3><br>
		- Added a lot of things<br>
		- But most stuff will be only in 2.21<br>.
	<h3>v2.1</h3><br>
		- Twelve, buckets, listen to me, began to<br>
		- added ball but faster.<br>
	<h3>v2.0</h3><br>
		- Deadlock<br>
		- added robots but its not a prestige layer.<br>
	<h3>v1.9</h3><br>
		- bwoomp.<br>
		- bwoomp.<br>
	<h3>v1.8</h3><br>
		- Mulpan hell<br>
		- added hexagons and forces.<br>
	<h3>v1.7</h3><br>
		- Added a new demon<br>
		- Speed demon.<br>
	<h3>v1.6</h3><br>
		- clubstep monster<br>
		- Who cares about breakable blocks.<br>
	<h3>v1.5</h3><br>
		- UFO<br>
		- Theory of why did I waste so much time on this.<br>
	<h3>v1.4</h3><br>
		- Cluttering my <h5>Balls<h5> <br>
		- Balls.<br>
	<h3>v1.3</h3><br>
		- Peter griffin level <br>
		- Added gravity things.<br>
	<h3>v1.2</h3><br>
		- the cycles of I putting too much effort into a meme <br>
		- Balls 2 (or this is 1 and clutterfunk is 2).<br>
	<h3>v1.1</h3><br>
		- best level <br>
		- Mirror portal (best thing fr too underrated).<br>
	<h3>v1.0</h3><br>
		- congratulations for reading all that <br>
		- Welcome to FIRE IN THE-<br>`

let winText = `Congratulations! If you did beat this game in the hardest mode I would give you NaN dollars and 1.8e308 trophies...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	gain = gain.times(tmp.att.effect)
	if (hasUpgrade('att', 14)) gain = gain.times(1.1)
	if (hasUpgrade('att', 15)) gain = gain.times(1.1)
	if (hasUpgrade('att', 16)) gain = gain.times(1.25)
	if (hasUpgrade('att', 21)) gain = gain.times(1.5)
	if (hasUpgrade('per', 12)) gain = gain.times(1.1)
	if (hasUpgrade('per', 13)) gain = gain.times(1.1)
	if (hasUpgrade('per', 14)) gain = gain.times(1.2)
	if (hasUpgrade('per', 15)) gain = gain.times(1.22)
	if (hasUpgrade('per', 16)) gain = gain.times(1.05)
	if (hasMilestone('att', 0)) gain = gain.times(5)
	if (hasMilestone('att', 2) gain = gain.times(10)
	if (hasUpgrade('per', 21)) gain = gain.times(upgradeEffect('per', 21))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
