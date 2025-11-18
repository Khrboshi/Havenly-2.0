import { PREMIUM_CONFIG } from "./config";

export function isPremiumEnabled() {
  return PREMIUM_CONFIG.enabled === true;
}

export function isFeatureAvailable(featureKey) {
  if (!PREMIUM_CONFIG.enabled) return false;
  return PREMIUM_CONFIG.features[featureKey] === true;
}

export function getPremiumStatus() {
  return {
    enabled: PREMIUM_CONFIG.enabled,
    features: Object.keys(PREMIUM_CONFIG.features).filter(
      (key) => PREMIUM_CONFIG.features[key]
    ),
  };
}
