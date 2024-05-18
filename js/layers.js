addLayer("per", {
    name: "percentage", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "%", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "% of the level beaten", // Name of prestige currency
    baseResource: "progress", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.0, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
		if (hasMilestone('per', 0)) mult = mult.times(0.50)
		if (hasMilestone('per', 1)) mult = mult.times(0.001)
		if (hasMilestone('per', 2)) mult = mult.times(1000)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: get 1% more of the level", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
		doReset(resettingLayer) {
			let keep = [];
			if (hasMilestone("att", 0) && resettingLayer=="att") keep.push("upgrades")
			if (layers[resettingLayer].row > this.row) layerDataReset("per", keep)
		},
	infoboxes: {
		lore: {
			title: "Hello, welcome to geometree dash 1.2",
			body() { return "This game is a timewall just like real geometry dash, welcome to extreme hell" },
			
		},
		
	},
    upgrades: {
        11: {
	canAfford() {return player.per.points.gte(8) },
	unlocked() { return player.per.points.gte(8) },
	fullDisplay() {return `Double spike? <br> <br> requires: 8%`}
        },
        12: {
	canAfford() {return player.per.points.gte(10) },
	unlocked() { return hasUpgrade("per", 11)},
	fullDisplay() {return `A big milestone <br> <br> requires: 10% <br> <br> effect: +10% progress/confidence`}
        },
        13: {
	canAfford() {return player.att.points.gte(69) },
	unlocked() { return hasUpgrade("per", 11)},
	fullDisplay() {return `This is the attempt <br> <br> requires: 69 attempts <br> <br> effect: +10% progress/confidence`}
        },
        14: {
	canAfford() {return player.per.points.gte(20) },
	unlocked() { return player[this.layer].points.gte(20)},
	fullDisplay() {return `This is the attempt! <br> <br> requires: 20% <br> <br> effect: +20% progress/confidence`}
        },
        15: {
	canAfford() {return player.per.points.gte(22) },
	unlocked() { return player[this.layer].points.gte(21)},
	fullDisplay() {return `Yet another 2.2 reference! <br> <br> requires: 22% <br> <br> effect: +22% progress/confidence`}
        },
        16: {
	canAfford() {return player.per.points.gte(25) },
	unlocked() { return player[this.layer].points.gte(22)},
	fullDisplay() {return `A quarter of the way there! <br> <br> requires: 25% <br> <br> effect: +25% progress/confidence`}
        },
        21: {
	canAfford() {return player.per.points.gte(22) },
	unlocked() { return player[this.layer].points.gte(22)&&player.att.points.gte(110)},
	fullDisplay() {return `Progress->confidence synergy <br> <br> requires: 22% and 110 attempts <br> <br> boosting progress based on percentage by ` + upgradeEffect([this.layer], [this.id])},
    effect() {
        return player[this.layer].points.add(1)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
	},
	milestones: {
		0: {
			requirementDescription: "16% of the level done",
			effectDescription: "I said this is extreme hell, not grandpa hell, % cost is halved",
			done() { return player[this.layer].points.gte(16) },
			unlocked() { return player[this.layer].points.gte(14)}
			},
		1: {
			requirementDescription: "thirty per- wait, is this a spaceship?",
			effectDescription: "This part is too easy, percentage cost /1000 for now",
			done() { return player[this.layer].points.gte(30) },
			unlocked() { return player[this.layer].points.gte(29)}
			},
		2: {
			requirementDescription: "This was way too easy to get a upgrade",
			effectDescription: "Percentage cost back to normal, now you are in the hardest part of the level, good l̶u̶c̶k̶",
			done() { return player[this.layer].points.gte(46) },
			unlocked() { return player[this.layer].points.gte(46)}
			},
	},
})

addLayer("att", {
    name: "attempts", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "😟", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FA8072",
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "attempts", // Name of prestige currency
    baseResource: "% of the level beaten", // Name of resource prestige is based on
    baseAmount() {return player.per.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.0, // Prestige currency exponent
    effect(){
		return player[this.layer].points.div(10).add(1)
		// you can also add .times(multiplier) on to it
	},
	effectDescription(){
		return "making you " + format(tmp[this.layer].effect) + " times better at the game"
	},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade('att', 14)) mult = mult.times(0.65)
        if (hasUpgrade('att', 15)) mult = mult.times(0.60)
        if (hasMilestone('att', 2)) mult = mult.times(0.70)
        if (hasMilestone('att', 0)) mult = mult.times(0.575)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "R: Die", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
	infoboxes: {
		lore: {
			title: "attempts are normal, not static",
			body() { return "You gain attempts faster than progress" },
			
		},
		
	},
    upgrades: {
        11: {
	canAfford() {return player.att.points.gte(12) },
	fullDisplay() {return `requires: 2.2 points per second <br> <br> adds Explorer to your soul`}
        },
        12: {
	canAfford() {return player.att.points.gte(22) },
	unlocked() { return hasUpgrade("att", 11) },
	fullDisplay() {return `22nd time is the charm!`}
        },
        13: {
	canAfford() {return player.att.points.gte(50) },
	unlocked() { return hasUpgrade("att", 12) },
	fullDisplay() {return `start playing serious <br> <br> its already the 50th attempt`}
        },
        14: {
	canAfford() {return player.att.points.gte(60) },
	unlocked() { return hasUpgrade("att", 13) },
	fullDisplay() {return `You were already playing seriously. Look at the level's layout <br> <br> requires: 60 attempts <br> <br> effect: x1.1 progress`} 
        },
        15: {
	canAfford() {return player.att.points.gte(80) },
	unlocked() { return hasUpgrade("att", 14) },
	fullDisplay() {return `Watch videos on youtube <br> <br> requires: 80 attempts <br> <br> effect: x1.1 progress`} 
        },
        16: {
	canAfford() {return player.att.points.gte(90) },
	unlocked() { return hasUpgrade("att", 15) },
	fullDisplay() {return `Try other levels in this difficulty <br> <br> requires: 90 attempts <br> <br> effect: x1.25 progress`} 
        },
        21: {
	canAfford() {return player.att.points.gte(150) },
	unlocked() { return player.att.points.gte(140) },
	fullDisplay() {return `Try more levels in this difficulty <br> <br> requires: 150 attempts <br> <br> effect: x1.50 progress`} 
        },
        22: {
	canAfford() {return player.att.points.gte(222) },
	unlocked() { return player.att.points.gte(200) },
	fullDisplay() {return `The attempt upgrades with no effect now have one because of the fact that you added explorers into your soul <br> <br> requires: 222 attempts <br> <br> pps x2.2, x2.2 and x5`} 
        },
	},
	milestones: {
		0: {
			requirementDescription: "Its pretty hard to die early in a easy level when you have 100 attempts",
			effectDescription: "Attempts require more effort, you got 5x better at the game",
			done() { return player[this.layer].points.gte(101) },
			unlocked() { return player[this.layer].points.gte(100)}
			},
		1: {
			requirementDescription: "They would be useless without some keeping",
			effectDescription: "Keep % upgrades on death",
			done() { return player[this.layer].points.gte(111) },
			unlocked() { return player[this.layer].points.gte(111)}
			},
		2: {
			requirementDescription: "You know the drill, don't you?",
			effectDescription: "attempts require you to get to the easy shit part, you also got 10x better at the game (broken for some reason)",
			done() { return player[this.layer].points.gte(200) },
			unlocked() { return player[this.layer].points.gte(201)}
			},
	},
})

addLayer("difficulty", {
    name: "D stands for deez nuts", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    color: "#F50030",
    row: "side", // Row the layer is in on the tree (0 is the first row)
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Difficulty")
    },
    layerShown(){return true},
    infoboxes: {
		optionsfornoobs: {
			title: "choose your character",
			body() { return "here you can play easy mode for non-timewally babies" },
			
		},
		
	},
	clickables: {
		11: {
			title: "medium hell mode",
			display() {return "set devspeed to 10 secs"},
			canClick() {return true},
			onClick() {return player.devSpeed = 10},
		},
		12: {
			title: "easy hell mode",
			display() {return "set devspeed to 1 min"},
			canClick() {return true},
			onClick() {return player.devSpeed = 60},
		},
		13: {
			title: "insane mode",
			display() {return "set devspeed to 5 mins"},
			canClick() {return true},
			onClick() {return player.devSpeed = 300},
		},
		14: {
			title: "harder mode",
			display() {return "set devspeed to 10 mins"},
			canClick() {return true},
			onClick() {return player.devSpeed = 600},
		},
		15: {
			title: "hard mode",
			display() {return "set devspeed to 15 mins"},
			canClick() {return true},
			onClick() {return player.devSpeed = 900},
		},
		16: {
			title: "fire in the hole face mode",
			display() {return "set devspeed to 1000 seconds"},
			canClick() {return true},
			onClick() {return player.devSpeed = 1000},
		},
		17: {
			title: "baby mode",
			display() {return "set devspeed to over 9000 seconds"},
			canClick() {return false},
			onClick() {return player.devSpeed = 9001},
		},
		
	},
})

addLayer("i", {
    name: "information", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    color: "#FFFFFF",
    row: "side", // Row the layer is in on the tree (0 is the first row)
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Information")
    },
    layerShown(){return true},
    	tabFormat: {
		"UPG": {
			content: [["display-text", function() { return 'welcome to the info tab, here you can know how the things in this game will normally look like'}, { "color": "white", "font-size": "20px" }], "blank", ["infobox", "UPG"]],
		},
		"MLT": {
			content: [["infobox", "MLT"]],
		},
	},
    infoboxes: {
		UPG: {
			title: "Upgrades: ",
			body() { return `Progress: are related to gaining confidence and features in the level (stereo madness), they are basically milestones but you don't gain them instantly <br> <br> attempts: are related to getting better at the game and learning about the level` },
			
		},
		
		MLT: {
			title: "Milestones:",
			body() { return `Features used for balancing, can be a nerf, a buff, or both, since they are gained instantly  (I don't know how to make [softcap], thanks to my knowledge ;) )` },
			
		},
	},
})
