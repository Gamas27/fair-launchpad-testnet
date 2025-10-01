// G8 Content Pack v1.1 Integration
// Routes, strings, and icons from the official content pack

export interface RouteConfig {
  title: string
  icon: string
}

export interface ContentStrings {
  brand: {
    name: string
    nameBracketed: string
  }
  nav: {
    tabHome: string
    tabCreate: string
    tabZone: string
    tabProfile: string
    searchPlaceholder: string
  }
  common: {
    continue: string
    back: string
    next: string
    cancel: string
    save: string
    edit: string
    delete: string
    close: string
    refresh: string
    learnMore: string
    tryAgain: string
    share: string
    copy: string
    copied: string
    viewMore: string
    loadMore: string
    search: string
    loading: string
    empty: string
  }
  errors: {
    network: string
    unknown: string
    required: string
    maxLength: string
    minLength: string
    format: string
    imageType: string
    imageSize: string
    imageRatio: string
  }
  onboarding: {
    welcome: {
      title: string
      subtitle: string
      cta: string
    }
    tos: {
      title: string
      bulletsTitle: string
      bullets: string[]
      agreeLabel: string
      cta: string
    }
    worldId: {
      title: string
      subtitle: string
      orbTab: string
      notOrbTab: string
      step1: string
      step2: string
      statusVerified: string
      statusPending: string
      cta: string
    }
    wallet: {
      title: string
      subtitle: string
      primary: string
      secondary: string
    }
  }
  home: {
    header: string
    bannerCta: string
    tabs: {
      marketCap: string
      volume: string
      latest: string
    }
    searchPlaceholder: string
    empty: string
    pin: string
    liveFeed: string
  }
  create: {
    disclaimerTitle: string
    disclaimerBody: string
    acceptGuidelines: string
    startCta: string
    identity: {
      title: string
      nameLabel: string
      nameHint: string
      symbolLabel: string
      symbolHint: string
      errors: {
        nameMin: string
        nameMax: string
        symbolFormat: string
        symbolLen: string
      }
    }
    description: {
      title: string
      label: string
      hint: string
      counter: string
    }
    image: {
      title: string
      uploadCta: string
      rules: string
      guidance: {
        doTitle: string
        dos: string[]
        dontTitle: string
        donts: string[]
      }
    }
    social: {
      title: string
      xLabel: string
      xPlaceholder: string
      moreLinksHint: string
      optional: string
    }
    initialBuy: {
      title: string
      label: string
      balance: string
      max: string
      explainTitle: string
      explainBody: string
    }
    review: {
      title: string
      identity: string
      name: string
      symbol: string
      description: string
      image: string
      social: string
      initialBuy: string
      launchCta: string
      edit: string
    }
  }
  token: {
    header: {
      created: string
      daysAgo: string
      viewers: string
      graduated: string
    }
    stats: {
      marketCap: string
      volume24h: string
      liquidity: string
      currentPrice: string
    }
    chart: {
      ranges: string[]
      attribution: string
    }
    actions: {
      trade: string
      info: string
      comments: string
      pin: string
    }
    emptyHistory: string
    copyContract: string
  }
  details: {
    title: string
    logoAlt: string
    description: string
    contract: string
    raiseGoal: string
    bondingCurve: string
    website: string
    x: string
    external: string
    labels: {
      creator: string
      burned: string
      liquidity: string
    }
  }
  holders: {
    title: string
    table: {
      rank: string
      account: string
      percentage: string
    }
    badges: {
      creator: string
      burned: string
      liquidity: string
    }
    tooltips: {
      creator: string
      burned: string
      liquidity: string
    }
    empty: string
    loadMore: string
  }
  history: {
    title: string
    empty: string
    loadMore: string
  }
  zone: {
    title: string
    live: string
    completed: string
    cardCreateWinTitle: string
    cardCreateWinBody: string
    joinNow: string
    gradHoldTitle: string
    gradHoldBody: string
  }
  profile: {
    title: string
    joined: string
    verified: string
    dashboard: string
    dailyClaimsPaused: string
    history: string
    howItWorks: string
    portfolioValue: string
    hideLowValue: string
    tokenRowTrade: string
    noTokens: string
  }
  chat: {
    title: string
    empty: string
    inputPlaceholder: string
    send: string
    system: {
      created: string
      slowmode: string
    }
  }
  search: {
    placeholder: string
    noResults: string
    recent: string
  }
}

