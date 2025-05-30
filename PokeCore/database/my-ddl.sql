-- recommended to disable commits and foreign key checks and then turn them back on at the end to minimize import errors.
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Data Definition Queries 

-- Districts Table
CREATE OR REPLACE TABLE Districts (
    districtID int NOT NULL auto_increment,
    districtName varchar(50) NOT NULL,
    districtTheme varchar(50) NOT NULL,
    maxPopulation int NOT NULL default 10000,
    livePopulation int NOT NULL default 1,
    PRIMARY KEY (districtID)
);

-- Pokemon Gyms Table
CREATE OR REPLACE TABLE Pokemon_Gyms (
    gymID int NOT NULL auto_increment,
    gymName varchar(100) NOT NULL,
    gymLeaderID int NULL DEFAULT NULL,
    lowLevelRange int NULL default 0,
    highLevelRange int NULL default 100,
    typeSpecialization varchar(50) NULL default NULL,
    numberOfTrainers int NOT NULL default 1,
    badgePrize varchar(100) NOT NULL,
    districtID int NOT NULL,
    PRIMARY KEY (gymID),
    FOREIGN KEY (districtID) REFERENCES Districts(districtID)
    ON DELETE CASCADE,
    FOREIGN KEY (gymLeaderID) REFERENCES Trainers(trainerID) 
    ON DELETE SET NULL
);

-- Trainers Table 
CREATE OR REPLACE TABLE Trainers (
    trainerID int NOT NULL auto_increment, 
    trainerName varchar(100) NOT NULL, 
    age int NOT NULL default 13, 
    typeSpecialization varchar(50) NULL default NULL,
    experienceLevel int NOT NULL default 1, 
    numberOfPokemon int NOT NULL default 1,
    badgeCount int NOT NULL default 0,
    isGymLeader tinyint NULL default 0,
    gymID int NULL default NULL,
    PRIMARY KEY (trainerID),
    FOREIGN KEY (gymID) REFERENCES Pokemon_Gyms(gymID)
    ON DELETE SET NULL
);

-- Zones Table
CREATE OR REPLACE TABLE Zones (
    zoneTypeID int NOT NULL auto_increment,
    typesOfZone varchar(30) NOT NULL,
    populationOfZone int NOT NULL, 
    economicPotential int NOT NULL,
    socialPotential int NOT NULL, 
    giniCoefficient Decimal(3,2),
    districtID int NOT NULL,
    PRIMARY KEY (zoneTypeID),
    FOREIGN KEY (districtID) REFERENCES Districts(districtID)
    ON DELETE CASCADE
);

-- Utility Companies Table
CREATE OR REPLACE TABLE Utility_Companies (
    utilityCompanyID int NOT NULL auto_increment,
    utilityType varchar(50) NOT NULL, 
    publicPrivateStatus varchar(10) NOT NULL,
    coopOwned boolean NOT NULL,
    email varchar(50) NOT NULL, 
    phone varchar(20) NOT NULL,
    numberOfEmployees int NOT NULL,
    PRIMARY KEY (utilityCompanyID)
);

ALTER TABLE utility_companies AUTO_INCREMENT = 9;

-- Flora & Fauna Table
CREATE OR REPLACE TABLE Flora_Faunas (
    floraKeyID int NOT NULL auto_increment,
    dominantPlantFamily varchar(50),
    edibleDominant tinyint NULL default 0,
    roofTopGround varchar(10),
    primaryLocaleInCity varchar(50),
    PRIMARY KEY (floraKeyID)
);

-- Utility District Intersection Table (Many-to-Many)
CREATE OR REPLACE TABLE Utility_Districts_Intersection (
    districtID int NOT NULL,
    utilityCompanyID int NOT NULL,
    PRIMARY KEY (districtID, utilityCompanyID),
    FOREIGN KEY (districtID) REFERENCES Districts(districtID)
    ON DELETE CASCADE,
    FOREIGN KEY (utilityCompanyID) REFERENCES Utility_Companies(utilityCompanyID)
    ON DELETE CASCADE
);

-- Zone Flora Intersection Table (Many-to-Many)
CREATE OR REPLACE TABLE Zones_Flora_Intersection (
    floraKeyID int NOT NULL,
    zoneTypeID int NOT NULL,
    PRIMARY KEY (floraKeyID, zoneTypeID),
    FOREIGN KEY (floraKeyID) REFERENCES Flora_Faunas(floraKeyID)
    ON DELETE CASCADE,
    FOREIGN KEY (zoneTypeID) REFERENCES Zones(zoneTypeID)
    ON DELETE CASCADE
);

