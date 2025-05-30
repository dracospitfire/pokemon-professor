--SELECT QUERIES
SELECT * FROM Pokemon_Gyms;
SELECT * FROM Trainers;
SELECT * FROM Districts;
SELECT * FROM Zones;
SELECT * FROM Utility_Companies;
SELECT * FROM Flora_Fauna;
--READ for Intersection Tables
SELECT * FROM Zones_Flora_intersection;
SELECT * FROM RoofUtility_Districts_Intersectiontop;

--INSERT QUERIES
INSERT INTO Pokemon_Gyms(
    "gymName", 
    "gymLeaderName", 
    "levelRange", 
    "typeSpecialization", 
    "numberOfTrainers", 
    "badgePrize", 
    "districtID"
)
VALUES(:gymNameInput, :gymLeaderNameInput, :levelRangeInput, :typeSpecializationInput, 
:numberOfTrainers, :badgePrize, :districtID);

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
VALUES(:trainNameInput, :ageInput, :typeSpecialization, :experienceLevel, :numberOfPokemon,
:badgeCountInput, :isGymLeaderInput, :gymIDInput);

INSERT INTO Districts (
    "townTheme", 
    "maxPopulation", 
    "livePopulation"
)
VALUES(:townThemeInput, :maxPopulationInput, :livePopulationInput);

INSERT INTO Zones (
    "typesOfZone", 
    "populationOfZone", 
    "economicPotential", 
    "socialPotential", 
    "giniCoefficient", 
    "districtID"
)
VALUES(:typesOfZoneInput, :populationOfZoneInput, :economicPotentialInput,
:socialPotentialInput, :giniCoefficientInput, :districtIDInput);

INSERT INTO Utility_Companies(
    "utilityCompanyID",
    "utilityType", 
    "publicPrivateStatus",
    "coopOwned",
    "email",
    "phone",
    "numberOfEmployees"
)
VALUES(:utilityCompanyIDInput, :utilityTypeInput, :publicPrivateStatusInput, coopOwnedInput,
:emailInput, :phoneInput, :numberOfEmployeesInput);

INSERT INTO Flora_Fauna(
    "dominantPlantFamily",
    "edibleDominant", 
    "rooftopGround",
    "primaryLocaleInCity"
)
VALUES(:dominantPlantFamilyInput, :edibleDominantInput, :rooftopGroundInput, :primaryLocaleInCityInput);

INSERT INTO RoofUtility_Districts_Intersectiontop(
    "utilityCompanyID", 
    "districtID", 
    "combinedUDID",
    "utilityType"
)
VALUES(:utilityCompanyID, :districtID, :combinedUDID, :utilityType);


INSERT INTO Zones_Flora_intersection(
    "zoneTypeID",
    "floraKeyID",
    "combinedFlorZoneID",
)
VALUES(:zoneTypeID, :floraKeyID, :combinedFlorZoneID);


--UPDATE QUERIES
SELECT * from Trainers 
WHERE trainerName = :trainerNameInput

UPDATE Trainers
SET trainerName = :trainNameInput, age=:ageInput, 
    typeSpecialization=:typeSpecializationInput, 
    experienceLevel=:experienceLevelInput, 
    numberOfPokemon=:numberOfPokemonInput, 
    badgeCount=:badgeCountInput, 
    isGymLeader=:isGymLeaderInput, 
    gymID=:gymIDInput
WHERE trainerName = trainerNameInput and id = idInput;

--Utility District Intersection Update
SELECT * from RoofUtility_Districts_Intersectiontop
WHERE districtID = :districtIDInput

SET districtID = :districtIDInput,
    utilityCompanyID = :utilityCompanyIDInput,
    utilityType = :utilityTypeInput
WHERE districtID = :districtIDInput and utilityType = :utilityTypeInput;

--DELETE QUERIES 
SELECT * from Trainers
WHERE trainerName = trainerNameInput;

DELETE * from Trainers
WHERE trainerName = trainerNameInput; AND id=idInput;

--Delete from the Utility District Intersection
SELECT * from RoofUtility_Districts_Intersectiontop
WHERE districtID = :districtID

DELETE * from RoofUtility_Districts_Intersectiontop
WHERE districtID = :districtID and utilityType = utilityTypeInput;

--Join statements
SELECT udi.DistrictID, udi.utilityCompanyID
FROM RoofUtility_Districts_Intersectiontop udi 
JOIN Districts dist on udi.DistrictID = dist.DistrictID
JOIN Utility_Companies util on udi.UtilityCompanyID = util.UtilityCompanyID;

SELECT zfi.ZoneTypeID, zfi.floraKeyID 
FROM Zones_Flora_intersection zfi 
JOIN Zones zones on zfi.ZoneTypeID = zones.ZoneTypeID
JOIN Flora ff on zfi.floraKeyID = ff.floraKeyID;
