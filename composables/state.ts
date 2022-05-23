export const useUserdata = (data: any = null) =>
  useState("userData", () => data);
