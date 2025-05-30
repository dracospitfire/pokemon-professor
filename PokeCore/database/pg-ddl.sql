-- recommended to disable commits and foreign key checks and then turn them back on at the end to minimize import errors.
BEGIN;

DROP TABLE Districts, 
    Pokemon_Gyms, Trainers, 
    Zones, Utility_Companies, 
    Flora_Faunas, 
    Zones_Flora_Intersection, 
    Utility_Districts_Intersection 
CASCADE;

-- Data Definition Queries 

-- Districts Table
CREATE TABLE IF NOT EXISTS Districts (
    "districtID" SERIAL PRIMARY KEY,
    "districtName" VARCHAR(50) NOT NULL,
    "districtTheme" VARCHAR(50) NOT NULL,
    "maxPopulation" INT NOT NULL DEFAULT 10000,
    "livePopulation" INT NOT NULL DEFAULT 1
);

-- Pokemon Gyms Table
CREATE TABLE IF NOT EXISTS Pokemon_Gyms (
    "gymID" SERIAL PRIMARY KEY,
    "gymName" VARCHAR(100) NOT NULL,
    "gymLeaderID" INT NULL DEFAULT NULL,
    "lowLevelRange" INT NULL DEFAULT 0,
    "highLevelRange" INT NULL DEFAULT 100,
    "typeSpecialization" VARCHAR(50) NULL DEFAULT NULL,
    "numberOfTrainers" INT NOT NULL DEFAULT 1,
    "badgePrize" VARCHAR(100) NOT NULL,
    "districtID" INT NOT NULL,
    CONSTRAINT fk_pokemon_gyms_district FOREIGN KEY ("districtID") REFERENCES Districts("districtID") ON DELETE CASCADE
);

-- Trainers Table 
CREATE TABLE IF NOT EXISTS Trainers (
    "trainerID" SERIAL PRIMARY KEY, 
    "trainerName" VARCHAR(100) NOT NULL, 
    "age" INT NOT NULL DEFAULT 13, 
    "typeSpecialization" VARCHAR(50) NULL DEFAULT NULL,
    "experienceLevel" INT NOT NULL DEFAULT 1, 
    "numberOfPokemon" INT NOT NULL DEFAULT 1,
    "badgeCount" INT NOT NULL DEFAULT 0,
    "isGymLeader" BOOLEAN NULL DEFAULT FALSE,
    "gymID" INT NULL DEFAULT NULL,
    CONSTRAINT fk_trainers_gym FOREIGN KEY ("gymID") REFERENCES Pokemon_Gyms("gymID") ON DELETE SET NULL
);

-- Zones Table
CREATE TABLE IF NOT EXISTS Zones (
    "zoneTypeID" SERIAL PRIMARY KEY,
    "typesOfZone" VARCHAR(30) NOT NULL,
    "populationOfZone" INT NOT NULL, 
    "economicPotential" INT NOT NULL,
    "socialPotential" INT NOT NULL, 
    "giniCoefficient" DECIMAL(3,2),
    "districtID" INT NOT NULL,
    CONSTRAINT fk_zones_district FOREIGN KEY ("districtID") REFERENCES Districts("districtID") ON DELETE CASCADE
);

-- Utility Companies Table
CREATE TABLE IF NOT EXISTS Utility_Companies (
    "utilityCompanyID" SERIAL PRIMARY KEY,
    "utilityType" VARCHAR(50) NOT NULL, 
    "publicPrivateStatus" VARCHAR(10) NOT NULL,
    "coopOwned" BOOLEAN NOT NULL,
    "email" VARCHAR(50) NOT NULL, 
    "phone" VARCHAR(20) NOT NULL,
    "numberOfEmployees" INT NOT NULL
);

ALTER SEQUENCE public."utility_companies_utilityCompanyID_seq" RESTART WITH 10;
ALTER SEQUENCE public."utility_companies_utilityCompanyID_seq" INCREMENT BY 10;

