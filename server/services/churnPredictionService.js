class ChurnPredictionService {

  static predictChurnRisk(user) {
    const riskFactors = this.calculateRiskFactors(user);
    const riskScore = this.calculateRiskScore(riskFactors);
    
    return {
      userId: user.id,
      riskLevel: this.getRiskLevel(riskScore),
      riskScore,
      factors: riskFactors,
      recommendations: this.generateRecommendations(riskFactors)
    };
  }

  static calculateRiskFactors(user) {
    return {
      engagementTrend: this.calculateEngagementTrend(user.activities),
      loginFrequency: this.calculateLoginFrequency(user.activities),
      featureUsage: this.analyzeFeatureUsage(user.activities),
      lastActivity: this.getTimeSinceLastActivity(user.activities)
    };
  }

  static calculateRiskScore(factors) {

    const weights = {
      engagementTrend: 0.4,
      loginFrequency: 0.3,
      featureUsage: 0.2,
      lastActivity: 0.1
    };

    return Object.entries(factors).reduce((score, [factor, value]) => 
      score + (value * weights[factor]), 0);
  }

  static getRiskLevel(score) {
    if (score >= 0.7) return 'High';
    if (score >= 0.4) return 'Medium';
    return 'Low';
  }

  static generateRecommendations(riskFactors) {

    const recommendations = [];
    
    if (riskFactors.engagementTrend < 0.5) {
      recommendations.push('Offer personalized feature tour');
    }
    if (riskFactors.loginFrequency < 0.3) {
      recommendations.push('Send re-engagement email campaign');
    }
  

    return recommendations;
  }
}

module.exports = ChurnPredictionService; 