const { Flagsmith }= require('flagsmith-nodejs');
require('dotenv').config();

// Initialize Flagsmith client
const flagsmith = new Flagsmith({
  environmentKey: process.env.FLAGSMITH_API_KEY
});

const getWhitelistedIPs = async () => {
  try {
    // Use getValue instead of getEnvironmentFeature
    const flags = await flagsmith.getEnvironmentFlags();

    var isEnabled = flags.isFeatureEnabled("whitelisted_ips");

    var ipListValue = flags.getFeatureValue('whitelisted_ips');

    // Check if the value exists and is not empty
    if (ipListValue && isEnabled) {
      const ipList = ipListValue.split(',').map(ip => ip.trim());
      console.log(`✅ Whitelisted IPs: ${ipListValue}`);
      return ipList;
    } else {
      console.log('❌ No Whitelisted IPs found');
      return [];
    }
  } catch (error) {
    console.error('Flagsmith API Error:', error.message);
    return [];
  }
};

module.exports = { getWhitelistedIPs };