function verifyLicensePlate(plate) {
  // Define regex patterns for different formats
  const patterns = [
    /^[A-Z]{3} \d{4}$/, // Format: ABC 1234
    /^\d{3}-[A-Z]{3}$/, // Format: 123-ABC
    /^[A-Z]{2}\d{4}$/, // Format: AB1234
    /^\d{4}[A-Z]{2}$/, // Format: 1234AB
  ];

  // Check if the plate matches any of the patterns
  return patterns.some((pattern) => pattern.test(plate.toUpperCase()));
}


export { verifyLicensePlate }