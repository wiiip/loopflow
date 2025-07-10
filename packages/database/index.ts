// Export all client functions
export {
  createClient,
  createServerClient,
  createMiddlewareClient,
} from './src/client'

// Export all types
export type {
  Database,
  Tables,
  TableRow,
  TableInsert,
  TableUpdate,
  WorkflowRun,
  WorkflowRunInsert,
  WorkflowRunUpdate,
  WorkflowSuspension,
  WorkflowSuspensionInsert,
  WorkflowSuspensionUpdate,
  WorkflowStatus,
} from './src/types'