export const getZendeskChatMetric = () => ({
  agents_online: {
    criteria: {
      criteria_name: "agents_online",
      compare: "is_less_than",
      value: null,
      alias_name: "No of online agents",
      operator: null
    },
    metrics: [
      {
        metric_name: "agents_online",
        topic: "chats"
      }
    ]
  },
  engagement_count: {
    criteria: {
      criteria_name: "engagement_count",
      compare: "is_greater_than",
      value: null,
      alias_name: null,
      operator: null
    },
    metrics: [
      {
        metric_name: "engagement_count",
        topic: "constant"
      }
    ]
  },
  waiting_time_max: {
    criteria: {
      criteria_name: "waiting_time_max",
      compare: "is_greater_than",
      value: null,
      alias_name: "Max wait time",
      operator: null
    },
    metrics: [
      {
        metric_name: "waiting_time_max",
        topic: "chats"
      }
    ]
  },
  assigned_incoming_chats: {
    criteria: {
      criteria_name: "assigned_chats + incoming_chats",
      compare: "is_greater_than",
      value: null,
      alias_name: "No of chats in queue",
      operator: "+"
    },
    metrics: [
      {
        metric_name: "incoming_chats",
        topic: "chats"
      },
      {
        metric_name: "assigned_chats",
        topic: "chats"
      }
    ]
  },
  active_chats: {
    criteria: {
      criteria_name: "active_chats / agents_online",
      compare: "is_greater_than",
      value: null,
      alias_name: "No of chats per agent",
      operator: "/"
    },
    metrics: [
      {
        metric_name: "active_chats",
        topic: "chats"
      },
      {
        metric_name: "agents_online",
        topic: "chats"
      }
    ]
  },
  agents_online_overall: {
    criteria: {
      criteria_name: "agents_online",
      compare: "is_greater_than",
      value: null,
      alias_name: null,
      operator: null
    },
    metrics: [
      {
        metric_name: "agents_online",
        topic: "chats"
      }
    ]
  }
});
