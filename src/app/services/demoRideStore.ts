export type DemoRidePriceType = 'fixed' | 'negotiate';

export interface StoredRide {
  id: number;
  origin: string;
  destination: string;
  date: string;
  time: string;
  seats: number;
  price: string;
  priceType: DemoRidePriceType;
  driverName: string;
  driverImage: string;
  createdAt: string;
}

const STORAGE_KEY = 'unigoDemoRides';

const safeParse = (value: string | null): StoredRide[] => {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value) as StoredRide[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const getStoredRides = (): StoredRide[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  return safeParse(window.localStorage.getItem(STORAGE_KEY)).sort(
    (left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime()
  );
};

export const getStoredRideById = (rideId: number): StoredRide | undefined =>
  getStoredRides().find((ride) => ride.id === rideId);

export const saveStoredRide = (
  ride: Omit<StoredRide, 'id' | 'createdAt'>
): StoredRide => {
  const nextRide: StoredRide = {
    ...ride,
    id: Date.now(),
    createdAt: new Date().toISOString(),
  };

  const existing = getStoredRides();
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([nextRide, ...existing]));

  return nextRide;
};