// Routes configuration from routes.json
export const ROUTES: Record<string, RouteConfig> = {
  "/": {
    title: "Home",
    icon: "home"
  },
  "/onboarding/welcome": {
    title: "Welcome to [G8]",
    icon: "sparkle"
  },
  "/onboarding/tos": {
    title: "Terms of Service",
    icon: "info"
  },
  "/onboarding/world-id": {
    title: "World ID Verification",
    icon: "shield"
  },
  "/onboarding/wallet": {
    title: "Wallet Created",
    icon: "wallet"
  },
  "/search": {
    title: "Search",
    icon: "search"
  },
  "/create": {
    title: "Create Token",
    icon: "cube"
  },
  "/create/identity": {
    title: "Token Identity",
    icon: "badge"
  },
  "/create/description": {
    title: "Token Description",
    icon: "edit"
  },
  "/create/image": {
    title: "Token Image",
    icon: "image"
  },
  "/create/social": {
    title: "Social Presence",
    icon: "globe"
  },
  "/create/initial-buy": {
    title: "Initial Buy (Optional)",
    icon: "coin"
  },
  "/create/review": {
    title: "Review & Launch",
    icon: "check"
  },
  "/token/:id": {
    title: "Token",
    icon: "coin"
  },
  "/token/:id/details": {
    title: "Token Details",
    icon: "info"
  },
  "/token/:id/holders": {
    title: "Top Holders",
    icon: "users"
  },
  "/token/:id/history": {
    title: "Trade History",
    icon: "chart"
  },
  "/zone": {
    title: "[G8] Zone",
    icon: "cloud"
  },
  "/profile": {
    title: "Profile",
    icon: "user"
  },
  "/chat/:id": {
    title: "Group Chat",
    icon: "chat"
  }
}

