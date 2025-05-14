
// Define the types for continuity bridge data structure
export interface Thread {
  name: string;
  activities: string[];
}

export interface NotableContextElements {
  system_mode: string;
  key_metaphors: string[];
  signal_phrases: string[];
  open_traces: string[];
}

export interface SessionContext {
  date: string;
  timestamp_markers: string[];
}

export interface SectionData {
  session_context: SessionContext;
  active_threads: Thread[];
  notable_context_elements: NotableContextElements;
}

export interface ContinuityBridgeMetadata {
  bridge_id: string;
  active_threads: string;
  conversation_id: string;
  ctx_markers: string;
  timestamp: string;
  mode?: string;
  anchor_id?: string;
}

export interface ContinuityBridge {
  bridge_id: string;
  metadata: ContinuityBridgeMetadata;
  section_data: SectionData;
  content_summary?: string;
}

export interface ContinuityBridgeData {
  continuity_bridges: ContinuityBridge[];
}
