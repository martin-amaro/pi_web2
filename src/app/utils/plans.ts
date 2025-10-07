import { PLANS } from "../constants/plans";
export const isPro = (user: any) => user?.plan?.name === PLANS.PRO;
export const isFree = (user: any) => user?.plan?.name === PLANS.FREE;
export const isProActive = (user: any) => user?.plan?.status === "active" && isPro(user);
export const isProInactive = (user: any) => user?.plan?.status !== "active" && isPro(user);