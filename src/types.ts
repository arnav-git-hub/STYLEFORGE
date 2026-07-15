export interface Fabric {
  id: string;
  name: string;
  type: string;
  colors: string[];
  description: string;
  imageUrl?: string;
  svgPattern?: string; // Generated on the fly
  tags: string[];
  designer?: string;
  drapeFactor?: string; // High, Medium, Low, Structural
  weight?: string; // Lightweight, Medium, Heavy
}

export interface CommunityDesign {
  id: string;
  title: string;
  designer: string;
  avatar: string;
  imageUrl: string;
  likes: number;
  tags: string[];
  description: string;
  fabricsUsed: string[];
  structure?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: Date;
  image?: string; // Optional attached image base64
}

export interface DesignLayer {
  id: string;
  name: string;
  type: "silhouette" | "base_fabric" | "accent" | "embellishment";
  opacity: number;
  visible: boolean;
  color?: string;
  fabricId?: string;
}

export type ActiveScreen = "home" | "fabrics" | "patterns" | "showcase" | "studio";
