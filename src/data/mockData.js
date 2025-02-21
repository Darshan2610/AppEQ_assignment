//  This is our mock data file where we simulate our backend responses.
// I've created some sample users with different engagement levels to test our dashboard.

// First define the validation function
const validateUser = (user) => {
  // Let's make sure each user has all the required information.
  // This helps us avoid any nasty surprises when displaying the data!
  const requiredProperties = {
    id: "number",
    name: "string",
    email: "string",
    lastLogin: "string",
    engagementScore: "number",
    retentionCategory: "string",
    activities: "object",
  };


  for (const [prop, type] of Object.entries(requiredProperties)) {
    if (!user.hasOwnProperty(prop) || typeof user[prop] !== type) {
      console.warn(
        `Heads up! User ${
          user.id || "unknown"
        } is missing or has invalid ${prop}`
      );
      return false;
    }
  }
  return true;
};

// Then use it in the users array
export const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    lastLogin: "2024-03-15",
    engagementScore: 85,
    retentionCategory: "High",
    activities: [
      { type: "login", date: "2024-03-15" },
      { type: "feature_usage", feature: "dashboard", date: "2024-03-15" },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    lastLogin: "2024-03-14",
    engagementScore: 45,
    retentionCategory: "Low",
    activities: [
      { type: "login", date: "2024-03-14" },
      { type: "feature_usage", feature: "reports", date: "2024-03-14" },
    ],
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael@example.com",
    lastLogin: "2024-03-15",
    engagementScore: 92,
    retentionCategory: "High",
    activities: [
      { type: "login", date: "2024-03-15" },
      { type: "feature_usage", feature: "dashboard", date: "2024-03-15" },
      { type: "feature_usage", feature: "analytics", date: "2024-03-15" },
    ],
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah@example.com",
    lastLogin: "2024-03-13",
    engagementScore: 78,
    retentionCategory: "High",
    activities: [
      { type: "login", date: "2024-03-13" },
      { type: "feature_usage", feature: "reports", date: "2024-03-13" },
    ],
  },
  {
    id: 5,
    name: "Robert Brown",
    email: "robert@example.com",
    lastLogin: "2024-03-01",
    engagementScore: 35,
    retentionCategory: "Low",
    activities: [{ type: "login", date: "2024-03-01" }],
  },
  {
    id: 6,
    name: "Emily Davis",
    email: "emily@example.com",
    lastLogin: "2024-03-15",
    engagementScore: 88,
    retentionCategory: "High",
    activities: [
      { type: "login", date: "2024-03-15" },
      { type: "feature_usage", feature: "dashboard", date: "2024-03-15" },
      { type: "feature_usage", feature: "reports", date: "2024-03-15" },
    ],
  },
  {
    id: 7,
    name: "David Miller",
    email: "david@example.com",
    lastLogin: "2024-03-12",
    engagementScore: 62,
    retentionCategory: "Medium",
    activities: [
      { type: "login", date: "2024-03-12" },
      { type: "feature_usage", feature: "dashboard", date: "2024-03-12" },
    ],
  },
  {
    id: 8,
    name: "Lisa Anderson",
    email: "lisa@example.com",
    lastLogin: "2024-02-28",
    engagementScore: 28,
    retentionCategory: "Low",
    activities: [{ type: "login", date: "2024-02-28" }],
  },
  {
    id: 9,
    name: "James Wilson",
    email: "james@example.com",
    lastLogin: "2024-03-14",
    engagementScore: 75,
    retentionCategory: "High",
    activities: [
      { type: "login", date: "2024-03-14" },
      { type: "feature_usage", feature: "analytics", date: "2024-03-14" },
    ],
  },
  {
    id: 10,
    name: "Emma Taylor",
    email: "emma@example.com",
    lastLogin: "2024-03-15",
    engagementScore: 95,
    retentionCategory: "High",
    activities: [
      { type: "login", date: "2024-03-15" },
      { type: "feature_usage", feature: "dashboard", date: "2024-03-15" },
      { type: "feature_usage", feature: "reports", date: "2024-03-15" },
      { type: "feature_usage", feature: "analytics", date: "2024-03-15" },
    ],
  },
].filter(validateUser);

export const getActiveUsers = (period, userList = users) => {
  const referenceDate = new Date("2024-03-15");

  const activeUsers = userList.filter((user) => {
    const lastLogin = new Date(user.lastLogin);
    const diffTime = Math.abs(referenceDate.getTime() - lastLogin.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    let isActive = false;
    switch (period) {
      case "daily":
        isActive = diffDays === 0;
        break;
      case "weekly":
        isActive = diffDays <= 7;
        break;
      case "monthly":
        isActive = diffDays <= 30;
        break;
      default:
        isActive = false;
    }

    // Debug log
    console.log(
      `User ${user.name}: Last login ${diffDays} days ago, ${period} active: ${isActive}`
    );

    return isActive;
  });

  // Debug log
  console.log(
    `${period} active users: ${activeUsers.length} out of ${userList.length}`
  );

  return activeUsers.length;
};

export const getRetentionRate = (userList = users) => {
  // Calculate retention rate based on weekly active users
  const totalUsers = userList.length;
  if (totalUsers === 0) return 0;

  const activeUsers = getActiveUsers("weekly", userList);
  const rate = (activeUsers / totalUsers) * 100;

  // Add detailed logging
  console.group("Retention Rate Calculation");
  console.log("Total Users:", totalUsers);
  console.log("Active Users (Weekly):", activeUsers);
  console.log("Retention Rate:", rate.toFixed(1) + "%");

  // Log each user's status
  console.log("\nUser Activity Status:");
  userList.forEach((user) => {
    const lastLogin = new Date(user.lastLogin);
    const referenceDate = new Date("2024-03-15");
    const diffTime = Math.abs(referenceDate.getTime() - lastLogin.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    console.log(`${user.name}:`, {
      lastLogin: user.lastLogin,
      daysAgo: diffDays,
      isActive: diffDays <= 7,
      retentionCategory: user.retentionCategory,
    });
  });
  console.groupEnd();

  return Math.round(rate * 10) / 10;
};

export const getChurnPredictions = () => {
  // Let's identify users who might be at risk of leaving
  // We consider anyone with an engagement score below 50 to be at risk
  return users
    .filter(
      (user) =>
        typeof user.engagementScore === "number" && user.engagementScore < 50
    )
    .map((user) => ({
      ...user,
      churnRisk: "High",
      reason: "Low engagement score and infrequent logins",
    }));
};

export const getAIInsights = () => {

  return [
    {
      id: 1,
      type: "warning",
      message:
        "3 users have critically low engagement scores (<40) and need immediate attention",
      impact: "High",
      category: "Retention",
    },
    {
      id: 2,
      type: "insight",
      message:
        "Dashboard feature is most used (70% adoption), while Analytics feature is underutilized (30% adoption)",
      impact: "Medium",
      category: "Feature Usage",
    },
    {
      id: 3,
      type: "recommendation",
      message:
        "Consider offering personalized training sessions for users with medium retention category",
      impact: "Medium",
      category: "Engagement",
    },
    {
      id: 4,
      type: "alert",
      message:
        "Recent drop in weekly active users detected - investigate potential usability issues",
      impact: "High",
      category: "Activity",
    },
  ];
};
