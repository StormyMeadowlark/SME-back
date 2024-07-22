function vinToValue(char) {
  if (char.match(/\d/)) {
    return parseInt(char, 10);
  } else {
    return char.charCodeAt(0) - "A".charCodeAt(0) + 1;
  }
}

function calculateCheckDigit(vin) {
  const weights = [8, 7, 6, 5, 4, 3, 2, 10, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < vin.length; i++) {
    const value = vinToValue(vin[i]);
    sum += value * weights[i];
  }
  const remainder = sum % 11;
  return remainder === 10 ? "X" : remainder.toString();
}

function verifyVin(vin) {
  vin = vin.toUpperCase();
  if (vin.length !== 17) {
    return false;
  }
  if (!/^[A-HJ-NPR-Z0-9]+$/.test(vin)) {
    return false;
  }
  const checkDigit = vin[8];
  return calculateCheckDigit(vin) === checkDigit;
}

export { verifyVin };
