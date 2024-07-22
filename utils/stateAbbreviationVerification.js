// stateUtils.js

const validStateAbbreviations = new Set([
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
]);

/**
 * Validates a US state abbreviation.
 * @param {string} abbreviation - The state abbreviation to validate.
 * @returns {boolean} - Returns true if the abbreviation is valid, false otherwise.
 */
function verifyStateAbbreviation(abbreviation) {
  return validStateAbbreviations.has(abbreviation.toUpperCase());
}

export {
  verifyStateAbbreviation,
};
