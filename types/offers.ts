export type FlightOffer = {
  id: string;

  airline: {
    code: string;
    name: string;
    flightNumber: string;
  };

  origin: {
    code: string;
    city: string;
  };

  destination: {
    code: string;
    city: string;
  };

  departureTime: string;
  arrivalTime: string;

  durationMinutes: number;
  stops: number;

  cabin: "economy" | "business";

  pricePkr: number;
};
