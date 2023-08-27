



export const CHANNEL_TYPE = {
  /** from rendere to main then returned to rendere */
  INVOKABLE     : "INVOKABLE", 

  /** from renderer to main */
  SENDABLE      : "SENDABLE", 
  
  /** from main to rendere */
  RETRIEVEABLE  : "RETIEVABLE" 
} as const