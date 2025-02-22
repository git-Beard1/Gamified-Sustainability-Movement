CREATE DATABASE  IF NOT EXISTS `ca2gsm` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ca2gsm`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: ca2gsm
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory` (
  `inventory_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `item_id` int NOT NULL,
  `bought_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`inventory_id`),
  KEY `inv_user_id_user_user_id_idx` (`user_id`),
  KEY `inv_item_id_shop_item_id_idx` (`item_id`),
  CONSTRAINT `inv_item_id_shop_item_id` FOREIGN KEY (`item_id`) REFERENCES `shop` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `inv_user_id_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` VALUES (1,1,2,'2023-12-19 16:00:00'),(2,1,2,'2023-12-24 16:00:00'),(3,2,1,'2023-12-21 16:00:00'),(4,5,4,'2023-12-30 16:00:00');
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `message_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `message` text,
  `sent_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`message_id`),
  KEY `msg_user_id_user_user_id_idx` (`user_id`),
  CONSTRAINT `msg_user_id_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,1,'Hello!','2024-02-03 14:31:08'),(2,2,'I\'m new here!','2024-02-03 14:31:08'),(3,3,'How do I start?','2024-02-03 14:31:08'),(4,1,'Hello! Nice to see you :)','2024-02-03 14:31:08'),(5,2,'Add me!!','2024-02-03 14:31:08'),(6,4,'I\'m scoring today wooo hooooo','2024-02-03 14:31:08');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `petactivities`
--

DROP TABLE IF EXISTS `petactivities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `petactivities` (
  `activity_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `pet_id` int NOT NULL,
  `task_id` int NOT NULL,
  `completion_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`activity_id`),
  KEY `pa_user_id_user_user_id_idx` (`user_id`),
  KEY `pa_pet_id_pets_pet_id_idx` (`pet_id`),
  KEY `pa_task_id_task_task_id_idx` (`task_id`),
  CONSTRAINT `pa_pet_id_pets_pet_id` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`pet_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pa_task_id_task_task_id` FOREIGN KEY (`task_id`) REFERENCES `task` (`task_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pa_user_id_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `petactivities`
--

LOCK TABLES `petactivities` WRITE;
/*!40000 ALTER TABLE `petactivities` DISABLE KEYS */;
/*!40000 ALTER TABLE `petactivities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `petbonds`
--

DROP TABLE IF EXISTS `petbonds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `petbonds` (
  `bond_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `pet_id` int NOT NULL,
  `exp` int NOT NULL DEFAULT '0',
  `level` int NOT NULL DEFAULT '1',
  `next_lv_points` int NOT NULL DEFAULT '100',
  `skill_id` int DEFAULT NULL,
  PRIMARY KEY (`bond_id`),
  KEY `pb_skill_id_skills_skill_id_idx` (`skill_id`),
  KEY `pb_user_id_user_user_id_idx` (`user_id`),
  KEY `pb_pet_id_pets_pet_id_idx` (`pet_id`),
  CONSTRAINT `pb_pet_id_pets_pet_id` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`pet_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pb_skill_id_skills_skill_id` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`skill_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pb_user_id_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `petbonds`
--

LOCK TABLES `petbonds` WRITE;
/*!40000 ALTER TABLE `petbonds` DISABLE KEYS */;
INSERT INTO `petbonds` VALUES (1,1,4,0,1,100,NULL),(2,2,3,0,1,100,NULL),(3,3,2,0,1,100,NULL),(4,4,1,0,1,100,NULL),(5,5,2,0,1,100,NULL);
/*!40000 ALTER TABLE `petbonds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pets`
--

DROP TABLE IF EXISTS `pets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pets` (
  `pet_id` int NOT NULL AUTO_INCREMENT,
  `pet_name` varchar(150) DEFAULT NULL,
  `rarity` varchar(20) DEFAULT NULL,
  `required_eco_points` int DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `picture` text,
  PRIMARY KEY (`pet_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pets`
--

LOCK TABLES `pets` WRITE;
/*!40000 ALTER TABLE `pets` DISABLE KEYS */;
INSERT INTO `pets` VALUES (1,'Windwhisper','Common',125,'Playful breeze spirit, dancing on leaves and carrying forgotten melodies. Usually found in forests and mountains. It is said that good fortune will be brought if one were to be able to see one','Windwhisper.JPEG'),(2,'Stoneheart','Common',150,'Steadfast earth guardian, strong and silent, with moss in its fur. Usually found on top of mountains and caves. Shed gems in summer. The gems vary in color and value. Some are even adorned by people as jewels.','Stoneheart.JPEG'),(3,'Emberflare','Common',175,'Mischievous spark of fire, leaving trails of glowing dust and laughter. It can be found near volcanoes and small villages. Usually trick kids and bring them to random places and play with them.','Emberflare.JPEG'),(4,'Moonbeam','Common',200,'Luminous wisp of moonlight, bringing gentle dreams and shimmering hope. It is usually visible only on moonlit nights near forests and mountains. Thou it may seem scary, it is actually gentle and good-hearted. Guide lost people in forests.','Moonbeam.JPEG'),(5,'Cloversprite','Uncommon',250,'Lucky companion, clover-marked fur radiating charm and finding treasures. One is brought a good fortune upon adopting or seeing it. Some even worshipped it for better income.','Cloversprite.JPEG'),(6,'Azure Zephyr','Uncommon',350,'Swift messenger of the air, weaving through currents and secrets unseen. It only comes out in winter in hilly regions and are often referred to us the wind surfers. Their agility in air is skilful than any other creatures.','Azurezephyr.JPEG'),(7,'Silverstream','Uncommon',375,'Graceful water spirit, leaving trails of sparkling drops and soothing melodies. Reports have found that it stays near lakes inside forests and mountains. Some have even saw it walking on the water surface.','Silverstream.JPEG'),(8,'Mosswhisper','Uncommon',400,'Wise forest shaman, speaking through rustling leaves and offering prophecies. Its fortunes are quite true. Visible in some small towns stalls. You can just show your hand and it will reveal the possible future you withhold.','Mosswhisper.JPEG'),(9,'Suncatcher','Rare',500,'Joyful sunbeam sprite, chasing warmth and igniting laughter wherever it flies. Very Rare to see during the year. However, it is said that on a sunny day with rainbows and sunshine, its golden feathers flap and descend on the highest mountain in the world to bathe in sun.','Suncatcher.JPEG'),(10,'Duskwing','Rare',550,'Mesmerizing twilight creature, cloaked in shadows and shimmering with stardust. Travels across night sky. Some even travel far into space and guard the planet. It is said that it purifies evil spirits at night time.','Duskwing.JPEG'),(11,'Stormbreaker','Rare',600,'Majestic wind spirit, riding gales and commanding the whispers of the world. The creation of storms. Don\'t even try to mock them. They\'re very impatient and easily influenced. However, once it trusts you, you can even conquer the world.','Stormbreaker.JPEG'),(12,'Everglow','Rare',650,'Radiant moonbeam, woven from stardust and illuminating paths through darkness. A partner in justice of duskwing. Aid in purification of evil spirits at night. Usually seen at night time on top of mountains. Its distinct glow can be seen clearly on cloudless days.','Everglow.JPEG'),(13,'Willowwisp','Rare',700,'Mystical protector of the forest, weaving spells of light and shadow. Sweet creatures who control the lifeforce of forests. Trees and animals thrive because of them. It is said that the world knowledge is passed down to them from generation to generations.','WilloWwisp.JPEG'),(14,'Sunforge','Legendary',850,'Blazing spirit of fire, crafting wonders from stardust and leaving molten gold.Each flicker a testament to the eternal dance of creation, it sculpts galaxies from the void and breathes life into the celestial canvas','Sunforge.JPEG'),(15,'Moonstone Wyvern','Legendary',950,'Majestic dragon bathed in moonlight, scales shimmering with lunar magic. The creator and the guardian of the moon. It is said that the moon was crafted with the power of its breath. It also has thousands of beasts serving him on the moon.','MoonstoneWyvern.JPEG'),(16,'Sylphsong','Legendary',1050,'Dazzling starsprite, weaving galaxies with melodies and bringing dreams to life. The guardian of the galaxies. It protects space and time, some aliens and galaxy dominators. It is said that it has never been defeated in battle with others.','Sylphsong.JPEG'),(17,'Stardust Wyrm','Legendary',1200,'Celestial dragon adorned with constellations, breath echoing creation. The father of constellations and zodia signs. It bestows the power of fortuned and luck to its owner or those whom he treasures and loves dearly.','Azurezephyr.JPEG'),(18,'Dreamwalker','Legendary',1350,'Mystifying phantom, traversing forgotten realms and offering hidden wonders. The creator of dreams. Reality can be manipulated with a twist of its fingers. It is the most powerful creature in the whole universe who can do anything he wanted to do.','DreamWalker.JPEG'),(19,'Everember Phoenix','Legendary',1500,'Blazing bird of endless rebirth, dispelling darkness and leaving hope. It is said that on days when people lose hope, it flies out from the sun, flap feathers, and shatter blastering feathers to bring joy and hope. So far, noone has ever witnessed the phoenix.','Phoenix.JPEG');
/*!40000 ALTER TABLE `pets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shop`
--

DROP TABLE IF EXISTS `shop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shop` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `item_name` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `required_points` int DEFAULT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shop`
--

LOCK TABLES `shop` WRITE;
/*!40000 ALTER TABLE `shop` DISABLE KEYS */;
INSERT INTO `shop` VALUES (1,'Reusable tote bag','Everyday Essentials',5),(2,'Reusable water bottle','Everyday Essentials',10),(3,'Reusable coffee cup','Everyday Essentials',15),(4,'Reusable straws','Everyday Essentials',5),(5,'Reusable food wraps','Food & Kitchen',10),(6,'Reusable produce bags','Food & Kitchen',5),(7,'Reusable cutlery set','Food & Kitchen',20),(8,'LED lightbulbs','Energy & Home',10),(9,'Energy-saving power strip','Energy & Home',15),(10,'Low-flow showerhead','Energy & Home',20),(11,'Smart thermostat','Energy & Home',30),(12,'Solar-powered phone charger','Energy & Home',40),(13,'Natural shampoo and conditioner bars','Personal Care',15),(14,'Bamboo toothbrushes','Personal Care',10),(15,'Compostable dental floss','Personal Care',5),(16,'Reusable makeup remover pads','Personal Care',10),(17,'Solid soap bars','Personal Care',5),(18,'Organic cotton t-shirt','Sustainable Fashion',40),(19,'Recycled polyester jacket','Sustainable Fashion',50),(20,'Upcycled tote bag','Sustainable Fashion',30),(21,'Ethically sourced jewelry','Sustainable Fashion',60),(22,'Vegan leather belt','Sustainable Fashion',40),(23,'Locally grown vegetables','Food & Health',10),(24,'Package-free grains and beans','Food & Health',5),(25,'Vegan snacks','Food & Health',15),(26,'Plant-based milk','Food & Health',20),(27,'Compost bin','Green Living',30),(28,'Seed packets','Green Living',10),(29,'Reusable notebook and pen','Green Living',20),(30,'Donation to charity','Green Giving',100);
/*!40000 ALTER TABLE `shop` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skills` (
  `skill_id` int NOT NULL AUTO_INCREMENT,
  `pet_id` int NOT NULL,
  `skill_name` varchar(25) DEFAULT NULL,
  `skill_type` varchar(25) DEFAULT NULL,
  `required_level` int DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`skill_id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skills`
--

LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
INSERT INTO `skills` VALUES (1,1,'Seed Sprout','Air',1,'Gently scatters seeds from nearby plants, promoting natural regeneration.'),(2,1,'Whisperwind Blast','Air',5,'Disperses airborne pollutants for cleaner air, leaving a sparkling breeze.'),(3,1,'Leaf Symphony','Air',10,'Encourages pollinating insects with a musical harmony, increasing plant health.'),(4,1,'Air Purifying Vortex','Air',15,'Creates a temporary vortex that filters dust and toxins from the surrounding area.'),(5,2,'Erosion Barrier','Earth',1,'Stabilizes loose soil with sturdy roots, preventing soil erosion.'),(6,2,'Rockfall Cleanup','Earth',5,'Clears paths clogged with debris, aiding in environmental restoration.'),(7,2,'Earthwhisper Chant','Earth',10,'Promotes plant growth and soil health through resonant vibrations.'),(8,2,'Stone Guardian Shield','Earth',15,'Creates a protective barrier of earth and rock, shielding vulnerable areas from natural disasters.'),(9,3,'Sunlight Gather','Fire',1,'Captures a tiny spark of sunlight, converting it into usable energy for small devices.'),(10,3,'Smoke Dance','Fire',5,'Neutralizes harmful smoke emissions from machinery or wildfires, leaving behind a refreshing scent.'),(11,3,'Ash Seedling','Fire',10,'Transforms ash into fertile soil, promoting life in barren areas.'),(12,3,'Solar Pulse','Fire',15,'Emits a burst of concentrated solar energy, powering nearby equipment or activating dormant seeds.'),(13,4,'Dreamy Dewdrop','Moonlight',1,'Creates a delicate dewdrop imbued with moonlight, reviving wilting plants.'),(14,4,'Luminescent Path','Moonlight',5,'Illuminates a path with soft moonlight, reducing reliance on artificial lighting.'),(15,4,'Moonshadow Camouflage','Moonlight',10,'Cloaks pets and nearby creatures in shimmering moonlight, protecting them from harm.'),(16,4,'Starlight Beacon','Moonlight',15,'Creates a beacon of concentrated moonlight, guiding lost animals and promoting nighttime navigation.'),(17,5,'Lucky Finder','Nature',1,'Uses its charm to discover hidden caches of seeds or sustainable resources.'),(18,5,'Sprout Burst','Nature',5,'Encourages abundant growth in nearby soil, creating a mini-garden of useful plants.'),(19,5,'Rainbow Bridge','Nature',10,'Creates a shimmering bridge of light, guiding others towards eco-friendly solutions.'),(20,5,'Clover Blossom Shield','Nature',15,'Protects vulnerable areas with a vibrant barrier of blooming clovers, absorbing pollutants and nurturing the land.'),(21,6,'Silent Gust','Air',1,'Creates a gentle breeze that disperses dust and debris, keeping paths clean and air fresh.'),(22,6,'Whirling Seed','Air',5,'Carries a seed on a whirlwind journey, finding the perfect spot for a new tree to sprout.'),(23,6,'Cloud Song Serenade','Air',10,'Lulls clouds into releasing gentle rain, nourishing the land without waste.'),(24,6,'Storm Whisperer','Air',15,'Calms turbulent winds and redirects stormy weather, protecting vulnerable areas from natural disasters.'),(25,7,'Crystal Purify','Water',1,'Cleans stagnant water with a touch of shimmering essence, making it drinkable and vibrant.'),(26,7,'Dancing Flow','Water',5,'Guides water streams away from erosion-prone areas, nourishing the land without harm.'),(27,7,'Moonlight Mist','Water',10,'Creates a soothing mist that condenses into pure dew, reviving parched earth.'),(28,7,'River Song Harmony','Water',15,'Restores balance to polluted waterways with a melodic tune, promoting healthy aquatic life.'),(29,8,'Forest Balm','Nature',1,'Creates a healing salve from moss and leaves, mending injured plants and fostering growth.'),(30,8,'Ancient Oak Shield','Nature',5,'Empowers nearby trees with ancient wisdom, strengthening them against damage and promoting healthy ecosystems.'),(31,8,'Whispering Grove','Nature',10,'Lures lost animals back to safety with a mesmerizing dance of rustling leaves and whispering voices.'),(32,8,'Living Bridge','Nature',15,'Grows sturdy vines and branches into a temporary bridge, allowing safe passage across natural obstacles.'),(33,9,'Solar Spark','Fire',1,'Ignites a tiny flame that burns eternally, providing warmth and light without fuel.'),(34,9,'Sunbeam Dance','Fire',5,'Guides sunlight beams to hidden shadows, maximizing solar energy for sustainable needs.'),(35,9,'Rainbow Bloom','Fire',10,'Infuses a flower with rainbow energy, transforming it into a vibrant beacon of light and hope.'),(36,9,'Living Lantern','Fire',15,'Creates a lantern from trapped sunlight, illuminating paths and spreading warmth without depleting resources.'),(37,10,'Starlight Weaver','Cosmic',1,'Repairs damaged constellations with stardust gathered in the night, restoring balance to the sky.'),(38,10,'Moonbeam Barrier','Cosmic',5,'Creates a shimmering shield of moonlight, protecting nocturnal creatures from harmful light pollution.'),(39,10,'Lullaby of Shadows','Cosmic',10,'Soothes agitated animals with a calming melody born from the night, promoting peaceful coexistence.'),(40,10,'Dreamcatcher Guardian','Cosmic',15,'Weaves a shimmering web of dreams that protects against nightmares and fosters peaceful slumber, even for restless creatures.'),(41,11,'Wind Whisper','Air',1,'Speaks the language of winds, understanding weather patterns and predicting storms.'),(42,11,'Gale Sculptor','Air',5,'Shapes gentle gusts into playful twisters, clearing debris and spreading seeds with playful energy.'),(43,11,'Storm Surge','Air',10,'Channels wind energy into a protective barrier, shielding vulnerable areas from tempestuous weather.'),(44,11,'Singing Cloud Symphony','Air',15,'Commands clouds to weave intricate formations, promoting air purification and regulating rainfall.'),(45,12,'Moonlight Whisper','Moonlight',1,'Lulls restless creatures into serene slumber with a soft, moonlit glow.'),(46,12,'Starbloom Garden','Moonlight',5,'Nurtures hidden seeds with moonlight essence, transforming barren spots into luminous flowerbeds.'),(47,12,'Dream Weaver','Moonlight',10,'Creates shimmering dreamscapes, guiding lost souls back to reality and encouraging peaceful coexistence.'),(48,12,'Celestial Beacon','Moonlight',15,'Projects a radiant starbeam, illuminating paths and offering hope in moments of darkness.'),(49,13,'Forest Guardian\'s Dance','Nature',1,'Creates dancing illusions to distract predators and protect vulnerable creatures.'),(50,13,'Vine Bridge Weaver','Nature',5,'Sprouts flexible vines into sturdy bridges, granting safe passage across hidden trails.'),(51,13,'Whispering Grove Guardian','Nature',10,'Merges with the forest essence, becoming invisible and silent while guarding against threats.'),(52,13,'Springtime Blossom','Nature',15,'Awakens dormant trees and flowers with a touch of vibrant magic, rejuvenating the forest after harsh winters.'),(53,14,'Sunlight Weaver','Fire',1,'Manipulates sunlight into playful sparks, igniting small campfires or activating dormant technology.'),(54,14,'Molten Bloom','Fire',5,'Transforms barren rock into fertile soil with bursts of molten energy, promoting new life in desolate areas.'),(55,14,'Solstice Spark','Fire',10,'Channels the sun\'s power into a focused beam, driving away darkness and purifying polluted areas.'),(56,14,'Living Forge','Fire',15,'Creates a temporary forge from molten sand and sunlight, allowing sustainable crafting and repairs.'),(57,15,'Lunar Tidal Song','Water',1,'Calms choppy waters with soothing moonlight melodies, ensuring safe passage across moonlit seas.'),(58,15,'Stardust Shimmer','Water',5,'Creates protective scales of shimmering stardust, deflecting harmful projectiles and shielding allies.'),(59,15,'Dreamflight Navigation','Water',10,'Guides through treacherous landscapes by interpreting constellations and celestial patterns.'),(60,15,'Lunar Cascade','Water',15,'Summons a cleansing waterfall of moonlight, purifying polluted waterways and invigorating dormant life.'),(61,16,'Melody of Creation','Nature',1,'Encourages new life with sweet musical notes, promoting the growth of diverse plants and flowers.'),(62,16,'Stardust Duststorm','Nature',5,'Creates a swirling vortex of stardust, mending damaged ecosystems and restoring balance to nature.'),(63,16,'Lullaby of the Cosmos','Nature',10,'Soothes enraged creatures with a celestial symphony, calming storms and bringing peace to agitated souls.'),(64,16,'Dream Weaver\'s Galaxy','Nature',15,'Paints constellations onto the night sky, inspiring wonder and reminding others of the interconnectedness of all life.'),(65,17,'Cosmic Weaver','Cosmic',1,'Repairs minor tears in the fabric of reality, strengthening the boundaries between realms.'),(66,17,'Asteroid Rain Shower','Cosmic',5,'Summons harmless showers of stardust that nourish the land with celestial minerals.'),(67,17,'Meteor Guardian','Cosmic',10,'Creates a celestial shield from falling stars, protecting vulnerable areas from cosmic debris.'),(68,17,'Stardust Seed','Cosmic',15,'Plants a luminous seed that grows into a magnificent tree filled with constellations, a beacon of hope and resilience.'),(69,18,'Hidden Path Finder','Dream',1,'Senses and reveals hidden pathways through forgotten realms, leading to forgotten wisdom and treasures.'),(70,18,'Lullaby of Lost Memories','Dream',5,'Soothes restless spirits with dream whispers, helping them find peace and move on.'),(71,18,'Whispering Glade','Dream',10,'Transforms a hostile area into a serene haven, fostering peace and understanding between creatures.'),(72,18,'Dream Bridge Architect','Dream',15,'Constructs shimmering bridges across the dream world, connecting individuals and unlocking forgotten knowledge.'),(73,19,'Spark of Renewal','Fire',1,'Ignites withered plants with a tiny ember, encouraging new growth and revitalizing barren lands.'),(74,19,'Cinder Bloom','Fire',5,'Transforms ash into vibrant flowers, symbolizing beauty born from destruction and fostering sustainable life-cycles.'),(75,19,'Solar Blaze Wings','Fire',10,'Enhances flight with blazing wings, leaving a trail of rejuvenating embers and dispersing pollutants.'),(76,19,'Phoenix Rebirth','Fire',15,'Consumes itself in a dazzling inferno, only to rise anew with renewed strength and wisdom, offering hope and resilience in times of darkness.');
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skillsmastered`
--

DROP TABLE IF EXISTS `skillsmastered`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skillsmastered` (
  `mastered_skill_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `pet_id` int NOT NULL,
  `skill_id` int NOT NULL,
  PRIMARY KEY (`mastered_skill_id`),
  KEY `sm_user_id_user_user_id_idx` (`user_id`),
  KEY `sm_pet_id_pets_pet_id_idx` (`pet_id`),
  KEY `sm_skill_id_skills_skill_id_idx` (`skill_id`),
  CONSTRAINT `sm_pet_id_pets_pet_id` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`pet_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sm_skill_id_skills_skill_id` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`skill_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sm_user_id_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skillsmastered`
--

LOCK TABLES `skillsmastered` WRITE;
/*!40000 ALTER TABLE `skillsmastered` DISABLE KEYS */;
/*!40000 ALTER TABLE `skillsmastered` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task` (
  `task_id` int NOT NULL AUTO_INCREMENT,
  `title` text,
  `description` text,
  `points` int DEFAULT NULL,
  `picture` text,
  PRIMARY KEY (`task_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES (1,'Plant a Tree','Plant a tree in your neighbourhood or a designated green area.',50,'PlantATree.JPEG'),(2,'Use Public Transportation','Use public transportation or carpool instead of driving alone.',30,'UsePublicTransportation.JPEG'),(3,'Reduce Plastic Usage','Commit to using reusable bags and containers.',40,'ReducePlasticUsage.JPEG'),(4,'Energy Conservation','Turn off lights and appliances when not in use.',25,'EnergyConservation.JPEG'),(5,'Composting ','Start composting kitchen scraps to create natural fertilizer.',35,'Composting.JPEG'),(6,'Save Water','Practice water-saving habits such as taking shorter showers.',40,'SaveWater.JPEG'),(7,'Recycle','Sort and recycle your waste to reduce landfill waste.',30,'Recycle.JPEG'),(8,'Go Paperless','Opt for digital documents instead of printing whenever possible.',25,'GoPaperless.JPEG'),(9,'Volunteer for a Cause','Spend time volunteering for a charitable organization or cause.',35,'VolunteerForACause.JPEG'),(10,'Buy Local Produce','Support local farmers by purchasing locally grown produce.',30,'BuyLocalProduce.JPEG'),(11,'Reduce Food Waste','Plan meals and store leftovers to minimize food waste.',25,'ReduceFoodWaste.JPEG'),(12,'Switch to LED Bulbs','Replace traditional light bulbs with energy-efficient LED bulbs.',20,'LEDLights.JPEG'),(13,'Unplug Electronics','Unplug electronic devices when not in use to save energy.',20,'UnplugElectronics.JPEG'),(14,'Donate Unused Items','Donate clothes, furniture, or other items to those in need.',60,'DonateUnusedItems.JPEG'),(15,'Green Clean Products','Switch to environmentally friendly cleaning products.',25,'EcofriendlyCleaningProducts.JPEG');
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taskprogress`
--

DROP TABLE IF EXISTS `taskprogress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taskprogress` (
  `progress_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `pet_id` int DEFAULT NULL,
  `task_id` int NOT NULL,
  `completion_date` timestamp NULL DEFAULT NULL,
  `notes` text,
  PRIMARY KEY (`progress_id`),
  KEY `tp_task_id_task_task_id_idx` (`task_id`),
  KEY `tp_user_id_user_user_id_idx` (`user_id`),
  KEY `tp_pet_id_pet_pet_id_idx` (`pet_id`),
  CONSTRAINT `tp_pet_id_pet_pet_id` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`pet_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tp_task_id_task_task_id` FOREIGN KEY (`task_id`) REFERENCES `task` (`task_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tp_user_id_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taskprogress`
--

LOCK TABLES `taskprogress` WRITE;
/*!40000 ALTER TABLE `taskprogress` DISABLE KEYS */;
INSERT INTO `taskprogress` VALUES (1,1,NULL,2,'2023-11-19 23:00:00','Went to school by MRT'),(2,1,NULL,3,'2023-11-14 00:00:00','Brought a reusable bag to the convenience store'),(3,3,NULL,4,'2024-11-24 14:00:00','Open windows in daytime to get fresh air and brightness'),(4,2,NULL,5,'2023-08-03 02:00:00','Preserve Egg Scraps for fertilizer'),(5,5,NULL,1,'2023-01-13 23:00:00','Took bus to work'),(6,5,NULL,3,'2023-10-08 10:00:00','Used tote bag to buy groceries'),(7,2,NULL,5,'2023-09-18 00:00:00','Tea leaves for fertilizer'),(8,3,NULL,4,'2023-11-21 01:00:00','Switched off lights when not in use'),(9,3,NULL,2,'2023-07-06 23:00:00','Went woodlands by MRT'),(10,4,NULL,2,'2023-11-19 23:00:00','Went to school by MRT'),(11,1,NULL,2,'2023-04-20 00:00:00','Went work by MRT'),(12,2,NULL,1,'2023-01-19 23:00:00','Planted some roses'),(13,3,NULL,2,'2023-03-01 05:00:00','Walked to East Coast Park'),(14,1,NULL,4,'2023-06-15 03:00:00','Solar lamps for daytime energy saving'),(15,1,NULL,5,'2023-11-14 02:00:00','Seeds for composting'),(16,1,NULL,14,'2023-09-01 00:00:00','Donated old school text books to charity'),(17,2,NULL,14,'2023-01-10 07:00:00','Donated old shoes to charity'),(18,3,NULL,14,'2024-11-14 02:00:00','Donated old clothes to charity'),(19,5,NULL,14,'2024-12-15 07:00:00','Donated books to library'),(20,4,NULL,14,'2024-01-12 10:00:00','Donated old clothes to charity'),(21,4,NULL,6,'2024-02-13 12:00:00','Took shorter showers'),(22,5,NULL,6,'2024-02-13 12:00:00','Took shorter showers'),(23,1,NULL,6,'2024-02-13 12:00:00','Donated unused clothes'),(24,2,NULL,6,'2024-02-13 12:00:00','Donated unused clothes'),(25,3,NULL,6,'2024-02-13 12:00:00','Donated unused clothes');
/*!40000 ALTER TABLE `taskprogress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `profile_pic` text,
  `created_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_login_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'AdminUser','systemAdmin@ecoquest.org','$2b$10$M5ldoBouFLVAtdx0oqth3.E5J8Xc7RS00YxvIOMksjgfrFpwZVis.','WindSpiritAvatar.JPEG','2024-02-03 14:31:08','2024-02-03 14:31:08','2024-02-03 14:31:08'),(2,'T\'Challa','tchalla@ecoquest.org','$2b$10$gTdHj9ed2VsQkm5xrvY3i.z9j7uwl53ERz/.0TcrEUrZn0RoWrHE2',NULL,'2024-02-03 14:31:08','2024-02-03 14:31:08','2024-02-03 14:31:08'),(3,'Tony Stark','tony@ecoquest.org','$2b$10$S5tQhPh4sxauHL/MK0Dz5O4taJRxfYpXxYGrsssnPVswqjvHraZwu',NULL,'2024-02-03 14:31:08','2024-02-03 14:31:08','2024-02-03 14:31:08'),(4,'Peter Parker','peter@ecoquest.org','$2b$10$gPgcYHyztOCZ8Q7GRBe8q.frbFPUjKxoCOxNZHXppup2MpQJnYNFW',NULL,'2024-02-03 14:31:08','2024-02-03 14:31:08','2024-02-03 14:31:08'),(5,'Steve Rogers','steve@ecoquest.org','$2b$10$peGGG0.Gln2p1AQ1CL..keFQRyTX/2rwLfczGDYJXNQEav7agI6Ey',NULL,'2024-02-03 14:31:08','2024-02-03 14:31:08','2024-02-03 14:31:08');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'ca2gsm'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-03 22:33:22