-- Flora & Fauna Table
CREATE TABLE IF NOT EXISTS Flora_Faunas (
    "floraKeyID" SERIAL PRIMARY KEY,
    "dominantPlantFamily" VARCHAR(50),
    "edibleDominant" BOOLEAN NULL DEFAULT FALSE,
    "roofTopGround" VARCHAR(10),
    "primaryLocaleInCity" VARCHAR(50)
);

-- Utility District Intersection Table (Many-to-Many)
CREATE TABLE IF NOT EXISTS Utility_Districts_Intersection (
    "districtID" INT NOT NULL,
    "utilityCompanyID" INT NOT NULL,
    PRIMARY KEY ("districtID", "utilityCompanyID"),
    CONSTRAINT fk_utility_districts_district FOREIGN KEY ("districtID") REFERENCES Districts("districtID") ON DELETE CASCADE,
    CONSTRAINT fk_utility_districts_utility FOREIGN KEY ("utilityCompanyID") REFERENCES Utility_Companies("utilityCompanyID") ON DELETE CASCADE
);

-- Zone Flora Intersection Table (Many-to-Many)
CREATE TABLE IF NOT EXISTS Zones_Flora_Intersection (
    "floraKeyID" INT NOT NULL,
    "zoneTypeID" INT NOT NULL,
    PRIMARY KEY ("floraKeyID", "zoneTypeID"),
    CONSTRAINT fk_zones_flora_flora FOREIGN KEY ("floraKeyID") REFERENCES Flora_Faunas("floraKeyID") ON DELETE CASCADE,
    CONSTRAINT fk_zones_flora_zone FOREIGN KEY ("zoneTypeID") REFERENCES Zones("zoneTypeID") ON DELETE CASCADE
);

-- Note: Does design meets 1NF? YES - Each column contains indivisible values, Each record is unique, no duplicate rows, and each column contains only values of a single type.
-- Note: Does design meets 2NF? YES - All non-key attributes are fully functionally dependent on the primary key.
-- Note: Does design meets 3NF? YES - There are no transitive dependencies.
INSERT INTO Districts (
    "districtName",
    "districtTheme", 
    "maxPopulation", 
    "livePopulation"
)
VALUES (
    'Unova', 'Modern', 15000, 12000
),
(
    'Kanto', 'Rural', 8000, 5000
),
(
    'Alola', 'Coastal', 20000, 18000
),
(
    'Shinnoh', 'Mountain', 5000, 4000
),
(
    'Johto', 'Forest', 7000, 5500
);

-- Note: Does design meets 1NF? YES - Each column contains indivisible values, Each record is unique, no duplicate rows, and each column contains only values of a single type.
-- Note: Does design meets 2NF? YES - All non-key attributes are fully functionally dependent on the primary key.
-- Note: Does design meets 3NF? YES - There are no transitive dependencies.
INSERT INTO Pokemon_Gyms (
    "gymName",
    "gymLeaderID", 
    "lowLevelRange", 
    "highLevelRange",
    "typeSpecialization", 
    "numberOfTrainers", 
    "badgePrize", 
    "districtID"
)
VALUES (
    'Pewter Gym', NULL, 10, 15, 'Rock', 3, 'Boulder Badge', (SELECT "districtID" FROM Districts WHERE "districtName"= 'Unova' LIMIT 1)
),
(
    'Cerulean Gym', NULL, 10, 20, 'Water', 4, 'Cascade Badge', (SELECT "districtID" FROM Districts WHERE "districtName"= 'Kanto' LIMIT 1)
),
(
    'Viridian Gym', NULL, 50, 55, 'Ground', 5, 'Earth Badge', (SELECT "districtID" FROM Districts WHERE "districtName"= 'Alola' LIMIT 1)
),
(
    'Shalour Gym', NULL, 25, 30, 'Fighting', 2, 'Rumble Badge', (SELECT "districtID" FROM Districts WHERE "districtName"= 'Shinnoh' LIMIT 1)
),
(
    'Rustboro Gym', NULL, 15, 20, 'Rock', 3, 'Stone Badge', (SELECT "districtID" FROM Districts WHERE "districtName"= 'Johto' LIMIT 1)
);

