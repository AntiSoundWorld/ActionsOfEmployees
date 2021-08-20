import dotenv from "dotenv";
dotenv.config();

export function isLicenseActive(context) {
    // Check for an environment variable that overrides the license state
    const override = process.env.LICENSE_OVERRIDE;
    if (typeof override !== 'undefined') {
        if (override.toLowerCase() === LicenseOverride.ACTIVE) {
            return true;
        }
        if (override.toLowerCase() === LicenseOverride.INACTIVE) {
            return false;
        }
    }

    // Else return the actual value
    return context && context.license && context.license.isActive;
}