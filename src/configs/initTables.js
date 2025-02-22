// Require database configuration from db.js
const pool = require("../services/db");

// Require userInfos from userInfos.js
const users = require("./userInfos");

// Create tables
createTables = async () => {
  try {
    // MySQL statement to create tables
    const MYSQLSTATEMENT = `
        DROP TABLE IF EXISTS Messages;

        DROP TABLE IF EXISTS TaskProgress;

        DROP TABLE IF EXISTS Inventory;

        DROP TABLE IF EXISTS PetBonds;

        DROP TABLE IF EXISTS SkillsMastered;

        DROP TABLE IF EXISTS PetActivities;

        DROP TABLE IF EXISTS Task;

        DROP TABLE IF EXISTS User;

        DROP TABLE IF EXISTS Shop;

        DROP TABLE IF EXISTS Pets;
        
        DROP TABLE IF EXISTS Skills;

        CREATE TABLE Task (
            task_id int NOT NULL AUTO_INCREMENT,
            title text,
            description text,
            points int DEFAULT NULL,
            picture text DEFAULT NULL,
            PRIMARY KEY (task_id)
        );

        CREATE TABLE User (
            user_id int PRIMARY KEY AUTO_INCREMENT,
            username text NOT NULL,
            email text NOT NULL,
            password text NOT NULL,
            profile_pic text DEFAULT NULL,
            created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_login_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE Shop (
            item_id int NOT NULL AUTO_INCREMENT,
            item_name VARCHAR(255),
            category VARCHAR(255),
            required_points int DEFAULT NULL,
            PRIMARY KEY (item_id)
        );

        CREATE TABLE Inventory (
            inventory_id int NOT NULL AUTO_INCREMENT,
            user_id int NOT NULL,
            item_id int NOT NULL,
            bought_date timestamp NULL DEFAULT NULL,
            PRIMARY KEY (inventory_id),
            KEY inv_user_id_user_user_id_idx (user_id),
            KEY inv_item_id_shop_item_id_idx (item_id),
            CONSTRAINT inv_item_id_shop_item_id FOREIGN KEY (item_id) REFERENCES Shop (item_id) ON DELETE CASCADE ON UPDATE CASCADE,
            CONSTRAINT inv_user_id_user_user_id FOREIGN KEY (user_id) REFERENCES User (user_id) ON DELETE CASCADE ON UPDATE CASCADE
        );

        CREATE TABLE Pets (
            pet_id int NOT NULL AUTO_INCREMENT,
            pet_name VARCHAR(150),
            rarity VARCHAR(20),
            required_eco_points int DEFAULT NULL,
            description VARCHAR(500),
            picture text DEFAULT NULL,
            PRIMARY KEY (pet_id)
        );

        CREATE TABLE Skills (
            skill_id int NOT NULL AUTO_INCREMENT,
            pet_id int NOT NULL,
            skill_name VARCHAR(25),
            skill_type VARCHAR(25), 
            required_level int DEFAULT NULL,
            description VARCHAR(255),
            PRIMARY KEY (skill_id)
        );

        CREATE TABLE TaskProgress (
          progress_id int NOT NULL AUTO_INCREMENT,
          user_id int NOT NULL,
          pet_id int,
          task_id int NOT NULL,
          completion_date timestamp NULL DEFAULT NULL,
          notes text,
          PRIMARY KEY (progress_id),  
          KEY tp_task_id_task_task_id_idx (task_id),
          KEY tp_user_id_user_user_id_idx (user_id),
          KEY tp_pet_id_pet_pet_id_idx (pet_id),
          CONSTRAINT tp_pet_id_pet_pet_id FOREIGN KEY (pet_id) REFERENCES pets (pet_id) ON DELETE CASCADE ON UPDATE CASCADE,
          CONSTRAINT tp_task_id_task_task_id FOREIGN KEY (task_id) REFERENCES Task (task_id) ON DELETE CASCADE ON UPDATE CASCADE,
          CONSTRAINT tp_user_id_user_user_id FOREIGN KEY (user_id) REFERENCES User (user_id) ON DELETE CASCADE ON UPDATE CASCADE
      );

        CREATE TABLE PetBonds (
            bond_id int NOT NULL AUTO_INCREMENT,
            user_id int NOT NULL,
            pet_id int NOT NULL,
            exp int NOT NULL DEFAULT 0,
            level INT NOT NULL DEFAULT 1,
            next_lv_points INT NOT NULL DEFAULT 100,
            skill_id int DEFAULT NULL,
            PRIMARY KEY (bond_id),
            KEY pb_skill_id_skills_skill_id_idx (skill_id),
            KEY pb_user_id_user_user_id_idx (user_id),
            KEY pb_pet_id_pets_pet_id_idx (pet_id),
            CONSTRAINT pb_skill_id_skills_skill_id FOREIGN KEY (skill_id) REFERENCES skills (skill_id) ON DELETE CASCADE ON UPDATE CASCADE,
            CONSTRAINT pb_pet_id_pets_pet_id FOREIGN KEY (pet_id) REFERENCES pets (pet_id) ON DELETE CASCADE ON UPDATE CASCADE,
            CONSTRAINT pb_user_id_user_user_id FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE ON UPDATE CASCADE
        );

        CREATE TABLE SkillsMastered (
            mastered_skill_id int NOT NULL AUTO_INCREMENT,
            user_id int NOT NULL,
            pet_id int NOT NULL,
            skill_id int NOT NULL,
            PRIMARY KEY (mastered_skill_id),
            KEY sm_user_id_user_user_id_idx (user_id),
            KEY sm_pet_id_pets_pet_id_idx (pet_id),
            KEY sm_skill_id_skills_skill_id_idx (skill_id),
            CONSTRAINT sm_pet_id_pets_pet_id FOREIGN KEY (pet_id) REFERENCES pets (pet_id) ON DELETE CASCADE ON UPDATE CASCADE,
            CONSTRAINT sm_skill_id_skills_skill_id FOREIGN KEY (skill_id) REFERENCES skills (skill_id) ON DELETE CASCADE ON UPDATE CASCADE,
            CONSTRAINT sm_user_id_user_user_id FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE ON UPDATE CASCADE
        );

        CREATE TABLE PetActivities (
            activity_id int NOT NULL AUTO_INCREMENT,
            user_id int NOT NULL,
            pet_id int NOT NULL,
            task_id int NOT NULL,
            completion_date timestamp NULL DEFAULT NULL,
            PRIMARY KEY (activity_id),
            KEY pa_user_id_user_user_id_idx (user_id),
            KEY pa_pet_id_pets_pet_id_idx (pet_id),
            KEY pa_task_id_task_task_id_idx (task_id),
            CONSTRAINT pa_pet_id_pets_pet_id FOREIGN KEY (pet_id) REFERENCES pets (pet_id) ON DELETE CASCADE ON UPDATE CASCADE,
            CONSTRAINT pa_task_id_task_task_id FOREIGN KEY (task_id) REFERENCES task (task_id) ON DELETE CASCADE ON UPDATE CASCADE,
            CONSTRAINT pa_user_id_user_user_id FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE ON UPDATE CASCADE
        );

        CREATE TABLE Messages(
            message_id int NOT NULL AUTO_INCREMENT,
            user_id int NOT NULL,
            message text,
            sent_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (message_id),
            KEY msg_user_id_user_user_id_idx (user_id),
            CONSTRAINT msg_user_id_user_user_id FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE ON UPDATE CASCADE
        )
    `;

    // Await the execution of the MySQL statement (table creation)
    await new Promise((resolve, reject) => {
      pool.query(MYSQLSTATEMENT, (error, results, fields) => {
        // Reject the promise if there is an error creating tables
        if (error) {
          reject(error);
        }
        // Resolve the promise if there is no error creating tables
        else {
          resolve(results);
        }
      });
    });

    // Log message if tables are created successfully
    console.log("Tables Created Successfully.");
  } catch (error) {
    // Log error message if there is an error creating tables
    console.error("Error Creating Tables:", error);
  }
};