-- Note: Does design meets 1NF? YES - Each column contains indivisible values, Each record is unique, no duplicate rows, and each column contains only values of a single type.
-- Note: Does design meets 2NF? YES - All non-key attributes are fully functionally dependent on the primary key.
-- Note: Does design meets 3NF? YES - There are no transitive dependencies.
INSERT INTO Trainers (
    "trainerName", 
    "age", 
    "typeSpecialization", 
    "experienceLevel", 
    "numberOfPokemon", 
    "badgeCount", 
    "isGymLeader", 
    "gymID"
)
VALUES (
    'Ash Ketchum', 15, 'Electric', 5, 6, 8, TRUE, NULL
),
(
    'Misty Williams', 16, 'Water', 4, 5, 6, TRUE, (SELECT "gymID" FROM Pokemon_Gyms WHERE "gymName"= 'Cerulean Gym' LIMIT 1)
),
(
    'Brock Flint', 17, 'Rock', 3, 7, 4, TRUE, (SELECT "gymID" FROM Pokemon_Gyms WHERE "gymName" = 'Pewter Gym' LIMIT 1)
),
(
    'Korrina Hiraki', 18, 'Fighting', 2, 4, 2, TRUE, (SELECT "gymID" FROM Pokemon_Gyms WHERE "gymName" = 'Shalour Gym' LIMIT 1)
),
(
    'Roxanne Tsutsji', 17, 'Rock', 3, 3, 5, TRUE, (SELECT "gymID" FROM Pokemon_Gyms WHERE "gymName" = 'Rustboro Gym' LIMIT 1)
),
(
    'Giovanni Sakaki', 34, 'Ground', 10, 22, 19, TRUE, (SELECT "gymID" FROM Pokemon_Gyms WHERE "gymName" = 'Viridian Gym' LIMIT 1)
);

-- Note: Pokemon Gyms are dependant on Trainers and vice versa, so and update is required.
UPDATE Pokemon_Gyms
SET "gymLeaderID" = CASE 
    WHEN "gymName" = 'Cerulean Gym' THEN (SELECT "trainerID" FROM Trainers WHERE "trainerName" = 'Misty Williams' LIMIT 1)
    WHEN "gymName" = 'Pewter Gym' THEN (SELECT "trainerID" FROM Trainers WHERE "trainerName" = 'Brock Flint' LIMIT 1)
    WHEN "gymName" = 'Shalour Gym' THEN (SELECT "trainerID" FROM Trainers WHERE "trainerName" = 'Korrina Hiraki' LIMIT 1)
    WHEN "gymName" = 'Rustboro Gym' THEN (SELECT "trainerID" FROM Trainers WHERE "trainerName" = 'Roxanne Tsutsji' LIMIT 1)
    WHEN "gymName" = 'Viridian Gym' THEN (SELECT "trainerID" FROM Trainers WHERE "trainerName" = 'Giovanni Sakaki' LIMIT 1)
    ELSE "gymLeaderID"
END;

