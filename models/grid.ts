export interface GridColumns {
  label: string;
  field: string;
  type: string;
  class: string;
  variant: string;
  hidden?: boolean;
  options: Array<{
    label: string;
    type: string;
    variant: string;
    actionType: string;
    icon?: string;
    route?: string;
    handler?: Function;
  }>;
}

export interface GridOptions {
  label: string;
  variant: string;
  type: string;
  route?: string;
  action?: string;
  message?: string;
  handler?: Function;
}

export interface GridQueryFilters {
  label: string;
  value: string;
  filter: string;
}

export interface GridSpecialFilters {
  label: string;
  filter: string;
}