// Insert values into User table
insertUserTable = async (data) => {
  try {
    // Loop thorugh all users and insert them into the User table
    for (const user of data) {
      // MySQL statement to insert values into User table
      const MYSQLSTATEMENT = `
        INSERT INTO User (username, email, password, profile_pic) 
        VALUES (?, ?, ?, ?)
    `;

      // Values to be inserted into User table
      const VALUES = [user.username, user.email, user.password, user.profile_pic];

      // Await the execution of the MySQL statement (insert values into User table)
      await new Promise((resolve, reject) => {
        pool.query(MYSQLSTATEMENT, VALUES, (error, results) => {
          // Reject the promise if there is an error inserting values into User table
          if (error) {
            reject(error);
          }
          // Resolve the promise if there is no error inserting values into User table
          else {
            resolve(results);
          }
        });
      });
    }
    // Log message if values are inserted into User table successfully
    console.log("Values Inserted Into User Table Successfully.");
  } catch (error) {
    // Log error message if there is an error inserting values into User table
    console.error("Error Inserting Values Into User Table:", error);
  }
};

// Insert values into the rest of the tables
insertTable = async () => {
  try {
    // MySQL statement to insert values into the rest of the tables
    const MYSQLSTATEMENT = `
        INSERT INTO Task VALUES 
            (1,'Plant a Tree','Plant a tree in your neighbourhood or a designated green area.',50, 'PlantATree.JPEG'),
            (2,'Use Public Transportation','Use public transportation or carpool instead of driving alone.',30, 'UsePublicTransportation.JPEG'),
            (3,'Reduce Plastic Usage','Commit to using reusable bags and containers.',40, 'ReducePlasticUsage.JPEG'),
            (4,'Energy Conservation','Turn off lights and appliances when not in use.',25, 'EnergyConservation.JPEG'),
            (5,'Composting ','Start composting kitchen scraps to create natural fertilizer.',35, 'Composting.JPEG'),
            (6, 'Save Water', 'Practice water-saving habits such as taking shorter showers.', 40, 'SaveWater.JPEG'),
            (7, 'Recycle', 'Sort and recycle your waste to reduce landfill waste.', 30, 'Recycle.JPEG'),
            (8, 'Go Paperless', 'Opt for digital documents instead of printing whenever possible.', 25, 'GoPaperless.JPEG'),
            (9, 'Volunteer for a Cause', 'Spend time volunteering for a charitable organization or cause.', 35, 'VolunteerForACause.JPEG'),
            (10, 'Buy Local Produce', 'Support local farmers by purchasing locally grown produce.', 30, 'BuyLocalProduce.JPEG'),
            (11, 'Reduce Food Waste', 'Plan meals and store leftovers to minimize food waste.', 25, 'ReduceFoodWaste.JPEG'),
            (12, 'Switch to LED Bulbs', 'Replace traditional light bulbs with energy-efficient LED bulbs.', 20, 'LEDLights.JPEG'),
            (13, 'Unplug Electronics', 'Unplug electronic devices when not in use to save energy.', 20, 'UnplugElectronics.JPEG'),
            (14, 'Donate Unused Items', 'Donate clothes, furniture, or other items to those in need.', 60, 'DonateUnusedItems.JPEG'),
            (15, 'Green Clean Products', 'Switch to environmentally friendly cleaning products.', 25, 'EcofriendlyCleaningProducts.JPEG');

        INSERT INTO TaskProgress (progress_id, user_id, task_id, completion_date, notes) VALUES
            (1,1,2,'2023-11-20 07:00:00','Went to school by MRT'),
            (2,1,3,'2023-11-14 08:00:00','Brought a reusable bag to the convenience store'),
            (3,3,4,'2024-11-24 22:00:00','Open windows in daytime to get fresh air and brightness'),
            (4,2,5,'2023-08-03 10:00:00','Preserve Egg Scraps for fertilizer'),
            (5,5,1,'2023-01-14 07:00:00','Took bus to work'),
            (6,5,3,'2023-10-08 18:00:00','Used tote bag to buy groceries'),
            (7,2,5,'2023-09-18 08:00:00','Tea leaves for fertilizer'),
            (8,3,4,'2023-11-21 09:00:00','Switched off lights when not in use'),
            (9,3,2,'2023-07-07 07:00:00','Went woodlands by MRT'),
            (10,4,2,'2023-11-20 07:00:00','Went to school by MRT'),
            (11,1,2,'2023-04-20 08:00:00','Went work by MRT'),
            (12,2,1, '2023-01-20 07:00:00','Planted some roses'),
            (13,3,2, '2023-03-01 13:00:00','Walked to East Coast Park'),
            (14,1,4, '2023-06-15 11:00:00','Solar lamps for daytime energy saving'),
            (15,1,5, '2023-11-14 10:00:00','Seeds for composting'),
            (16,1,14, '2023-09-01 08:00:00','Donated old school text books to charity'),
            (17,2,14, '2023-01-10 15:00:00','Donated old shoes to charity'),
            (18,3,14, '2024-11-14 10:00:00','Donated old clothes to charity'),
            (19,5,14, '2024-12-15 15:00:00','Donated books to library'),
            (20,4,14, '2024-01-12 18:00:00','Donated old clothes to charity'),
            (21,4,6, '2024-02-13 20:00:00', 'Took shorter showers'),
            (22,5,6, '2024-02-13 20:00:00', 'Took shorter showers'),
            (23,1,6, '2024-02-13 20:00:00', 'Donated unused clothes'),
            (24,2,6, '2024-02-13 20:00:00', 'Donated unused clothes'),
            (25,3,6, '2024-02-13 20:00:00', 'Donated unused clothes');

        INSERT INTO Shop (item_name, category, required_points) VALUES
            ('Reusable tote bag', 'Everyday Essentials', 5),
            ('Reusable water bottle', 'Everyday Essentials', 10),
            ('Reusable coffee cup', 'Everyday Essentials', 15),
            ('Reusable straws', 'Everyday Essentials', 5),
            ('Reusable food wraps', 'Food & Kitchen', 10),
            ('Reusable produce bags', 'Food & Kitchen', 5),
            ('Reusable cutlery set', 'Food & Kitchen', 20),
            ('LED lightbulbs', 'Energy & Home', 10),
            ('Energy-saving power strip', 'Energy & Home', 15),
            ('Low-flow showerhead', 'Energy & Home', 20),
            ('Smart thermostat', 'Energy & Home', 30),
            ('Solar-powered phone charger', 'Energy & Home', 40),
            ('Natural shampoo and conditioner bars', 'Personal Care', 15),
            ('Bamboo toothbrushes', 'Personal Care', 10),
            ('Compostable dental floss', 'Personal Care', 5),
            ('Reusable makeup remover pads', 'Personal Care', 10),
            ('Solid soap bars', 'Personal Care', 5),
            ('Organic cotton t-shirt', 'Sustainable Fashion', 40),
            ('Recycled polyester jacket', 'Sustainable Fashion', 50),
            ('Upcycled tote bag', 'Sustainable Fashion', 30),
            ('Ethically sourced jewelry', 'Sustainable Fashion', 60),
            ('Vegan leather belt', 'Sustainable Fashion', 40),
            ('Locally grown vegetables', 'Food & Health', 10),
            ('Package-free grains and beans', 'Food & Health', 5),
            ('Vegan snacks', 'Food & Health', 15),
            ('Plant-based milk', 'Food & Health', 20),
            ('Compost bin', 'Green Living', 30),
            ('Seed packets', 'Green Living', 10),
            ('Reusable notebook and pen', 'Green Living', 20),
            ('Donation to charity', 'Green Giving', 100);

        INSERT INTO Inventory VALUES (1,1,2, '2023-12-20 00:00:00'), (2,1,2, '2023-12-25 00:00:00'), (3,2,1, '2023-12-22 00:00:00'), (4,5,4, '2023-12-31 00:00:00');

        INSERT INTO Pets (pet_name, rarity, required_eco_points, description, picture) VALUES
            ("Windwhisper", "Common", 125, "Playful breeze spirit, dancing on leaves and carrying forgotten melodies. Usually found in forests and mountains. It is said that good fortune will be brought if one were to be able to see one", "Windwhisper.JPEG"),
            ("Stoneheart", "Common", 150, "Steadfast earth guardian, strong and silent, with moss in its fur. Usually found on top of mountains and caves. Shed gems in summer. The gems vary in color and value. Some are even adorned by people as jewels.", "Stoneheart.JPEG"),
            ("Emberflare", "Common", 175, "Mischievous spark of fire, leaving trails of glowing dust and laughter. It can be found near volcanoes and small villages. Usually trick kids and bring them to random places and play with them.", "Emberflare.JPEG"),
            ("Moonbeam", "Common", 200, "Luminous wisp of moonlight, bringing gentle dreams and shimmering hope. It is usually visible only on moonlit nights near forests and mountains. Thou it may seem scary, it is actually gentle and good-hearted. Guide lost people in forests.", "Moonbeam.JPEG"),
            ("Cloversprite", "Uncommon", 250, "Lucky companion, clover-marked fur radiating charm and finding treasures. One is brought a good fortune upon adopting or seeing it. Some even worshipped it for better income.", "Cloversprite.JPEG"),
            ("Azure Zephyr", "Uncommon", 350, "Swift messenger of the air, weaving through currents and secrets unseen. It only comes out in winter in hilly regions and are often referred to us the wind surfers. Their agility in air is skilful than any other creatures.", "Azurezephyr.JPEG"),
            ("Silverstream", "Uncommon", 375, "Graceful water spirit, leaving trails of sparkling drops and soothing melodies. Reports have found that it stays near lakes inside forests and mountains. Some have even saw it walking on the water surface.", "Silverstream.JPEG"),
            ("Mosswhisper", "Uncommon", 400, "Wise forest shaman, speaking through rustling leaves and offering prophecies. Its fortunes are quite true. Visible in some small towns stalls. You can just show your hand and it will reveal the possible future you withhold.", "Mosswhisper.JPEG"),
            ("Suncatcher", "Rare", 500, "Joyful sunbeam sprite, chasing warmth and igniting laughter wherever it flies. Very Rare to see during the year. However, it is said that on a sunny day with rainbows and sunshine, its golden feathers flap and descend on the highest mountain in the world to bathe in sun.", "Suncatcher.JPEG"),
            ("Duskwing", "Rare", 550, "Mesmerizing twilight creature, cloaked in shadows and shimmering with stardust. Travels across night sky. Some even travel far into space and guard the planet. It is said that it purifies evil spirits at night time.", "Duskwing.JPEG"),
            ("Stormbreaker", "Rare", 600, "Majestic wind spirit, riding gales and commanding the whispers of the world. The creation of storms. Don't even try to mock them. They're very impatient and easily influenced. However, once it trusts you, you can even conquer the world.", "Stormbreaker.JPEG"),
            ("Everglow", "Rare", 650, "Radiant moonbeam, woven from stardust and illuminating paths through darkness. A partner in justice of duskwing. Aid in purification of evil spirits at night. Usually seen at night time on top of mountains. Its distinct glow can be seen clearly on cloudless days.", "Everglow.JPEG"),
            ("Willowwisp", "Rare", 700, "Mystical protector of the forest, weaving spells of light and shadow. Sweet creatures who control the lifeforce of forests. Trees and animals thrive because of them. It is said that the world knowledge is passed down to them from generation to generations.", "WilloWwisp.JPEG"),
            ("Sunforge", "Legendary", 850, "Blazing spirit of fire, crafting wonders from stardust and leaving molten gold.Each flicker a testament to the eternal dance of creation, it sculpts galaxies from the void and breathes life into the celestial canvas", "Sunforge.JPEG"),
            ("Moonstone Wyvern", "Legendary", 950, "Majestic dragon bathed in moonlight, scales shimmering with lunar magic. The creator and the guardian of the moon. It is said that the moon was crafted with the power of its breath. It also has thousands of beasts serving him on the moon.", "MoonstoneWyvern.JPEG"),
            ("Sylphsong", "Legendary", 1050, "Dazzling starsprite, weaving galaxies with melodies and bringing dreams to life. The guardian of the galaxies. It protects space and time, some aliens and galaxy dominators. It is said that it has never been defeated in battle with others.", "Sylphsong.JPEG"),
            ("Stardust Wyrm", "Legendary", 1200, "Celestial dragon adorned with constellations, breath echoing creation. The father of constellations and zodia signs. It bestows the power of fortuned and luck to its owner or those whom he treasures and loves dearly.", "Azurezephyr.JPEG"),
            ("Dreamwalker", "Legendary", 1350, "Mystifying phantom, traversing forgotten realms and offering hidden wonders. The creator of dreams. Reality can be manipulated with a twist of its fingers. It is the most powerful creature in the whole universe who can do anything he wanted to do.", "DreamWalker.JPEG"),
            ("Everember Phoenix", "Legendary", 1500, "Blazing bird of endless rebirth, dispelling darkness and leaving hope. It is said that on days when people lose hope, it flies out from the sun, flap feathers, and shatter blastering feathers to bring joy and hope. So far, noone has ever witnessed the phoenix.", "Phoenix.JPEG");  

        INSERT INTO Petbonds (user_id, pet_id) VALUES (1, 4), (2, 3), (3, 2), (4,1), (5,2);

        INSERT INTO Skills (pet_id, skill_name, skill_type, required_level, description) VALUES
            (1, "Seed Sprout", "Air", 1, "Gently scatters seeds from nearby plants, promoting natural regeneration."),
            (1, "Whisperwind Blast", "Air", 5, "Disperses airborne pollutants for cleaner air, leaving a sparkling breeze."),
            (1, "Leaf Symphony", "Air", 10, "Encourages pollinating insects with a musical harmony, increasing plant health."),
            (1, "Air Purifying Vortex", "Air", 15, "Creates a temporary vortex that filters dust and toxins from the surrounding area."),

            (2, "Erosion Barrier", "Earth", 1, "Stabilizes loose soil with sturdy roots, preventing soil erosion."),
            (2, "Rockfall Cleanup", "Earth", 5, "Clears paths clogged with debris, aiding in environmental restoration."),
            (2, "Earthwhisper Chant", "Earth", 10, "Promotes plant growth and soil health through resonant vibrations."),
            (2, "Stone Guardian Shield", "Earth", 15, "Creates a protective barrier of earth and rock, shielding vulnerable areas from natural disasters."),

            (3, "Sunlight Gather", "Fire", 1, "Captures a tiny spark of sunlight, converting it into usable energy for small devices."),
            (3, "Smoke Dance", "Fire", 5, "Neutralizes harmful smoke emissions from machinery or wildfires, leaving behind a refreshing scent."),
            (3, "Ash Seedling", "Fire", 10, "Transforms ash into fertile soil, promoting life in barren areas."),
            (3, "Solar Pulse", "Fire", 15, "Emits a burst of concentrated solar energy, powering nearby equipment or activating dormant seeds."),

            (4, "Dreamy Dewdrop", "Moonlight", 1, "Creates a delicate dewdrop imbued with moonlight, reviving wilting plants."),
            (4, "Luminescent Path", "Moonlight", 5, "Illuminates a path with soft moonlight, reducing reliance on artificial lighting."),
            (4, "Moonshadow Camouflage", "Moonlight", 10, "Cloaks pets and nearby creatures in shimmering moonlight, protecting them from harm."),
            (4, "Starlight Beacon", "Moonlight", 15, "Creates a beacon of concentrated moonlight, guiding lost animals and promoting nighttime navigation."),

            (5, "Lucky Finder", "Nature", 1, "Uses its charm to discover hidden caches of seeds or sustainable resources."),
            (5, "Sprout Burst", "Nature", 5, "Encourages abundant growth in nearby soil, creating a mini-garden of useful plants."),
            (5, "Rainbow Bridge", "Nature", 10, "Creates a shimmering bridge of light, guiding others towards eco-friendly solutions."),
            (5, "Clover Blossom Shield", "Nature", 15, "Protects vulnerable areas with a vibrant barrier of blooming clovers, absorbing pollutants and nurturing the land."),

            (6, "Silent Gust", "Air", 1, "Creates a gentle breeze that disperses dust and debris, keeping paths clean and air fresh."),
            (6, "Whirling Seed", "Air", 5, "Carries a seed on a whirlwind journey, finding the perfect spot for a new tree to sprout."),
            (6, "Cloud Song Serenade", "Air", 10, "Lulls clouds into releasing gentle rain, nourishing the land without waste."),
            (6, "Storm Whisperer", "Air", 15, "Calms turbulent winds and redirects stormy weather, protecting vulnerable areas from natural disasters."),

            (7, "Crystal Purify", "Water", 1, "Cleans stagnant water with a touch of shimmering essence, making it drinkable and vibrant."),
            (7, "Dancing Flow", "Water", 5, "Guides water streams away from erosion-prone areas, nourishing the land without harm."),
            (7, "Moonlight Mist", "Water", 10, "Creates a soothing mist that condenses into pure dew, reviving parched earth."),
            (7, "River Song Harmony", "Water", 15, "Restores balance to polluted waterways with a melodic tune, promoting healthy aquatic life."),

            (8, "Forest Balm", "Nature", 1, "Creates a healing salve from moss and leaves, mending injured plants and fostering growth."),
            (8, "Ancient Oak Shield", "Nature", 5, "Empowers nearby trees with ancient wisdom, strengthening them against damage and promoting healthy ecosystems."),
            (8, "Whispering Grove", "Nature", 10, "Lures lost animals back to safety with a mesmerizing dance of rustling leaves and whispering voices."),
            (8, "Living Bridge", "Nature", 15, "Grows sturdy vines and branches into a temporary bridge, allowing safe passage across natural obstacles."),

            (9, "Solar Spark", "Fire", 1, "Ignites a tiny flame that burns eternally, providing warmth and light without fuel."),
            (9, "Sunbeam Dance", "Fire", 5, "Guides sunlight beams to hidden shadows, maximizing solar energy for sustainable needs."),
            (9, "Rainbow Bloom", "Fire", 10, "Infuses a flower with rainbow energy, transforming it into a vibrant beacon of light and hope."),
            (9, "Living Lantern", "Fire", 15, "Creates a lantern from trapped sunlight, illuminating paths and spreading warmth without depleting resources."),

            (10, "Starlight Weaver", "Cosmic", 1, "Repairs damaged constellations with stardust gathered in the night, restoring balance to the sky."),
            (10, "Moonbeam Barrier", "Cosmic", 5, "Creates a shimmering shield of moonlight, protecting nocturnal creatures from harmful light pollution."),
            (10, "Lullaby of Shadows", "Cosmic", 10, "Soothes agitated animals with a calming melody born from the night, promoting peaceful coexistence."),
            (10, "Dreamcatcher Guardian", "Cosmic", 15, "Weaves a shimmering web of dreams that protects against nightmares and fosters peaceful slumber, even for restless creatures."),

            (11, "Wind Whisper", "Air", 1, "Speaks the language of winds, understanding weather patterns and predicting storms."),
            (11, "Gale Sculptor", "Air", 5, "Shapes gentle gusts into playful twisters, clearing debris and spreading seeds with playful energy."),
            (11, "Storm Surge", "Air", 10, "Channels wind energy into a protective barrier, shielding vulnerable areas from tempestuous weather."),
            (11, "Singing Cloud Symphony", "Air", 15, "Commands clouds to weave intricate formations, promoting air purification and regulating rainfall."),

            (12, "Moonlight Whisper", "Moonlight", 1, "Lulls restless creatures into serene slumber with a soft, moonlit glow."),
            (12, "Starbloom Garden", "Moonlight", 5, "Nurtures hidden seeds with moonlight essence, transforming barren spots into luminous flowerbeds."),
            (12, "Dream Weaver", "Moonlight", 10, "Creates shimmering dreamscapes, guiding lost souls back to reality and encouraging peaceful coexistence."),
            (12, "Celestial Beacon", "Moonlight", 15, "Projects a radiant starbeam, illuminating paths and offering hope in moments of darkness."),

            (13, "Forest Guardian's Dance", "Nature", 1, "Creates dancing illusions to distract predators and protect vulnerable creatures."),
            (13, "Vine Bridge Weaver", "Nature", 5, "Sprouts flexible vines into sturdy bridges, granting safe passage across hidden trails."),
            (13, "Whispering Grove Guardian", "Nature", 10, "Merges with the forest essence, becoming invisible and silent while guarding against threats."),
            (13, "Springtime Blossom", "Nature", 15, "Awakens dormant trees and flowers with a touch of vibrant magic, rejuvenating the forest after harsh winters."),

            (14, "Sunlight Weaver", "Fire", 1, "Manipulates sunlight into playful sparks, igniting small campfires or activating dormant technology."),
            (14, "Molten Bloom", "Fire", 5, "Transforms barren rock into fertile soil with bursts of molten energy, promoting new life in desolate areas."),
            (14, "Solstice Spark", "Fire", 10, "Channels the sun's power into a focused beam, driving away darkness and purifying polluted areas."),
            (14, "Living Forge", "Fire", 15, "Creates a temporary forge from molten sand and sunlight, allowing sustainable crafting and repairs."),

            (15, "Lunar Tidal Song", "Water", 1, "Calms choppy waters with soothing moonlight melodies, ensuring safe passage across moonlit seas."),
            (15, "Stardust Shimmer", "Water", 5, "Creates protective scales of shimmering stardust, deflecting harmful projectiles and shielding allies."),
            (15, "Dreamflight Navigation", "Water", 10, "Guides through treacherous landscapes by interpreting constellations and celestial patterns."),
            (15, "Lunar Cascade", "Water", 15, "Summons a cleansing waterfall of moonlight, purifying polluted waterways and invigorating dormant life."),

            (16, "Melody of Creation", "Nature", 1, "Encourages new life with sweet musical notes, promoting the growth of diverse plants and flowers."),
            (16, "Stardust Duststorm", "Nature", 5, "Creates a swirling vortex of stardust, mending damaged ecosystems and restoring balance to nature."),
            (16, "Lullaby of the Cosmos", "Nature", 10, "Soothes enraged creatures with a celestial symphony, calming storms and bringing peace to agitated souls."),
            (16, "Dream Weaver's Galaxy", "Nature", 15, "Paints constellations onto the night sky, inspiring wonder and reminding others of the interconnectedness of all life."),

            (17, "Cosmic Weaver", "Cosmic", 1, "Repairs minor tears in the fabric of reality, strengthening the boundaries between realms."),
            (17, "Asteroid Rain Shower", "Cosmic", 5, "Summons harmless showers of stardust that nourish the land with celestial minerals."),
            (17, "Meteor Guardian", "Cosmic", 10, "Creates a celestial shield from falling stars, protecting vulnerable areas from cosmic debris."),
            (17, "Stardust Seed", "Cosmic", 15, "Plants a luminous seed that grows into a magnificent tree filled with constellations, a beacon of hope and resilience."),

            (18, "Hidden Path Finder", "Dream", 1, "Senses and reveals hidden pathways through forgotten realms, leading to forgotten wisdom and treasures."),
            (18, "Lullaby of Lost Memories", "Dream", 5, "Soothes restless spirits with dream whispers, helping them find peace and move on."),
            (18, "Whispering Glade", "Dream", 10, "Transforms a hostile area into a serene haven, fostering peace and understanding between creatures."),
            (18, "Dream Bridge Architect", "Dream", 15, "Constructs shimmering bridges across the dream world, connecting individuals and unlocking forgotten knowledge."),

            (19, "Spark of Renewal", "Fire", 1, "Ignites withered plants with a tiny ember, encouraging new growth and revitalizing barren lands."),
            (19, "Cinder Bloom", "Fire", 5, "Transforms ash into vibrant flowers, symbolizing beauty born from destruction and fostering sustainable life-cycles."),
            (19, "Solar Blaze Wings", "Fire", 10, "Enhances flight with blazing wings, leaving a trail of rejuvenating embers and dispersing pollutants."),
            (19, "Phoenix Rebirth", "Fire", 15, "Consumes itself in a dazzling inferno, only to rise anew with renewed strength and wisdom, offering hope and resilience in times of darkness.");

        INSERT INTO Messages (user_id, message) VALUES
            (1, "Hello!"),
            (2, "I'm new here!"),
            (3, "How do I start?"),
            (1, "Hello! Nice to see you :)"),
            (2, "Add me!!"),
            (4, "I'm scoring today wooo hooooo")
    `;

    // Await the execution of the MySQL statement (insert values into the rest of the tables)
    await new Promise((resolve, reject) => {
      pool.query(MYSQLSTATEMENT, (error, results) => {
        // Reject the promise if there is an error inserting values into the rest of the tables
        if (error) {
          reject(error);
        }
        // Resolve the promise if there is no error inserting values into the rest of the tables
        else {
          resolve(results);
        }
      });
    });
    // Log message if values are inserted into tables successfully
    console.log("Values Inserted Into Tables Successfully.");
  } catch (error) {
    // Log error message if there is an error inserting values into tables
    console.error("Error Inserting Values Into Tables:", error);
  }
};

// Asynchronous function to load database
loadDatabase = async () => {
  // Try to create tables, insert values into User table and the rest of the tables
  try {
    await createTables();
    await insertUserTable(users.userInfos);
    await insertTable();
    process.exit();
  } 
  // If there is an error loading database, log error message and exit the process
  catch (error) {
    console.error("Error loading database:", error);
    process.exit();
  }
};

// Call Function to Load Database
loadDatabase();