-- Note: Does design meets 1NF? YES - Each column contains indivisible values, Each record is unique, no duplicate rows, and each column contains only values of a single type.
-- Note: Does design meets 2NF? YES - All non-key attributes are fully functionally dependent on the primary key.
-- Note: Does design meets 3NF? YES - There are no transitive dependencies.
INSERT INTO Zones (
    "typesOfZone", 
    "populationOfZone", 
    "economicPotential", 
    "socialPotential", 
    "giniCoefficient", 
    "districtID"
)
VALUES (   
    'Urban', 10000, 80, 70, 0.25, (SELECT "districtID" FROM Districts WHERE "districtName"= 'Unova' LIMIT 1)
),
(
    'Suburban', 6000, 60, 50, 0.35, (SELECT "districtID" FROM Districts WHERE "districtName"= 'Kanto' LIMIT 1)
),
(
    'Coastal', 8000, 90, 85, 0.15, (SELECT "districtID" FROM Districts WHERE "districtName"= 'Alola' LIMIT 1)
),
(
    'Industrial', 4000, 75, 40, 0.4, (SELECT "districtID" FROM Districts WHERE "districtName"= 'Shinnoh' LIMIT 1)
),
(
    'Agricultural', 3000, 50, 60, 0.3, (SELECT "districtID" FROM Districts WHERE "districtName"= 'Johto' LIMIT 1)
);

-- Note: Does design meets 1NF? YES - Each column contains indivisible values, Each record is unique, no duplicate rows, and each column contains only values of a single type.
-- Note: Does design meets 2NF? YES - All non-key attributes are fully functionally dependent on the primary key.
-- Note: Does design meets 3NF? YES - There are no transitive dependencies.
INSERT INTO Utility_Companies (
    "utilityType", 
    "publicPrivateStatus",
    "coopOwned",
    "email",
    "phone",
    "numberOfEmployees"
)
VALUES (
    'Water', 'Public', TRUE, 'waterservices@nuevoyue.gov', '(124)-555-9999', 100
),
(
    'Broadband Internet', 'Public', FALSE, 'nuevobroadband@proton.me', '(124)-666-8999', 200
),
(
    'Emergency Fire Services', 'Public', TRUE, 'fireservices@nuevoyue.gov', '(124)-333-4444', 200
),
(
    'Emergency Medical Services', 'Public', FALSE, 'emsservices@nuevoyue.gov', '(124)-999-2222', 200
),
(
    'Solar Energy', 'Private', TRUE, 'solarcooperative@nuevoyue.gov', '(124)-6942-2333', 300
),
(
    'Geothermal Energy', 'Private', TRUE, 'geotherminfo@nuevogeo.gov', '(125)-6777-2222', 200
);

-- Note: Does design meets 1NF? YES - Each column contains indivisible values, Each record is unique, no duplicate rows, and each column contains only values of a single type.
-- Note: Does design meets 2NF? YES - All non-key attributes are fully functionally dependent on the primary key.
-- Note: Does design meets 3NF? YES - There are no transitive dependencies.
INSERT INTO Flora_Faunas (
    "dominantPlantFamily",
    "edibleDominant", 
    "roofTopGround",
    "primaryLocaleInCity"
)
VALUES (
    'Ericaceae', TRUE, 'Roof Top', 'Urban'
),
(
    'Pinaceae', FALSE, 'Ground', 'Urban'
),
(
    'Binaceae', FALSE, 'Ground', 'Coastal'
),
(
    'Rosaceae', TRUE, 'Ground', 'Urban'
),
(
    'Aricaceae', TRUE, 'Roof Top', 'Agricultural'
),
(
    'Cactaceae', TRUE, 'Roof Top', 'Suburban'
);

INSERT INTO Zones_Flora_Intersection (
    "floraKeyID",
    "zoneTypeID"
)
SELECT DISTINCT
    flora."floraKeyID",
    zone."zoneTypeID"
FROM Flora_Faunas flora
JOIN Zones zone
ON flora."primaryLocaleInCity" = zone."typesOfZone";

INSERT INTO Utility_Districts_Intersection (
    "districtID",
    "utilityCompanyID"
)
SELECT DISTINCT
    district."districtID", 
    utility."utilityCompanyID"
FROM Utility_Companies utility
CROSS JOIN Districts district;

-- Recommended to disable commits and foreign key checks and then turn them back on at the end to minimize import errors.
COMMIT;