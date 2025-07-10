export type Database = {
  public: {
    Tables: {
      workflow_runs: {
        Row: {
          id: string
          user_id: string
          workflow_id: string
          status: 'running' | 'suspended' | 'completed' | 'failed' | 'rejected'
          input_data: any
          output_data: any | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['workflow_runs']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['workflow_runs']['Insert']>
      }
      workflow_suspensions: {
        Row: {
          id: string
          run_id: string
          reason: string
          data: any
          resolved: boolean
          resolution: any | null
          created_at: string
          resolved_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['workflow_suspensions']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['workflow_suspensions']['Insert']>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      workflow_status: 'running' | 'suspended' | 'completed' | 'failed' | 'rejected'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Helper types for common operations
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]
export type TableRow<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type TableInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type TableUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

// Specific table types for easier importing
export type WorkflowRun = TableRow<'workflow_runs'>
export type WorkflowRunInsert = TableInsert<'workflow_runs'>
export type WorkflowRunUpdate = TableUpdate<'workflow_runs'>

export type WorkflowSuspension = TableRow<'workflow_suspensions'>
export type WorkflowSuspensionInsert = TableInsert<'workflow_suspensions'>
export type WorkflowSuspensionUpdate = TableUpdate<'workflow_suspensions'>

// Enums
export type WorkflowStatus = Database['public']['Enums']['workflow_status']