-- Note: Does design meets 1NF? YES - Each column contains indivisible values, Each record is unique, no duplicate rows, and each column contains only values of a single type.
-- Note: Does design meets 2NF? YES - All non-key attributes are fully functionally dependent on the primary key.
-- Note: Does design meets 3NF? YES - There are no transitive dependencies.
INSERT INTO Districts (
    districtName,
    districtTheme, 
    maxPopulation, 
    livePopulation
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
    gymName,
    gymLeaderID, 
    lowLevelRange, 
    highLevelRange,
    typeSpecialization, 
    numberOfTrainers, 
    badgePrize, 
    districtID
)
VALUES (
    'Pewter Gym', NULL, 10, 15, 'Rock', 3, 'Boulder Badge', (SELECT districtID FROM Districts WHERE districtName = 'Unova' LIMIT 1)
),
(
    'Cerulean Gym', NULL, 10, 20, 'Water', 4, 'Cascade Badge', (SELECT districtID FROM Districts WHERE districtName = 'Kanto' LIMIT 1)
),
(
    'Viridian Gym', NULL, 50, 55, 'Ground', 5, 'Earth Badge', (SELECT districtID FROM Districts WHERE districtName = 'Alola' LIMIT 1)
),
(
    'Shalour Gym', NULL, 25, 30, 'Fighting', 2, 'Rumble Badge', (SELECT districtID FROM Districts WHERE districtName = 'Shinnoh' LIMIT 1)
),
(
    'Rustboro Gym', NULL, 15, 20, 'Rock', 3, 'Stone Badge', (SELECT districtID FROM Districts WHERE districtName = 'Johto' LIMIT 1)
);

-- Note: Does design meets 1NF? YES - Each column contains indivisible values, Each record is unique, no duplicate rows, and each column contains only values of a single type.
-- Note: Does design meets 2NF? YES - All non-key attributes are fully functionally dependent on the primary key.
-- Note: Does design meets 3NF? YES - There are no transitive dependencies.
INSERT INTO Trainers (
    trainerName, 
    age, 
    typeSpecialization, 
    experienceLevel, 
    numberOfPokemon, 
    badgeCount, 
    isGymLeader, 
    gymID
)
VALUES (
    'Ash Ketchum', 15, 'Electric', 5, 6, 8, 1, NULL
),
(
    'Misty Williams', 16, 'Water', 4, 5, 6, 1, (SELECT gymID FROM Pokemon_Gyms WHERE gymName = 'Cerulean Gym' LIMIT 1)
),
(
    'Brock Flint', 17, 'Rock', 3, 7, 4, 1, (SELECT gymID FROM Pokemon_Gyms WHERE gymName = 'Pewter Gym' LIMIT 1)
),
(
    'Korrina Hiraki', 18, 'Fighting', 2, 4, 2, 1, (SELECT gymID FROM Pokemon_Gyms WHERE gymName = 'Shalour Gym' LIMIT 1)
),
(
    'Roxanne Tsutsji', 17, 'Rock', 3, 3, 5, 1, (SELECT gymID FROM Pokemon_Gyms WHERE gymName = 'Rustboro Gym' LIMIT 1)
),
(
    'Giovanni Sakaki', 34, 'Ground', 10, 22, 19, 1, (SELECT gymID FROM Pokemon_Gyms WHERE gymName = 'Viridian Gym' LIMIT 1)
);

-- Note: Pokemon Gyms are dependant on Trainers and vice versa, so and update is required.
UPDATE Pokemon_Gyms
SET gymLeaderID = CASE 
    WHEN gymName = 'Cerulean Gym' THEN (SELECT trainerID FROM Trainers WHERE trainerName = 'Misty Williams' LIMIT 1)
    WHEN gymName = 'Pewter Gym' THEN (SELECT trainerID FROM Trainers WHERE trainerName = 'Brock Flint' LIMIT 1)
    WHEN gymName = 'Shalour Gym' THEN (SELECT trainerID FROM Trainers WHERE trainerName = 'Korrina Hiraki' LIMIT 1)
    WHEN gymName = 'Rustboro Gym' THEN (SELECT trainerID FROM Trainers WHERE trainerName = 'Roxanne Tsutsji' LIMIT 1)
    WHEN gymName = 'Viridian Gym' THEN (SELECT trainerID FROM Trainers WHERE trainerName = 'Giovanni Sakaki' LIMIT 1)
    ELSE gymLeaderID
