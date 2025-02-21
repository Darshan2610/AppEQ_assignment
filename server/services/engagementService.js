class EngagementService {

  static calculateEngagementScore(user) {
    const loginScore = this.calculateLoginScore(user.activities);
    const featureScore = this.calculateFeatureScore(user.activities);
    const durationScore = this.calculateDurationScore(user.activities);

    return Math.round(
      (loginScore * 0.4) + 
      (featureScore * 0.3) + 
      (durationScore * 0.3)
    );
  }

  static calculateLoginScore(activities) {
    const loginCount = activities.filter(a => a.type === 'login').length;
    
    return Math.min(100, (loginCount / 30) * 100);
  }

  static calculateFeatureScore(activities) {
    const featureUsage = activities
      .filter(a => a.type === 'feature_usage')
      .map(a => a.feature);
    const uniqueFeatures = new Set(featureUsage).size;

    return Math.min(100, (uniqueFeatures / 5) * 100);
  }

  static calculateDurationScore(activities) {
    // Calculate average session duration
    const sessions = this.groupActivitiesBySession(activities);
    const avgDuration = sessions.reduce((acc, session) => 
      acc + session.duration, 0) / sessions.length;
    // Score based on average session duration (in minutes)
    return Math.min(100, (avgDuration / 30) * 100);
  }

  static groupActivitiesBySession(activities) {
    // Group activities into sessions (30 min gap = new session)
    return activities.reduce((sessions, activity) => {
      
      return sessions;
    }, []);
  }
}

module.exports = EngagementService; 