// Content strings from strings.en-US.json
export const STRINGS: ContentStrings = {
  brand: {
    name: "G8",
    nameBracketed: "[G8]"
  },
  nav: {
    tabHome: "Home",
    tabCreate: "Create",
    tabZone: "[G8] Zone",
    tabProfile: "Profile",
    searchPlaceholder: "Search tokens, creators, contracts…"
  },
  common: {
    continue: "Continue",
    back: "Back",
    next: "Next",
    cancel: "Cancel",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    close: "Close",
    refresh: "Refresh",
    learnMore: "Learn more",
    tryAgain: "Try again",
    share: "Share",
    copy: "Copy",
    copied: "Copied",
    viewMore: "View more",
    loadMore: "Load more",
    search: "Search",
    loading: "Loading…",
    empty: "Nothing here yet."
  },
  errors: {
    network: "Network error. Please check your connection.",
    unknown: "Something went wrong.",
    required: "This field is required.",
    maxLength: "Too long. Please shorten this.",
    minLength: "Too short. Add more characters.",
    format: "Invalid format.",
    imageType: "Use JPG or PNG.",
    imageSize: "Image too large. Max 500 KB.",
    imageRatio: "Incorrect aspect ratio."
  },
  onboarding: {
    welcome: {
      title: "Welcome to [G8]",
      subtitle: "Explore the decentralized future. Connect, create, and transact securely.",
      cta: "Get started"
    },
    tos: {
      title: "Terms of Service",
      bulletsTitle: "Please read and accept to continue:",
      bullets: [
        "Trading memecoins involves substantial risk, including possible loss of all funds.",
        "Prices can be extremely volatile and may change without warning.",
        "Your data is processed according to our Privacy Policy.",
        "You agree to follow our User Conduct Policy."
      ],
      agreeLabel: "I agree to the Terms of Service and Privacy Policy.",
      cta: "Accept & continue"
    },
    worldId: {
      title: "World ID Verification",
      subtitle: "Verify once to enable secure platform interactions.",
      orbTab: "I'm ORB Verified",
      notOrbTab: "I'm NOT ORB Verified",
      step1: "Verify ORB verification",
      step2: "Submit verification proof",
      statusVerified: "Verified",
      statusPending: "Pending verification…",
      cta: "Verify with World ID"
    },
    wallet: {
      title: "Wallet created",
      subtitle: "You're ready to explore [G8].",
      primary: "Go to Home",
      secondary: "View Dashboard"
    }
  },
  home: {
    header: "New Campaigns & Launches",
    bannerCta: "Discover more",
    tabs: {
      marketCap: "Market Cap",
      volume: "Volume",
      latest: "Latest"
    },
    searchPlaceholder: "Search tokens, creators, contracts…",
    empty: "No tokens to show yet.",
    pin: "Pin",
    liveFeed: "Live Feed"
  },
  create: {
    disclaimerTitle: "First token creation free!",
    disclaimerBody: "Welcome to [G8]. Your first token creation is free. Trading can be volatile—read the Terms & Guidelines before proceeding.",
    acceptGuidelines: "I accept the Terms & Guidelines for token creation.",
    startCta: "Continue",
    identity: {
      title: "Token Identity",
      nameLabel: "Token name",
      nameHint: "Keep it short, fun, and memeable (≤ 24 chars).",
      symbolLabel: "Token symbol",
      symbolHint: "3–5 uppercase letters work best.",
      errors: {
        nameMin: "Name must be at least 2 characters.",
        nameMax: "Name must be 24 characters or fewer.",
        symbolFormat: "Use only A–Z letters.",
        symbolLen: "Symbol should be 3 to 5 letters."
      }
    },
    description: {
      title: "Token Description",
      label: "Short description",
      hint: "1–2 concise lines. 160 characters max.",
      counter: "{{count}}/160"
    },
    image: {
      title: "Token Image",
      uploadCta: "Click to upload token image",
      rules: "JPG or PNG, max 500 KB. Square 1:1 recommended.",
      guidance: {
        doTitle: "Do these:",
        dos: [
          "Use a simple mascot, icon, or funny sketch.",
          "High contrast, readable at small sizes.",
          "Keep backgrounds clean."
        ],
        dontTitle: "Don't do these:",
        donts: [
          "No selfies or random camera photos.",
          "No app screenshots or \"airdrop\" bait.",
          "Avoid unreadable symbols or mixed casing."
        ]
      }
    },
    social: {
      title: "Social Presence",
      xLabel: "X (Twitter) username",
      xPlaceholder: "@username",
      moreLinksHint: "Add Telegram and website after creation.",
      optional: "Optional"
    },
    initialBuy: {
      title: "Initial Buy (Optional)",
      label: "Initial buy amount",
      balance: "Balance",
      max: "Max: {{amount}}",
      explainTitle: "What is Initial Buy?",
      explainBody: "Purchase your own tokens before launch to create initial liquidity and set a starting price. The amount is deducted during creation."
    },
    review: {
      title: "Review & Launch",
      identity: "Identity",
      name: "Name",
      symbol: "Symbol",
      description: "Description",
      image: "Image",
      social: "Social",
      initialBuy: "Initial Buy",
      launchCta: "Launch token",
      edit: "Edit"
    }
  },
  token: {
    header: {
      created: "Created",
      daysAgo: "{{days}}d",
      viewers: "Viewers",
      graduated: "Graduated"
    },
    stats: {
      marketCap: "Market Cap",
      volume24h: "24H Volume",
      liquidity: "Liquidity",
      currentPrice: "Current Price"
    },
    chart: {
      ranges: [
        "1s",
        "1m",
        "5m",
        "15m",
        "1h",
        "4h",
        "D"
      ],
      attribution: "Tracked by DEX Screener"
    },
    actions: {
      trade: "Trade",
      info: "Info",
      comments: "Comments",
      pin: "Pin"
    },
    emptyHistory: "No trades yet.",
    copyContract: "Contract copied"
  },
  details: {
    title: "Token Details",
    logoAlt: "Token logo",
    description: "Description",
    contract: "Contract Address",
    raiseGoal: "Raise Goal",
    bondingCurve: "Bonding Curve",
    website: "Website",
    x: "X (Twitter)",
    external: "Open external link",
    labels: {
      creator: "Creator",
      burned: "Burned Supply",
      liquidity: "Liquidity Pool"
    }
  },
  holders: {
    title: "Top Holders",
    table: {
      rank: "#",
      account: "Account",
      percentage: "Percentage"
    },
    badges: {
      creator: "Creator",
      burned: "Burned Supply",
      liquidity: "Liquidity Pool"
    },
    tooltips: {
      creator: "Deployer of the token.",
      burned: "Tokens sent to an irrecoverable address.",
      liquidity: "LP tokens locked in the pool."
    },
    empty: "No holders yet—liquidity is building.",
    loadMore: "Load more holders"
  },
  history: {
    title: "Trade History",
    empty: "No trade history found.",
    loadMore: "Load more"
  },
  zone: {
    title: "[G8] Zone",
    live: "Live",
    completed: "Completed",
    cardCreateWinTitle: "Create & Win",
    cardCreateWinBody: "Create a token between {{start}} – {{end}} to earn 1 ticket. Ten winners share a 500K $PUF pool!",
    joinNow: "Join now",
    gradHoldTitle: "Graduate & Hold",
    gradHoldBody: "Hold graduated tokens from this month. Top 20 holders share 40,000 PUF."
  },
  profile: {
    title: "Profile",
    joined: "Joined {{timeAgo}}",
    verified: "Orb Verified",
    dashboard: "Creator Dashboard",
    dailyClaimsPaused: "Daily claims temporarily paused",
    history: "History",
    howItWorks: "How it works",
    portfolioValue: "Total Portfolio Value",
    hideLowValue: "Hide low value tokens",
    tokenRowTrade: "Trade",
    noTokens: "You have not created any tokens yet."
  },
  chat: {
    title: "Group Chat",
    empty: "No messages yet. Be the first to say hi!",
    inputPlaceholder: "Write a message…",
    send: "Send",
    system: {
      created: "Chat created for {{token}}",
      slowmode: "Slow mode is on ({{seconds}}s)."
    }
  },
  search: {
    placeholder: "Search tokens, creators, contracts…",
    noResults: "No results for \"{{q}}\".",
    recent: "Recent searches"
  }
}

// Helper functions
export const getRouteConfig = (path: string): RouteConfig | null => {
  return ROUTES[path] || null
}

export const getString = (path: string): string => {
  const keys = path.split('.')
  let value: any = STRINGS
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key]
    } else {
      return path // Return the path if not found
    }
  }
  
  return typeof value === 'string' ? value : path
}

export const interpolateString = (template: string, variables: Record<string, any>): string => {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return variables[key] || match
  })
}

export default {
  ROUTES,
  STRINGS,
  getRouteConfig,
  getString,
  interpolateString
}