END;

-- Note: Does design meets 1NF? YES - Each column contains indivisible values, Each record is unique, no duplicate rows, and each column contains only values of a single type.
-- Note: Does design meets 2NF? YES - All non-key attributes are fully functionally dependent on the primary key.
-- Note: Does design meets 3NF? YES - There are no transitive dependencies.
INSERT INTO Zones (
    typesOfZone, 
    populationOfZone, 
    economicPotential, 
    socialPotential, 
    giniCoefficient, 
    districtID
)
VALUES (   
    'Urban', 10000, 80, 70, 0.25, (SELECT districtID FROM Districts WHERE districtName = 'Unova' LIMIT 1)
),
(
    'Suburban', 6000, 60, 50, 0.35, (SELECT districtID FROM Districts WHERE districtName = 'Kanto' LIMIT 1)
),
(
    'Coastal', 8000, 90, 85, 0.15, (SELECT districtID FROM Districts WHERE districtName = 'Alola' LIMIT 1)
),
(
    'Industrial', 4000, 75, 40, 0.4, (SELECT districtID FROM Districts WHERE districtName = 'Shinnoh' LIMIT 1)
),
(
    'Agricultural', 3000, 50, 60, 0.3, (SELECT districtID FROM Districts WHERE districtName = 'Johto' LIMIT 1)
);

-- Note: Does design meets 1NF? YES - Each column contains indivisible values, Each record is unique, no duplicate rows, and each column contains only values of a single type.
-- Note: Does design meets 2NF? YES - All non-key attributes are fully functionally dependent on the primary key.
-- Note: Does design meets 3NF? YES - There are no transitive dependencies.
INSERT INTO Utility_Companies (
    utilityType, 
    publicPrivateStatus,
    coopOwned,
    email,
    phone,
    numberOfEmployees
)
VALUES (
    'Water', 'Public', 1 , 'waterservices@nuevoyue.gov', '(124)-555-9999', 100
),
(
    'Broadband Internet', 'Public', 0, 'nuevobroadband@proton.me', '(124)-666-8999', 200
),
(
    'Fire Services', 'Public', 1, 'fireservices@nuevoyue.gov', '(124)-333-4444', 200
),
(
    'EMS Services', 'Public', 0, 'emsservices@nuevoyue.gov', '(124)-999-2222', 200
),
(
    'Solar Energy', 'Private', 1, 'solarcooperative@nuevoyue.gov', '(124)-6942-2333', 300
),
(
    'Geothermal Energy', 'Private', 1, 'geotherminfo@nuevogeo.gov', '(125)-6777-2222', 200
);

-- Note: Does design meets 1NF? YES - Each column contains indivisible values, Each record is unique, no duplicate rows, and each column contains only values of a single type.
-- Note: Does design meets 2NF? YES - All non-key attributes are fully functionally dependent on the primary key.
-- Note: Does design meets 3NF? YES - There are no transitive dependencies.
INSERT INTO Flora_Faunas (
    dominantPlantFamily,
    edibleDominant, 
    roofTopGround,
    primaryLocaleInCity
)
VALUES (
    'Ericaceae', TRUE, 'Rooftop', 'Urban'
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
    'Aricaceae', TRUE, 'Rooftop', 'Agricultural'
),
(
    'Cactaceae', TRUE, 'Rooftop', 'Suburban'
);

INSERT INTO Zones_Flora_Intersection (
    floraKeyID,
    zoneTypeID
)
SELECT DISTINCT
    flora.floraKeyID,
    zone.zoneTypeID
FROM Flora_Faunas flora
JOIN Zones zone
ON flora.primaryLocaleInCity = zone.typesOfZone;

INSERT INTO Utility_Districts_Intersection (
    districtID,
    utilityCompanyID
)
SELECT DISTINCT
    district.districtID, 
    utility.utilityCompanyID
FROM Utility_Companies utility
CROSS JOIN Districts district;

-- Recommended to disable commits and foreign key checks and then turn them back on at the end to minimize import errors.
SET FOREIGN_KEY_CHECKS=1;
COMMIT;
SET AUTOCOMMIT = 1;