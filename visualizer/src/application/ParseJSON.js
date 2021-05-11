const fs = require('fs')

// Data which will write in a file.
// let data = JSON.parse(require('./para_step_goal_links_gold.json'))
// const data = '{ "name": ["John", "Rick"], "age":30, "city":"New York"}'
const data = `
  {
    "Make a baking soda paste.": {
      "corresponding_goal": "Clean a Bite Guard",
      "gold_goal": "Make Baking Soda Toothpaste",
      "retrieved_goals": [
        "Make Baking Soda Toothpaste",
        "Use Baking Soda",
        "Make Baking Soda Biscuits",
        "Make Soda",
        "Drink Baking Soda",
        "Decompose Baking Soda",
        "Substitute Baking Soda",
        "Store Baking Soda",
        "Make Baking Soda Snow",
        "Make Slime Using Baking Soda"
      ],
      "retrieved_goals_similarity": [
        "0.87765026",
        "0.77710366",
        "0.7637531",
        "0.7589071",
        "0.7579458",
        "0.7507547",
        "0.74918664",
        "0.743176",
        "0.73749423",
        "0.73462015"
      ],
      "retrieved_goal_rank": 0
    },
    "Be a funny boss, leader, teacher, or business owner.": {
      "corresponding_goal": "Spread Laughter",
      "gold_goal": "Be Funny",
      "retrieved_goals": [
        "Be a Leader",
        "Be a Good Boss",
        "Lead to Be a Great Teacher",
        "Manage Time As a Business Owner",
        "Be a Better Boss",
        "Be a Real Leader",
        "Be a Teacher",
        "Become a Manager",
        "Handle a Difficult Boss",
        "Be a Good Manager"
      ],
      "retrieved_goals_similarity": [
        "0.60118955",
        "0.54252976",
        "0.52070326",
        "0.51341957",
        "0.5104492",
        "0.50553954",
        "0.50069296",
        "0.47970653",
        "0.47900712",
        "0.47554845"
      ],
      "retrieved_goal_rank": -1
    },
    "Be a leader.": {
      "corresponding_goal": "Channel Your Inner Oprah",
      "gold_goal": "Be a Leader",
      "retrieved_goals": [
        "Be a Leader",
        "Be a Real Leader",
        "Be the Leader of a Group",
        "Be an Active Leader",
        "Become a Better Leader",
        "Be a Good Section Leader",
        "Be an Inspiring Leader",
        "Be a Leader in Your Group",
        "Be a Christian Leader",
        "Be a Leader in the Workplace"
      ],
      "retrieved_goals_similarity": [
        "0.9336577",
        "0.77068627",
        "0.7007323",
        "0.6755185",
        "0.66997117",
        "0.6553122",
        "0.6381296",
        "0.62314856",
        "0.61816555",
        "0.615979"
      ],
      "retrieved_goal_rank": 0
    },
    "Use baking soda.": {
      "corresponding_goal": "Apply Toothpaste on Pimples",
      "gold_goal": "Get Rid of Pimples with Baking Soda",
      "retrieved_goals": [
        "Use Baking Soda",
        "Make Slime Using Baking Soda",
        "Drink Baking Soda",
        "Use Baking Soda in the Garden",
        "Store Baking Soda",
        "Decompose Baking Soda",
        "Clean with Baking Soda",
        "Substitute Baking Soda",
        "Make Soda",
        "Activate Baking Soda"
      ],
      "retrieved_goals_similarity": [
        "0.9686358",
        "0.8071164",
        "0.79993856",
        "0.79399955",
        "0.7646633",
        "0.7443547",
        "0.7356361",
        "0.7312386",
        "0.7304605",
        "0.7297813"
      ],
      "retrieved_goal_rank": -1
    },
    "Take your temperature to see if you have a fever.": {
      "corresponding_goal": "Treat Coronavirus",
      "gold_goal": "Take a Temperature",
      "retrieved_goals": [
        "Take a Temperature",
        "Tell if You Have a Fever",
        "Take a Feeling Temperature",
        "Act when You Have Fever",
        "Induce a Fever",
        "Treat a Fever",
        "React When You Have a Fever",
        "Measure Temperature",
        "Get Rid of a Fever",
        "Take a Horse's Temperature"
      ],
      "retrieved_goals_similarity": [
        "0.7931596",
        "0.7311406",
        "0.69078207",
        "0.68027234",
        "0.67009103",
        "0.65012324",
        "0.62758255",
        "0.62638724",
        "0.6208831",
        "0.6090715"
      ],
      "retrieved_goal_rank": 0
    },
    "Keep your hands away from your eyes, nose, and mouth.": {
      "corresponding_goal": "Prevent Coronavirus | wikiHow\u2019s tips for staying healthy and avoiding getting sick",
      "gold_goal": "Stop Touching Your Face",
      "retrieved_goals": [
        "Wipe Your Nose on Your Hands",
        "Blow Your Nose",
        "Wiggle Your Nose",
        "Get Rid of Spectacle Marks on Your Nose",
        "Take Care of Your Hands",
        "Get Fish Smell off Your Hands",
        "Get Rid of a Long\u2010Term Nose or Mouth Twitch",
        "Hang a Spoon from Your Nose",
        "Prevent Hand, Foot, and Mouth Disease",
        "Take Care of Your Eyes"
      ],
      "retrieved_goals_similarity": [
        "0.58195335",
        "0.48276317",
        "0.47456795",
        "0.42968947",
        "0.42803746",
        "0.42563522",
        "0.42158818",
        "0.4215816",
        "0.4154871",
        "0.41320783"
      ],
      "retrieved_goal_rank": -1
    },
    "Dust all of the surfaces in your room.": {
      "corresponding_goal": "Clean Your Room",
      "gold_goal": "Dust Your Entire House",
      "retrieved_goals": [
        "Dust Your Entire House",
        "Clean Your Entire Room",
        "Dust Walls",
        "Make Dusting Powder for Your Body",
        "Reduce Dust in Your House",
        "Get Rid of Dust",
        "Clean Your Room",
        "Get Dust Out of the Air",
        "Clean Fiberglass Bathroom Surfaces",
        "Prevent Dust"
      ],
      "retrieved_goals_similarity": [
        "0.5432163",
        "0.45318645",
        "0.45076627",
        "0.445873",
        "0.44218105",
        "0.43201858",
        "0.42596135",
        "0.42427608",
        "0.42353427",
        "0.41138676"
      ],
      "retrieved_goal_rank": 0
    },
    "Paint one or more walls with bright, happy colors if you can.": {
      "corresponding_goal": "Make a Homeschool Classroom",
      "gold_goal": "Paint a Room",
      "retrieved_goals": [
        "Make Paint Colors",
        "Match Paint Colors",
        "Paint Exterior Walls With a Paint Sprayer",
        "Paint a Wall",
        "Paint Walls With Stencils",
        "Paint",
        "Get Ink or Dye Off a Painted Wall",
        "Colorwash Your Walls",
        "Choose Car Paint Colors",
        "Color"
      ],
      "retrieved_goals_similarity": [
        "0.63630474",
        "0.62206227",
        "0.6092448",
        "0.6058797",
        "0.60110414",
        "0.5920188",
        "0.59047264",
        "0.586746",
        "0.58317614",
        "0.58202547"
      ],
      "retrieved_goal_rank": -1
    },
    "Edit your photographs using professional editing software.": {
      "corresponding_goal": "Take Professional Photos of Yourself",
      "gold_goal": "Edit Photos",
      "retrieved_goals": [
        "Edit a Photo Like a Pro",
        "Edit Photos",
        "Create Custom Gift Wrap Using Photo Editing Software",
        "Edit",
        "Use PowerPoint as Image Editing Software",
        "Choose Video Editing Software",
        "Edit Photos With GIMP",
        "you edit your photos? | wikiHow Asks a Professional Photographer",
        "Edit a Photo Fit for Print Using Photoshop",
        "Edit Photos with Snapseed"
      ],
      "retrieved_goals_similarity": [
        "0.6993477",
        "0.69080555",
        "0.6828355",
        "0.6386791",
        "0.62810636",
        "0.6273912",
        "0.5799974",
        "0.5734751",
        "0.56682765",
        "0.5550121"
      ],
      "retrieved_goal_rank": 1
    },
    "Make new friends in the LGBTQ+ community if you don\u2019t have support.": {
      "corresponding_goal": "Come Out to Your Friends",
      "gold_goal": "Make Friends",
      "retrieved_goals": [
        "Handle LGBT+ People",
        "Support the National LGBTQ Task Force",
        "Know if You Are LGBTQA",
        "Make Your Office More Inclusive of LGBTQ People",
        "Accept an LGBTQ Person",
        "Celebrate LGBT+ Pride Month",
        "Find a Welcoming College if You Are LGBT",
        "Accept Yourself as LGBT",
        "Get Legal Help for LGBT People",
        "Deal with Pushback to Coming Out As LGBT"
      ],
      "retrieved_goals_similarity": [
        "0.61904585",
        "0.59630716",
        "0.58208776",
        "0.5505156",
        "0.54172355",
        "0.5042738",
        "0.48595458",
        "0.4850396",
        "0.4800845",
        "0.46856755"
      ],
      "retrieved_goal_rank": -1
    }
  }
`

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  s =  s.toLowerCase()
  return s.charAt(0).toUpperCase() + s.slice(1) + "."
}

const parsed = JSON.parse(data);
let graph = []

for (const [index, [key, value]] of Object.entries((Object.entries(parsed)))) {
  parsed[key] = {goal: key, ...parsed[key], index: index}
  graph[index] = parsed[key]
}

for (let i = 0; i < graph.length; i++) {
  graph[i] = {...graph[i], children: []}
  for (let j = 0; j < graph[i].retrieved_goals.length; j++) {
    let child = graph[i].retrieved_goals[j];
    child = capitalize(child)
    let from_parsed = parsed[child]
    if (typeof(from_parsed) !== "undefined") {
      graph[i].children.push(parsed[child].index)
    }
  }
}

for (let i = 0; i < graph.length; i++) {
  console.log(graph[i])
}

let tree = {}



