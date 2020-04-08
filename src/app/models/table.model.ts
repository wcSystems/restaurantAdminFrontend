export interface Table {
  [x: string]: any;
    id: string;
    name: string;
    status?: boolean;
    created_at: string;
    updated_at: string;
}
